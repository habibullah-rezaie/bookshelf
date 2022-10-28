import React from "react";
import { ButtonWithSpinner } from "src/components/lib/Buttons/Buttons";

function SubmitBtn({
	submitBtnLoading,
	buttonText,
}: {
	submitBtnLoading: boolean;
	buttonText: string;
}) {
	return (
		<ButtonWithSpinner
			className="w-full bg-baseBlack hover:bg-darkerBlack hover:ring-baseBlack hover:ring-opacity-50 text-white font-meduim"
			type="submit"
			variant={"primary"}
			aria-label={"Submit Form"}
			loadingState={submitBtnLoading}
		>
			{buttonText}
		</ButtonWithSpinner>
	);
}

export default SubmitBtn;
