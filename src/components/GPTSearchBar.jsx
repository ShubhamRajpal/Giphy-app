import React, { useEffect, useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { placeholders } from "../utils/constants";
import openai from "../utils/openai";
import useSearchGifs from "../hooks/useSearchGifs";
import { GifState } from "../context/gifContext";

const GPTSearchBar = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderList = placeholders;
  const [gptPhrases, setGptPhrases] = useState([]);
  const { setGptGifs } = GifState();
  const [query, setQuery] = useState("");

  const handleGPTSearchClick = async () => {

const gptQuery = `You are an expert at generating creative and effective Giphy search queries. Your task is to analyze a user's natural language query and translate it into actionable search phrases that will return the best possible GIF results.
                  Task:
                  Analyze the user's query to understand the core emotion, action, and subject. Then, generate 5-7 short, impactful search phrases that combine these elements to create a highly specific search term.

                  Guidelines:
                  - **Be diverse:** Provide a mix of phrases that capture the emotion, the action, and relevant pop culture references (like memes).
                  - **Be concise:** Each phrase must be 1-3 words long.
                  - **Use Hinglish:** Incorporate a blend of English and Hindi/Urdu phrases where culturally appropriate and effective.
                  - **Combine elements:** Generate phrases that combine the emotion with the subject or action to create a more specific query (e.g., "happy eating," "foodie satisfied").
                  - **Strictly follow format:** Only give me result, comma separated without any space at start or end of strings like the example results given ahead.Example result:
                  yummy biryani,biryani happy eating,savoring food joy,foodie satisfied,biryani mood

                  Example Input:
                  "That moment when you get to eat your favorite biryani"

                  Example Output:
                  ["yummy biryani", "biryani happy eating", "savoring food joy", "foodie satisfied", "biryani mood"]

                  Now, generate the Giphy search phrases for this request:
                  "${query}"`;

    // Make an API call to GPT API and get movie results
    const gptresults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptArr = gptresults.choices?.[0]?.message?.content.split(",");
    console.log(gptArr);

    setGptPhrases(gptArr);
  };

  useSearchGifs(gptPhrases, setGptGifs);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderList.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="flex relative mt-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholderList[placeholderIndex]}
          className="w-full pr-14 pl-5 py-4 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
        />

        {query && (
          <button
            className="absolute rounded-full bg-gray-300 right-20 mr-2 top-5 opacity-90 text-white"
            onClick={() => setQuery("")}>
            <HiMiniXMark size={22} />
          </button>
        )}

        <button
          className="bg-gradient-to-tr from-teal-500 to-red-400 px-4 py-2 rounded-tr rounded-br text-white"
          onClick={handleGPTSearchClick}>
          <HiOutlineMagnifyingGlass
            size={35}
            className="-scale-x-100 text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default GPTSearchBar;
