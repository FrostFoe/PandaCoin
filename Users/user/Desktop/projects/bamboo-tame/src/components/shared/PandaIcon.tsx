import type { SVGProps } from "react";

export function PandaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2c-3 0-5.5 2-5.5 5.5S9 13 12 13s5.5-2 5.5-5.5S15 2 12 2Z" />
      <path d="M5.1 10.3c-1.3 1-2.1 2.5-2.1 4.2 0 3.3 2.7 6 6 6s6-2.7 6-6c0-1.7-.8-3.2-2.1-4.2" />
      <path d="M8.5 8.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5S7.7 7 8.5 7s1.5.7 1.5 1.5Z" />
      <path d="M15.5 8.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5Z" />
      <path d="M12 13a4.4 4.4 0 0 0-4.5 3.5 1 1 0 0 0 1 1.5h7a1 1 0 0 0 1-1.5A4.4 4.4 0 0 0 12 13Z" />
      <path d="M7 16.5c.3 1.3 1.5 2.5 3 2.5s2.7-1.2 3-2.5" />
    </svg>
  );
}
