import React from "react";
import ReactDOM from "react-dom/client";
import { SnackBarContextProvider } from "./context/SnackbarContext";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextProvider } from "./context/AuthContext";
import { TitleProvider } from "./context/TitleContext";

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <TitleProvider>
          <SnackBarContextProvider>
            <App />
          </SnackBarContextProvider>
          {import.meta.env.DEV && <ReactQueryDevtools />}
        </TitleProvider>
      </QueryClientProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
