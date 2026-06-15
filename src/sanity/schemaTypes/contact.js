import { ContactView } from "@/app/(main)/studio/components/ContactView"

export default {
    name: 'contact',
    title: 'Contact Submissions',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'subject',
        title: 'Subject',
        type: 'string',
      },
      {
        name: 'message',
        title: 'Message',
        type: 'text',
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        initialValue: 'pending',
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'In Review', value: 'in-review' },
            { title: 'Processing', value: 'processing' },
            { title: 'Completed', value: 'completed' },
            { title: 'Archived', value: 'archived' }
          ],
          layout: 'radio' // You can change this to 'dropdown' if you prefer
        }
      },
      {
        name: 'statusUpdateDate',
        title: 'Status Last Updated',
        type: 'datetime',
      },
      {
        name: 'statusNotes',
        title: 'Status Notes',
        type: 'text',
        description: 'Internal notes about this submission'
      },
      {
        name: 'submittedAt',
        title: 'Submitted At',
        type: 'datetime',
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'status',
        email: 'email'
      },
      prepare(selection) {
        const {title, subtitle, email} = selection
        return {
          title: `${title} (${email})`,
          subtitle: `Status: ${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}`
        }
      }
    },
    orderings: [
      {
        title: 'Submission Date, New',
        name: 'submittedAtDesc',
        by: [
          {field: 'submittedAt', direction: 'desc'}
        ]
      },
      {
        title: 'Status',
        name: 'statusAsc',
        by: [
          {field: 'status', direction: 'asc'}
        ]
      }
    ]
  }