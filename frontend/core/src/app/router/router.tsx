// TODO Подумать как улучшить роутер в контексте микрофронтов
import { Landing } from 'landing/LandingPage';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

export const CoreRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </BrowserRouter>
);
