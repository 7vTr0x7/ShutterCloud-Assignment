import { Amenity } from "@/app/types/amenity";
import { Dispatch, SetStateAction, useEffect } from "react";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { GoCircle } from "react-icons/go";

type AmenitiesProps = {
  amenities: Amenity[];
  setAmenities: Dispatch<SetStateAction<Amenity[]>>;
};

export default function Amenities({ amenities, setAmenities }: AmenitiesProps) {
  useEffect(() => {}, [amenities]);

  const handleToggleSelection = (id: number) => {
    setAmenities((prevAmenities) =>
      prevAmenities.map((amenity) =>
        amenity.id === id
          ? { ...amenity, selected: !amenity.selected }
          : amenity
      )
    );
  };

  const handleSelectAllAmenity = () => {
    const allSelected = amenities.every((amenity) => amenity.selected);
    setAmenities(
      amenities.map((amenity) => ({ ...amenity, selected: !allSelected }))
    );
  };

  return (
    <>
      <div className="flex justify-between items-center py-5 border-b border-b-gray-200">
        <h1 className="font-bold text-xl">Amenities</h1>
        <button
          className="flex items-center gap-2 px-2 py-1 text-black border border-green-300 rounded-md"
          onClick={handleSelectAllAmenity}>
          <span className="text-xl">
            {amenities.every((amenity) => amenity.selected) ? (
              <CiCircleMinus />
            ) : (
              <CiCirclePlus />
            )}
          </span>
          <span className="text-sm font-medium cursor-pointer">
            {amenities.every((amenity) => amenity.selected)
              ? "Unselect all"
              : "Select all"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 py-3">
        {amenities.map((amenity) => (
          <div
            key={amenity.id}
            className="col-span-1 flex gap-1 mb-3 items-center cursor-pointer"
            onClick={() => handleToggleSelection(amenity.id)}>
            <span className="text-xl">
              {amenity.selected ? (
                <FaCircleCheck className="text-[#df4469]" />
              ) : (
                <GoCircle />
              )}
            </span>
            <span className="text-sm whitespace-nowrap">{amenity.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
