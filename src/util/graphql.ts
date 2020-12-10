import HttpClient, { HttpClientConfg, RequestInterceptor, ResponseInterceptor } from './http'

export interface GraphQLRequest {
    query: string,
    variables?: any,
}

interface ErrorLocation {
    line: number,
    column: number,
}

export interface GraphQLErrorResponse {
    message: string,
    locations: ErrorLocation[],
}

export interface GraphQLResponse {
    data: any,
    errors?: GraphQLErrorResponse[],
}

export class GraphQLError extends Error {
    request: GraphQLRequest
    response: GraphQLResponse

    constructor(request: GraphQLRequest, response: GraphQLResponse) {
        const message = response.errors?.map((e: { message: string }) => e.message).join('\n') || 'Unknown GraphQL error'
        super(message)
        this.request = request
        this.response = response
    }
}

export class GraphQL {
    protected http: HttpClient;
    protected endpoint: string;

    constructor(endpoint: string, options: HttpClientConfg) {
        this.endpoint = endpoint
        options.headers = options.headers || {}
        options.headers['content-type'] = options.headers['content-type']  || 'application/json'
        this.http = new HttpClient(options)
    }

    async execute(query: string, variables?: any, options?: HttpClientConfg) {
        const data: GraphQLRequest = {
            query: query,
            variables: variables,
        }

        const result = await this.http.post<GraphQLResponse>(this.endpoint, data, options)
        if (result.errors) {
            throw new GraphQLError(data, result)
        }
        return result.data
    }

    onRequest(handler: RequestInterceptor) {
        return this.http.onRequest(handler)
    }

    onResponse(handler: ResponseInterceptor) {
        return this.http.onResponse(handler)
    }
}