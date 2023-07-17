import React from "react";
import Navbar from "../../components/layout/Navbar";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="flex gap-4 mx-10 mt-5">
        <div className="w-2/3 rounded-3xl h-96 bg-gradient-to-br to-cGradient1 from-pink-800">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="mb-4 text-5xl font-bold text-white">List it,</h1>
            <h2 className="mb-4 text-5xl font-bold text-white">Track it,</h2>
            <h3 className="text-5xl font-bold text-white">Recommend it.</h3>
          </div>
        </div>
        <div className="w-1/3 bg-pink-800 rounded-3xl h-96">
          <div className="flex flex-col items-center justify-center h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
