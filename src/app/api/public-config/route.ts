import { NextResponse } from "next/server";
import { getFirebaseConfigStatus } from "@/lib/firebase/serverConfig";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = getFirebaseConfigStatus();
  if (!status.configured || !status.firebase) {
    return NextResponse.json({
      configured: false,
      missingRequired: status.missingRequired,
      missingRecommended: status.missingRecommended,
    });
  }

  return NextResponse.json({
    configured: true,
    firebase: status.firebase,
  });
}
