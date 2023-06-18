import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'react-oidc-context';
import Secured from './components/Secured';
import './index.css'


const oidcCofig = {
  authority: "http://localhost:8080/realms/realm1",
  client_id: "react-client",
  redirect_uri: "http://localhost:3000",
  onSingIn: (user:Record<any, any>) => {
    console.log(user)
    window.history.replaceState({}, document.title, window.location.pathname);
  },
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider {...oidcCofig}>
    <Provider store={store}>
    <React.StrictMode>
      <Secured>
       <App/>
      </Secured> 
    </React.StrictMode>
  </Provider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
