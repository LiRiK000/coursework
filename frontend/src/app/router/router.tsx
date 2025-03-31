import { Landing } from '@/pages/Landing';
import { NotFound } from '@/pages/NotFound';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

export const CoreRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
