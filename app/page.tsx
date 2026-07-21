"use client";

import { useState } from "react";
import { decks } from "./decks";

export default function Home() {
  const [step, setStep] = useState(0);

  const [warmupAnswer, setWarmupAnswer] = useState("");
  const [mainAnswer, setMainAnswer] = useState("");
  const [challengeAnswer, setChallengeAnswer] = useState("");

  const today = new Date();

  const weekday = today.toLocaleDateString("en-US", {
    weekday: "long",
  }) as keyof typeof decks;

  const deck = decks[weekday];

  const normalize = (value: string) =>
    value.replace("%", "").replace(/\s/g, "").toLowerCase();

  const warmupCorrect =
    normalize(warmupAnswer) === normalize(deck.warmup.answer);

  const mainCorrect =
    normalize(mainAnswer) === normalize(deck.main.answer);

  const challengeCorrect =
    normalize(challengeAnswer) === normalize(deck.challenge.answer);

  const score =
    (warmupCorrect ? deck.warmup.points : 0) +
    (mainCorrect ? deck.main.points : 0) +
    (challengeCorrect ? deck.challenge.points : 0);

  const resultTitle =
    score === 9
      ? "Perfect Score"
      : score >= 7
      ? "Strong Showing"
      : score >= 4
      ? "Respectable"
      : "Back to the Books";

  const resetGame = () => {
    setStep(0);
    setWarmupAnswer("");
    setMainAnswer("");
    setChallengeAnswer("");
  };

  const copyScore = async () => {
    const text = `Daily Deck
${weekday} • ${deck.theme}

Score: ${score}/9

Play here:
https://daily-deck-azure.vercel.app`;

    await navigator.clipboard.writeText(text);

    alert("Score and link copied!");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-xl px-8 text-center bg-white">
        {step > 0 && step < 4 && (
          <div className="mb-10">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-black h-2 rounded-full transition-all duration-300"
                style={{
                  width:
                    step === 1
                      ? "33%"
                      : step === 2
                      ? "66%"
                      : "100%",
                }}
              />
            </div>
          </div>
        )}

        {step === 0 && (
          <div>
            <h1 className="text-6xl font-bold mb-4">
              Daily Deck
            </h1>

            <p className="text-gray-500 text-xl mb-2">
              {weekday} • {deck.theme}
            </p>

            <p className="text-gray-400 mb-10">
              9 Points Available Today
            </p>

            <button
              onClick={() => setStep(1)}
              className="bg-black text-white px-8 py-4 rounded text-lg"
            >
              Start
            </button>

            <p className="mt-10 text-sm text-gray-400">
              Created by Joshua Sanchez • Beta
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="text-gray-500 mb-4">
              Question 1 of 3
            </p>

            <h2 className="text-4xl font-bold mb-2">
              Warm-Up
            </h2>

            <p className="text-gray-500 mb-8">
              {deck.warmup.points} Point
            </p>

            <p className="text-xl mb-8">
              {deck.warmup.question}
            </p>

            <input
              value={warmupAnswer}
              onChange={(e) =>
                setWarmupAnswer(e.target.value)
              }
              className="block border p-4 w-80 mx-auto mb-8 text-center"
              placeholder="Answer"
            />

            <button
              onClick={() => setStep(2)}
              className="bg-black text-white px-8 py-4 rounded"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-gray-500 mb-4">
              Question 2 of 3
            </p>

            <h2 className="text-4xl font-bold mb-2">
              Main Set
            </h2>

            <p className="text-gray-500 mb-8">
              {deck.main.points} Points
            </p>

            <p className="text-xl mb-8">
              {deck.main.question}
            </p>

            <input
              value={mainAnswer}
              onChange={(e) =>
                setMainAnswer(e.target.value)
              }
              className="border p-4 w-80 mx-auto mb-8 text-center"
              placeholder="Answer"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="border px-8 py-4 rounded"
              >
                Back
              </button>

              <button
                onClick={() => setStep(3)}
                className="bg-black text-white px-8 py-4 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-gray-500 mb-4">
              Question 3 of 3
            </p>

            <h2 className="text-4xl font-bold mb-2">
              Challenge
            </h2>

            <p className="text-gray-500 mb-8">
              {deck.challenge.points} Points
            </p>

            <p className="text-xl mb-8">
              {deck.challenge.question}
            </p>

            <input
              value={challengeAnswer}
              onChange={(e) =>
                setChallengeAnswer(e.target.value)
              }
              className="border p-4 w-80 mx-auto mb-8 text-center"
              placeholder="Answer"
            />

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="border px-8 py-4 rounded"
              >
                Back
              </button>

              <button
                onClick={() => setStep(4)}
                className="bg-black text-white px-8 py-4 rounded"
              >
                Finish
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h1 className="text-5xl font-bold mb-4">
              {resultTitle}
            </h1>

            <p className="text-gray-500 mb-10">
              Daily Deck Complete
            </p>

            <h2 className="text-3xl font-bold mb-10">
              Score: {score} / 9
            </h2>

            <div className="space-y-8 text-left max-w-md mx-auto mb-12">
              <div>
                <div className="font-semibold mb-2">
                  Warm-Up {warmupCorrect ? "✓" : "✕"}
                </div>

                <div className="text-gray-600">
                  Your Answer: {warmupAnswer || "No Answer"}
                </div>

                <div className="text-gray-600">
                  Correct Answer: {deck.warmup.answer}
                </div>
              </div>

              <div>
                <div className="font-semibold mb-2">
                  Main Set {mainCorrect ? "✓" : "✕"}
                </div>

                <div className="text-gray-600">
                  Your Answer: {mainAnswer || "No Answer"}
                </div>

                <div className="text-gray-600">
                  Correct Answer: {deck.main.answer}
                </div>
              </div>

              <div>
                <div className="font-semibold mb-2">
                  Challenge {challengeCorrect ? "✓" : "✕"}
                </div>

                <div className="text-gray-600">
                  Your Answer: {challengeAnswer || "No Answer"}
                </div>

                <div className="text-gray-600">
                  Correct Answer: {deck.challenge.answer}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={copyScore}
                className="border px-8 py-4 rounded"
              >
                Share Score
              </button>

              <button
                onClick={resetGame}
                className="bg-black text-white px-8 py-4 rounded"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}