import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Shown big behind the buttons. A PNG with a transparent background looks best.",
    }),
    defineField({
      name: "glowColor",
      title: "Neon glow color",
      type: "string",
      description: "Hex color for the button outlines and glow, like #e9b14c.",
      initialValue: "#e9b14c",
      validation: (rule) =>
        rule.regex(/^#([0-9a-fA-F]{6})$/, { name: "hex color" }).warning("Use a 6-digit hex color like #e9b14c"),
    }),
    defineField({
      name: "showIntro",
      title: "Play the smoke intro",
      type: "boolean",
      description: "Turn off to skip straight to the buttons.",
      initialValue: true,
    }),
    defineField({
      name: "links",
      title: "Buttons",
      description: "Drag to reorder. These show up under the logo, top to bottom.",
      type: "array",
      of: [
        defineArrayMember({
          name: "linkButton",
          title: "Button",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Button text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "kind",
              title: "What it does",
              type: "string",
              options: {
                list: [
                  { title: "Opens a website", value: "url" },
                  { title: "Starts an email", value: "email" },
                  { title: "Opens the food & drink menu", value: "menu" },
                ],
                layout: "radio",
              },
              initialValue: "url",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Web address",
              type: "url",
              hidden: ({ parent }) => parent?.kind !== "url",
              validation: (rule) =>
                rule.custom((value, ctx) => {
                  const parent = ctx.parent as { kind?: string } | undefined;
                  return parent?.kind === "url" && !value ? "Add the web address" : true;
                }),
            }),
            defineField({
              name: "email",
              title: "Email address",
              type: "string",
              hidden: ({ parent }) => parent?.kind !== "email",
              validation: (rule) =>
                rule.custom((value, ctx) => {
                  const parent = ctx.parent as { kind?: string } | undefined;
                  if (parent?.kind !== "email") return true;
                  if (!value) return "Add the email address";
                  return /^\S+@\S+\.\S+$/.test(value) ? true : "That doesn't look like an email address";
                }),
            }),
            defineField({
              name: "emailSubject",
              title: "Email subject line",
              type: "string",
              hidden: ({ parent }) => parent?.kind !== "email",
              initialValue: "Event inquiry",
            }),
            defineField({
              name: "featured",
              title: "Make this button stand out",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", kind: "kind", url: "url", email: "email", featured: "featured" },
            prepare: ({ title, kind, url, email, featured }) => ({
              title: `${title ?? "Untitled"}${featured ? " ★" : ""}`,
              subtitle: kind === "email" ? email : kind === "menu" ? "Food & drink menu" : url,
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
