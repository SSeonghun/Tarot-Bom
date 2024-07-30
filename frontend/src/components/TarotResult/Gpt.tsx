// src/components/TarotResult.tsx
import React, { useState, useEffect } from 'react';
import Card from './Card';
import ResultSummary from './ResultSummary';
import cardImg from '../../assets/tarot_images - 복사본/c01.jpg';

interface CardData {
  id: number;
  name: string;
  detail: string;
  category: string[];
  imgUrl: string;
  hsize: string;
  wsize: string;
}

const cards: CardData[] = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  name: `ACE & CUPS`,
  detail: `야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 야호 `,
  category: ['금전운'], // 더미 카테고리
  imgUrl: cardImg,
  hsize: 'h-10',
  wsize: 'w-40'
}));

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

const fetchOpenAIResponse = async (messages: { role: string; content: string }[]) => {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 1024,
      top_p: 1,
      temperature: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || 'No response';
};

const TarotResult: React.FC = () => {
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    const askTarotReading = async () => {
      const messages = cards.map(card => ({
        role: 'user',
        content: `카드 이름: ${card.name}, 카테고리: ${card.category.join(', ')}`
      }));

      try {
        const aiResponse = await fetchOpenAIResponse(messages);
        setSummary(aiResponse);
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setSummary('Error fetching AI response');
      }
    };

    askTarotReading();
  }, []);

  return (
    <div className="col-span-10 text-black p-4 z-10 flex flex-col items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {cards.map(card => (
          <Card
            key={card.id}
            name={card.name}
            detail={card.detail}
            category={card.category}
            imgUrl={card.imgUrl}
            hsize={card.hsize}
            wsize={card.wsize}
          />
        ))}
      </div>
      {summary && <ResultSummary />}
    </div>
  );
};

export default TarotResult;
