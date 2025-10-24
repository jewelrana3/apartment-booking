"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const starRatings = [
  { id: "fiveStar", name: "5", label: "5 Star" },
  { id: "fourStar", name: "4", label: "4 Star" },
  { id: "threeStar", name: "3", label: "3 Star" },
  { id: "twoStar", name: "2", label: "2 Star" },
  { id: "oneStar", name: "1", label: "1 Star" },
];

export default function FilterByStarCategory() {
  const [query, setQuery] = useState<string[]>([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const checked = e.target.checked;

    if (checked) {
      setQuery((prev) => [...prev, name]);
    } else {
      setQuery((prev) => prev.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    const category = params.get("category");
    if (category) {
      const decodedCategory = decodeURIComponent(category);
      const queryInCategory = decodedCategory.split("|");
      setQuery(queryInCategory);
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      params.set("category", query.join("|"));
    } else {
      params.delete("category");
    }

    replace(`${pathname}?${params.toString()}`);
  }, [query]);

  return (
    <div>
      <h3 className="font-bold text-lg">Star Category</h3>
      <form action="" className="flex flex-col gap-2 mt-2">
        {starRatings?.map((item) => (
          <label htmlFor="fiveStar" key={item?.id}>
            <input
              type="checkbox"
              name={item?.name}
              checked={query?.includes(item?.name)}
              id={item?.id}
              onChange={handleChange}
            />{" "}
            {item?.label}
          </label>
        ))}
      </form>
    </div>
  );
}
