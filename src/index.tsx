import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store/store';
import './index.css';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
);
