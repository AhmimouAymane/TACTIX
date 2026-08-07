import { createRoot } from 'react-dom/client';
import { Router } from './router';
import App from './App';
import './index.css';
import './components.css';

createRoot(document.getElementById('app')!).render(
  <Router initialPath={window.location.pathname + window.location.search}>
    <App />
  </Router>,
);
