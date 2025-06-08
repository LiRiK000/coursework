import { lazy } from 'react';

export const Main = lazy(() =>
  import('./Main').then((module) => ({ default: module.Main })),
);
