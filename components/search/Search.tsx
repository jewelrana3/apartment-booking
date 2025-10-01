"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Search = ({
  fromList,
  destination,
  checkin,
  checkout,
}: {
  fromList?: boolean;
  destination?: string;
  checkin?: string;
  checkout?: string;
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [allowSearch, setAllowSearch] = useState(true);

  const [searchTerm, setSearchTerm] = useState({
    destination: destination ?? "Puglia",
    checkin: checkin ?? "",
    checkout: checkout ?? "",
  });

  const handleInputs = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedState = { ...searchTerm, [name]: value };

    if (
      updatedState.checkin &&
      updatedState.checkout &&
      new Date(updatedState.checkin).getTime() >
        new Date(updatedState.checkout).getTime()
    ) {
      setAllowSearch(false);
    } else {
      setAllowSearch(true);
    }

    setSearchTerm(updatedState);
  };

  const doSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    params.set("destination", searchTerm.destination || "all");

    if (searchTerm.checkin && searchTerm.checkout) {
      params.set("checkin", searchTerm.checkin);
      params.set("checkout", searchTerm.checkout);
    }

    const newPath = pathname.includes("hotels")
      ? `http://10.10.7.54:3000/${pathname}?${params.toString()}`
      : `http://10.10.7.54:3000/${pathname}/hotels?${params.toString()}`;

    replace(newPath);
  };

  return (
    <>
      <div className="lg:max-h-[250px] mt-6 bg-white rounded-2xl">
        <div
          id="searchParams"
          className={`grid grid-cols-3 p-10 ${fromList ? "!shadow-none" : ""}`}
        >
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                name="destination"
                id="destination"
                className="border border-black rounded-md py-2 px-4"
                value={searchTerm.destination}
                onChange={handleInputs}
              >
                <option value="Puglia">Puglia</option>
                <option value="Catania">Catania</option>
                <option value="Palermo">Palermo</option>
                <option value="Frejus">Frejus</option>
                <option value="Paris">Paris</option>
              </select>
            </h4>
          </div>

          <div>
            <span>Check in</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkin"
                id="checkin"
                className="border border-black rounded-md p-2"
                value={searchTerm.checkin}
                onChange={handleInputs}
              />
            </h4>
          </div>

          <div>
            <span>Checkout</span>
            <h4 className="mt-2">
              <input
                type="date"
                name="checkout"
                id="checkout"
                className="border border-black rounded-md p-2"
                value={searchTerm.checkout}
                onChange={handleInputs}
              />
            </h4>
          </div>
        </div>
      </div>

      <button
        disabled={!allowSearch}
        onClick={doSearch}
        className={`bg-amber-500 px-8 py-3 rounded-md block mx-auto text-white font-bold -translate-y-1/2 ${
          allowSearch ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }`}
      >
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
