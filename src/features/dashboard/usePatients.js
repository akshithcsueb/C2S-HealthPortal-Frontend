import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../services/apiPatients";

export function usePatients() {
  const {
    isLoading,
    data: patients,
    error,
  } = useQuery({
    queryKey: ["patientRecords"],
    queryFn: getPatients,
    // staleTime: Infinity, // Keep the user data fresh
    // cacheTime: Infinity, // Keep the user data in cache
  });

  console.log("In USEPATIENTS - ", patients);

  return { isLoading, error, patients };
}
