require("dotenv").config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function completeWord(userText: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        "role": "system",
        "content": "You are skilled English Professor. You know all the English words that exist in the world. You will be given incomplete word. Your task is to generate complete English word. You should return generated complete English word if only if it is correct english word. otherwise you should return dot <.>"
      },
      {
        "role": "user",
        "content": userText
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const generatedContent = response.choices[0].message.content!.trim();

  if (generatedContent === ".") {
    return ".";
  } else {
    return preprocessGeneratedWord(userText, generatedContent);
  }
}

function preprocessGeneratedWord(userText: string, generatedWord: string) {
  return generatedWord.slice(userText.length);
}

// Example usage
const userText: string = "wa";
completeWord(userText).then((result) => {
  console.log(result); // Output: "ter" if the generated word is "water"
});
