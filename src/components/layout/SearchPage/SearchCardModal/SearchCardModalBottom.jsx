import React from "react";
import ImagesSlider from "../../../common/ImagesSlider";
import Slider from "../../../common/Slider";
function SearchCardModalBottom({ images, similar }) {
  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-4xl text-slate-200">Images</h1>
        {images ? (
          <ImagesSlider data={images} dataClassName="images" />
        ) : (
          <p className="mt-4 text-lg text-slate-600">No image content found.</p>
        )}
      </div>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-4xl text-slate-200">Recommendations</h1>
        {similar?.length ? (
          <Slider data={similar} dataClassName="similar" />
        ) : (
          <p className="mt-4 text-lg text-slate-600">No recommended content found.</p>
        )}
      </div>
    </>
  );
}

export default SearchCardModalBottom;
