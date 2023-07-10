import { useEffect, useState } from "react";

const Loading = () => {
  const [dotCount, setDotCount] = useState(3);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDotCount((dotCount + 1) % 4);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [dotCount]);

  return (
    <div className="w-full flex justify-center">
      <h1 className="text-2xl text-left p-6 opacity-25 font-bold w-44">
        Loading
        {".".repeat(dotCount)}
        {/* &nbsp; */}
        {" ".repeat(3 - dotCount)}
      </h1>
    </div>
  );
};

export { Loading };
