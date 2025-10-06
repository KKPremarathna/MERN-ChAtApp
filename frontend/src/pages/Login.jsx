import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="h-full w-full p-6 rounded-lg bg-blue-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> NexaChat</span>
        </h1>
        <form>
          <div>
            <label className="label pt-5 pb-1">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="h-10 input input-bordered input-info w-full max-w-xs bg-p bg-opacity-80"
            />
          </div>
          <div>
            <label className="label pt-5 pb-1">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="h-10 input input-bordered input-info w-full max-w-xs bg-opacity-80"
            />
          </div>

          <a
            href="#"
            className="text-sm hover:underline mt-2 inline-block hover:text-pink-600"
          >
            {"Don't"} have an account?
          </a>
          <div>
            <button className="btn btn-block btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
