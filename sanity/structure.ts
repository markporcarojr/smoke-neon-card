import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureResolver } from "sanity/structure";

// Site settings is a single document; everything else is a drag-to-reorder list.
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      orderableDocumentListDeskItem({ type: "promotion", title: "Promotions", S, context }),
      S.divider(),
      orderableDocumentListDeskItem({ type: "menuCategory", title: "Menu sections", S, context }),
      orderableDocumentListDeskItem({ type: "menuItem", title: "Menu items", S, context }),
    ]);
