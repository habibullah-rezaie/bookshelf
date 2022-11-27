import React from "react";
import ScrollDirection from "../Icons/ScrollDirection";
import { Button } from "./Buttons";

function ScrollToTop({
	onClick,
	bottom = "bottom-28",
	right = "right-10",
}: {
	onClick: () => void;
	bottom?: string;
	right?: string;
}) {
	return (
		<Button
			variant="plain"
			className={`fixed ${bottom} ${right} w-10 h-10 z-10 flex items-center justify-center rounded-[100%] bg-baseBlack text-white`}
			title="Scroll to Search"
			onClick={onClick}
		>
			<ScrollDirection direction="UP" className="w-8 h-8" />
		</Button>
	);
}

export function useScrollIntoView() {
	const [showBtn, setShowBtn] = React.useState(false);
	const parentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		const parent = parentRef.current;
		if (!parent) return;

		const handler = () => {
			if (parent.getBoundingClientRect().top < 100 && !showBtn) {
				setShowBtn(true);
			}
		};
		window.addEventListener("scroll", handler);
		return () => window.removeEventListener("scroll", handler);
	}, [showBtn]);

	const ScrollIntoViewBtn = React.useCallback(
		({ right, bottom }: { right?: string; bottom?: string }) =>
			showBtn ? (
				<ScrollToTop
					onClick={() => parentRef.current?.scrollIntoView({ block: "start" })}
					right={right}
					bottom={bottom}
				/>
			) : null,
		[showBtn]
	);

	return { parentRef, ScrollIntoViewBtn };
}
export default ScrollToTop;
