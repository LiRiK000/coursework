import { lazy } from 'react';

export const Admin = lazy(() =>
  import('./Admin').then((module) => ({ default: module.Admin })),
);
