import { useEffect, useState } from "react";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full mt-5 mb-4 px-5 ">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-full bg-[#df4469] rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}></div>
      </div>

      <p className="  mt-1 font-medium">{progress.toFixed(0)}% Complete</p>
    </div>
  );
}
