import React, { useEffect, useRef } from "react";

interface OpenAIProps {
  cards?: { name: string; desc: string; imgUrl: string }[];
  onSummaryGenerated: (summary: string) => void;
  worry: string;
  category: string;
  cardImage?:string;
  // selectedCards: number[];
}

const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;
const apiEndpoint = "https://api.openai.com/v1/chat/completions";
const fetchOpenAIResponse = async (
  messages: { role: string; content: any }[]
): Promise<string> => {
  console.log('Fetching OpenAI response with messages:', messages); // 요청 메시지
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
    console.log("Received OpenAI response:", data);  // 디버깅: API 응답 데이터
    return data.choices?.[0]?.message?.content || "No response";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Error fetching AI response";
  }
};

const OpenAI: React.FC<OpenAIProps> = ({ cards, onSummaryGenerated, cardImage }) => {
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    console.log('useEffect triggered'); // useEffect가 트리거되었는지 확인
    console.log('cards:', cards);
    console.log('cardImage:', cardImage);
    const askTarotReading = async () => {
      //console.log("useEffect triggered");  // 디버깅: useEffect가 트리거됨
      if (hasFetchedRef.current) {
        console.log("Request already sent, skipping...");  // 디버깅: 중복 호출 방지
        return;
      }
      const initialMessage = {
        role: "system",
        content: `You are a tarot reader and a Korean music recommender. Given three or more tarot cards, provide the following:
        1. **Card Name**: <Card Name>
           - **Detail**: <Card Detail>
           - **Interpretation**: <Your Interpretation>
        Overall: <Your Overall Interpretation of all cards>
        Music: <Please provide only the song title and artist name>
        Answer in Korean`,
      };
      console.log(initialMessage)
      let messages = [initialMessage];
      console.log(messages)
      //if (cards){
      if (cards&&cards.length > 0) {
            console.log("Cards provided:", cards);  // 디버깅: 카드가 제공됨
            const cardMessages = cards.map((card) => ({
              role: "user",
              content: `Card Name: ${card.name}, Card Detail: ${card.desc}`,
          }));
          messages.push(...cardMessages)
      }
      console.log(messages)
      if(cardImage){
        console.log("Card image provided:", cardImage);  // 디버깅: 이미지가 제공됨
        messages.push({
          role: "user",
          content: `Image URL: data:image/png;base64,${cardImage}`,
        });
        console.log("Messages to send:", cardImage);
     // }
      
      console.log("Messages to send:", messages);  // 디버깅: 전송할 메시지들
        hasFetchedRef.current = true;
        const aiResponse = await fetchOpenAIResponse(messages);
        onSummaryGenerated(aiResponse);
        console.log("AI Response:", aiResponse);  // 디버깅: AI 응답 확인
      };
    };
    askTarotReading();
    console.log(1)
  }, [cards, onSummaryGenerated, cardImage]);

  return null;
};

export default OpenAI;
