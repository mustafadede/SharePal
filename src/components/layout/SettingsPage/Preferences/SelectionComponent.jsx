import React from "react";

function SelectionComponent({
  selectedLanguage,
  handleLanguageChange,
  selectionType,
  firstTitle,
  secondTitle,
  FirstVal = "en",
  SecVal = "tr",
}) {
  return (
    <select
      className="px-4 py-2 mb-4 text-lg text-slate-300 bg-slate-600 rounded-2xl focus:outline-none"
      name={selectionType}
      id={selectionType}
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      <option value={FirstVal}>{firstTitle}</option>
      <option value={SecVal}>{secondTitle}</option>
    </select>
  );
}

export default SelectionComponent;
