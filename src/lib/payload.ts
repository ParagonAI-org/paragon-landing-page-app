import config from '@payload-config'
import { getPayload as getPayloadLocal } from 'payload'

/**
 * Utility to get the Payload instance.
 * This is used for the Local API on the server.
 */
export const getPayload = async () => {
  return await getPayloadLocal({ config })
}
