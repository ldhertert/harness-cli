export enum VariableType {
    String = 'String',
    Boolean = 'Boolean',
    Number = 'Number',
    Object = 'Object',
    HarnessResource = 'HarnessResource',
}

export interface Variable {
    name: string;
    description?: string;
    type: VariableType;
    defaultValue?: unknown;
    required: boolean;
}
