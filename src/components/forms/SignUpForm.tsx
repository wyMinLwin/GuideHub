"use client";
import { emailRegex, nameRegex, passwordRegex } from "@/lib/regex";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../Loading";
import { apiService } from "@/lib/apiService";
import AlertBox, { AlertTypes } from "../AlertBox";

interface SignUpFormData {
	name: string;
	email: string;
	password: string;
}

const SignUpForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SignUpFormData>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [alertBoxMessage, setAlertBoxMessage] = useState<{
		type: AlertTypes;
		message: string;
		redirectUrl?: string;
		redirectLabel?: string;
	} | null>(null);
	const createUser = async (data: SignUpFormData) => {
		return await apiService({
			endpoint: "auth/signup",
			method: "POST",
			body: JSON.stringify({
				name: data.name,
				email: data.email,
				password: data.password,
			}),
		});
	};
	const submitHandler: SubmitHandler<SignUpFormData> = (data) => {
		setAlertBoxMessage(null);
		setIsLoading(true);
		const response = createUser(data);
		response.then((res: { success: boolean; message: string }) => {
			if (res.success) {
				reset();
				setAlertBoxMessage({
					type: "success",
					message: res.message,
					redirectUrl: "/login",
					redirectLabel: "Go to login",
				});
				return;
			}
			setAlertBoxMessage({ type: "error", message: res.message });
		});
		response.finally(() => {
			setIsLoading(false);
		});
	};

	return (
		<form
			onSubmit={handleSubmit(submitHandler)}
			className="sm:px-16 md:px-8 flex flex-col gap-y-2"
		>
			{alertBoxMessage && 
				<AlertBox
					message={alertBoxMessage.message}
					type={alertBoxMessage.type}
					close={() => setAlertBoxMessage(null)}
					redirect={{
						url: alertBoxMessage?.redirectUrl ?? "",
						label: alertBoxMessage?.redirectLabel ?? "",
					}}
				/>
			}
			{errors && (
				<div className="form-validate-message ">
					{Object.values(errors)[0]?.message}
				</div>
			)}
			<input
				{...register("name", {
					required: true,
					minLength: {
						value: 4,
						message: "Name must be longer than 3 letters.",
					},
					maxLength: {
						value: 20,
						message: "Name in only allowed up to 20 letters.",
					},
					pattern: {
						value: nameRegex,
						message: "Name only allowed letters.",
					},
				})}
				className="px-4 border py-2 rounded-md"
				placeholder="Name"
			/>
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
				{...register("password", {
					required: true,
					minLength: {
						value: 8,
						message: "Password must at least 8 characters.",
					},
					pattern: {
						value: passwordRegex,
						message:
							"Password must contain letters, numbers and special characters.",
					},
				})}
				className="px-4 border py-2 rounded-md"
				placeholder="Password"
			/>
			<input
				type="submit"
				className="bg-bluejeans text-light rounded-md px-3 py-2 click-effect transition-all duration-150"
				value="Create Account"
			/>
			<Loading isLoading={isLoading} />
		</form>
	);
};

export default SignUpForm;
