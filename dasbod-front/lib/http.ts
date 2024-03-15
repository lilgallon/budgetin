import process from "process"
import axios, { AxiosInstance } from "axios"

/**
 * Usage Example:
 *
 * import http from 'lib/http.ts';
 *
 * const TestComponent = () => {
 *   const { getTokenSilently } = useAuth0();
 *
 *   const getObjectsFromAPI = async () => {
 *     const token = await getTokenSilently();
 *
 *     const response = await http
 *        .authorized(token)
 *        .get('/api/objects/');
 *
 *     // ...
 *   };
 * };
 */

export namespace http {
  const instance: AxiosInstance = axios.create({
    baseURL: process.env.API_SERVER_URL,
    timeout: 1000,
  })

  export const authorized = (token: string) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    return instance
  }
}
