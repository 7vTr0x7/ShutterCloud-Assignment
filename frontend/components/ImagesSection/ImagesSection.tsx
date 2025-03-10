import { IImage } from "@/app/types/image";
import { useState } from "react";
import { LuHousePlus } from "react-icons/lu";
import ImageCard from "./ImageCard";

const ImagesSection = () => {
  const [images, setImages] = useState<IImage[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: URL.createObjectURL(file),
      file,
      url: URL.createObjectURL(file),
      description: "",
      isPrimary: images.length === 0,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault(); // Prevent default behavior (open file in browser)
  };

  return (
    <div className="my-3">
      <h3 className="font-semibold text-sm text-[#df4469]">Images</h3>

      <label
        className="flex justify-center text-center text-gray-400 items-center border-2 border-dotted border-gray-400 w-[80%] py-8 px-5 rounded-lg my-4 cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="text-center flex flex-col items-center gap-2">
          <LuHousePlus className="text-5xl" />
          <p>Click or drag image here to upload</p>
        </div>
      </label>

      {images.length > 0 && (
        <>
          <h4 className="font-semibold text-xl mt-3">Uploaded Images</h4>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {images.map((image) => (
              <div key={image.id}>
                <ImageCard image={image} setImages={setImages} />
              </div>
            ))}
          </div>
          <p className="text-[#df4469] text-sm my-3">Add atleast one media</p>
        </>
      )}
    </div>
  );
};

export default ImagesSection;
