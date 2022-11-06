import React from "react";
import SquareLoader from "../Loaders/SquareLoader";
import Img, { ImgProps } from "./Img";

interface IPreLoadableImgProps {
	width: number;
	height: number;
	Loader?: React.ReactNode;
}

export type PreLoadableImgProps = Omit<ImgProps, keyof IPreLoadableImgProps> &
	IPreLoadableImgProps;

function ImgWithLoader({
	src,
	alt,
	title,
	width,
	height,
	className = "",
	Loader = <SquareLoader className="" />,
}: PreLoadableImgProps) {
	return (
		<div
			className={`flex items-center justify-center aspect-w-${width} aspect-h-${height}  ${className}`}
		>
			<React.Suspense fallback={Loader}>
				<Img src={src} alt={alt} title={title} className={``} />

				<noscript>
					<img src={src} alt={alt} className={``} />
				</noscript>
			</React.Suspense>
		</div>
	);
}
export default ImgWithLoader;
