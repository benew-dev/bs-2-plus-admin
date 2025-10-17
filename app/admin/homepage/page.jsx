import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import Link from "next/link";

const HomePage = dynamic(() => import("@/components/homepage/HomePage"), {
  loading: () => <Loading />,
});

import { getHomePageData } from "@/backend/utils/server-only-methods";

export const metadata = {
  title: "Home Page - Dashboard Admin",
  description: "Gérer le contenu de la page d'accueil",
};

const HomePagePage = async () => {
  const homePageData = await getHomePageData();

  // Vérifier si une page d'accueil existe déjà
  const hasHomePage = homePageData && homePageData.title;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Gestion de la Page d'Accueil
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Personnalisez le contenu de votre page d'accueil
          </p>
        </div>
        {!hasHomePage && (
          <Link
            href="/admin/homepage/new"
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg font-semibold text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Ajouter Home Page
          </Link>
        )}
      </div>

      {hasHomePage && (
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-3 sm:p-4">
          <div className="flex gap-2 sm:gap-3">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-blue-800 mb-1">
                Information
              </p>
              <p className="text-xs sm:text-sm text-blue-700">
                Une seule page d'accueil peut exister. Pour modifier le contenu,
                utilisez le bouton "Modifier" ci-dessous.
              </p>
            </div>
          </div>
        </div>
      )}

      <HomePage data={homePageData} />
    </div>
  );
};

export default HomePagePage;
