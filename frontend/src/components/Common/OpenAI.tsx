import React, { useEffect, useRef } from "react";

interface OpenAIProps {
  cards: { name: string; desc: string; imgUrl: string }[];
  onSummaryGenerated: (summary: string) => void;
  worry: string;
  category: string;
  // selectedCards: number[];
}

const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;
const apiEndpoint = "https://api.openai.com/v1/chat/completions";

const fetchOpenAIResponse = async (
  messages: { role: string; content: string }[]
): Promise<string> => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 600,
        top_p: 1,
        temperature: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error fetching AI response";
  }
};

const OpenAI: React.FC<OpenAIProps> = ({ cards, onSummaryGenerated }) => {
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (cards.length > 0 && !hasFetchedRef.current) {
      const askTarotReading = async () => {
        const initialMessage = {
          role: "system",
          content: `You are a tarot reader and a Korean music recommender. Given three or more tarot cards, provide the following:
          1. **Card Name**: <Card Name>
             - **Detail**: <Card Detail>
             - **Interpretation**: <Your Interpretation>
          Overall: <Your Overall Interpretation of all cards>
          Music: <Please provide only the song title and artist name>
             `,
        };

        const cardMessages = cards.map((card) => ({
          role: "user",
          content: `Card Name: ${card.name}, Card Detail: ${card.desc}`,
        }));

        const messages = [initialMessage, ...cardMessages];

        hasFetchedRef.current = true;
        const aiResponse = await fetchOpenAIResponse(messages);
        onSummaryGenerated(aiResponse);
      };

      askTarotReading();
    }
  }, [cards, onSummaryGenerated]);

  return null;
};

export default OpenAI;
