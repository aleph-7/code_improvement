import { useState, useEffect } from "react";
import SERVER_ROOT_PATH from "../config";

let category = 0;
async function getProtectedData() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await fetch(SERVER_ROOT_PATH + "/protected", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    const data = await response.json().then((data) => {
      localStorage.setItem("userId", data.message.username);
      localStorage.setItem("category", data.message.category);
      localStorage.setItem("userMongoId", data.message.userMongoId);
      localStorage.setItem("type_of_sport", data.message.type_of_sport);
      category = data.message.category;
    });
  } catch (error) {
    console.error("Protected data error:", error.message);
  }
}

const useAuth = async () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getProtectedData(token)
        .then((category) => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setIsAuthenticated(false);
          console.error("Error fetching protected data:", error);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return { isAuthenticated };
};

export default useAuth;
