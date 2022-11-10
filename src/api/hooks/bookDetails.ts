import { useQuery } from "@tanstack/react-query";
import bookDetailQueryBuilder from "../queries/bookDetails";

function useGoogleBookDetail(id: string) {
	return useQuery({
		...bookDetailQueryBuilder(id),
		retry: (failureCount, _) => failureCount <= 2,
		enabled: true,
	});
}

export default useGoogleBookDetail;
