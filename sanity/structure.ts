import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { map } from "rxjs";
import type { StructureBuilder, StructureResolver, StructureResolverContext } from "sanity/structure";

type MenuKind = "food" | "drinks";

// "Add" buttons that open a new document with its menu or section already filled in.
// The templates they use are defined in sanity.config.ts.
function addButton(S: StructureBuilder, title: string, schemaType: string, template: string, params: Record<string, string>) {
  return S.menuItem()
    .title(title)
    .showAsAction(true)
    .intent({ type: "create", params: [{ type: schemaType, template }, params] })
    .serialize();
}

// Food or Drinks: its sections (drag to order), then one list per section with that section's items (drag to order).
// Sections with no menu picked yet show up under Food, same as on the site.
function menuFolder(S: StructureBuilder, context: StructureResolverContext, menu: MenuKind, title: string) {
  const sectionsQuery = `*[_type == "menuCategory" && coalesce(menu, "food") == $menu && !(_id in path("drafts.**"))] | order(orderRank) { _id, title }`;

  return S.listItem()
    .id(menu)
    .title(title)
    .child(() =>
      context.documentStore.listenQuery(sectionsQuery, { menu }, {}).pipe(
        map((sections: { _id: string; title?: string }[]) =>
          S.list()
            .id(`${menu}-menu`)
            .title(title)
            .items([
              orderableDocumentListDeskItem({
                type: "menuCategory",
                id: `${menu}-sections`,
                title: "Sections (drag to reorder)",
                filter: 'coalesce(menu, "food") == $menu',
                params: { menu },
                createIntent: false,
                menuItems: [addButton(S, "Add section", "menuCategory", "menuCategory-in-menu", { menu })],
                S,
                context,
              }),
              S.divider(),
              ...sections.map((section) =>
                orderableDocumentListDeskItem({
                  type: "menuItem",
                  id: `items-${section._id}`,
                  title: section.title || "Untitled section",
                  filter: "category._ref == $sectionId",
                  params: { sectionId: section._id },
                  createIntent: false,
                  menuItems: [addButton(S, "Add item", "menuItem", "menuItem-in-section", { sectionId: section._id })],
                  S,
                  context,
                }),
              ),
            ]),
        ),
      ),
    );
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      orderableDocumentListDeskItem({ type: "promotion", title: "Promotions", S, context }),
      S.divider(),
      menuFolder(S, context, "food", "Food"),
      menuFolder(S, context, "drinks", "Drinks"),
      S.divider(),
      S.documentTypeListItem("menuItem").title("All menu items"),
    ]);
