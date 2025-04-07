import { Landing } from '@/pages/Landing';
import { NotFound } from '@/pages/NotFound';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ProtectedWrapper } from '../providers/ProtectedWrapper';
import { Main } from '@/pages/Main';
import { Profile } from '@/pages/Profile';

export const CoreRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/main"
        element={
          <ProtectedWrapper>
            <Main />
          </ProtectedWrapper>
        }
      />
      <Route
        path="/me"
        element={
          <ProtectedWrapper>
            <Profile />
          </ProtectedWrapper>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
