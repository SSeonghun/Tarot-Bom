import React, { useState, useEffect } from 'react';
import cardBg from '../../assets/img/card.png';
import moneyImg from '../../assets/money.png';
import HoverButton from '../../components/Common/HoverButton';

const category = '금전운';

const apiKey = 'process.env.REACT_APP_OPENAI_API_KEY';
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
      const cards = [
        { name: 'ACE & CUPS', category: ['금전운'] },
        // 추가 카드 데이터를 여기에 넣습니다.
      ];

      const messages = cards.map(card => ({
        role: 'user',
        content: `카드 이름: ${card.name}, 카테고리: ${card.category.join(', ')}`
      }));

      try {
        const aiResponse = await fetchOpenAIResponse(messages);
        setSummary(aiResponse);
        console.log(aiResponse)
      } catch (error) {
        console.error('Error fetching AI response:', error);
        setSummary('Error fetching AI response');
      }
    };

    askTarotReading();
  }, []);

  return (
    <div className="relative flex flex-col items-center p-10">
      <div className="relative w-full max-w-3xl">
        <img src={cardBg} alt="Background" className="w-full h-auto object-cover" />
        <div className="absolute inset-12 bg-white bg-opacity-20 border shadow-lg p-3 bg-cover"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="text-4xl font-bold text-white p-4 rounded-lg flex flex-row">
            <img src={moneyImg} alt="moneyImg" className="w-8 h-8 mr-2" />
            AI {category} 요약
          </div>
          <div className="mt-8 border border-white p-6 rounded-lg max-w-xl bg-black bg-opacity-60">
            <p className="text-white text-s">{summary}</p>
          </div>
          <p className="mt-5 text-lg font-bold text-white">타로 결과에 어울리는 음악을 들어보세요!</p>
        </div>
      </div>

      <div className="relative mt-8 flex items-center gap-10">
        <HoverButton
          label="공유하기"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
        <HoverButton
          label="이미지 저장"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
        <HoverButton
          label="리더 프로필"
          color="bg-gray-500"
          hoverColor="bg-gray-300"
          hsize="h-12"
          wsize="w-48"
          fontsize="text-lg"
        />
      </div>
    </div>
  );
};

export default TarotResult;
