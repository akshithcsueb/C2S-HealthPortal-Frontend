import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPatient } from "../../services/apiPatients";

export function useCreatePatient() {
  const queryClient = useQueryClient();

  const { mutate: patientCreated, isLoading: isCreating } = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      console.log("Entered useCreatePatient");
      toast.success("New patient successfully created");
      queryClient.invalidateQueries({ queryKey: ["patientRecords"] });
    },
    onError: (err) => {
      console.log("Entered wrongly");
      toast.error(err.message);
    },
  });

  return { isCreating, patientCreated };
}
