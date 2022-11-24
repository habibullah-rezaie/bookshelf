import React from "react";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/lib/Buttons/Buttons";
import { WhiteShadowedContiainer } from "src/components/lib/Header/Container";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
import Warning from "src/components/lib/notices/Warning";
import { useAuth } from "src/context/auth";
import { UserReview } from "src/database/tables/userReview";
import { formatRatingDate } from "src/utils/book";

function MyReview({
	review,
	rating,
	bookId,
}: {
	review?: UserReview;
	rating: number;
	bookId: string;
}) {
	const { user } = useAuth();
	const avatarUrl =
		user && user.user_metadata && user.user_metadata.avatar_url
			? user.user_metadata.avatar_url
			: "./defaultUser.jpeg";
	const navigate = useNavigate();

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

	return (
		<WhiteShadowedContiainer>
			<div className="relative flex flex-col space-y-2 px-2.5 mb-4 py-4">
				{review && review.isPublished === false ? (
					<Warning role={"note"} className={`w-full mb-2`}>
						<p className="font-poppins font-medium text-xs text-baseBlack">
							This draft is unfinished
						</p>
					</Warning>
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
								{user?.user_metadata.name}
							</div>
							<div className="flex flex-row text-xs text-baseBlack text-opacity-80 font-poppins font-medium space-x-2">
								<div>{reviewCount} Reviews</div>
								<div>{followerCount} Followers</div>
							</div>
						</div>
					</div>
					<Button
						variant="primary"
						className="text-xs"
						onClick={() => {
							navigate("/review-form/" + bookId);
						}}
					>
						{review
							? review.isPublished
								? "Edit Review"
								: "Finish Draft"
							: "Add Review"}
					</Button>
				</div>
				<ReviewCardRatinRow review={review} rating={rating} />
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

export default MyReview;

export function ReviewCardRatinRow({
	review,
	rating,
}: {
	review?: UserReview;
	rating: number;
}) {
	return (
		<div className="w-full flex flex-row justify-between items-center px-4">
			{review ? (
				<div className="text-xs text-baseBlack">
					{formatRatingDate(review.updatedAt)}
				</div>
			) : null}
			<RatingStars rating={rating} />
		</div>
	);
}

export function RatingStars({ rating = 0 }: { rating?: number }) {
	const roundedRating = +rating.toFixed(1);
	return (
		<div className="flex flex-row space-x-1">
			<div className="flex flex-row space-x-0.5">
				{Array(6)
					.fill("")
					.map((_, i) => {
						if (i === 0) return null;
						if (roundedRating >= i) {
							return <RiStarFill className="text-[#FFC41F] h-5" />;
						} else if (roundedRating >= i - 0.5) {
							return <RiStarHalfFill className=" text-[#ffc41f] h-5" />;
						} else return <RiStarLine className="fill-[#ffc41f] h-5" />;
					})}
			</div>
			<div>
				{roundedRating > 0 ? (
					<span className="text-baseBlack h-5 leading-5 font-semibold">
						{roundedRating}
					</span>
				) : null}
			</div>
		</div>
	);
}
