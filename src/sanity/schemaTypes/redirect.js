// sanity/schemas/redirect.js
export default {
  name: 'redirect',
  title: 'Redirects',
  type: 'document',
  fields: [
    {
      name: 'source',
      title: 'Source Path',
      type: 'string',
      description: 'e.g. /old-page',
      validation: Rule => Rule.required()
    },
    {
      name: 'destination',
      title: 'Destination Path',
      type: 'string',
      description: 'e.g. /new-page',
      validation: Rule => Rule.required()
    },
    {
      name: 'permanent',
      title: 'Permanent (301)?',
      type: 'boolean',
      initialValue: false
    },
    // ✅ Ye field add karo
    {
      name: 'site',
      title: 'Site',
      type: 'string',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'BookMyAssets', value: 'bookmyassets' },
          { title: 'Dholera Times', value: 'dholera-times' },
          { title: 'Dholera Insider', value: 'dholera-insider' },
        ]
      }
    }
  ]
}