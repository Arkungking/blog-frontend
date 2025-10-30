import { resetPasswordSchema } from "@/app/reset-password/[token]/schema";
import { axiosInstance2 } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

const useResetPassword = (token: string) => {
  return useMutation({
    mutationFn: async (body: z.infer<typeof resetPasswordSchema>) => {
      const { data } = await axiosInstance2.patch(
        "/auth/reset-password",
        body,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return data;
    },
    onSuccess: () => {
      alert("reset password success");
    },
    onError: () => {
      alert("reset password failed");
    },
  });
};

export default useResetPassword;
