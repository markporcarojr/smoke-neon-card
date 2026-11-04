"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonTypes = new Set(["siteSettings"]);
const PREFILLED_TEMPLATES = new Set(["menuCategory-in-menu", "menuItem-in-section"]);

export default defineConfig({
  basePath: "/studio",
  title: "Site editor",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      // Keep "Site settings" out of the "Create new" menu
      ...templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
      // Used by the "Add" buttons inside Food / Drinks (see sanity/structure.ts)
      {
        id: "menuCategory-in-menu",
        title: "Menu section",
        schemaType: "menuCategory",
        parameters: [{ name: "menu", type: "string" }],
        value: ({ menu }: { menu: string }) => ({ menu }),
      },
      {
        id: "menuItem-in-section",
        title: "Menu item",
        schemaType: "menuItem",
        parameters: [{ name: "sectionId", type: "string" }],
        value: ({ sectionId }: { sectionId: string }) => ({
          category: { _type: "reference", _ref: sectionId },
          available: true,
        }),
      },
    ],
  },
  document: {
    // The pre-filled templates only make sense from inside a section, not the global "Create" button
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter(({ templateId }) => !PREFILLED_TEMPLATES.has(templateId))
        : prev,
    // No duplicate or delete for the single settings document
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
