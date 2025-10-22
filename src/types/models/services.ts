import type { Component } from 'vue'
import { CheckSmallIcon, CloseIcon, ProgressIcon } from '@kong/icons'
import {
  KUI_COLOR_BACKGROUND_SUCCESS,
  KUI_COLOR_BACKGROUND_WARNING_WEAK,
  KUI_COLOR_BACKGROUND_NEUTRAL,
} from '@kong/design-tokens'

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
  updated_at: string
}

export interface Developer {
  id: string
  name: string
  email: string
  avatar: string
}



export enum ServiceStatus {
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
  NOT_CONFIGURED = 'not_configured',
}

export interface StatusConfig {
  icon: Component
  color: string
  text: string
  badgeText?: string
}

export const SERVICE_STATUS_CONFIG: Record<ServiceStatus, StatusConfig> = {
  [ServiceStatus.PUBLISHED]: {
    icon: CheckSmallIcon,
    color: KUI_COLOR_BACKGROUND_SUCCESS,
    text: 'Published to portal',
  },
  [ServiceStatus.UNPUBLISHED]: {
    icon: CloseIcon,
    color: KUI_COLOR_BACKGROUND_NEUTRAL,
    text: 'Unpublished',
  },
  [ServiceStatus.NOT_CONFIGURED]: {
    icon: ProgressIcon,
    color: KUI_COLOR_BACKGROUND_WARNING_WEAK,
    text: 'Not configured with runtime yet',
  },
}