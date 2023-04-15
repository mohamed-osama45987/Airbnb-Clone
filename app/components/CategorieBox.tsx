"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategorieBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategorieBox: React.FC<CategorieBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handelClick = useCallback(() => {
    let currentQuery = {};

    // make query params into object
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    // make a new object to contain all the previous query parameters plus the newly clicked label
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // if you selected the same category twice just remove all categroy from the url (toggle)
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // construct the url
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // make the client go to the new url
    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handelClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer 
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />

      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategorieBox;
