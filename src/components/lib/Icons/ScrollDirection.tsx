import React from "react";
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight,
	MdKeyboardArrowUp,
} from "react-icons/md";

export type ScrollDirectionType = "RIGHT" | "LEFT" | "UP" | "DOWN";
function ScrollDirection({
	direction,
	className = "",
}: {
	direction: ScrollDirectionType;
	className?: string;
}) {
	switch (direction) {
		case "DOWN":
			return <MdKeyboardArrowDown className={className} />;
		case "UP":
			return <MdKeyboardArrowUp className={className} />;
		case "RIGHT":
			return <MdKeyboardArrowRight className={className} />;
		case "LEFT":
			return <MdKeyboardArrowLeft className={className} />;
	}
}

export default ScrollDirection;
