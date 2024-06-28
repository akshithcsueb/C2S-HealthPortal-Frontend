import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),

    onSuccess: (user) => {
      console.log("Login successful, setting user data", user);
      queryClient.setQueryData(["user"], user);
      console.log("Navigating to /dashboard");
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided username or password are incorrect");
    },
  });

  return { login, isLoading };
}
