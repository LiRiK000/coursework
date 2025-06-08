import { lazy } from 'react';

export const Profile = lazy(() =>
  import('./Profile').then((module) => ({ default: module.Profile })),
);
