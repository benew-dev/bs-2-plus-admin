import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";

const EditHomePageDetails = dynamic(
  () => import("@/components/homepage/EditHomePageDetails"),
  {
    loading: () => <Loading />,
  },
);

import { getHomePageData } from "@/backend/utils/server-only-methods";

export const metadata = {
  title: "Dashboard - Modifier Home Page",
  description: "Modifier le contenu de la page d'accueil",
};

const EditHomePagePage = async () => {
  const homePageData = await getHomePageData();

  // Si aucune page d'accueil n'existe, rediriger vers la page de création
  if (!homePageData || !homePageData.title) {
    redirect("/admin/homepage/new");
  }

  return <EditHomePageDetails data={homePageData} />;
};

export default EditHomePagePage;
