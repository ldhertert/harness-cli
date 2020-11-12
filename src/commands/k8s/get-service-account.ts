import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'
import Kubernetes from '../../providers/kubernetes'

export default class K8sGetServiceAccount extends Command {
  static description = 'Get a kubernetes service account'

  static flags = {
      ...Command.flags,
      name: flags.string({ description: 'The name of the service account', default: 'harness' }),
      namespace: flags.string({ description: 'The name of the namespace. If not specified, the default namespace in your kubeconfig will be used' }),
      kubeconfig: flags.string({ description: 'Path to a kubeconfig file. If not specified, the following search order takes precedence: KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).'}),
  }

  async run() {
      const { flags } = this.parse(K8sGetServiceAccount)

      const k8s = await Kubernetes.getClient(flags.namespace, flags.kubeconfig)

      const serviceAccountFields = await k8s.rbac.serviceAccounts.get(flags.name, flags.namespace)
      const kubeConfig = await k8s.rbac.serviceAccounts.generateKubeConfig(flags.name, serviceAccountFields?.namespace)
      const result = {
          name: serviceAccountFields.name,
          namespace: serviceAccountFields.namespace,
          token: serviceAccountFields.token?.raw,
          kubeconfig: kubeConfig,
      }
      this.log(result)
  }
}
