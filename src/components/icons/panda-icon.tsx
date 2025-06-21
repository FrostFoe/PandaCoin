import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function PandaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn("text-foreground", props.className)}
    >
      <path
        d="M12 2a10 10 0 0 0-3.5 19.33A10 10 0 0 0 12 22a10 10 0 0 0 3.5-2.67A10 10 0 0 0 12 2z"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M8.5 7A2.5 2.5 0 0 1 11 9.5V10h-5V9.5A2.5 2.5 0 0 1 8.5 7z"
        fill="black"
      />
      <path
        d="M15.5 7a2.5 2.5 0 0 0-2.5 2.5V10h5V9.5A2.5 2.5 0 0 0 15.5 7z"
        fill="black"
      />
      <circle cx="9" cy="14" r="2" fill="black" />
      <circle cx="15" cy="14" r="2" fill="black" />
      <path
        d="M12 11a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z"
        fill="black"
      />
    </svg>
  );
}
