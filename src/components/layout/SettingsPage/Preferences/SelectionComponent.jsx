import React from "react";

function SelectionComponent({ selectedLanguage, handleLanguageChange }) {
  return (
    <select
      className="px-4 py-2 mb-4 text-lg text-slate-300 bg-slate-600 rounded-2xl focus:outline-none"
      name="language"
      id="language"
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      <option value="en">English</option>
      <option value="tr">Türkçe</option>
    </select>
  );
}

export default SelectionComponent;
