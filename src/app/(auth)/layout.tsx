import Link from "next/link";
import { PandaIcon } from "@/components/icons/panda-icon";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-background p-4">
      <div className="absolute top-6 left-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <PandaIcon className="h-8 w-8" />
          <span className="font-bold font-headline text-lg">Bamboo Tame</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
