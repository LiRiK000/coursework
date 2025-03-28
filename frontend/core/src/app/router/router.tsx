// TODO Подумать как улучшить роутер в контексте микрофронтов
import { Landing } from 'landing/LandingPage';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { NotFound } from '../../pages/NotFound';

export const CoreRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
