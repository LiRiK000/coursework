import { ACHIEVEMENT_TYPE } from '@prisma/client';
import { prisma } from '../lib/prisma';

export const achievementService = {
  async getUserAchievements(userId: string) {
    return prisma.achievement.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async checkCourseCompletion(userId: string, courseId: string) {
    const progress = await prisma.progressTracking.findMany({
      where: {
        userId,
        section: { courseId },
      },
    });

    return progress.every((p) => p.completionStatus === 100);
  },

  async awardAchievement(userId: string, type: string) {
    const achievementType = type as keyof typeof ACHIEVEMENT_TYPE;

    return prisma.achievement.upsert({
      where: { userId_type: { userId, type: achievementType } },
      create: {
        title: this.getAchievementTitle(achievementType),
        description: this.getAchievementDescription(achievementType),
        icon: this.getAchievementIcon(achievementType),
        type: achievementType,
        userId,
      },
      update: {},
    });
  },

  getAchievementTitle(type: string) {
    const titles = {
      COURSE_COMPLETION: 'Завершение курса',
      PERFECT_SECTION: 'Идеальное прохождение раздела',
      EARLY_ADOPTER: 'Ранний пользователь',
      STREAK: 'Серия успехов',
    };
    return titles[type as ACHIEVEMENT_TYPE] || 'Новое достижение';
  },

  getAchievementDescription(type: string) {
    const descriptions = {
      COURSE_COMPLETION: 'Полностью завершил весь курс',
      PERFECT_SECTION: 'Выполнил все задания раздела без ошибок',
      EARLY_ADOPTER: 'Активный участник с момента запуска платформы',
      STREAK: 'Выполнил 5 заданий подряд без ошибок',
    };
    return (
      descriptions[type as ACHIEVEMENT_TYPE] || 'Новое достижение за активность'
    );
  },

  getAchievementIcon(type: string) {
    const icons = {
      COURSE_COMPLETION: '/icons/trophy.svg',
      PERFECT_SECTION: '/icons/star.svg',
      EARLY_ADOPTER: '/icons/rocket.svg',
      STREAK: '/icons/flame.svg',
    };
    return icons[type as ACHIEVEMENT_TYPE] || '/icons/medal.svg';
  },
};
