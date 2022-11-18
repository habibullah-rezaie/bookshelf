import { useQuery } from "@tanstack/react-query";
import googleDetailQuery, {
	googleBasicInfoQuery,
} from "../queries/bookDetails";

function useGoogleBookDetail(id: string) {
	return useQuery({
		...googleDetailQuery(id),
		retry: (failureCount, _) => failureCount <= 2,
		enabled: true,
	});
}

export function useGoogleBasicBookInfo(id: string) {
	return useQuery({
		...googleBasicInfoQuery(id),
	});
}

export default useGoogleBookDetail;
