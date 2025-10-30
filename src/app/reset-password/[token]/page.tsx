import { ResetPasswordForm } from "./components/ResetPasswordForm";

interface ResetPasswordProps {
  params: Promise<{ token: string }>;
}

const ResetPassword = async (props: ResetPasswordProps) => {
  const { token } = await props.params;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPassword;
