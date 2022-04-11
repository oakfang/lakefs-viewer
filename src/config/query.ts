import { QueryClientConfig } from "react-query";

export const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
};
