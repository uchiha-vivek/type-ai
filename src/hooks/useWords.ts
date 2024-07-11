import { faker } from "@faker-js/faker"; // Import faker library for generating random data
import { useCallback, useState } from "react"; // Import necessary hooks from React

// Function to generate a specified number of lowercase words using faker
const generateWords = (count: number) => {
  const words = faker.word.words(count).toLowerCase(); // Generate 'count' number of random words in lowercase
  console.log('words: ', words);
  return words;
};

// Custom hook for managing dynamically generated words
const useWords = (count: number) => {
  const initialWords = generateWords(count);
  const [words, setWords] = useState<string>(initialWords); // State to hold generated words

  // Return generated words and update function
  return { words, setWords, initialWords };
};

export default useWords;
