import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'
import Kubernetes, { RoleRule } from '../../providers/kubernetes'

export default class K8sCreateRole extends Command {
  static description = 'Create a Kubernetes Role with common Harness permissions and optionally bind to a service account.'

  static flags = {
      ...Command.flags,
      name: flags.string({ description: 'The name of the role', default: 'harness' }),
      namespaceAdmin: flags.boolean({ description: 'Grant full permissions to a specific namespace.' }),
      listDeploymentsInDefaultNamespace: flags.boolean({ description: 'Grants the account permissions to list deployments in the default namespace. This is required for cloud provider validation to be successful without skipping validation.', exclusive: ['namespaceAdmin', 'namespace'] }),
      // ce permissions
      namespace: flags.string({ description: 'The namespace to create the role in. If not specified, the default namespace in your kubeconfig will be used' }),
      serviceAccount: flags.string({ description: 'Specify a service account to create a role binding for', default: 'harness' }),
      serviceAccountNamespace: flags.string({ description: 'The namespace of the service account. If not provided, the service account for the role is used.'}),
      kubeconfig: flags.string({ description: 'Path to a kubeconfig file. If not specified, the following search order takes precedence: KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).'}),
  }

  async run() {
      const { flags } = this.parse(K8sCreateRole)

      const k8s = await Kubernetes.getClient(flags.namespace, flags.kubeconfig)
      let namespace = flags.namespace || k8s.kubeconfig.getContextObject(k8s.kubeconfig.getCurrentContext())?.namespace || 'default'

      try {
          let rules: RoleRule[] = []
          if (flags.namespaceAdmin) {
              rules = rules.concat(k8s.rbac.roles.rules.fullAccessRule)              
          } else if (flags.listDeploymentsInDefaultNamespace) {
              rules.push(k8s.rbac.roles.rules.cloudProviderValidationRule)
              namespace = 'default'
          }
          const role = await k8s.rbac.roles.create(flags.name, rules, namespace)
          this.debug(role)
          this.log(`Created role ${flags.name} in ${namespace} namespace`)
      } catch (ex) {
          if (ex?.response?.body?.code === 409) {
              this.warn('Role already exists. Continuing.')
          } else {
              throw ex
          }
      }
      
      if (flags.serviceAccount) {
          try {
              const name = `${flags.serviceAccount}-${flags.name}-${namespace}`
              const rbNamespace = flags.serviceAccountNamespace || namespace
              const roleBinding = await k8s.rbac.roles.createRoleBinding(name, flags.serviceAccount, rbNamespace, flags.name, namespace)
              this.debug(roleBinding)
              this.log(`Created RoleBinding ${name} in ${namespace} namespace`)
          } catch (ex) {
              if (ex?.response?.body?.code === 409) {
                  this.warn('Role already exists. Continuing.')
              } else {
                  throw ex
              }
          }
      }
  }
}
