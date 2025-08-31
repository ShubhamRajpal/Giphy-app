import useSearchChips from "../hooks/useSearchChips";
import { GifState } from "../context/gifContext";

const Tags = ({ query, gptPhrases }) => {
  const chips = useSearchChips(query);
  const {setChipTag} = GifState();

  return (
    <div className="flex flex-wrap gap-2 py-3 text-white">
      {chips?.map((chip, index) => (
        <button
          key={index}
          className="px-3 py-1 chip-gradient rounded-full text-md hover:bg-transparent font-semibold"
          onClick={() => setChipTag(chip.name)}>
          {chip.name}
        </button>
      ))}
       {gptPhrases?.map((phrase, index) => (
        <button
          key={`gpt-${index}`}
          className="px-3 py-1 chip-gradient rounded-full text-md hover:bg-white font-semibold"
          onClick={() => setChipTag(phrase)}
        >
          {phrase}
        </button>
      ))}
    </div>
  );
};

export default Tags;
