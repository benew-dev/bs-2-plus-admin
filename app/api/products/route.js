import dbConnect from "@/backend/config/dbConnect";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import Category from "@/backend/models/category";
import Type from "@/backend/models/type";
import Product from "@/backend/models/product";
import User from "@/backend/models/user";
import APIFilters from "@/backend/utils/APIFilters";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Vérifier l'authentification
  await isAuthenticatedUser(req, NextResponse);

  // Vérifier le role
  authorizeRoles(NextResponse, "admin");

  // Connexion DB
  await dbConnect();

  const resPerPage = 2;
  const productsCount = await Product.countDocuments();

  const apiFilters = new APIFilters(Product.find(), req.nextUrl.searchParams)
    .search()
    .filter();

  let products = await apiFilters.query
    .populate("type", "nom slug isActive")
    .populate("category", "categoryName slug isActive");
  const filteredProductsCount = products.length;

  apiFilters.pagination(resPerPage);

  products = await apiFilters.query.clone();

  const result = filteredProductsCount / resPerPage;
  const totalPages = Number.isInteger(result) ? result : Math.ceil(result);

  const categories = await Category.find().populate(
    "type",
    "nom slug isActive",
  );
  const types = await Type.find();

  return NextResponse.json(
    {
      types,
      categories,
      totalPages,
      productsCount,
      filteredProductsCount,
      products,
    },
    {
      status: 200,
    },
  );
}

export async function PUT(req, { params }) {
  // Vérifier l'authentification
  await isAuthenticatedUser(req, NextResponse);

  // Vérifier le role
  authorizeRoles(NextResponse, "admin");

  const { id } = await params;
  await dbConnect();

  let product = await Product.findById(id);

  if (!product) {
    return NextResponse.json(
      { message: "Product not found." },
      { status: 404 },
    );
  }

  try {
    const body = await req.json();

    // Si le type ou la catégorie sont modifiés, faire les validations
    if (body.type || body.category) {
      // Vérifier le type si fourni
      if (body.type) {
        const type = await Type.findById(body.type);
        if (!type) {
          return NextResponse.json(
            {
              success: false,
              error: "Le type spécifié n'existe pas",
            },
            { status: 400 },
          );
        }

        if (!type.isActive) {
          return NextResponse.json(
            {
              success: false,
              error: "Impossible d'associer un produit à un type inactif",
            },
            { status: 400 },
          );
        }
      }

      // Vérifier la catégorie si fournie
      if (body.category) {
        const category = await Category.findById(body.category);
        if (!category) {
          return NextResponse.json(
            {
              success: false,
              error: "La catégorie spécifiée n'existe pas",
            },
            { status: 400 },
          );
        }

        if (!category.isActive) {
          return NextResponse.json(
            {
              success: false,
              error:
                "Impossible d'associer un produit à une catégorie inactive",
            },
            { status: 400 },
          );
        }

        // Vérifier la cohérence type/catégorie
        const typeToCheck = body.type || product.type;
        if (category.type.toString() !== typeToCheck.toString()) {
          return NextResponse.json(
            {
              success: false,
              error:
                "La catégorie sélectionnée n'appartient pas au type choisi",
            },
            { status: 400 },
          );
        }
      }
    }

    // Pseudo-code de la logique d'activation
    let warningMessage = null;

    // Vérifier si on veut activer le produit
    if (body.isActive === true) {
      // Récupérer le produit avec sa catégorie et son type
      const productWithRelations = await Product.findById(id)
        .populate("type")
        .populate("category");

      // Vérifier si le type est inactif
      if (!productWithRelations.type.isActive) {
        delete body.isActive;
        warningMessage = `Product updated successfully, but cannot be activated because the type "${productWithRelations.type.nom}" is inactive. Activate the type first.`;
      }
      // Vérifier si la catégorie est inactive
      else if (!productWithRelations.category.isActive) {
        delete body.isActive;
        warningMessage = `Product updated successfully, but cannot be activated because the category "${productWithRelations.category.categoryName}" is inactive. Activate the category first.`;
      }
    }

    // Mettre à jour le produit
    product = await Product.findByIdAndUpdate(id, body, {
      new: true,
    }).populate([
      { path: "type", select: "nom slug isActive" },
      { path: "category", select: "categoryName slug isActive" },
    ]);

    return NextResponse.json(
      { success: true, product, warning: warningMessage },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating product:", error);

    // Gérer les erreurs de validation
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Une erreur est survenue lors de la mise à jour du produit",
      },
      { status: 500 },
    );
  }
}
