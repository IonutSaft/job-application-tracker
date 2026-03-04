import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "appliedAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const where: any = { userId: session.user.id };
    if (status && status !== "all") {
      where.status = status;
    }

    const applications = await prisma.application.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder === "desc" ? "desc" : "asc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Get applications error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { company, role, position, url, notes } = await request.json();

    if (!company || !role || !position) {
      return NextResponse.json(
        { error: "Company, role, and position are required" },
        { status: 400 },
      );
    }

    const application = await prisma.application.create({
      data: {
        company,
        role,
        position,
        url: url || null,
        notes: notes || null,
        userId: session.user.id,
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Create application error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
