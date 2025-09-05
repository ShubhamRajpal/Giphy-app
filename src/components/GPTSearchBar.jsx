import React, { useEffect, useState } from "react";
import { HiMiniXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { placeholders } from "../utils/constants";
import openai from "../utils/openai";
import useSearchGPTGifs from "../hooks/useSearchGPTGifs";
import { GifState } from "../context/gifContext";
import Tags from "./Tags";

const GPTSearchBar = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholderList = placeholders;
  const [gptPhrases, setGptPhrases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { setGptGifs, setChipTag } = GifState();
  const [query, setQuery] = useState("");
  const [chipQuery, setChipQuery] = useState("");

  const handleGPTSearchClick = async () => {
    setIsLoading(true);
    const gptQuery = `You are an expert at generating creative and effective Giphy search queries. 
Your job is to take the user’s natural language query and generate 5–7 short search phrases that will return the most relevant GIFs on Giphy. 

### Instructions:
1. **Focus on real Giphy tags** — prefer everyday, popular keywords that people actually use (e.g., "pani puri", "funny dog", "happy dance") instead of abstract ones like "foodie delight".
2. **Mix Hindi + English (Hinglish)** when appropriate for cultural relevance. For example: "golgappa funny", "desi dance", "filmy style".
3. **Be specific** — combine the emotion, subject, or action into phrases (e.g., "angry cat", "happy eating", "crying baby").
4. **Include meme-friendly variations** — add “funny”, “lol”, “meme”, or “reaction” to some queries.
5. **Mix literal + contextual: Always include at least one phrase that uses exact words from the input.
6. **Add emotion/tone: If the input has a feeling (happy, sad, funny, angry, awkward, romantic), include it.
7. **Add pop culture hooks: If it looks like a movie dialogue, meme, or celebrity line, include the movie name, actor, or meme reference.
8. **Keep it short** — each phrase must be 1–3 words max.
9. **Add some phrases as well to the results list of 2-3 words length
10. **Output format** — ONLY return phrases, comma-separated, with no extra spaces or text.

### Example:
Input: "That moment when you get pani puri after a long time"  
Output: pani puri,street food,funny golgappa,desi food,love pani puri,spicy golgappa,happy eating

Now, generate Giphy search phrases for this request:
"${query}"`;

    // Make an API call to GPT API and get movie results
    const gptresults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    const gptArr = gptresults.choices?.[0]?.message?.content.split(",");
    console.log(gptArr);

    setGptPhrases(gptArr);
    setChipQuery(gptArr[0]);
    setChipTag(null);
    setIsLoading(false);
  };

  useSearchGPTGifs(gptPhrases, setGptGifs);

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
      {isLoading && (
        <div className="loader">
          <div className="justify-content-center primary-loading"></div>
        </div>
      )}
      {chipQuery && <Tags query={chipQuery} gptPhrases={gptPhrases} />}
    </div>
  );
};

export default GPTSearchBar;
