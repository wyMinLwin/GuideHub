import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";
interface ButtonProps {
	label: string;
	icon?: string;
	cn?: string;
	iconSize?: number;
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({
	label,
	icon,
	cn,
	iconSize = 20,
	...props
}) => {
	return (
		<button
			type="button"
			{...props}
			className={`rounded-md flex justify-center items-center px-2.5 py-1 click-effect ${cn}`}
		>
			{icon && (
				<Image
					priority
					src={`/SVGs/${icon}.svg`}
					alt={icon}
					width={iconSize}
					height={iconSize}
				/>
			)}
			<span>{label}</span>
		</button>
	);
};

export default Button;
