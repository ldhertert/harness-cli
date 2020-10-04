import axios from 'axios'

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

        if (result.data.errors) {
            throw new Error(result.data.errors[0].message)
        }
        return result.data
    }
}
