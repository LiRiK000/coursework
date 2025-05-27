export const levelMapper = (level: string) => {
  const levelMap = {
    BEGINNER: 'Начальный',
    INTERMEDIATE: 'Средний',
    ADVANCED: 'Продвинутый',
  };
  return levelMap[level as keyof typeof levelMap];
};
