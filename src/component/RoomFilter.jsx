"use client";

import React, {
  useState,
  useTransition,
} from "react";

import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

const RoomFilter = () => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams =
    useSearchParams();

  const [isPending, startTransition] =
    useTransition();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [
    selectedAmenities,
    setSelectedAmenities,
  ] = useState(() => {
    const amenities =
      searchParams.get("amenities");

    return amenities
      ? amenities.split(",")
      : [];
  });

  // DATABASE MATCHING AMENITIES
  const amenitiesList = [
    "WiFi",
    "Coffee",
    "Smart TV",
    "Printer",
  ];

  const updateQueryParams = (
    newParams
  ) => {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    Object.entries(newParams).forEach(
      ([key, value]) => {
        if (
          !value ||
          value.length === 0
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
    );

    startTransition(() => {
      router.replace(
        `${pathname}?${params.toString()}`,
        {
          scroll: false,
        }
      );
    });
  };

  // SEARCH
  const handleSearch = (value) => {
    setSearch(value);

    updateQueryParams({
      search: value,
    });
  };

  // AMENITIES
  const handleAmenityChange = (
    amenity,
    checked
  ) => {
    let updatedAmenities = [];

    if (checked) {
      updatedAmenities = [
        ...selectedAmenities,
        amenity,
      ];
    } else {
      updatedAmenities =
        selectedAmenities.filter(
          (item) =>
            item !== amenity
        );
    }

    setSelectedAmenities(
      updatedAmenities
    );

    updateQueryParams({
      amenities:
        updatedAmenities.join(","),
    });
  };

  // RESET
  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);

    router.replace(pathname, {
      scroll: false,
    });
  };

  return (
    <div className="w-full lg:w-80 bg-white rounded-3xl p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">
          Filters
        </h2>

        <button
          onClick={handleReset}
          className="text-sm text-orange-600 font-semibold"
        >
          Reset
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <p className="font-semibold mb-2">
          Search
        </p>

        <input
          type="text"
          placeholder="Search room..."
          value={search}
          onChange={(e) =>
            handleSearch(
              e.target.value
            )
          }
          className="w-full border p-3 rounded-xl outline-none"
        />
      </div>

      {/* AMENITIES */}
      <div>
        <p className="font-semibold mb-3">
          Amenities
        </p>

        <div className="space-y-3">
          {amenitiesList.map(
            (amenity) => (
              <label
                key={amenity}
                className="flex items-center justify-between"
              >
                <span>
                  {amenity}
                </span>

                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(
                    amenity
                  )}
                  onChange={(e) =>
                    handleAmenityChange(
                      amenity,
                      e.target.checked
                    )
                  }
                />
              </label>
            )
          )}
        </div>
      </div>

      {isPending && (
        <p className="mt-4 text-sm text-orange-500">
          Filtering...
        </p>
      )}
    </div>
  );
};

export default RoomFilter;