import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Advancing Intelligence. Architecting the Future.',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      defaultValue:
        'At ParagonAI, we are pioneering autonomous neural systems designed to scale human potential, secure critical infrastructure, and solve the world’s most complex challenges through deep-tech innovation.',
    },
    {
      name: 'primaryButtonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Explore Our Research',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      required: true,
      defaultValue: '/research',
    },
    {
      name: 'secondaryButtonLabel',
      type: 'text',
      required: true,
      defaultValue: 'Join the Mission',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      required: true,
      defaultValue: '/join',
    },
  ],
}
