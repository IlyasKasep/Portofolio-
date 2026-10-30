import { NextResponse } from "next/server";
import { getGithubContributions } from "@/lib/github-contributions";

export const revalidate = 3600;

export async function GET() {
  try {
    const data = await getGithubContributions("IlyasKasep");
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Failed to get GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 },
    );
  }
}
