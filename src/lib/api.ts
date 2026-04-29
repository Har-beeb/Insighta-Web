import axios from "axios";
import { Profile } from "../types";

export const fetchProfilesData = async (
  token: string,
  page: number,
  limit: number = 10,
): Promise<Profile[]> => {
  const response = await axios.get(
    "https://hng-stage-0-api-eta.vercel.app/api/profiles",
    {
      headers: {
        "X-API-Version": "1",
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        limit,
      },
    },
  );

  return response.data.data || response.data;
};
