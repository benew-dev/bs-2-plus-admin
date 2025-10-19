import { NextResponse } from "next/server";
import connectDB from "@/backend/config/dbConnect";
import {
  getTypeAnalytics,
  getTypeTrends,
  getTypeConversionRates,
} from "@/backend/pipelines/typePipelines";

export async function GET(req) {
  try {
    await connectDB();

    const [analytics, trends, conversion] = await Promise.all([
      getTypeAnalytics(),
      getTypeTrends(6),
      getTypeConversionRates(),
    ]);

    return NextResponse.json({
      success: true,
      analytics,
      trends,
      conversion,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Type Stats API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
