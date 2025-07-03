import { createRoot } from "react-dom/client";
import "./index.css";
import "./responsive.css";
import App from "./App.jsx";
import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Playercontextprovider from "./context/Playercontext";


createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
      <Auth0Provider 
      domain="dev-2qtcevcr8mdl1pj7.us.auth0.com"
      clientId="VB9g9zgQ98PQZvMqrx3ujAU9ex4vVRlt"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
        <Playercontextprovider>
        <App />
        </Playercontextprovider>
      </Auth0Provider>
    </BrowserRouter>
  
);
