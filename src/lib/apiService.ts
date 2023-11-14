type apiServiceProps = {
	endpoint: string;
	method: "GET" | "POST" | "PUT" | "DELETE";
	body: string;
};
export const apiService = async ({
	endpoint,
	method,
	body,
}: apiServiceProps) => {
	try {
		const response = await fetch(`/api/${endpoint}`, { method: method, body: body });
        return await response.json();  
	} catch (error) {
		throw error;
	}
};
