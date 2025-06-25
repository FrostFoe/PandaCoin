"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { Suspense } from "react";

function SignupPageContent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30 p-4">
      <LoginForm mode="signup" />
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignupPageContent />
    </Suspense>
  );
}
