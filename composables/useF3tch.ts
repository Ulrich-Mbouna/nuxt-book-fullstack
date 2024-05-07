import { hash } from 'ohash'
type Options = {
  key: string,
  baseURL: string
}
export default (path: string, options:Options = <Options>{} ) => {
  const runtimeConfig = useRuntimeConfig()
  const key = options && options.key ? { key: hash(Date.now) } : {}
  return useFetch(path, {
    ...options,
    ...key,
    baseURL: options.baseURL ?? runtimeConfig.public.apiBaseUrl,
    async onResponse({ request, response, options }) {
      response._data = response._data.data ?? response._data
    },
    onResponseError({ response }) {
      return new Promise((resolve, reject) => {
        response.ok ? resolve() : reject({
          statusCode: response.status || 500,
          name: response._data.name || 'Error',
          message: response._data.message,
          data: response._data
          })
        })
    }
  })
}
