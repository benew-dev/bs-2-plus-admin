// backend/pipelines/typePipelines.js
import Order from "../models/order";

export const getTypeAnalytics = async (month = null, year = null) => {
  const pipeline = [];

  const matchStage = { paymentStatus: "paid" };
  if (month && year) {
    const { startDate, endDate } = getMonthDateRange(month, year);
    matchStage.createdAt = { $gte: startDate, $lt: endDate };
  }

  pipeline.push(
    { $match: matchStage },
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: "$orderItems.type",
        totalRevenue: {
          $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] },
        },
        totalOrders: { $sum: 1 },
        totalQuantity: { $sum: "$orderItems.quantity" },
        avgOrderValue: {
          $avg: { $multiply: ["$orderItems.price", "$orderItems.quantity"] },
        },
        categories: { $addToSet: "$orderItems.category" },
      },
    },
    { $sort: { totalRevenue: -1 } },
  );

  return await Order.aggregate(pipeline);
};

export const getTypeTrends = async (months = 6) => {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months);

  return await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
        paymentStatus: "paid",
      },
    },
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: {
          type: "$orderItems.type",
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        revenue: {
          $sum: { $multiply: ["$orderItems.price", "$orderItems.quantity"] },
        },
        orders: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);
};

export const getTypeConversionRates = async () => {
  return await Order.aggregate([
    { $unwind: "$orderItems" },
    {
      $group: {
        _id: "$orderItems.type",
        totalOrders: { $sum: 1 },
        paidOrders: {
          $sum: { $cond: [{ $eq: ["$paymentStatus", "paid"] }, 1, 0] },
        },
      },
    },
    {
      $project: {
        type: "$_id",
        conversionRate: {
          $multiply: [{ $divide: ["$paidOrders", "$totalOrders"] }, 100],
        },
      },
    },
  ]);
};
