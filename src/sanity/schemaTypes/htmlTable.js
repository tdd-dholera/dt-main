// schemas/htmlTable.js
export default {
  name: 'htmlTable',
  title: 'HTML Table',
  type: 'object',
  fields: [
    {
      name: 'html',
      title: 'HTML Table Code',
      type: 'text',
      rows: 10,
      description: 'Paste your complete HTML table code including <table>, <tr>, <td> tags',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      html: 'html'
    },
    prepare(selection) {
      const {html} = selection
      return {
        title: 'HTML Table',
        subtitle: html ? `Table: ${html.substring(0, 30)}...` : 'No HTML provided'
      }
    }
  }
}

