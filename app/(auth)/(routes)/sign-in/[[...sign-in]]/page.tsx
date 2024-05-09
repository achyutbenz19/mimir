import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="font-sans mt-10 h-screen">
      <SignIn path="/sign-in" />
    </div>
  );
}
