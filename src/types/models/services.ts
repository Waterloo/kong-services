export interface Service {
  id: string
  name: string
  description: string
  type: string
  published: boolean
  configured: boolean
  versions: Version[]
  metrics?: Metrics
}

export interface Metrics {
  latency: number
  uptime: number
  requests: number
  errors: number
}

export interface Version {
  id: string
  name: string
  description: string
  developer: Developer
  updated_at: Date
}

export interface Developer {
  id: string
  name: string
  email: string
  avatar: string
}