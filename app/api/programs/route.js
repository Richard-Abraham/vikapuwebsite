import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const programs = [
      {
        id: 1,
        title: "Youth Basketball",
        description: "For ages 8-12, focusing on fundamentals",
        duration: "8 weeks",
        price: "$299"
      },
      {
        id: 2,
        title: "Elite Training",
        description: "Advanced skills for competitive players",
        duration: "12 weeks",
        price: "$499"
      }
    ];

    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    );
  }
} 