import { Variable } from './variables'
import { Step } from './steps'
import { File } from '../../util/filesystem'

export interface TemplateRef {
    source: string
}

export class Template {
    name: string
    description?: string
    templateVersion?: string
    schemaVersion?: string
    author?: string
    parentTemplate?: TemplateRef
    sourceFiles: File[]
    variables: Variable[]
    steps: Step[]

    public constructor(name: string) {
        this.name = name
        this.sourceFiles = []
        this.variables = []
        this.steps = []
    }
}
