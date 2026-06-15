import { defineField, defineType } from "sanity";

export default defineType({
  name: "leadFormBlock",
  title: "Lead Form Block",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Get Dholera Project Details",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      initialValue: "Get brochure, price details, location map, and site visit plan."
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Get A Call Back",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "helperText",
      title: "Helper Text",
      type: "string",
      initialValue: "Your details are safe. Our team will call you shortly."
    }),
    defineField({
      name: "sourceLabel",
      title: "Lead Source Label",
      type: "string",
      initialValue: "Blog Lead Form"
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description"
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Lead Form Block",
        subtitle: subtitle || "Blog enquiry form"
      };
    }
  }
});