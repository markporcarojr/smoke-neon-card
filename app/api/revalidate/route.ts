import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const TAGS = new Set(["siteSettings", "menuCategory", "menuItem"]);

// Sanity calls this when content is published (see README → "Make edits go live").
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }
  if (!body?._type || !TAGS.has(body._type)) {
    return NextResponse.json({ message: "Nothing to revalidate", body }, { status: 400 });
  }

  revalidateTag(body._type, "max");
  return NextResponse.json({ revalidated: body._type });
}
