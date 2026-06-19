import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const { tag } = await request.json();

  try {
    if (tag) {
      revalidateTag(tag, 'default');
    } else {
      revalidateTag("posts", 'default');
      revalidateTag("navigation", 'default');
      revalidateTag("footer", 'default');
      revalidateTag("announcements", 'default');
    }
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: String(err) }, { status: 500 });
  }
}
