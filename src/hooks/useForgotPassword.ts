import { forgotPasswordSchema } from "@/app/forgot-password/schema";
import { axiosInstance2 } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (body: z.infer<typeof forgotPasswordSchema>) => {
      const { data } = await axiosInstance2.post("/auth/forgot-password", body);
      return data;
    },
    onSuccess: () => {
      alert("send email success");
    },
    onError: () => {
      alert("send email failed");
    },
  });
};

export default useForgotPassword;
