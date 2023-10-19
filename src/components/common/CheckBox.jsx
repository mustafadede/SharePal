import React from "react";

function CheckBox({ label, onClickHandler }) {
  return (
    <button class="inline-flex items-center" type="button" onClick={onClickHandler}>
      <label class="relative flex items-center p-3 rounded-full cursor-pointer" for="checkbox-1" data-ripple-dark="true">
        <input
          type="checkbox"
          class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-200/40 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-fuchsia-600 checked:bg-fuchsia-600 checked:before:bg-fuchsia-600 hover:before:opacity-10"
          id="checkbox-1"
        />
        <div class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
      <label for="checkbox-1" class="ml-2 select-none text-lg cursor-pointer text-cWhite">
        {label}
      </label>
    </button>
  );
}

export default CheckBox;
