import './global.scss';
import { CoreRouter } from './router';
import { ModalProvider } from './providers/ModalProvider';
import { QueryProvider } from './providers/QueryProvider';
import { AntProvider } from './providers/AntProvider';

export const App = () => (
  <QueryProvider>
    <AntProvider>
      <ModalProvider />
      <CoreRouter />
    </AntProvider>
  </QueryProvider>
);
