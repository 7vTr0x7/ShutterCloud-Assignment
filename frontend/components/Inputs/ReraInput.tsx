import { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { z } from "zod";

const reraSchema = z
  .string()
  .regex(
    /^[A-Za-z0-9]+$/,
    "Invalid RERA Number! Only alphanumeric characters are allowed."
  );

const MAX_INPUTS = 3;

type ReraInputProps = {
  isRegistered: boolean | null;
  setIsRegistered: (val: boolean | null) => void;
  reraNumbers: string[];
  setReraNumbers: (numbers: string[]) => void;
};

const ReraInput = ({
  isRegistered,
  setIsRegistered,
  reraNumbers,
  setReraNumbers,
}: ReraInputProps) => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setErrors(new Array(reraNumbers.length).fill(""));
  }, [reraNumbers]);

  const handleReraChange = (index: number, value: string) => {
    const newReraNumbers = [...reraNumbers];
    newReraNumbers[index] = value;
    setReraNumbers(newReraNumbers);

    try {
      reraSchema.parse(value);
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors];
        newErrors[index] = "";
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

  const addNewReraField = () => {
    if (reraNumbers.length < MAX_INPUTS) {
      setReraNumbers([...reraNumbers, ""]);
      setErrors([...errors, ""]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between w-full space-x-4 border px-3 py-4 rounded-lg border-gray-200">
        <span className="text-sm font-semibold">
          Is the project RERA registered?
        </span>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="rera"
              value="yes"
              checked={isRegistered === true}
              onChange={() => {
                setIsRegistered(true);
                if (reraNumbers.length === 0) {
                  setReraNumbers([""]);
                }
              }}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                isRegistered === true
                  ? "bg-red-500 border-red-500"
                  : "border-gray-400"
              }`}
            />
            <span>Yes</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="rera"
              value="no"
              checked={isRegistered === false}
              onChange={() => {
                setIsRegistered(false);
                setReraNumbers([]);
                setErrors([]);
              }}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                isRegistered === false
                  ? "bg-red-500 border-red-500" // Turns red when "No" is selected
                  : "border-gray-400"
              }`}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {isRegistered === true && (
        <div className="space-y-3">
          <label className="text-sm font-semibold">RERA Number(s)</label>
          {reraNumbers.map((rera, index) => (
            <div key={index} className="flex flex-col">
              <input
                type="text"
                value={rera}
                onChange={(e) => handleReraChange(index, e.target.value)}
                className={`mt-1 p-2 border rounded-md ${
                  errors[index] ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter RERA Number"
              />
              {errors[index] && (
                <span className="text-sm text-red-500 mt-1">
                  {errors[index]}
                </span>
              )}
            </div>
          ))}

          <button
            onClick={addNewReraField}
            disabled={reraNumbers.length >= MAX_INPUTS}
            className={`flex items-center px-3 py-1 border rounded-md mt-2 cursor-pointer ${
              reraNumbers.length >= MAX_INPUTS
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-400"
            }`}>
            <CiCirclePlus className="w-5 h-5 mr-2" />
            Add another RERA number
          </button>
        </div>
      )}
    </div>
  );
};

export default ReraInput;
