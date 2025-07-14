import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"

import { AuthProvider } from "./context/AuthContext";
import { LinkProvider } from "./context/LinkContext";
import { PageProvider } from "./context/PageContext";
import { MessageProvider } from "./context/MessageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LinkProvider>
          <PageProvider>
            <MessageProvider>
              <App />
            </MessageProvider>
          </PageProvider>
        </LinkProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
