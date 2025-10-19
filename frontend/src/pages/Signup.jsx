import React, { useState } from "react";
import GenderCheck from "./GenderCheck";
import { Link } from "react-router-dom";
import useSignup from "../hooks/userSignUp";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  const handleCheckBox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full p-6 rounded-lg bg-blue-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Signup <span className="text-blue-500">NexaChat</span>
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="label pt-5 pb-1">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Kavindu Kavishka"
              className="h-10 input input-bordered input-info w-full max-w-xs bg-p bg-opacity-80"
              value={inputs.fullname}
              onChange={(e) =>
                setInputs({ ...inputs, fullname: e.target.value })
              }
            />
          </div>

          {/* Username */}
          <div>
            <label className="label pt-5 pb-1">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Kavindu"
              className="h-9 input input-bordered input-info w-full max-w-xs bg-p bg-opacity-80"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div>
            <label className="label pt-5 pb-1">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="h-10 input input-bordered input-info w-full max-w-xs bg-opacity-80"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          {/* Confirm Password */}
          <div className="pb-2">
            <label className="label pt-5 pb-1">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="h-10 input input-bordered input-info w-full max-w-xs bg-opacity-80"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          {/* Gender selection */}
          <GenderCheck
            onCheckBoxChange={handleCheckBox}
            selectedGender={inputs.gender}
          />

          {/* Login link */}
          <Link
            to="/login"
            className="text-sm hover:underline mt-2 inline-block hover:text-pink-600"
          >
            Already have an account?
          </Link>

          {/* Submit button */}
          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span>: "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
