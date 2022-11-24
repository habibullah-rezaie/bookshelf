import { Button } from "src/components/lib/Buttons/Buttons";

function WelcomeModalFooter({
	noWelcome,
	setNoWelcome,
	setIsOpen,
}: {
	noWelcome: boolean;
	setNoWelcome: React.Dispatch<React.SetStateAction<boolean>>;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className="flex flex-row justify-between items-center w-full ">
			<div className="space-x-2 font-poppins text-xs flex flex-row">
				<input
					type="checkbox"
					name="showAgain"
					id="showAgain"
					checked={noWelcome}
					onChange={(e) => {
						setNoWelcome((prev) => !prev);
					}}
				/>
				<label htmlFor="showAgain">Don't show again</label>
			</div>
			<Button
				variant="primary"
				className=""
				style={{ backgroundColor: "#565454" }}
				onClick={() => setIsOpen(false)}
			>
				let's go
			</Button>
		</div>
	);
}

export default WelcomeModalFooter;
