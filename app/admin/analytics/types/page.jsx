import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

const TypePerformance = dynamic(
  () => import("@/components/dashboard/TypePerformance"),
  { loading: () => <Loading /> },
);

export const metadata = {
  title: "Analytics par Type - Dashboard Admin",
  description: "Performance détaillée par type de produit",
};

async function getTypeStats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/type-stats`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function TypeAnalyticsPage() {
  const data = await getTypeStats();

  if (!data?.success) {
    return (
      <div className="p-6">
        <p className="text-red-600">Erreur de chargement des données</p>
      </div>
    );
  }

  return <TypePerformance data={data} />;
}
