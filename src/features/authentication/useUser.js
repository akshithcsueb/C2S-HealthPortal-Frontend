import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity, // Keep the user data fresh
    cacheTime: Infinity, // Keep the user data in cache
  });

  console.log("useUser -- isLoading:", isLoading, ", user:", user);

  return { isLoading, user, isAuthenticated: !!user };
}
