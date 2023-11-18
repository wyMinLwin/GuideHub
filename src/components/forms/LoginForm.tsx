"use client";
import { apiService } from "@/lib/apiService";
import { emailRegex } from "@/lib/regex";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../global/Loading";
import AlertBox, { AlertTypes } from "../global/AlertBox";

interface LoginFormData {
	email: string;
	password: string;
}

const LoginForm = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();
	const [isLoading, setIsLoading] = useState(false);
	const [alertBoxMessage, setAlertBoxMessage] = useState<{
		type: AlertTypes;
		message: string;
	} | null>(null);
	const login = async (data: LoginFormData) => {
		return await apiService({
			endpoint: "auth/login",
			method: "POST",
			body: JSON.stringify({
				email: data.email,
				password: data.password,
			}),
		});
	};
	const submitHandler: SubmitHandler<LoginFormData> = (data) => {
		setIsLoading(true);
		const response = login(data);
		response
			.then((res: { success: boolean; message: string }) => {
				if (res.success) {
					router.push("/tasks");
					return;
				}
				setAlertBoxMessage({ type: "error", message: res.message });
			})
			.finally(() => setIsLoading(false));
	};
	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className="sm:px-16 md:px-8 flex flex-col gap-y-2"
		>
			{errors && (
				<div className="form-validate-message ">
					{Object.values(errors)[0]?.message}
				</div>
			)}
			{alertBoxMessage && (
				<AlertBox
					message={alertBoxMessage.message}
					type={alertBoxMessage.type}
					close={() => setAlertBoxMessage(null)}
				/>
			)}
			<input
				{...register("email", {
					required: true,
					pattern: {
						value: emailRegex,
						message: "Enter a valid email.",
					},
				})}
				className="px-4 border py-2 rounded-md"
				placeholder="Email"
			/>
			<input
				type="password"
				{...register("password", { required: true })}
				className="px-4 border py-2 rounded-md"
				placeholder="Password"
			/>
			<input
				value="Login"
				type="submit"
				className="bg-bluejeans text-light rounded-md px-3 py-2 click-effect transition-all duration-150"
			/>
			<Loading isLoading={isLoading} />
		</form>
	);
};

export default LoginForm;
