"use client";

import React, { useState, useTransition } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";

const RoomFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [selectedAmenities, setSelectedAmenities] = useState(() => {
    const amenities = searchParams.get("amenities");
    return amenities ? amenities.split(",") : [];
  });

  const amenitiesList = [
    "WiFi",
    "Coffee",
    "Smart TV",
    "Printer",
  ];

  const updateQueryParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (!value || value.length === 0) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  const handleSearch = (value) => {
    setSearch(value);
    updateQueryParams({ search: value });
  };

  const handleAmenityChange = (amenity, checked) => {
    let updated = checked
      ? [...selectedAmenities, amenity]
      : selectedAmenities.filter((item) => item !== amenity);

    setSelectedAmenities(updated);
    updateQueryParams({ amenities: updated.join(",") });
  };

  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="w-full lg:w-80 bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Filters
        </h2>

        <button
          onClick={handleReset}
          className="text-sm text-orange-500 font-semibold hover:text-orange-600"
        >
          Reset
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Search
        </p>

        <input
          type="text"
          placeholder="Search room..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* AMENITIES */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Amenities
        </p>

        <div className="space-y-3">

          {amenitiesList.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity);

            return (
              <label
                key={amenity}
                className="flex items-center justify-between cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition"
              >

                {/* LEFT */}
                <span className="text-gray-700 text-sm">
                  {amenity}
                </span>

                {/* CUSTOM CHECKBOX */}
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      handleAmenityChange(amenity, e.target.checked)
                    }
                    className="peer hidden"
                  />

                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                      isChecked
                        ? "bg-orange-500 border-orange-500"
                        : "border-gray-300"
                    }`}
                  >
                    {isChecked && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                </div>

              </label>
            );
          })}

        </div>
      </div>

      {/* LOADING STATE */}
      {isPending && (
        <p className="mt-4 text-sm text-orange-500">
          Filtering results...oviiiiiiiiiiii
        </p>
      )}
    </div>
  );
};

export default RoomFilter;