import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetTransactions = () => {
  const params = useSearchParams();
  const from = params.get("to") || undefined;
  const to = params.get("from") || undefined;
  const accountId = params.get("accountId") || undefined;
  const query = useQuery({
    queryKey: ["transactions"],
    //TODO: Check if params are needed in the key
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          from,
          to,
          accountId,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions!");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
