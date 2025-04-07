import { Landing } from '@/pages/Landing';
import { NotFound } from '@/pages/NotFound';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ProtectedWrapper } from '../providers/ProtectedWrapper';
import { Main } from '@/pages/Main';
import { Profile } from '@/pages/Profile';
import { Suspense } from 'react';
import { Loader } from '@/shared/ui/Loader';

export const CoreRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
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
        path="/me"
        element={
          <ProtectedWrapper>
            <Suspense fallback={<Loader fullscreen />}>
              <Profile />
            </Suspense>
          </ProtectedWrapper>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
