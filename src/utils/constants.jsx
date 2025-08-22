export const filters = [
  {
    title: "GIFs",
    value: "gifs",
    background:
      "bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
  },
  {
    title: "Stickers",
    value: "stickers",
    background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
  },
  {
    title: "Text",
    value: "text",
    background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
  },
];

export const placeholders = [
  "Type how you feel... (e.g. 'Monday blues with coffee')",
  "Describe a moment... (e.g. 'When WiFi betrays you mid-Zoom')",
  "Search by vibe... (e.g. 'Excited like a puppy')",
  "What’s the mood today?",
  "Need a meme for this moment?",
  "Try: 'Victory dance after exams'",
  "Express it in words, we’ll find the GIF",
  "Say it your way: 'Overworked but fabulous ✨'",
  "GIF my feelings...",
  "Try something silly: 'Cat lawyer defending me in court'"
];

export const OPENAI_Key = import.meta.env.VITE_OPENAI_KEY;