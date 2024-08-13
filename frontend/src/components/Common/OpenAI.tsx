import React, { useEffect, useRef } from 'react';

interface OpenAIProps {
  cards?: { name: string; desc: string; imgUrl: string }[];
  onSummaryGenerated: (summary: string) => void;
  worry: string;
  category: string;
  cardImage?: string;
}

const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

const fetchOpenAIResponse = async (messages: { role: string; content: any }[]): Promise<string> => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 600,
        top_p: 1,
        temperature: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Error fetching AI response';
  }
};

const OpenAI: React.FC<OpenAIProps> = ({ cards, onSummaryGenerated, cardImage, category }) => {
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    const askTarotReading = async () => {
      if (hasFetchedRef.current) {
        console.log('Request already sent, skipping...');
        return;
      }

      const initialMessage = {
        role: 'system',
        content: `You are a tarot reader and a Korean music recommender. Given three or more tarot cards and a category, provide the following:
        1. **카드이름**: <Card Name>
           - **카드요약**: <Card Detail>
           - **카드상세**: <Your Interpretation of this card in the context of the category>
        **전반적인 카드해석**: <Your Overall Interpretation of all cards in the context of the category>
        Music: <Please provide only the song title and artist name appropriate for the category>
        The category is: ${category}. Please provide the explanation in Korean, but Music part should be in English.`,
      };

      let messages = [initialMessage];

      if (cards && cards.length > 0) {
        const cardMessages = cards.map((card) => ({
          role: 'user',
          content: `Card Name: ${card.name}, Card Detail: ${card.desc}`,
        }));
        messages.push(...cardMessages);
        hasFetchedRef.current = true; // cards가 있는 경우에만 중복 호출 방지
      }

      if (cardImage) {
        messages.push({
          role: 'user',
          content: `Image URL: data:image/png;base64,${cardImage}`,
        });
      }

      const aiResponse = await fetchOpenAIResponse(messages);
      onSummaryGenerated(aiResponse);
    };

    askTarotReading();
  }, [cards, onSummaryGenerated, cardImage, category]);

  return null;
};

export default OpenAI;
