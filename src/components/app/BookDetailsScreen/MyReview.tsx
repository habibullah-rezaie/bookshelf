import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/lib/Buttons/Buttons";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
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
		console.log(
			"CONTENTREF",
			contentRef.current?.clientHeight < contentRef.current?.scrollHeight
		);

		setIsOverflowing(
			contentRef.current?.clientHeight < contentRef.current?.scrollHeight
		);
	}, []);

	return (
		<div className="relative flex flex-col space-y-2 px-2.5 mb-4">
			{review && review.isPublished === false ? (
				<p className="text-xxs text-red-500">
					This is a draft review, finish or{" "}
					<button className="font-semibold italic">delete it</button>
				</p>
			) : null}

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
				<Button
					variant="primary"
					className="rounded-2xl"
					style={{
						backgroundColor: "#565454",
						fontSize: ".75rem",
					}}
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
			<div className="flex flex-row justify-between">
				{review ? (
					<div className="text-xs text-baseBlack">
						{formatRatingDate(review.updatedAt)}
					</div>
				) : null}
				<RatingStars rating={rating} />
			</div>
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
	);
}

export default MyReview;

export function RatingStars({ rating = 0 }: { rating?: number }) {
	const roundedRating = +rating.toFixed(1);
	return (
		<div className="flex flex-row space-x-1">
			<div className="flex flex-row">
				{Array(6)
					.fill("")
					.map((_, i) => {
						if (i === 0) return null;
						if (roundedRating >= i) {
							return <BsStarFill className="text-[#FFC41F] h-5" />;
						} else if (roundedRating >= i - 0.5) {
							return (
								<BsStarHalf className="fill-[#FFC41F] text-[#ffc41f] h-5" />
							);
						} else return <BsStar className="fill-[#FFC41F] h-5" />;
					})}
			</div>
			{roundedRating > 0 ? (
				<span className="text-xs text-baseBlack h-5 flex items-center">
					{roundedRating}
				</span>
			) : null}
		</div>
	);
}
