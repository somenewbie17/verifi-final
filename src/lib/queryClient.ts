import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long data is considered "fresh"
      staleTime: 1000 * 60 * 5, // 5 minutes
      // How many times to retry a failed request
      retry: 2,
    },
  },
});

export default queryClient;