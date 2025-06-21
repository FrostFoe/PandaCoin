import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function PandaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Z"
        className="fill-background stroke-foreground"
      />
      <path
        d="M8.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
        className="fill-foreground stroke-none"
      />
      <path
        d="M15.5 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
        className="fill-foreground stroke-none"
      />
      <path
        d="M12 11.5a1 1 0 0 1 1 1v0a1 1 0 0 1-2 0v0a1 1 0 0 1 1-1Z"
        className="fill-foreground stroke-none"
      />
      <path
        d="M10.5 15.5c.5.5 1.2.5 1.5.5s1.5-.5 2-1"
        className="stroke-foreground"
        fill="none"
      />
    </svg>
  );
}
