import { QueryClient } from "react-query";

const apiRoute = "http://localhost:5000";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export { apiRoute, queryClient };
