import Link from "next/link";
import { PandaIcon } from "@/components/icons/panda-icon";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary/50 p-4">
       <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <PandaIcon className="h-8 w-8 text-primary" />
           <span className="font-bold font-headline text-lg">Bamboo Tame</span>
        </Link>
      </div>
      {children}
    </div>
  );
}
