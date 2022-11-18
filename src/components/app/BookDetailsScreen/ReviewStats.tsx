import React from "react";
import { Link } from "react-router-dom";
import { useRatingStats } from "src/api/hooks/userBook";

function ReviewStats({ bookId }: { bookId: string }) {
	const { data: stats } = useRatingStats(bookId);
	console.log(stats, "STATS");
	return (
		<figure>
			<div className="flex flex-col w-[20rem-1px] p-1 bg-white">
				<StatRow
					starCount={5}
					percentage={stats ? (stats[5] * 100) / stats.total : 0}
				/>
				<StatRow
					starCount={4}
					percentage={stats ? (stats[4] * 100) / stats.total : 0}
				/>
				<StatRow
					starCount={3}
					percentage={stats ? (stats[3] * 100) / stats.total : 0}
				/>
				<StatRow
					starCount={2}
					percentage={stats ? (stats[2] * 100) / stats.total : 0}
				/>
				<StatRow
					starCount={1}
					percentage={stats ? (stats[1] * 100) / stats.total : 0}
				/>
			</div>
		</figure>
	);
}

export default ReviewStats;

function StatRow({
	starCount,
	percentage,
	link,
}: {
	starCount: number;
	percentage: number;
	link?: string;
}) {
	let newPercentage = percentage;
	if (percentage > 100) percentage = 100;
	if (percentage < 0) percentage = 0;

	const fillWidth = 13 * (newPercentage / 100);
	const blankWidth = 13 * ((100 - newPercentage) / 100);
	return (
		<div className="grid grid-cols-[3fr,13rem,2fr] gap-2 items-center font-poppins">
			<Link to={link || "#"} className={"underline text-sm"}>
				{starCount} stars
			</Link>
			<div className="h-2.5 w-[13rem] flex flex-row rounded-md overflow-hidden">
				<div
					className={`bg-baseBlack h-full`}
					style={{ width: fillWidth + "rem" }}
				></div>
				<div
					style={{ width: blankWidth + "rem" }}
					className={`bg-[#D9D9D9] h-full`}
				></div>
			</div>
			<p className="text-xs text-baseBlack text-opacity-75">{newPercentage}%</p>
		</div>
	);
}
