// sanity/schemaTypes/post.js
export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "formTitle",
      title: "Form Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    },
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
    },
    {
      name: "keywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    },
    {
      name: "site",
      title: "Site",
      type: "string",
      description: "Which website this post belongs to",
      options: {
        list: [
          { title: "Dholera Times", value: "dholera-times" },
          { title: "BookMyAssets", value: "bookmyassets" },
          { title: "Dholera Insider", value: "dholera-insider" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the image (for accessibility)",
        },
        {
          name: "link",
          title: "Image Link",
          type: "url",
          description:
            "Optional link that the image should redirect to when clicked",
        },
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
    {
      name: "Location",
      title: "Location",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
    {
      name: "pdfFile",
      title: "PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
    },
  ],
};
