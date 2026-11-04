import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const promotion = defineType({
  name: "promotion",
  title: "Promotion",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "promotion" }),
    defineField({
      name: "title",
      title: "Headline",
      type: "string",
      description: "Like Half-Price Martinis or Trivia Night.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "when",
      title: "When",
      type: "string",
      description: "Like Every Tuesday, 4–7pm. Optional.",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Picture",
      type: "image",
      options: { hotspot: true },
      description: "Optional.",
    }),
    defineField({
      name: "startDate",
      title: "Show starting",
      type: "date",
      description: "Optional. Leave empty to show it right away.",
    }),
    defineField({
      name: "endDate",
      title: "Hide after",
      type: "date",
      description: "Optional. It disappears on its own the day after this. Leave empty for ongoing deals.",
      validation: (rule) =>
        rule.custom((end, ctx) => {
          const start = (ctx.document as { startDate?: string } | undefined)?.startDate;
          return start && end && end < start ? "This is before the start date" : true;
        }),
    }),
  ],
  preview: {
    select: { title: "title", when: "when", end: "endDate", media: "image" },
    prepare: ({ title, when, end, media }) => ({
      title,
      subtitle: [when, end ? `until ${end}` : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
