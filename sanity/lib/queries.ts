import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  businessName,
  logo,
  glowColor,
  showIntro,
  links[]{ _key, label, kind, url, email, emailSubject, featured }
}`);

export const MENU_QUERY = defineQuery(`*[_type == "menuCategory"] | order(orderRank) {
  _id,
  title,
  note,
  "items": *[_type == "menuItem" && references(^._id) && available != false] | order(orderRank) {
    _id, name, description, price
  }
}`);
