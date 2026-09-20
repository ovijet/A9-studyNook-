"use client";

import React, { useState, useTransition } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { Search, RotateCcw, SlidersHorizontal, Check } from "lucide-react";

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
    { label: "Wi-Fi", icon: "📶" },
    { label: "Whiteboard", icon: "📝" },
    { label: "Projector", icon: "📽️" },
    { label: "Air Conditioning", icon: "❄️" },
    { label: "Quiet Zone", icon: "🤫" },
    { label: "Power Outlets", icon: "🔌" },
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

  const handleAmenityChange = (amenityLabel, checked) => {
    let updated = checked
      ? [...selectedAmenities, amenityLabel]
      : selectedAmenities.filter((item) => item !== amenityLabel);

    setSelectedAmenities(updated);
    updateQueryParams({ amenities: updated.join(",") });
  };

  const handleReset = () => {
    setSearch("");
    setSelectedAmenities([]);
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="w-full lg:w-80 bg-white border border-slate-200/90 rounded-3xl p-6 shadow-xs space-y-6 sticky top-24">

      {/* HEADER */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-orange-500" />
          <h2 className="text-lg font-bold text-slate-900">
            Filter Rooms
          </h2>
        </div>

        {(search || selectedAmenities.length > 0) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700 font-bold transition"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* SEARCH INPUT */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Search by Name
        </label>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="e.g. Quiet Cell 3..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition"
          />
        </div>
      </div>

      {/* AMENITIES CHECKBOX GROUP */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Amenities
        </label>

        <div className="space-y-2">
          {amenitiesList.map((amenity) => {
            const isChecked = selectedAmenities.includes(amenity.label);

            return (
              <label
                key={amenity.label}
                className={`flex items-center justify-between cursor-pointer p-3 rounded-2xl border transition-all ${
                  isChecked
                    ? "bg-orange-50/80 border-orange-200 text-orange-900 shadow-2xs"
                    : "bg-slate-50/50 border-slate-200/70 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-base">{amenity.icon}</span>
                  <span>{amenity.label}</span>
                </div>

                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) =>
                      handleAmenityChange(amenity.label, e.target.checked)
                    }
                    className="sr-only"
                  />

                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-orange-500 border-orange-500 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* LOADING STATE INDICATOR */}
      {isPending && (
        <div className="pt-2 text-center text-xs font-medium text-orange-600 animate-pulse flex items-center justify-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
          <span>Updating filter results...</span>
        </div>
      )}
    </div>
  );
};

export default RoomFilter;