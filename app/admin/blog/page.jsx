import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const BlogList = dynamic(() => import("@/components/blog/BlogList"), {
  loading: () => <Loading />,
});

import { getPublishedArticles } from "@/backend/utils/server-only-methods";

export const metadata = {
  title: "Blog - Nos Articles",
  description: "Découvrez nos derniers articles et actualités",
};

const BlogPage = async ({ searchParams }) => {
  const params = await searchParams;
  const page = parseInt(params?.page) || 1;
  const tag = params?.tag || null;
  const articlesData = await getPublishedArticles(page, 9, tag);

  return <BlogList data={articlesData} currentTag={tag} />;
};

export default BlogPage;
