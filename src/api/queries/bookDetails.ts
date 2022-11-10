import getGoogleBookDetail from "../fetchers/googleBookDetail";
import keys from "./queryKeys";

function bookDetailQueryBuilder(id: string) {
	return {
		queryKey: keys.bookDetails(id),
		queryFn: () => getGoogleBookDetail(id),
	};
}

export default bookDetailQueryBuilder;
