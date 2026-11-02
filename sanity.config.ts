"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const singletonTypes = new Set(["siteSettings"]);

export default defineConfig({
  basePath: "/studio",
  title: "Site editor",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: {
    types: schemaTypes,
    // Keep "Site settings" from showing up in the "Create new" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // No duplicate or delete for the single settings document
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
