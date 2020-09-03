import * as YAML from 'js-yaml'

export function fromYaml(yaml: string): any {
    return YAML.safeLoad(yaml)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function toYaml(obj: any): string {
    return YAML.safeDump(obj)
}