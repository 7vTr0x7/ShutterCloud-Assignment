import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { z } from "zod";

const reraSchema = z
  .string()
  .regex(
    /^[A-Za-z0-9]+$/,
    "Invalid RERA Number! Only alphanumeric characters are allowed."
  );

const MAX_INPUTS = 3;

const ReraInput = () => {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [reraNumbers, setReraNumbers] = useState<string[]>([""]);
  const [errors, setErrors] = useState<string[]>([""]);

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

  const handleYesSelection = () => {
    setIsRegistered(true);
    if (reraNumbers.length === 0) {
      setReraNumbers([""]);
    }
  };

  const handleNoSelection = () => {
    setIsRegistered(false);
    setReraNumbers([]);
    setErrors([]);
  };

  return (
    <div className=" space-y-3">
      <div className="flex items-center justify-between w-full space-x-4 border px-3 py-4 rounded-lg border-gray-200">
        <span className="text-sm font-semibold ">
          Is the project RERA registered?
        </span>
        <div className="flex items-center space-x-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="rera"
              value="yes"
              checked={isRegistered === true}
              onChange={handleYesSelection}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 ${
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
              onChange={handleNoSelection}
              className="hidden"
            />
            <span
              className={`w-4 h-4 rounded-full border-2 ${
                isRegistered === false
                  ? "bg-gray-500 border-gray-500"
                  : "border-gray-400"
              }`}
            />
            <span>No</span>
          </label>
        </div>
      </div>

      {isRegistered && (
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
          {
            <button
              onClick={addNewReraField}
              disabled={reraNumbers.length === MAX_INPUTS}
              className="flex items-center px-3 py-1 border border-gray-400 rounded-md  mt-2 cursor-pointer">
              <CiCirclePlus className="w-5 h-5 mr-2" />
              Add another RERA number
            </button>
          }
        </div>
      )}
    </div>
  );
};

export default ReraInput;
