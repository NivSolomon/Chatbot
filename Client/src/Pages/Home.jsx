import { useState } from "react";
import { getChatbotResponse } from "../Services/OpenAIService";
import ChatboxWindow from "../Components/ChatboxWindow";
import SendButton from "../Components/SendButton";
import PromptTextBox from "../Components/PromptTextBox";
import DocumentUploader from "../Components/DocumentUploader";
import { VscRobot } from "react-icons/vsc";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]); // Chat history
  const [documentContents, setDocumentContents] = useState([]); // Documents content
  const [uploaderKey, setUploaderKey] = useState(0);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user's message to the conversation
    const newInteraction = { role: "user", content: userInput };
    const updatedConversation = [...conversation, newInteraction];
    setConversation(updatedConversation);

    try {
      // Combine all document content
      const allDocuments = documentContents.join("\n\n");

      const queryContext = allDocuments
        ? `${allDocuments}\n\nUser's Question: ${userInput}`
        : userInput;

      // Get the assistant's response
      const response = await getChatbotResponse([
        ...conversation,
        { role: "system", content: queryContext },
      ]);

      const botResponse = { role: "assistant", content: response };
      setConversation((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setUserInput("");
    setUploaderKey((prevKey) => prevKey + 1);
  };

  const handleDocumentProcessed = (text) => {
    setDocumentContents((prevContents) => [...prevContents, text]);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-blue-900 to-indigo-800">
      <div className="w-full max-w-4xl p-8 bg-gray-900 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 flex items-center justify-center gap-2">
          Chatbot Assistant
          <VscRobot className="text-blue-500 size-12" />
        </h1>
        <ChatboxWindow conversation={conversation} />
        <div className="mt-6 flex items-center gap-4">
          <PromptTextBox userInput={userInput} setUserInput={setUserInput} />
          <SendButton handleSend={handleSend} />
          <DocumentUploader
            key={uploaderKey}
            onDocumentProcessed={handleDocumentProcessed}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
