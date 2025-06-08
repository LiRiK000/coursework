export const categoryMapper = (category: string) => {
  const categoryMap = {
    PROGRAMMING: 'Программирование',
    DESIGN: 'Дизайн',
    MARKETING: 'Маркетинг',
    LANGUAGES: 'LANGUAGES',
  };
  return categoryMap[category as keyof typeof categoryMap];
};
