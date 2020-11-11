import { Command, flags } from '@oclif/command'
import Kubernetes from '../../providers/kubernetes'

export default class K8sCreateNamespace extends Command {
  static description = 'Create a new Kubernetes namespace'

  static flags = {
      name: flags.string({ description: 'The name of the new namespace', required: true }),
  }

  async run() {
      const { flags } = this.parse(K8sCreateNamespace)
      const k8s = await Kubernetes.getClient('harness')
      const result = await k8s.namepaces.create(flags.name)
      this.debug(result)
  }
}
