import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  // 🎤 Mic: Voice input
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      setInput(event.results[0][0].transcript);
    };
    recognition.start();
  };

  // 🖼️ Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      console.log("Uploaded image:", file.name);
    }
  };

  // 🧹 New chat
  const newChat = () => {
    setLoading(false);
    setShowResults(false);
    setResultData("");
    setRecentPrompt("");
    setUploadedImage(null);
  };

  // 🚀 Send prompt
  const onSent = async (prompt) => {
    if (!prompt && !input) return;

    setLoading(true);
    setShowResults(true);
    const finalPrompt = prompt || input;
    setRecentPrompt(finalPrompt);

    setPrevPrompts((prev) =>
      prev.includes(finalPrompt) ? prev : [...prev, finalPrompt]
    );

    try {
      const response = await main(finalPrompt);
      let responseArray = response.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let formattedResponse = newResponse.split("*").join("</br>");
      let newResponseArray = formattedResponse.split(" ");
      setResultData("");
      newResponseArray.forEach((word, index) => {
        delayPara(index, word + " ");
      });
    } catch (error) {
      console.error("Error:", error);
      setResultData("Something went wrong. Please try again.");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResults,
    setShowResults,
    loading,
    setLoading,
    setResultData,
    resultData,
    input,
    setInput,
    newChat,
    main,
    startListening,     // mic function
    handleImageUpload,  // image upload function
    uploadedImage,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
