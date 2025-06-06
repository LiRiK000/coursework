import { lazy } from 'react';

export const CourseCongratulations = lazy(() =>
  import('./CourseCongratulations').then((module) => ({
    default: module.CourseCongratulations,
  })),
);
