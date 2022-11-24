import { Link } from "react-router-dom";
import { useRatingStats } from "src/api/hooks/userBook";
import { WhiteShadowedContiainer } from "src/components/lib/Header/Container";

function ReviewStats({ bookId }: { bookId: string }) {
	const { data: stats } = useRatingStats(bookId);
	console.log(stats, "STATS");
	return (
		<WhiteShadowedContiainer className="w-full max-w-[22rem]">
			<figure className="flex justify-center w-full p-2">
				<div className="flex flex-col w-full  space-y-[0.625rem]">
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
		</WhiteShadowedContiainer>
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
	let newPercentage = +percentage.toFixed(0);

	if (percentage > 100) newPercentage = 100;
	if (percentage < 0) newPercentage = 0;

	return (
		// TODO this has an issue on thinner devices
		<div className="w-full grid grid-cols-[3rem,1fr,1.75rem] gap-2 items-center font-poppins">
			<Link
				to={link || "#"}
				className={`w-full  justify-self-end underline text-sm`}
			>
				{starCount} stars
			</Link>
			<div className="h-2.5 w-full flex flex-row rounded-md overflow-hidden">
				<div
					className={`bg-baseBlack h-full rounded-l-md`}
					style={{ width: `${newPercentage}%` }}
				></div>
				<div
					style={{ width: `${100 - newPercentage}%` }}
					className={`bg-[#D9D9D9] h-full rounded-r-md`}
				></div>
			</div>
			<p className="text-xs text-baseBlack text-opacity-75 self-center">
				{newPercentage}%
			</p>
		</div>
	);
}
