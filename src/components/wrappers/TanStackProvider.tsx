"use client";
import React, { FC, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const TanStackProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const queryClient = useMemo(() => new QueryClient(), []);
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default TanStackProvider;
