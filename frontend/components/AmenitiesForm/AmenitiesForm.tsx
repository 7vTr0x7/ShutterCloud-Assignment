"use client";

import amenitiesData from "@/app/constants/amenities";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { z } from "zod";
import Navbar from "../Navbar";

import ImagesSection from "../ImagesSection/ImagesSection";
import UrlInput from "../Inputs/UrlInput";
import LandmarkForm from "../LandmarkForm/LandmarkForm";
import Amenities from "./Amenities";

import { Amenity } from "@/app/types/amenity";
import { IImage } from "@/app/types/image";
import ReraInput from "../Inputs/ReraInput";
import ProgressBar from "../ProgressBar/ProgressBar";

const formSchema = z.object({
  amenities: z
    .array(
      z.object({
        id: z.number(),
        text: z.string(),
        selected: z.boolean(),
      })
    )
    .refine((amenities) => amenities.some((amenity) => amenity.selected), {
      message: "At least one amenity must be selected",
    }),
  images: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        description: z.string().min(1, "Image description is required"),
        isPrimary: z.boolean(),
      })
    )
    .min(1, "At least one image is required")
    .refine((images) => images.some((img) => img.isPrimary), {
      message: "At least one image must be set as primary",
    }),
  urls: z.array(z.string().url("Invalid URL format")).optional(),
  rera: z.object({
    isRegistered: z.boolean().nullable(),
    numbers: z.array(
      z.string().regex(/^[A-Za-z0-9]+$/, "RERA Number must be alphanumeric")
    ),
  }),
  landmark: z.object({
    landmarkId: z.number(),
    distance: z.string().min(1, "Distance is required"),
    description: z.string().min(1, "Landmark description is required"),
    latitude: z.number(),
    longitude: z.number(),
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function AmenitiesForm() {
  const [amenities, setAmenities] = useState<Amenity[]>(amenitiesData);
  const [images, setImages] = useState<IImage[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [rera, setRera] = useState<{
    isRegistered: boolean | null;
    numbers: string[];
  }>({
    isRegistered: null,
    numbers: [],
  });
  const [landmark, setLandmark] = useState({
    landmarkId: 1,
    distance: "",
    description: "",
    latitude: 18.5233,
    longitude: 73.8553,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedData = localStorage.getItem("amenitiesFormData");
    if (savedData) {
      try {
        const parsedData: FormData = JSON.parse(savedData);
        setAmenities(parsedData.amenities || []);

        // Ensure `file` property exists for IImage[]
        setImages(
          (parsedData.images || []).map((image) => ({
            ...image,
            file: new File([], ""), // Placeholder empty File object
          }))
        );

        setUrls(parsedData.urls || []);
        setRera({
          isRegistered: parsedData.rera.isRegistered ?? null,
          numbers: parsedData.rera.numbers ?? [],
        });

        setLandmark(
          parsedData.landmark || {
            landmarkId: 1,
            distance: "",
            description: "",
            latitude: 18.5233,
            longitude: 73.8553,
          }
        );
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  const calculateProgress = () => {
    const totalFields = 5;
    let completedFields = 0;

    if (amenities.some((amenity) => amenity.selected)) completedFields++;
    if (images.length > 0 && images.some((img) => img.isPrimary))
      completedFields++;
    if (urls.length > 0) completedFields++;
    if (rera.isRegistered !== null) completedFields++;
    if (landmark.distance && landmark.description) completedFields++;

    return (completedFields / totalFields) * 100;
  };

  const validateAndSubmit = () => {
    try {
      const formData: FormData = {
        amenities,
        images: images.map((img) => ({
          id: img.id,
          url: img.url,
          description: img.description,
          isPrimary: img.isPrimary,
        })),
        urls,
        rera: {
          isRegistered: rera.isRegistered,
          numbers: rera.isRegistered ? rera.numbers : [],
        },
        landmark: {
          landmarkId: landmark.landmarkId,
          distance: landmark.distance,
          description: landmark.description,
          latitude: landmark.latitude,
          longitude: landmark.longitude,
        },
      };

      console.log("Submitting form data:", formData);
      formSchema.parse(formData);

      localStorage.setItem("amenitiesFormData", JSON.stringify(formData));
      toast.success("Form data saved successfully!");
      setErrors({});
      console.log("Form data saved:", formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          formattedErrors[path] = err.message;
        });
        setErrors(formattedErrors);
        toast.error("Please check for any empty fields");
        console.error("Validation errors:", formattedErrors);
      } else {
        console.error("Unexpected error during form submission:", error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="w-[60%] p-6">
        <div className="border-b border-b-gray-200">
          <h1 className="font-bold text-2xl">Update Amenities</h1>
          <p className="text-base py-1">
            Fill out the amenities below for this new project
          </p>
          <ProgressBar progress={calculateProgress()} />
        </div>

        <Amenities amenities={amenities} setAmenities={setAmenities} />
        {errors["amenities"] && (
          <p className="text-red-500 text-sm mt-1">{errors["amenities"]}</p>
        )}

        <ImagesSection images={images} setImages={setImages} />
        {errors["images"] && (
          <p className="text-red-500 text-sm mt-1">{errors["images"]}</p>
        )}

        <UrlInput urls={urls} setUrls={setUrls} />
        {errors["urls"] && (
          <p className="text-red-500 text-sm mt-1">{errors["urls"]}</p>
        )}

        <ReraInput
          isRegistered={rera.isRegistered}
          setIsRegistered={(val) =>
            setRera((prev) => ({ ...prev, isRegistered: val }))
          }
          reraNumbers={rera.numbers}
          setReraNumbers={(val) =>
            setRera((prev) => ({ ...prev, numbers: val }))
          }
        />
        {errors["rera"] && (
          <p className="text-red-500 text-sm mt-1">{errors["rera"]}</p>
        )}

        <LandmarkForm formData={landmark} setFormData={setLandmark} />
        {errors["landmark"] && (
          <p className="text-red-500 text-sm mt-1">{errors["landmark"]}</p>
        )}

        <div className="flex items-center justify-between">
          <button className="px-4 py-2 bg-[#df4469] text-white rounded-lg mt-5">
            Preview
          </button>
          <button
            className="px-4 py-2 bg-[#df4469] text-white rounded-lg mt-5"
            onClick={validateAndSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
