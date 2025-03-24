import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App.tsx'
import './index.css'
import { NotificationProvider } from './Components/NotifyHandler.tsx/Toast.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NotificationProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </NotificationProvider>
  </React.StrictMode>
)
