import { lazy } from 'react';

export const Landing = lazy(() =>
  import('./Landing').then((module) => ({ default: module.Landing })),
);
