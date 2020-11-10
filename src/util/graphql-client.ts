import axios, { AxiosResponse } from 'axios'

export class GraphQLError extends Error {
    errors: any
    data: any
    variables: any
    query: string

    constructor(result: AxiosResponse<any>, query: string, variables?: any) {
        const message = result.data.errors.map((e: { message: string }) => e.message).join('\n')
        super(message)
        this.errors = result.data.errors
        this.data = result.data.data
        this.query = query
        this.variables = variables
    }
}

export class ResourceConflictError extends GraphQLError {
}

export class GraphQLClient {
    endpoint: string;
    headers: any;
    constructor(endpoint: string, headers?: any) {
        this.endpoint = endpoint
        this.headers = headers || {}
    }

    async execute(query: string, variables?: any) {
        const data = JSON.stringify({
            query: query,
            variables: variables || {},
        })

        const result = await axios.post(this.endpoint, data, {
            headers: this.headers,
        })

        // Seeing weird behavior when creating an application the results in
        // both a result and an (innacurate) error
        if (result.data.errors) {
            throw new GraphQLError(result, query, variables)
        }
        return result.data
    }
}
