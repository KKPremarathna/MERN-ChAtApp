import React from "react";

const GenderCheck = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`cursor-pointer label gap-2 ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <span className="label-text pr-1">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-info"
            checked={selectedGender === "male"}  // ✅ controlled
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>

      <div className="form-control">
        <label
          className={`cursor-pointer label gap-2 ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <span className="label-text pr-1">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-info"
            checked={selectedGender === "female"}  // ✅ controlled
            onChange={() => onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheck;
