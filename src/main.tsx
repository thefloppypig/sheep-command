import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './view/App';
import './index.css'
import { Provider } from 'react-redux';
import { store } from './state/store';


window.onbeforeunload = function () {
  return true;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
