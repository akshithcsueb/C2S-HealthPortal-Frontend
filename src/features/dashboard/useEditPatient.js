import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updatePatient } from "../../services/apiPatients";

export function useEditPatient() {
  const queryClient = useQueryClient();

  const { mutate: editedPatient, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, newEditedData }) => updatePatient(id, newEditedData),
    onSuccess: () => {
      toast.success("Patient successfully edited");
      queryClient.invalidateQueries({ queryKey: ["patientRecords"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editedPatient };
}
