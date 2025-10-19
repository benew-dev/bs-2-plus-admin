"use client";

import SimpleBarChart from "../charts/SimpleBarChart";
import SimpleDonutChart from "../charts/SimpleDonutChart";

export default function TypePerformance({ data }) {
  const barData = data.analytics.map((type) => ({
    name: type._id,
    value: type.totalRevenue,
  }));

  const donutData = data.analytics.map((type) => ({
    name: type._id,
    value: type.totalOrders,
  }));

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-6">📊 Performance par Type</h2>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {data.analytics.map((type, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg"
          >
            <p className="text-sm text-gray-600">{type._id}</p>
            <p className="text-2xl font-bold text-blue-600">
              {(type.totalRevenue / 1000).toFixed(0)}k FDj
            </p>
            <p className="text-xs text-gray-500">
              {type.totalOrders} commandes
            </p>
            <p className="text-xs text-green-600 mt-1">
              Panier moyen: {Math.round(type.avgOrderValue)} FDj
            </p>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-2 gap-6">
        <SimpleBarChart title="Revenus par Type" data={barData} />
        <SimpleDonutChart title="Répartition des Commandes" data={donutData} />
      </div>

      {/* Taux de conversion */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Taux de Conversion par Type
        </h3>
        <div className="space-y-2">
          {data.conversion.map((type, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm font-medium">{type.type}</span>
              <span
                className={`text-sm font-bold ${
                  type.conversionRate >= 80
                    ? "text-green-600"
                    : type.conversionRate >= 60
                      ? "text-orange-600"
                      : "text-red-600"
                }`}
              >
                {type.conversionRate.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
