import React, { FC, HTMLAttributes } from "react";
export type AlertTypes = "success" | "error";
const alertClasses = {
    success:{
        bg:'bg-success/20',
        text:'text-success',
        border:'border-success/30',
        stroke:'stroke-success'
    },
    error:{
        bg:'bg-error/20',
        text:'text-error',
        border:'border-error/30',
        stroke:'stroke-error'
    }
}
interface AlertBoxProps { message: string; type: AlertTypes, close: () => void }

const AlertBox: FC<AlertBoxProps> = ({
	message,
	type,
    close
}) => {
	return (
		<div
			className={`w-full py-3 px-2 rounded-md border-[1px] flex items-center justify-between ${
				Object.values(alertClasses[type]).toString().replaceAll(',',' ')
			}`}
		>
			<p>{message}</p>
			<div className="click-effect" onClick={() => close()}>
				<svg
					width="30px"
					height="30px"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
						strokeWidth="1.5"
					/>
					<path
						d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</div>
		</div>
	);
};

export default AlertBox;
