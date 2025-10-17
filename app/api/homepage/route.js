import { NextResponse } from "next/server";
import connectDB from "@/backend/config/dbConnect";
import HomePage from "@/backend/models/homepage";

// GET - Récupérer la page d'accueil
export async function GET(req) {
  try {
    await connectDB();

    const homePage = await HomePage.findOne().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: homePage,
    });
  } catch (error) {
    console.error("HomePage GET Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// POST - Créer une page d'accueil (uniquement si aucune n'existe)
export async function POST(req) {
  try {
    await connectDB();

    // Vérifier si une page d'accueil existe déjà
    const existingHomePage = await HomePage.findOne();

    if (existingHomePage) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Une page d'accueil existe déjà. Veuillez la modifier au lieu d'en créer une nouvelle.",
        },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { title, subtitle, text, image } = body;

    // Validation
    if (!title || !subtitle || !text || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "Tous les champs sont requis",
        },
        { status: 400 },
      );
    }

    // Créer la page d'accueil
    const homePage = await HomePage.create({
      title,
      subtitle,
      text,
      image,
    });

    return NextResponse.json({
      success: true,
      message: "Page d'accueil créée avec succès",
      data: homePage,
    });
  } catch (error) {
    console.error("HomePage POST Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// PUT - Mettre à jour la page d'accueil
export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, subtitle, text, image } = body;

    // Validation
    if (!title || !subtitle || !text || !image) {
      return NextResponse.json(
        {
          success: false,
          message: "Tous les champs sont requis",
        },
        { status: 400 },
      );
    }

    const homePage = await HomePage.findOneAndUpdate(
      {},
      {
        title,
        subtitle,
        text,
        image,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!homePage) {
      return NextResponse.json(
        {
          success: false,
          message: "Page d'accueil non trouvée",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Page d'accueil mise à jour avec succès",
      data: homePage,
    });
  } catch (error) {
    console.error("HomePage PUT Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
