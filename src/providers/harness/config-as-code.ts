import { Harness } from './harness-api-client'
import * as traverse from 'traverse'
import * as _ from 'lodash'
import { File } from '../../util/filesystem'
import * as FormData from 'form-data'
import JSZip = require('jszip');

interface ConfigAsCodeFile {
    path: string,
    contentUrl: string,
}

export class ConfigAsCode {
    protected harness: Harness;

    constructor(harness: Harness) {
        this.harness = harness
    }

    async getTree() {
        const root = await this.harness.privateApiGet('/gateway/api/setup-as-code/yaml/directory')
        let yaml = this.getYamlNodes(root)

        const appNodes = _.filter(traverse(root).nodes(), n => n && n.shortClassName === 'Application' && n.appId)
        for (const node of appNodes) {
            const app = await this.harness.privateApiGet(`/gateway/api/setup-as-code/yaml/application?appId=${node.appId}`)
            yaml = yaml.concat(this.getYamlNodes(app))
        }

        return yaml
    }

    async getFileContent(file: ConfigAsCodeFile): Promise<File> {
        const content = await this.harness.privateApiGet(file.contentUrl)
        return {
            path: file.path,
            content: content.resource.yaml,
        }
    }

    private getYamlNodes(apiResponse: any) {
        const nodes = traverse(apiResponse).nodes()
        const yaml = _.filter(nodes, { type: 'yaml' })
        return yaml.map(n => {
            const mapping: ConfigAsCodeFile = {
                path: n.directoryPath.path as string,
                contentUrl: `/gateway/api/setup-as-code/yaml/${n.restName}/${n.uuid}?accountId=${n.accountId}`,
            }

            if (n.appId) {
                mapping.contentUrl += `&appId=${n.appId}`
            }
            return mapping
        })
    }

    async uploadConfigAsCode(files: File[]) {
        const zip = new JSZip()
        files.forEach(f => zip.file(f.path, f.content))

        const data = new FormData()
        data.append('file', zip.generateNodeStream())
    
        const response = await this.harness.privateApiPost('/gateway/api/setup-as-code/yaml/upsert-entities', data, {
            ...data.getHeaders(),
        })
        return response.data
    }
}
