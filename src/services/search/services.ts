import type { Service } from '@/types/models/services'
import Fuse from 'fuse.js'

const servicesSearch = new Fuse<Service>([], {
  threshold: 0.4,
  keys: [
    { name: 'name', weight: 1.5 },
    { name: 'description', weight: 0.5 },
    // { name: 'versions.developer.name', weight: 0.5 }
  ],
})

export function addServicesToIndex(services: Service[]): void {
  servicesSearch.setCollection(services)
}

export function searchServices(query: string): Service[] {

  return servicesSearch.search(query).map((result) => result.item)
}