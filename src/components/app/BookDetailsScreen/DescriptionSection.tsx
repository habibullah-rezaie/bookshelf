import React from "react";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";

function DescriptionSection({ description }: { description: string }) {
	const [isOverflowing, setIsOverflowing] = React.useState<boolean>(true);
	const [showMore, setShowMore] = React.useState<boolean>(false);

	const descriptionRef = React.useRef<HTMLParagraphElement>(null);

	React.useEffect(() => {
		if (!descriptionRef.current) return;

		setIsOverflowing(
			descriptionRef.current?.clientHeight <
				descriptionRef.current?.scrollHeight
		);
	}, []);

	return (
		<section className="relative flex flex-col mt-8 pb-4">
			<h2 className="font-poppins font-semibold text-baseBlack text-2xl mb-2">
				Description
			</h2>
			{/* TODO: trim this text */}
			<p
				ref={descriptionRef}
				dangerouslySetInnerHTML={{ __html: description }}
				className={`font-roboto font-normal text-sm ${
					showMore ? "h-fit" : "h-40 overflow-hidden"
				} `}
			></p>
			{isOverflowing ? (
				<>
					{/* Show a blur effect over description */}
					{showMore === false ? (
						<div className="absolute bottom-6 h-4 w-full">
							<div className="h-2 w-full bg-white opacity-50 blur-sm"></div>
							<div className="h-2 w-full bg-white opacity-65 blur-sm"></div>
							<div className="h-4 w-full bg-white opacity-80 blur-md"></div>
						</div>
					) : null}
					<div className="relative h-2 shadow-2xl">
						<button
							className="absolute bottom-0 translate-y-[50%] flex flex-row space-x-0.5 bg-white shadow-2xl text-[#065D94]"
							onClick={() => {
								setShowMore(!showMore);
							}}
						>
							<span className="text-xs">
								{showMore ? "Show Less" : "Show More"}
							</span>
							{showMore ? (
								<ScrollDirection direction="UP" className="self-center w-4" />
							) : (
								<ScrollDirection direction="DOWN" className="self-center w-4" />
							)}
						</button>
					</div>
				</>
			) : null}
		</section>
	);
}

export default DescriptionSection;
