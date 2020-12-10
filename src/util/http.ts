import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { URL } from 'url'

interface Headers {
    [key: string]: string | boolean | number
}
type Params = Headers

interface RequestMetadata {
    http: {
        request: {
            query: Params,
            headers: Headers,
            method?: string,
            url: string,
        },
        response: {
            headers: Headers,
            status: number,
            statusText: string,
        },
    }
}

type HttpResult<T> = T & RequestMetadata;

type ExposedAxiosConfigProps = Pick<AxiosRequestConfig,
    'baseURL' | 'url' | 'timeout' | 'responseType' |
    'transformRequest' | 'transformResponse' | 'method' |
    'data' >
export interface HttpClientConfg extends ExposedAxiosConfigProps {
    headers?: Headers,
    params?: Params,
}

type RequestInterceptor = (config: AxiosRequestConfig) => Promise<AxiosRequestConfig> | void
type ResponseInterceptor = (response: AxiosResponse<any>) => Promise<AxiosResponse<any>> | void

export default class HttpClient {
    protected client: AxiosInstance

    constructor(config?: HttpClientConfg) {
        this.client = axios.create(config)
    }

    async request<T = any>(url: string, options?: HttpClientConfg): Promise<HttpResult<T>> {
        options = options || {}
        options.url = url

        try {
            const response = await this.client.request<HttpResult<T>>(options)
            const result = response.data
            result.http = {
                request: {
                    url: new URL(response.config.url || '/', response.config.baseURL).href,
                    method: response.config.method,
                    query: response.config.params,
                    headers: response.config.headers,
                },
                response: {
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                },
            }
            return result
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request)
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message)
            }
            // console.log(error.config)
            throw error
        }
    }

    async get<T = any>(url: string, params?:  Params, options?: HttpClientConfg): Promise<HttpResult<T>> {
        options = options || {}
        options.params = options.params || params
        const response = await this.request<T>(url, options)
        return response
    }

    async post<T = any>(url: string, data?:  any, options?: HttpClientConfg): Promise<HttpResult<T>> {
        options = options || {}
        options.method = 'post'
        options.data = data
        const response = await this.request<T>(url, options)
        return response
    }

    async put<T = any>(url: string, data?:  any, options?: HttpClientConfg): Promise<HttpResult<T>> {
        options = options || {}
        options.method = 'put'
        options.data = data
        const response = await this.request<T>(url, options)
        return response
    }

    async delete<T = any>(url: string, data?:  any, options?: HttpClientConfg): Promise<HttpResult<T>> {
        options = options || {}
        options.method = 'delete'
        const response = await this.request<T>(url, options)
        return response
    }

    onRequest(handler: RequestInterceptor) {
        const interceptor = this.client.interceptors.request.use(async conf => {
            const result = await handler(conf)
            return result || conf
        })
        return {
            eject: () => this.client.interceptors.response.eject(interceptor),
        }
    }

    onResponse(handler: ResponseInterceptor) {
        const interceptor = this.client.interceptors.response.use(async response => {
            const result = await handler(response)
            return result || response
        })
        return {
            eject: () => this.client.interceptors.response.eject(interceptor),
        }
    }
}