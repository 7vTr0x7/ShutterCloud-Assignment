import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { z } from "zod";

// Define URL validation schema using Zod
const urlSchema = z
  .string()
  .regex(
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|linkedin\.com\/in\/|github\.com\/)/,
    "Invalid URL! Only YouTube, LinkedIn, and GitHub URLs are allowed."
  );

const MAX_INPUTS = 3;

const urlTypes = [
  {
    title: "YouTube URL",
    placeholder: "https://www.youtube.com/watch?v=example",
  },
  { title: "LinkedIn URL", placeholder: "https://www.linkedin.com/in/example" },
  { title: "GitHub URL", placeholder: "https://github.com/example" },
];

type UrlInputProps = {
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
};

const UrlInput = ({ urls, setUrls }: UrlInputProps) => {
  const [errors, setErrors] = useState<(string | null)[]>([]);

  // Initialize empty error array that matches urls length
  useEffect(() => {
    setErrors(new Array(urls.length).fill(null));
  }, []);

  const handleInputChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);

    try {
      urlSchema.parse(value);
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = null;
        return newErrors;
      });
    } catch (error) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = (error as z.ZodError).errors[0].message;
        return newErrors;
      });
    }
  };

  const addNewUrlField = () => {
    if (urls.length < MAX_INPUTS) {
      setUrls([...urls, ""]);
      setErrors([...errors, null]);
    }
  };

  return (
    <div className="py-7 space-y-3">
      {urls.map((url, index) => (
        <div key={index} className="flex flex-col">
          <label className="text-sm font-semibold">
            {urlTypes[index]?.title || `URL ${index + 1}`}
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={`mt-1 p-2 border w-full rounded-md ${
              errors[index] ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={urlTypes[index]?.placeholder || "Enter URL"}
          />
          {errors[index] && (
            <span className="text-sm text-red-500 mt-1">{errors[index]}</span>
          )}
        </div>
      ))}
      {
        <button
          onClick={addNewUrlField}
          disabled={urls.length === MAX_INPUTS}
          className="flex items-center px-3 py-1 border border-gray-400 rounded-md mt-2 cursor-pointer">
          <CiCirclePlus className="w-5 h-5 mr-2" />
          Add another URL
        </button>
      }
    </div>
  );
};

export default UrlInput;
