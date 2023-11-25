import { apiService } from "@/lib/apiService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetTasks = () =>
	useQuery({
		queryKey: ["Tasks"],
		queryFn: async () => {
			const response = await apiService({ endpoint: "tasks", method: "GET" });
			return response;
		},
	});

export const useCreateTask = (fn: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["CreateTask"],
		mutationFn: async (data: string) => {
			await apiService({
				endpoint: "tasks",
				method: "POST",
				body: data,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Tasks"] });
			fn();
		},
	});
};

export const useUpdateTask = (willInvalidate: boolean, fn?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["UpdateTask"],
		mutationFn: async (data: string) => {
			await apiService({ endpoint: "tasks", method: "PUT", body: data });
		},
		onSuccess: () => {
			if (willInvalidate) {
				queryClient.invalidateQueries({ queryKey: ["Tasks"] });
			}
			fn?.();
		},
	});
};

export const useDeleteTask = (fn?: () => void) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["DeleteTask"],
		mutationFn: async (data: string) => {
			await apiService({
				endpoint: "tasks",
				method: "DELETE",
				body: data,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["Tasks"] });
			fn?.();
		},
	});
};
