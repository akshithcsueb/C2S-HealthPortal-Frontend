import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePatient } from "../../services/apiPatients";

export function useDeletePatient() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletedPatient } = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      toast.success("Patient successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["patientRecords"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deletedPatient };
}
