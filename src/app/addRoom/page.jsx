"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { PlusCircle, Sparkles, Image as ImageIcon, DollarSign, Users, Layers, FileText, Check } from "lucide-react";

const amenitiesList = [
    { key: "whiteboard", label: "Whiteboard", icon: "📝" },
    { key: "projector", label: "Projector", icon: "📽️" },
    { key: "wifi", label: "Wi-Fi", icon: "📶" },
    { key: "power", label: "Power Outlets", icon: "🔌" },
    { key: "quiet", label: "Quiet Zone", icon: "🤫" },
    { key: "ac", label: "Air Conditioning", icon: "❄️" },
];

const AddRoomPage = () => {
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleCheckboxChange = (amenityLabel) => {
        if (selectedAmenities.includes(amenityLabel)) {
            setSelectedAmenities(selectedAmenities.filter(a => a !== amenityLabel));
        } else {
            setSelectedAmenities([...selectedAmenities, amenityLabel]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const room = Object.fromEntries(formData.entries());

        room.amenities = selectedAmenities;
        room.capacity = Number(room.capacity);
        room.hourlyRate = Number(room.hourlyRate);
        room.floor = room.floor ? Number(room.floor) : 1;

        try {
            const session = await authClient.getSession();
            const email = session?.data?.user?.email;

            if (!email) {
                toast.error("Please sign in to list a study room");
                setIsSubmitting(false);
                return;
            }

            room.ownerEmail = email;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/study`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(room),
                }
            );

            const data = await res.json();

            if (res.ok) {
                toast.success("Study room listed successfully!");
                router.push("/listings");
            } else {
                toast.error(data?.message || "Failed to add study room");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while listing room");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="bg-slate-50/50 min-h-screen py-12 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* PAGE HEADER */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} className="text-orange-500" />
                        <span>Host & Share Spaces</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        List a New Study Room
                    </h1>

                    <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                        Share your quiet room or workspace with university students and earn hourly income.
                    </p>
                </div>

                {/* FORM CONTAINER */}
                <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/40">
                    <form onSubmit={onSubmit} className="space-y-8">
                        
                        {/* SECTION 1: BASIC INFORMATION */}
                        <div className="space-y-4">
                            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                                <FileText size={18} className="text-orange-500" />
                                <span>Basic Information</span>
                            </h2>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                    Room Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    required
                                    name="roomName"
                                    type="text"
                                    placeholder="e.g. Quiet Innovation Lab 4B"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                                    Room Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    name="description"
                                    rows={4}
                                    placeholder="Describe the room environment, atmosphere, seating comfort, noise isolation..."
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        {/* SECTION 2: AMENITIES SELECTION GRID */}
                        <div className="space-y-4">
                            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                                <Sparkles size={18} className="text-orange-500" />
                                <span>Select Available Amenities</span>
                            </h2>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {amenitiesList.map((amenity) => {
                                    const isSelected = selectedAmenities.includes(amenity.label);
                                    return (
                                        <div
                                            key={amenity.key}
                                            onClick={() => handleCheckboxChange(amenity.label)}
                                            className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer select-none transition-all ${
                                                isSelected
                                                    ? 'bg-orange-50 border-orange-300 text-orange-950 shadow-xs'
                                                    : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition ${
                                                isSelected ? 'bg-orange-500 border-orange-500 text-white' : 'border-slate-300 bg-white'
                                            }`}>
                                                {isSelected && <Check size={12} strokeWidth={3} />}
                                            </div>
                                            <span className="text-base">{amenity.icon}</span>
                                            <span className="text-xs font-semibold">{amenity.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* SECTION 3: CAPACITY & PRICING & MEDIA */}
                        <div className="space-y-4">
                            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                                <DollarSign size={18} className="text-orange-500" />
                                <span>Capacity, Pricing & Image</span>
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                                        <Users size={14} className="text-slate-400" />
                                        <span>Seat Capacity</span>
                                    </label>
                                    <input
                                        required
                                        name="capacity"
                                        type="number"
                                        min="1"
                                        placeholder="e.g. 4"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                                        <DollarSign size={14} className="text-slate-400" />
                                        <span>Hourly Rate ($)</span>
                                    </label>
                                    <input
                                        required
                                        name="hourlyRate"
                                        type="number"
                                        min="1"
                                        step="0.5"
                                        placeholder="e.g. 15"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                                        <Layers size={14} className="text-slate-400" />
                                        <span>Floor Number</span>
                                    </label>
                                    <input
                                        name="floor"
                                        type="number"
                                        min="0"
                                        placeholder="e.g. 3"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1">
                                    <ImageIcon size={14} className="text-slate-400" />
                                    <span>Image URL <span className="text-red-500">*</span></span>
                                </label>
                                <input
                                    required
                                    name="image"
                                    type="url"
                                    placeholder="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition"
                                />
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all flex items-center justify-center gap-2"
                            >
                                <PlusCircle size={20} />
                                <span>{isSubmitting ? "Submitting Listing..." : "Publish Study Room Listing"}</span>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AddRoomPage;