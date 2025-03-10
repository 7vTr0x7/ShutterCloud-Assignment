import React, { Dispatch, SetStateAction } from "react";
import { IImage } from "../../app/types/image";
import Image from "next/image";

import { RxCross2 } from "react-icons/rx";

type ImageCardProps = {
  image: IImage;
  setImages: Dispatch<SetStateAction<IImage[]>>;
};

const ImageCard = ({ image, setImages }: ImageCardProps) => {
  const handleDescriptionChange = (id: string, value: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, description: value } : img))
    );
  };

  const handlePrimaryChange = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isPrimary: img.id === id ? !img.isPrimary : false,
      }))
    );
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className={`relative p-2 bg-gray-100 rounded-lg `}>
      <div
        className="absolute right-[-13px] top-[-13px] flex items-center justify-center h-8 w-8 bg-gray-200 text-lg rounded-full cursor-pointer"
        onClick={() => handleRemoveImage(image.id)}>
        <RxCross2 />
      </div>

      <Image
        src={image.url}
        alt="Uploaded"
        width={200}
        height={150}
        className="w-full h-[160px] object-cover rounded"
      />

      <div className="flex justify-between items-center mt-2">
        <div className="w-1/2">
          <h3 className="text-sm font-semibold mb-1">Description</h3>
          <input
            type="text"
            placeholder="Add label"
            className="border border-gray-300 p-2 w-full text-sm rounded"
            value={image.description}
            onChange={(e) => handleDescriptionChange(image.id, e.target.value)}
          />
        </div>

        <div className="w-1/2 flex flex-col items-center">
          <h3 className="text-sm font-semibold mb-1">Set Primary</h3>
          <button
            className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
              image.isPrimary
                ? "bg-red-600 justify-end"
                : "bg-gray-300 justify-start"
            }`}
            onClick={() => handlePrimaryChange(image.id)}>
            <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
