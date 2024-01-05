import React, { useState, useEffect } from "react";
import ChatGPTWrapper from "./ChatGPTWrapper";
import search from './search.jpg';
import "./kirby.css";

const ChatApp = () => {
  const [userInput, setUserInput] = useState("");
  const [displayInput, setDisplayInput] = useState("Hi! Kirby here! Poyo!");
  let conversation = [
    {
      role: "system",
      content:
        "Pretend that you are Kirby, and talk only with Poyo, very simple words, and cute sounds. Do not address yourself as Chatgpt or anyone other than Kirby. Also simple words are allowed. When talking, you can use quotation marks to express what you mean",
    },
  ];
  const [loading, setLoading] = useState(false);
  const apiKey = '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';
  const chatgpt = new ChatGPTWrapper(apiKey);
  const [response, setResponse] = useState("");

  const handleUserInput = async () => {
    if (userInput.trim() === "") return;
    
    conversation = [
      conversation[0],
      {
        role: "user",
        content: userInput,
      },
    ];

    console.log(conversation);
    console.log(userInput);
    setLoading(true);

    try {
      const apiResponse = await chatgpt.generateResponse(conversation);
      const firstChoice = apiResponse.choices[0].message.content;
      setResponse(firstChoice);
      setDisplayInput(userInput);
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setLoading(false);
    }

    setUserInput("");
  };

 
  useEffect(() => {
    // Set up the event listener when the component mounts
    const searchIcon = document.getElementById('searchIcon');

    if (searchIcon) {
      const handleClick = () => {
        // Add the spin-animation class to the image, not the button
        const imgElement = searchIcon.querySelector('img');
        if (imgElement) {
          imgElement.classList.add('spin-animation');
        }
      };

      searchIcon.addEventListener("click", handleClick);

      // Clean up the event listener when the component is unmounted
      return () => {
        searchIcon.removeEventListener("click", handleClick);
      };
    }
  }, []); // Empty dependency array means this effect runs once after the initial render



  return (
    <div className = "main">
      <div className="output">
        <h1>{displayInput}</h1>
        <h1>{response}</h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Type here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <button id ="searchButton" onClick={handleUserInput} disabled={loading}>
          <img id = "searchIcon" src = {search} alt = "search"/>
        </button> 
       
      </div>
    </div>
  );
};

export default ChatApp;
