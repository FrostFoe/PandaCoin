import type { SVGProps } from "react";

export function PandaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M16.5,15.5c-1.1,0-2.12-0.53-2.75-1.37 c-0.63,0.84-1.65,1.37-2.75,1.37s-2.12-0.53-2.75-1.37c-0.63,0.84-1.65,1.37-2.75,1.37C4.01,15.5,3,14.49,3,13.25 c0-0.74,0.36-1.4,0.92-1.83C4.55,10.66,5.74,10,7,10c1.26,0,2.45,0.66,3.08,1.42c0.63-0.76,1.82-1.42,3.08-1.42 c1.26,0,2.45,0.66,3.08,1.42C20.45,10.66,21.64,10,22.92,10c0.03,0,0.05,0.01,0.08,0.01C21,4.4,16.97,2,12,2z" />
      <circle cx="8.5" cy="11.5" r="1.5" />
      <circle cx="15.5" cy="11.5" r="1.5" />
    </svg>
  );
}
