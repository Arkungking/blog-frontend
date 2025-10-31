import { loginSchema } from "@/app/login/schema";
import { axiosInstance2 } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const useLogin = () => {

    const router = useRouter()

  return useMutation({
    mutationFn: async (body: z.infer<typeof loginSchema>) => {
      const { data } = await axiosInstance2.post("/auth/login", body);
      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, redirect: false });
      toast("login success");
      router.push("/")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast(error.response?.data.message ?? "Something went wrong");
    },
  });
};

export default useLogin;
