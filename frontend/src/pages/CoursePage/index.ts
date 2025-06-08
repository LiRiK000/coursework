import { lazy } from 'react';

export const CoursePage = lazy(() =>
  import('./CoursePage').then((module) => ({ default: module.CoursePage })),
);
