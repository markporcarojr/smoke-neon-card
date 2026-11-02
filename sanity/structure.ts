import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// Site settings is a single document; menu sections and items are drag-to-reorder lists.
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      orderableDocumentListDeskItem({ type: "menuCategory", title: "Menu sections", S, context }),
      orderableDocumentListDeskItem({ type: "menuItem", title: "Menu items", S, context }),
    ]);
