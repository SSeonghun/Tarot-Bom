import React, { useEffect, useRef } from 'react';

// API 응답 받는 법 맨 아래에 있음

// 카드이름과 금전운같은 카테고리를 받아서 질문 보냄.
// onSummaryGenerated는 요약이 생성되었을 때 호출하는 콜백 함수.
interface OpenAIProps {
  cards: { name: string; category: string }[];
  onSummaryGenerated: (summary: string) => void;
}

const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;
const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

// messages가 우리가 보낼 질문. Promise<string>이 문자열 응답
const fetchOpenAIResponse = async (messages: { role: string; content: string }[]): Promise<string> => {
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 600,    // 최대 토큰
        top_p: 1,   // 토큰의 확률 분포
        temperature: 1,   // 생성된 응답의 무작위성
        frequency_penalty: 0.5,   // 같은 토큰이 반복될 가능성
        presence_penalty: 0.5,    //새로운 토큰이 나타날 가능성
      }),
    });

    const data = await response.json();
    // 응답에서 첫 번째 선택의 메시지 내용을 가져옴. 존재하지 않으면 'No response'
    return data.choices?.[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Error fetching AI response';
  }
};

const OpenAI: React.FC<OpenAIProps> = ({ cards, onSummaryGenerated }) => {
  const hasFetchedRef = useRef(false); 
  // 처음에 false로 놔두고, 한번 실행되면 true로 바뀌고 중단.
  useEffect(() => {
    if (!hasFetchedRef.current) {
      const askTarotReading = async () => {
        const messages = cards.map(card => ({
          role: 'user',
          content: `카드 이름: ${card.name}, 카테고리: ${card.category}`
        }));
        hasFetchedRef.current = true;
        const aiResponse = await fetchOpenAIResponse(messages);
        onSummaryGenerated(aiResponse); // 콜백함수로 전달
      };

      askTarotReading();
    }
  }, [cards, onSummaryGenerated]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default OpenAI;

// API 응답 내보내는 페이지에서

// return 밖에서
// const [summary, setSummary] = useState<string>('');
// const handleSummaryGenerated = (generatedSummary: string) => {
//   setSummary(generatedSummary);
// };

// return 안에서
// <OpenAI cards={cards.map(card => ({ name: card.name, category }))} onSummaryGenerated={handleSummaryGenerated} />
// 이러면 summary에 응답이 들어감.