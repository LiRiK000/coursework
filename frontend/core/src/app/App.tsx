import './global.scss';
import ReactDOM from 'react-dom/client';
import { CoreRouter } from './router';
import { ConfigProvider } from 'antd';
import rus from 'antd/locale/ru_Ru';
import dayjs from 'dayjs';

dayjs.locale('en');

const App = () => (
  <ConfigProvider locale={rus}>
    <CoreRouter />
  </ConfigProvider>
);

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
