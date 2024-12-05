import axios from "axios";

export const getChatbotResponse = async (conversation) => {
  try {
    const response = await axios.post("http://localhost:5000/api/chat", {
      conversation,
    });
    return response.data.message; // Extract the response from the server
  } catch (error) {
    console.error("Error fetching response from server:", error);
    throw new Error("Failed to fetch response from the server.");
  }
};
