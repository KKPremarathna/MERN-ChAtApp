import React from "react";

const GenderCheck = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-info"
          />
        </label>
      </div>
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-info"
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheck;
