import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";

/**
 * React Query Client configuration
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // avoids unnecessary refetch
      retry: 1,                    // retry once on failure
      staleTime: 1000 * 60,        // cache data for 1 minute
    },
  },
});

/**
 * Get root element safely (TypeScript requirement)
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

/**
 * Render application
 */
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      {/* React Query Devtools (dev only) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
