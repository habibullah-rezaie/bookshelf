import { UseQueryOptions } from "@tanstack/react-query";
import { BasicBookInfo } from "src/types/types";
import { chooseBetterImageSize } from "src/utils/book";
import getGoogleBookDetail, {
	fetchBasicBookInfo,
} from "../fetchers/googleBookDetail";
import keys from "./queryKeys";

function googleDetailQuery(id: string) {
	return {
		queryKey: keys.bookDetails(id),
		queryFn: () => getGoogleBookDetail(id),
	};
}

export type GoogleBasicDetail = Omit<
	BasicBookInfo,
	"primaryISBN13" | "averageRating"
>;

export function googleBasicInfoQuery(
	id: string
): UseQueryOptions<
	GoogleBasicDetail,
	unknown,
	GoogleBasicDetail,
	ReturnType<typeof keys.bookBasicDetail>
> {
	return {
		queryKey: keys.bookBasicDetail(id),
		queryFn: async () => {
			const result = await fetchBasicBookInfo(id);

			console.log(result);
			return {
				bookId: result.id,
				title: result.volumeInfo.title,
				authors: result.volumeInfo.authors || [],
				publishedDate: result.volumeInfo.publishedDate || "",
				bookImage: chooseBetterImageSize(result.volumeInfo.imageLinks || {}),
			};
		},

		enabled: Boolean(id),
		retry: (count, _) => {
			return count <= 2;
		},
	};
}
export default googleDetailQuery;
