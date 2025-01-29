'use client'
import { Input } from "@heroui/react";
import * as actions from "@/actions";
import { useSearchParams } from "next/navigation";
export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
export default function SearchInput() {
  const searchParams = useSearchParams()
  const content = searchParams.get('searchContent')!
  return (
    <div className="w-[200px]  mt-2 rounded-2xl flex justify-center items-center bg-gradient-to-tr from-purple-200 to-white text-white shadow-lg">
    <form action={actions.search}>

    <Input
      name="searchContent"
      defaultValue={content}
      isClearable
      classNames={{
        input: [
          "bg-transparent",
          "text-black/90 dark:text-white/90",
          "placeholder:text-default-700/50 dark:placeholder:text-white/60",
        ],
        innerWrapper: "bg-transparent",
        inputWrapper: [
          "! bg-default-200/50",

          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "hover:bg-default-200/70",

          "group-data-[focus=true]:bg-default-200/50",

          "!cursor-text",
        ],
      }}

      placeholder="Type to search..."
      radius="lg"
      startContent={
        <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
    </form>
  </div>
  );
}