import { lazy } from 'react';

export const CourseLearn = lazy(() =>
  import('./CourseLearn').then((module) => ({ default: module.CourseLearn })),
);
