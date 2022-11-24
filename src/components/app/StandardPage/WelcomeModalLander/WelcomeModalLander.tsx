import useModal from "src/components/lib/Modal";
import { useDontShowAgain } from "src/hooks/standardPage";
import { isMobile } from "src/utils/document";
import WelcomeModalFooter from "./WelcomeModalFooter";

function WelcomeModalLander() {
	const Modal = useModal("#root");
	const { isOpen, setIsOpen, noWelcome, setNoWelcome } = useDontShowAgain();

	return (
		<div>
			<Modal
				modalTitle="Welcome!"
				contentLabel="welcome message"
				className={`mx-0 transition-all  duration-150 scroll-smooth back`}
				overlayClassName={`z-10 backdrop-blur-[1px] backdrop-brightness-75`}
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				modalFooter={
					<WelcomeModalFooter
						noWelcome={noWelcome}
						setNoWelcome={setNoWelcome}
						setIsOpen={setIsOpen}
					/>
				}
			>
				<div className="w-60 font-poppins text-sm space-y-2 mb-4">
					<div>
						<strong className="font-semibold">Bookshelf</strong> is created to
						make you love books!
					</div>
					<div className="flex flex-col space-y-1">
						<div>
							<strong className="font-semibold">NOTE: </strong> This app is
							still under development.
						</div>
						<div>
							Some features are not yet implemented or they are finalized into
							production.
						</div>
					</div>
					{!isMobile() ? (
						<div>
							The app is not yet optimized for desktop or tablet, please open
							the app in a mobile
						</div>
					) : null}
				</div>
			</Modal>
		</div>
	);
}

export default WelcomeModalLander;
