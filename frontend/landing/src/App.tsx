import ReactDOM from 'react-dom/client';

import './index.css';
import { Landing } from './pages/Landing';

const App = () => <Landing />;

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
