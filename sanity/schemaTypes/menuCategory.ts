import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu section",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "menuCategory" }),
    defineField({
      name: "title",
      title: "Section name",
      type: "string",
      description: "Like Cocktails, Small Plates or Beer.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Note under the heading",
      type: "string",
      description: "Optional. Like \"Happy hour 3–6pm, $2 off\".",
    }),
  ],
});
