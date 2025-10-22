import { ServiceStatus, SERVICE_STATUS_CONFIG, type StatusConfig } from '@/types/models/services'

/**
 * Determines the service status based on published and configured flags
 *
 * @param published - Whether the service is published
 * @param configured - Whether the service is configured
 * @returns ServiceStatus enum value
 */
export function getServiceStatus(
  published: boolean,
  configured: boolean,
): ServiceStatus {
  if (published && configured) {
    return ServiceStatus.PUBLISHED
  }

  if (!published && configured) {
    return ServiceStatus.UNPUBLISHED
  }

  return ServiceStatus.NOT_CONFIGURED
}

/**
 * Gets the status configuration for a service
 *
 * @param published - the service is published
 * @param configured - the service is configured
 * @returns The status configuration object
 */
export function getStatusConfig(
  published: boolean,
  configured: boolean,
): StatusConfig {
  const status = getServiceStatus(published, configured)
  return SERVICE_STATUS_CONFIG[status]
}
