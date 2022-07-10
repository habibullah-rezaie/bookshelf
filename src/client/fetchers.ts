import { BestsellerBook } from "@prisma/client";
import axios from "axios";

export function fetchBestSellers(): Promise<BestsellerBook[]> {
  const fetchURL = `/api/bestsellers`;

  return axios.get(fetchURL).then(
    (resp) => {
      if (resp.status === 200) {
        return resp.data;
      }
      throw new Error(resp.statusText);
    },
    (error) => {
      throw error;
    }
  );
}
