
import k8s = require('@kubernetes/client-node')
import * as yaml from 'js-yaml'

export interface RoleRule {
    apiGroups: string[], 
    resources: string[], 
    verbs: string[],
}

// Rules to grant full access to a namespace
const fullAccessRule: RoleRule[] = [
    { 
        apiGroups: ['', 'extensions', 'apps', 'autoscaling', 'rbac.authorization.k8s.io', 'roles.rbac.authorization.k8s.io'],
        resources: ['*'],
        verbs: ['*'],        
    },
    {
        apiGroups: ['batch'],
        resources: ['jobs', 'cronjobs'],
        verbs: ['*'],
    },
]

// Rule for Harness cloud provider validation
const cloudProviderValidationRule: RoleRule = {
    apiGroups: ['apps'],
    resources: ['*'],
    verbs: ['list'],
}

async function getClient(defaultNamespace?: string, kubeconfig?: string) {
    const kc = new k8s.KubeConfig()
    if (kubeconfig) {
        kc.loadFromFile(kubeconfig)
    } else {
        kc.loadFromDefault()
    }
    const _defaultNamespace = defaultNamespace || 'default'
    const client = {
        core: kc.makeApiClient(k8s.CoreV1Api),
        rbac: kc.makeApiClient(k8s.RbacAuthorizationV1Api),
    }

    const getNamespaces = async function () {
        const namespaces = await client.core.listNamespace()
        if (namespaces.response.statusCode !== 200) {
            throw new Error('error with k8s')
        }
        return namespaces.body.items.map(i => i.metadata?.name)
    }
    
    const createNamespace = async function (name: string) {
        const ns = {
            metadata: {
                name: name,
            },
        } as k8s.V1Namespace
        const res = await client.core.createNamespace(ns)
        return res
    }

    const createClusterRoleBinding = async function (name: string, serviceAccount: string, clusterRole: string, namespace?: string) {
        const rb = {
            metadata: {
                name: name,
            },
            subjects: [
                { 
                    kind: 'ServiceAccount',
                    name: serviceAccount,
                    namespace: namespace || _defaultNamespace,
                } as k8s.V1ServiceAccount,
            ],
            roleRef: {
                name: clusterRole,
                kind: 'ClusterRole',
            },
        } as k8s.V1ClusterRoleBinding        

        const result = await client.rbac.createClusterRoleBinding(rb)
        return result
    }

    const createServiceAccount = async function (name: string, namespace?: string) {
        const sa: k8s.V1ServiceAccount = {
            metadata: {
                name: name,
            },
        }
        const result = await client.core.createNamespacedServiceAccount(namespace || _defaultNamespace, sa)
        return result
    }

    const getServiceAccount = async function (serviceAccount: string, namespace?: string) {
        const ns = namespace || _defaultNamespace
        const sa = await client.core.readNamespacedServiceAccount(serviceAccount, ns)
        if (sa.body.secrets && sa.body.secrets.length > 0) {
            const secretRef = sa.body.secrets[0]
            const secret = await client.core.readNamespacedSecret(secretRef.name as string, ns)
            const token = secret.body.data?.token
            const decodedToken = token ? Buffer.from(token, 'base64').toString('utf-8') : undefined
            const cert = secret.body.data ? secret.body.data['ca.crt'] : undefined
            const decodedCert = cert ? Buffer.from(cert, 'base64').toString('utf-8') : undefined
            if (token) {
                return {
                    name: serviceAccount,
                    namespace: ns,

                    token: {
                        encoded: token,
                        raw: decodedToken,
                    },
                    cert: {
                        encoded: cert,
                        raw: decodedCert,
                    },
                }
            }
        }
        return {
            name: serviceAccount,
            namespace: ns,
        }
    }

    const generateKubeCfg = async function (serviceAccount: string, namespace: string) {
        const sa = await getServiceAccount(serviceAccount, namespace)
        if (!sa?.cert || !sa?.token) { 
            return
        }
        
        const cert = sa.cert.encoded || ''
        const token = sa.token.raw || ''
        const clusterName = kc.getCurrentCluster()?.name || ''
        const contextName = 'generated'
        const serviceAccountName = sa.name
        const server = kc.getCurrentCluster()?.server || ''

        const shell = {
            apiVersion: 'v1',
            clusters: [{ cluster: { 'certificate-authority-data': '', server: '' }, name: ''}],
            contexts: [{ context: { cluster: '', namespace: '', user: ''}, name: '' }],
            'current-context': '',
            kind: 'Config',
            preferences: {},
            users: [{ name: '', user: { token: '' }}],
        }

        shell.clusters[0].name = clusterName
        shell.clusters[0].cluster['certificate-authority-data'] = cert
        shell.clusters[0].cluster.server = server
        shell.contexts[0].name = contextName
        shell.contexts[0].context.cluster = clusterName
        shell.contexts[0].context.namespace = namespace
        shell.contexts[0].context.user = serviceAccountName
        shell['current-context'] = contextName 
        shell.users[0].name = serviceAccountName
        shell.users[0].user.token = token
        return yaml.safeDump(shell)
    }

    const createRole = async function (name: string, rules: RoleRule[], namespace?: string) {
        const role: k8s.V1Role = {
            metadata: { name: name, namespace: namespace || _defaultNamespace},
            rules: rules,
        }
        const result = await client.rbac.createNamespacedRole(namespace || _defaultNamespace, role)
        return result
    }

    const createRoleBinding = async function (name: string, serviceAccount: string, serviceAccountNamespace: string, role: string, namespace?: string) {
        const roleDef: k8s.V1RoleBinding = {
            metadata: { name: name, namespace: namespace || _defaultNamespace},
            subjects: [{ kind: 'ServiceAccount', name: serviceAccount, namespace: serviceAccountNamespace }],
            roleRef: { apiGroup: 'rbac.authorization.k8s.io', kind: 'Role', name: role },
        }
        const result = await client.rbac.createNamespacedRoleBinding(namespace || _defaultNamespace, roleDef)
        return result
    }

    return {
        kubeconfig: kc,
        rbac: {
            roles: {
                create: createRole,
                createClusterRoleBinding,
                createRoleBinding,
                rules: {
                    fullAccessRule,
                    cloudProviderValidationRule,
                },
            },
            serviceAccounts: {
                create: createServiceAccount,
                get: getServiceAccount,
                generateKubeConfig: generateKubeCfg,
            },
            
        },
        namepaces: {
            list: getNamespaces,
            create: createNamespace,
        },
    }
}

const Kubernetes = { getClient }
export default Kubernetes
