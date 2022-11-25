import { Button } from "../Buttons/Buttons";
import ScrollDirection from "../Icons/ScrollDirection";
import Header from "./Header";

function HeaderWithBackAndShare({ onBackClick }: { onBackClick: () => void }) {
	return (
		<Header className="bg-bodyGray" sticky>
			<div className="w-full h-7 bg-bodyGray">
				<Button
					className={`flex flex-row items-center justify-center font-poppins text-sm text-baseBlack bg-bodyGray`}
					variant="plain"
					onClick={onBackClick}
				>
					<ScrollDirection direction="LEFT" />
					<span>Back</span>
				</Button>
			</div>
		</Header>
	);
}

export default HeaderWithBackAndShare;
