import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="font-sans mt-10 h-screen">
      <SignUp path="/sign-up" />
    </div>
  );
}
