import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

export const AppQueryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});
function ReactQueryProvider({ children }: PropsWithChildren<{}>) {
	return (
		<QueryClientProvider client={AppQueryClient}>
			{children}
		</QueryClientProvider>
	);
}

export default ReactQueryProvider;
