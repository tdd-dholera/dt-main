export default {
  title: 'Video blog post',
  name: 'videoBlogPost',
  type: 'document',
  fields: [
    {title: 'Title', name: 'title', type: 'string'},
    {
      title: 'Video file',
      name: 'video',
      type: 'mux.video',
    },
  ],
}