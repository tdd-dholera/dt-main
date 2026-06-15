// app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (type === "post") {
    revalidatePath("/sitemap.xml");
  }

  revalidateTag("redirect");
  return NextResponse.json({ revalidated: true });
}
