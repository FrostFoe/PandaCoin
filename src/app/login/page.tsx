"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { Suspense } from "react";

function LoginPageContent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/30 p-4">
      <LoginForm mode="login" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
