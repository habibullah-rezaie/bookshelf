import * as React from "react";
import Spinner from "../Spinner";
type ButtonPrimaryVariant = "primary" | "secondary" | "danger" | "plain";
type ButtonVariant =
	| ButtonPrimaryVariant
	| ("primary-outline" | "danger-outline" | "secondary-outline");

type CustomButtonProps = {
	rounded?: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "none";
};

type ButtonProps = React.PropsWithChildren<
	CustomButtonProps &
		Omit<
			React.DetailedHTMLProps<
				React.ButtonHTMLAttributes<HTMLButtonElement>,
				HTMLButtonElement
			>,
			"ref"
		>
>;

export const Button = React.forwardRef(function Button(
	{
		variant = "primary",
		rounded = "3xl",
		children,
		className = "",
		...props
	}: ButtonProps & { variant?: ButtonVariant },
	ref: React.ForwardedRef<HTMLButtonElement> | undefined
) {
	const variantStyles = {
		secondary: `text-white ring-gray-300 bg-gray-400`,
		danger: `text-darkGray ring-red-400 bg-red-500 hover:bg-red-600`,
		"danger-outline": `bg-white text-red-500 border-1 border-red-500 hover:bg-red-500 ring-red-300 hover:text-white`,
		"secondary-outline":
			"bg-transparent text-gray-400 border-1 border-gray-400 ring-gray-300 hover:bg-gray-400 hover:text-white",
		"primary-outline": ``,
		plain: "hover:ring-0",
	};

	return (
		<button
			ref={ref}
			className={`outline-none focus:outline-none transition-all duration-200 ${
				(variant !== "plain" ? `hover:ring-4 ring-opacity-50 px-5 py-2 ` : "") +
				(variant === "primary"
					? `text-white bg-baseBlack ring-indigoLighten80 focus:outline-1 focus:outline-offset-2 focus:outline-baseBlack focus:ring-offset-1 font-poppins font-semibold`
					: "")
			} ${
				variant.includes("outline")
					? "hover:font-semibold border bg-transparent"
					: ""
			} rounded-${rounded} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
});

export const CloseButton = React.forwardRef(function CloseButton(
	{ className, ...props }: Omit<ButtonProps, "children">,
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	return (
		<Button
			ref={ref}
			className="hover:ring-1 ring-offset-0 px-0 pt-0 pb-0 border-none"
			aria-label="close"
			variant="danger-outline"
			{...props}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="w-5 h-5"
				viewBox="0 0 512 512"
			>
				<title>Close</title>
				<path
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="32"
					d="M368 368L144 144M368 144L144 368"
				/>
			</svg>
		</Button>
	);
});

export const OutlineButton = React.forwardRef(function OutlineButton(
	{
		children,
		variant = "primary",
		className = "",
		...props
	}: ButtonProps & {
		variant?: "primary" | "secondary" | "danger";
	},
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	return (
		<Button ref={ref} className={`${className}`} variant={`${variant}-outline`}>
			{children}
		</Button>
	);
});

export const CircleButton = React.forwardRef(
	(
		{ children, className = "", ...props }: ButtonProps,
		ref?: React.ForwardedRef<HTMLButtonElement>
	) => {
		return (
			<Button
				ref={ref}
				variant={"plain"}
				className={`rounded-full ${className}`}
				{...props}
			>
				{children}
			</Button>
		);
	}
);

export const ButtonWithSpinner = React.forwardRef(function ButtonWithSpinner(
	{
		children,
		className,
		loadingState,
		variant,
		...props
	}: ButtonProps & {
		loadingState: boolean;
		variant?: ButtonVariant;
	},
	ref?: React.ForwardedRef<HTMLButtonElement>
) {
	return (
		<Button
			ref={ref}
			variant={variant}
			className={`${className} flex space-x-1 items-center justify-center`}
			{...props}
		>
			<div>{children}</div>
			{loadingState && (
				<div>
					<Spinner />
				</div>
			)}
		</Button>
	);
});

interface BlackBtnSpecailProps {
	loadingState?: boolean;
}

// Don't Include variant and overright new props in case of collisions
type BlackBtnProps = BlackBtnSpecailProps &
	Omit<Omit<ButtonProps, "variant">, keyof BlackBtnSpecailProps>;

export function BlackButton({
	className = "",
	loadingState,
	children,
}: BlackBtnProps) {
	const styles = `bg-baseBlack hover:bg-darkerBlack hover:ring-baseBlack hover:ring-opacity-50 text-white font-poppins font-meduim`;
	return (
		<>
			{/* Catch if loading state is given */}
			{/* eslint-disable-next-line eqeqeq */}
			{loadingState != undefined ? (
				<ButtonWithSpinner
					className={`${styles} ${className}`}
					loadingState={loadingState}
					children={children}
				/>
			) : (
				<Button className={`${styles} ${className}`} children={children} />
			)}
		</>
	);
}
