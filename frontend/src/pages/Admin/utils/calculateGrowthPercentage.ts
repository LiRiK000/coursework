import { DashboardStats } from '../types';

const calculateGrowthPercentage = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return ((current - previous) / previous) * 100;
};

export const calculateUserGrowthPercentage = (stats?: DashboardStats) =>
  stats
    ? calculateGrowthPercentage(
        stats.userGrowth.thisMonth,
        stats.userGrowth.lastMonth,
      )
    : 0;
