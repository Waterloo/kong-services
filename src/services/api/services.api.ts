import api from './client'
import type { Service } from '@/types/models/services'

/** Fetch the list of services from the API
 * @param abortController Optional AbortController to cancel the request
 * @returns Promise resolving to an array of Service objects
 */
export function getServices(abortController?: AbortController): Promise<Service[]> {
  return api.get('/api/services', { signal: abortController?.signal }).then((response) => response.data)
}
