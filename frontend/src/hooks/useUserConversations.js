import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useUserConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/user", {
          method: "GET",
          credentials: "include",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Failed to fetch conversations (${res.status})`);
        }

        const data = await res.json();
        console.log("API raw:", data);

        if (Array.isArray(data.data)) {
          setConversations(data.data);
        } else if (Array.isArray(data.conversations)) {
          setConversations(data.conversations);
        } else if (Array.isArray(data)) {
          setConversations(data);
        } else {
          setConversations([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
    return () => controller.abort();
  }, []);

  return { loading, conversations };
};

export default useUserConversations;
