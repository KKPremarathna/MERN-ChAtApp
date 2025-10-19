import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/authContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      // ✅ Only proceed on success
      if (!res.ok || !data.success) {
        toast.error(data.message || "Login failed");
        return;
      }

      // ✅ Extract the user object (includes profilePicture)
      const userData = data.data;

      // (Optional) If you also want to store token separately:
      // localStorage.setItem("token", data.token);

      // ✅ Save user to localStorage and context
      localStorage.setItem("chat-user", JSON.stringify(userData));
      setAuthUser(userData);

      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}
