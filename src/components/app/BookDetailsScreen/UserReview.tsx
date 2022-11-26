import React from "react";
import { Link } from "react-router-dom";
import { Button } from "src/components/lib/Buttons/Buttons";
import { WhiteShadowedContiainer } from "src/components/lib/Header/Container";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
import {
	ReviewOnBook,
	UserReview as TUserReview,
} from "src/database/tables/userReview";
import { ReviewCardRatingRow } from "./MyReview";

function UserReview({
	review,
	rating,
	user,
}: {
	review?: TUserReview;
	user: ReviewOnBook["UserBook"]["UserProfile"];
	rating: number;
}) {
	console.log("USER_META_DATA", user?.metadata);
	const avatarUrl =
		user && user.metadata.avatar_url
			? user.metadata.avatar_url
			: "/defaultUser.jpeg";

	const reviewCount = 1;
	const followerCount = 0;

	const [isOverflowing, setIsOverflowing] = React.useState<boolean>(true);
	const [showMore, setShowMore] = React.useState<boolean>(false);

	const contentRef = React.useRef<HTMLParagraphElement>(null);

	React.useEffect(() => {
		if (!contentRef.current) return;

		setIsOverflowing(
			contentRef.current?.clientHeight < contentRef.current?.scrollHeight
		);
	}, []);

	console.log("USER IN LIST", user);
	return (
		<WhiteShadowedContiainer>
			<div className="relative flex flex-col space-y-2 px-3 py-4 ">
				{review && review.isPublished === false ? (
					<p className="text-xxs text-red-500">
						This is a draft review, finish or{" "}
						<button className="font-semibold italic">delete it</button>
					</p>
				) : null}

				<div className="flex flex-row justify-between">
					<div className="flex flex-row space-x-3">
						<Link to="/">
							<ImgWithLoader
								src={avatarUrl}
								className={"rounded-[100%] overflow-hidden"}
								aspectWidth={1}
								aspectHeight={1}
								width={"2rem"}
								height={"2rem"}
							/>
						</Link>

						<div className="">
							<div className="text-xs text-baseBlack font-poppins font-semibold ">
								{/* TODO: TRIM THIS  */}
								{user?.metadata.full_name}
							</div>
							<div className="flex flex-row text-xs text-baseBlack text-opacity-80 font-poppins font-medium space-x-2">
								<div>{reviewCount} Reviews</div>
								<div>{followerCount} Followers</div>
							</div>
						</div>
					</div>
					<Button
						variant="primary"
						onClick={() => {
							// TODO: Add Follow in here
						}}
					>
						Follow
					</Button>
				</div>
				<ReviewCardRatingRow review={review} rating={rating} />
				{review ? (
					<div className="relative flex flex-col">
						<p
							ref={contentRef}
							className={`font-roboto font-normal text-sm ${
								showMore || !isOverflowing
									? "h-fit"
									: "h-[8.5rem] overflow-hidden"
							} `}
						>
							{review.content}
						</p>
						{isOverflowing ? (
							<>
								{/* Show a blur effect over description */}
								{showMore === false ? (
									<div className="absolute bottom-4 h-4 w-full">
										<div className="h-2 w-full bg-white opacity-50 blur-sm"></div>
										<div className="h-2 w-full bg-white opacity-65 blur-sm"></div>
										<div className="h-4 w-full bg-white opacity-80 blur-md"></div>
									</div>
								) : null}
								<div className="relative h-2 shadow-2xl">
									<button
										className="absolute -bottom-1 translate-y-[50%] flex flex-row space-x-0.5 bg-white shadow-2xl text-[#065D94]"
										onClick={() => {
											setShowMore(!showMore);
										}}
									>
										<span className="text-xs">
											{showMore ? "Show Less" : "Show More"}
										</span>
										{showMore ? (
											<ScrollDirection
												direction="UP"
												className="self-center w-4"
											/>
										) : (
											<ScrollDirection
												direction="DOWN"
												className="self-center w-4"
											/>
										)}
									</button>
								</div>
							</>
						) : null}
					</div>
				) : null}
			</div>
		</WhiteShadowedContiainer>
	);
}

export default UserReview;
