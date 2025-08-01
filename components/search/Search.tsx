type MyComponentProps = {
  fromList: boolean;
};

const Search = ({ fromList }: MyComponentProps) => {
  return (
    <>
      <div className="lg:max-h-[250px] mt-6 bg-white rounded-2xl">
        <div
          id="searchParams "
          className={`grid grid-cols-3 p-10  ${fromList && "!shadow-none"}`}
        >
          <div>
            <span>Destination</span>
            <h4 className="mt-2">
              <select
                name="destination"
                id="destination"
                className="border border-black rounded-md py-2 px-4"
              >
                <option value="Bali">Bali</option>
                <option value="Bali">Cox's Bazar</option>
                <option value="Bali">Sylhet</option>
                <option value="Bali">Saint Martin</option>
                <option value="Bali">Bali</option>
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
              />
            </h4>
          </div>
        </div>
      </div>

      <button className=" bg-amber-500 px-8 py-3 rounded-md block mx-auto text-white font-bold -translate-y-1/2 cursor-pointer">
        🔍️ {fromList ? "Modify Search" : "Search"}
      </button>
    </>
  );
};

export default Search;
