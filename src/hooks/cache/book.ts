import { useBestsellersAllList } from "src/api/hooks/bestsellers";
import { usePopularBooksAllList } from "src/api/hooks/mostPopular";
import { ShortBestseller } from "src/api/queries/bestsellers";
import { ShortPopularBook } from "src/api/queries/mostPopular";
import { BestsellerType } from "src/database/tables/BestsellerBook";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";

export function useIsPopular(
	bookId: string
): undefined | [ShortPopularBook, PopularBookPeriod] {
	const {
		annuallyPopular: { data: annuallyPopular },
		monthlyPopular: { data: monthlyPopular },
		weeklyPopular: { data: weeklyPopular },
	} = usePopularBooksAllList();

	if (!bookId) return;
	if (weeklyPopular && bookId in weeklyPopular)
		return [weeklyPopular[bookId], "WEEK"];
	if (monthlyPopular && bookId in monthlyPopular)
		return [monthlyPopular[bookId], "MONTH"];
	if (annuallyPopular && bookId in annuallyPopular)
		return [annuallyPopular[bookId], "YEAR"];

	return;
}

export function useIsBestseller(
	bookId: string
): undefined | [ShortBestseller, BestsellerType] {
	const {
		fictionResult: { data: fictionData },
		nonFictionResult: { data: nonFictionData },
	} = useBestsellersAllList();

	if (!bookId) return;
	if (fictionData && bookId in fictionData)
		return [fictionData[bookId], "FICTION"];
	if (nonFictionData && bookId in nonFictionData)
		return [nonFictionData[bookId], "NON_FICTION"];

	return;
}
