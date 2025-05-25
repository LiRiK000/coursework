import { Landing } from '@/pages/Landing';
import { NotFound } from '@/pages/NotFound';
import { NotAllowed } from '@/pages/NotAllowed';
import { Main } from '@/pages/Main';
import { Profile } from '@/pages/Profile';
import { Admin } from '@/pages/Admin';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ProtectedWrapper } from '../providers/ProtectedWrapper';
import { Suspense } from 'react';
import { Loader } from '@/shared/ui/Loader';
import { CoursePage } from '@/pages/CoursePage';

export const CoreRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader fullscreen />}>
            <Landing />
          </Suspense>
        }
      />
      <Route
        path="/main"
        element={
          <ProtectedWrapper>
            <Suspense fallback={<Loader fullscreen />}>
              <Main />
            </Suspense>
          </ProtectedWrapper>
        }
      />
      <Route
        path="/courses/:id"
        element={
          <ProtectedWrapper>
            <Suspense fallback={<Loader fullscreen />}>
              <CoursePage />
            </Suspense>
          </ProtectedWrapper>
        }
      />
      <Route
        path="/me"
        element={
          <ProtectedWrapper>
            <Suspense fallback={<Loader fullscreen />}>
              <Profile />
            </Suspense>
          </ProtectedWrapper>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedWrapper requiredRole="ADMIN">
            <Suspense fallback={<Loader fullscreen />}>
              <Admin />
            </Suspense>
          </ProtectedWrapper>
        }
      />
      <Route path="/not-allowed" element={<NotAllowed />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
