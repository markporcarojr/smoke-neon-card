import { defineQuery } from "next-sanity";

export const SETTINGS_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
  businessName,
  logo,
  glowColor,
  showIntro,
  links[]{ _key, label, kind, url, email, emailSubject, featured }
}`);

// Sections with no "Which menu" picked yet show up under Food
export const MENU_QUERY = defineQuery(`*[_type == "menuCategory" && coalesce(menu, "food") == $menu] | order(orderRank) {
  _id,
  title,
  note,
  "items": *[_type == "menuItem" && references(^._id) && available != false] | order(orderRank) {
    _id, name, description, price
  }
}`);

export const PROMOTIONS_QUERY = defineQuery(`*[_type == "promotion"] | order(orderRank) {
  _id, title, when, details, image, startDate, endDate
}`);
