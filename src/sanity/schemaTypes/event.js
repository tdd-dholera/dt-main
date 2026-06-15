// sanity/schemaTypes/event.js
export default {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Title of the event',
      },
      {
        name: 'eventName',
        title: 'Event Name',
        type: 'string',
        description: 'Name of the event',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'eventName',
          maxLength: 96,
        },
      },
      {
        name: 'dateOfEvent',
        title: 'Date of Event',
        type: 'date',
        description: 'When is the event taking place',
      },
      {
        name: 'timeOfEvent',
        title: 'Time of Event',
        type: 'string',
        description: 'What time the event starts',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
        description: 'Where the event is taking place',
      },
      {
        name: 'mapsLink',
        title: 'Maps Link',
        type: 'url',
        description: 'Google Maps or other map service link to the event location',
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'author' }],
      },
      {
        name: 'description',
        title: 'Description',
        type: 'blockContent',
        description: 'Event details and description',
      },
      {
        name: 'organizer',
        title: 'Organizer',
        type: 'blockContent',
        to: [{ type: 'string' }],
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'category' } }],
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
      },
      {
        name: 'eventMaterials',
        title: 'Event Materials',
        type: 'file',
        options: {
          accept: '.pdf,.doc,.docx,.ppt,.pptx',
        },
      },
    ],
    preview: {
      select: {
        title: 'eventName',
        subtitle: 'dateOfEvent',
        media: 'mainImage',
      },
    },
  };