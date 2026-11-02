import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "Menu item",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "menuItem" }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Menu section",
      type: "reference",
      to: [{ type: "menuCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Just the number, like 12 or 12.50.",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "available",
      title: "Available",
      type: "boolean",
      description: "Turn off when you're out of it. It hides from the menu without being deleted.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "name", price: "price", available: "available", section: "category.title" },
    prepare: ({ title, price, available, section }) => ({
      title: `${available === false ? "(86'd) " : ""}${title ?? "Untitled"}`,
      subtitle: [section, typeof price === "number" ? `$${price}` : null].filter(Boolean).join(" · "),
    }),
  },
});
