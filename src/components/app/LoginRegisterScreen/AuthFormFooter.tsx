import React from "react";
import { Link } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";

function AuthFormFooter({
	submitBtnLoading,
	pageType,
}: {
	submitBtnLoading: boolean;
	pageType: "signin" | "signup";
}) {
	return (
		<div className="w-full relative pb-10 mt-9">
			<SubmitBtn buttonText="Sign Up" submitBtnLoading={submitBtnLoading} />
			<div className="text-xs w-full absolute bottom-3">
				<div className="flex justify-center">
					<div>
						<Link to={pageType === "signin" ? "/auth/signup" : "/auth/signin"}>
							{pageType === "signin"
								? "Create an account?"
								: "Already have an account?"}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuthFormFooter;
