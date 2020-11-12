import { Command, flags } from '@oclif/command'
import Kubernetes from '../../providers/kubernetes'

export default class K8sCreateNamespace extends Command {
  static description = 'Create a new Kubernetes namespace'

  static flags = {
      name: flags.string({ description: 'The name of the new namespace', required: true }),
      kubeconfig: flags.string({ description: 'Path to a kubeconfig file. If not specified, the following search order takes precedence: KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).'}),
  }

  async run() {
      const { flags } = this.parse(K8sCreateNamespace)
      const k8s = await Kubernetes.getClient(undefined, flags.kubeconfig)
      const result = await k8s.namepaces.create(flags.name)
      this.debug(result)
  }
}
