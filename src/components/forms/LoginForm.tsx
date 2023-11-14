"use client";
import React from "react";

const LoginForm = () => {
	return (
		<form className="sm:px-16 md:px-8 flex flex-col gap-y-2">
			<input className="px-4 border py-2 rounded-md" placeholder="Email" />
			<input className="px-4 border py-2 rounded-md" placeholder="Password" />
			<button className="bg-bluejeans text-light rounded-md px-3 py-2 click-effect transition-all duration-150">
				Login
			</button>
		</form>
	);
};

export default LoginForm;
