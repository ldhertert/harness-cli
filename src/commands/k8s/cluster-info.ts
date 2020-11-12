import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'
import Kubernetes from '../../providers/kubernetes'

export default class K8sClusterInfo extends Command {
    static description = 'Get a kubernetes service account'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the service account', default: 'harness' }),
        kubeconfig: flags.string({ description: 'Path to a kubeconfig file. If not specified, the following search order takes precedence: KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).' }),
    }

    async run() {
        const { flags } = this.parse(K8sClusterInfo)

        const k8s = await Kubernetes.getClient(undefined, flags.kubeconfig)

        const result = {
            master: k8s.kubeconfig.getCurrentCluster()?.server,
        }
        this.log(result)
    }
}
