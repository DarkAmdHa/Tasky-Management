"use client";

import { useEffect, useState } from "react";
function CompletionPercentage({
  percentageCompleted,
}: {
  percentageCompleted: number;
}) {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const setUpPercentage = async () => {
      for (var i = 1; i <= percentageCompleted * 100; i++) {
        setPercentage(i);
        await new Promise((resolve) => {
          setTimeout(resolve, 10);
        });
      }
    };
    setUpPercentage();
  }, [percentageCompleted]);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-sm`}
      style={{
        width: "50px",
        height: "50px",
        background: `radial-gradient(closest-side, white 79%, transparent 80% 100%),
        conic-gradient(#24f88e ${percentage}%, #f6f6f6 0)`,
      }}
    >
      {percentage}%
      <progress
        value={percentage}
        style={{
          visibility: "hidden",
          height: "0",
          width: "0",
        }}
      >
        {percentage}%
      </progress>
    </div>
  );
}

export default CompletionPercentage;
