import type { SVGProps } from "react";

export function PandaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-6c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v1c0 .55-.45 1-1 1zm4 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      <path d="M16 8.5c0-.83-.67-1.5-1.5-1.5S13 7.67 13 8.5v.5h3v-.5zM8 8.5C8 7.67 7.33 7 6.5 7S5 7.67 5 8.5v.5h3v-.5z" fill="#000" />
    </svg>
  );
}
