"use client";

import Navbar from "./Navbar";

import Amenities from "./Amenities";
import { useState } from "react";

export default function AmenitiesForm() {
  const [isAmenitySelected, setIsAmenitySelected] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <div className="w-[60%] p-6 ">
        <div className=" border-b border-b-gray-200">
          <h1 className="font-bold text-2xl">Update Amenities</h1>
          <p className="text-base py-1">
            Fill out the amenities below of this new project
          </p>
          <div className="px-5 py-10"></div>
        </div>
        <Amenities setIsAmenitySelected={setIsAmenitySelected} />
      </div>
    </>
  );
}
