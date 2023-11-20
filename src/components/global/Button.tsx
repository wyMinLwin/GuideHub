import Image from "next/image";
import React, { FC, HTMLAttributes } from "react";
interface ButtonProps {
	label: string;
	icon?: string;
    cn?: string;
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ label,icon,cn,...props }) => {
	return (
		<button type="button" {...props} className={`rounded-md flex gap-x-2 items-center px-2.5 py-1 click-effect ${cn}`} >
            {icon && <Image priority src={`/SVGs/${icon}.svg`} alt={icon} width={20} height={20} />}
			<span>{label}</span>
		</button>
	);
};

export default Button;
