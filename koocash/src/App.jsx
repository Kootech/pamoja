import "./App.css";
import Layout from "./app/common/Layout";
import ErrorBoundary from "./app/common/ErrorBoundary";
import AuthProvider from "./context/AuthContext";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <AuthProvider>
              <Layout />
            </AuthProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
