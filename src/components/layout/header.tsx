import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { BambooCounter } from "../game/bamboo-counter";
import { ThemeToggle } from "./theme-toggle";
import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { LogIn } from "lucide-react";

export async function Header() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <BambooCounter />
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        {!isUserAuthenticated ? (
          <LoginLink>
            <Button variant="outline" size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </LoginLink>
        ) : (
          <UserNav />
        )}
      </div>
    </header>
  );
}
