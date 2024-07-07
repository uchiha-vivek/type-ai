import { useCallback, useEffect, useState } from "react";
import { countErrors, debug } from "../utils/helpers";
import useCountdown from "./useCountdownHook";
import useTypings from "./useType";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const [state, setState] = useState<State>("start"); // State to manage the current phase of the engine
  const { timeLeft, startCountdown, resetCountdown } = useCountdown(COUNTDOWN_SECONDS); // Hook to manage the countdown timer
  const { words, updateWords } = useWords(NUMBER_OF_WORDS); // Hook to manage the words
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(state !== "finish"); // Hook to manage the user's typing
  const [errors, setErrors] = useState(0); // State to track the number of errors

  const isStarting = state === "start" && cursor > 0; // Check if the typing has just started
  const areWordsFinished = cursor === words.length; // Check if the current set of words is finished

  // Function to restart the engine
  const restart = useCallback(() => {
    debug("restarting...");
    resetCountdown(); // Reset the countdown timer
    resetTotalTyped(); // Reset the total typed characters
    setState("start"); // Set the state to 'start'
    setErrors(0); // Reset the error count
    updateWords(); // Generate a new set of words
    clearTyped(); // Clear the typed characters
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  // Function to calculate and sum errors
  const sumErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length)); // Get the words reached by the cursor
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached)); // Count and add the errors
  }, [typed, words, cursor]);

  // Effect to start the countdown as soon as the user starts typing
  useEffect(() => {
    if (isStarting) {
      setState("run"); // Set the state to 'run'
      startCountdown(); // Start the countdown timer
    }
  }, [isStarting, startCountdown]);

  // Effect to handle the end of the countdown
  useEffect(() => {
    if (!timeLeft && state === "run") {
      debug("time is up...");
      setState("finish"); // Set the state to 'finish'
      sumErrors(); // Calculate and sum errors
    }
  }, [timeLeft, state, sumErrors]);

  // Effect to handle the case when the current set of words is finished
  useEffect(() => {
    if (areWordsFinished) {
      debug("words are finished...");
      sumErrors(); // Calculate and sum errors
      updateWords(); // Generate a new set of words
      clearTyped(); // Clear the typed characters
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  // Return the necessary states and functions
  return { state, words, typed, errors, restart, timeLeft, totalTyped };
};

export default useEngine;
