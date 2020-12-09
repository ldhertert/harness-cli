import { Harness } from './harness-api-client'
import traverse from 'traverse'
import * as _ from 'lodash'
import { File } from '../../util/filesystem'
import FormData from 'form-data'
import JSZip = require('jszip');

export interface ConfigAsCodeFile {
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

        // For some reason the applications folder is not getting populated with children when authenticating with api key
        // const applications = await this.harness.applications.list()
        // const appNodes = applications.map(a => { 
        //    return { appId: a.id }
        // })
        const appNodes = _.filter(traverse(root).nodes(), n => n && n.shortClassName === 'Application' && n.appId)
        for (const node of appNodes) {
            const app = await this.harness.privateApiGet(`/gateway/api/setup-as-code/yaml/application?appId=${node.appId}`)
            yaml = yaml.concat(this.getYamlNodes(app))
        }

        return yaml
    }

    async getFileContent(file: ConfigAsCodeFile): Promise<File> {
        const path = file.contentUrl
        const content = await this.harness.privateApiGet(path)
        return {
            path: file.path,
            content: content.resource.yaml,
        }
    }

    async delete(files: ConfigAsCodeFile[]) {
        const path = `gateway/api/setup-as-code/yaml/delete-entities?filePaths=${files.map(f => f.path.replace(' ', '%20')).join(',')}`
        const response = await this.harness.privateApiDelete(path)
        return response.resource
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

    async uploadConfigAsCodeZip(files: File[]) {
        const zip = new JSZip()
        files.forEach(f => zip.file(f.path, f.content))

        /*
        zip
            .generateNodeStream({type: 'nodebuffer', streamFiles: true})
            .pipe(fs.createWriteStream('out.zip'))
            .on('finish', function () {
                // JSZip generates a readable stream with a "end" event,
                // but is piped here in a writable stream which emits a "finish" event.
                console.log('out.zip written.')
            })
        */

        const data = new FormData()
        data.append('file', zip.generateNodeStream())
    
        try {
            const response = await this.harness.privateApiPost('/gateway/api/setup-as-code/yaml/upsert-entities', data, {
                ...data.getHeaders(),
            })
            return response
        } catch (err) {
            return err
        }        
    }

    async upsertFile(file: File) {
        const data = new FormData()
        data.append('yamlContent', file.content)
    
        try {
            const response = await this.harness.privateApiPost(`/gateway/api/setup-as-code/yaml/upsert-entity?yamlFilePath=${file.path}`, data, {
                ...data.getHeaders(),
                accept: 'application/json, text/plain, */*',
            }, { timeout: 2 * 60 * 1000 }) // 2 min timeout
            return response
        } catch (err) {
            return err
        }        
    }
}
