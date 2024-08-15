import React, { useEffect, useRef, useState } from "react";

interface OpenAIProps {
    cards?: { name: string; desc: string; imgUrl: string }[];
    onSummaryGenerated: (summary: string) => void;
    worry: string;
    category: string;
    cardImage?: string;
}

const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;
const apiEndpoint = "https://api.openai.com/v1/chat/completions";

const fetchOpenAIResponse = async (
    messages: { role: string; content: any }[]
): Promise<string> => {
    try {
        console.log(messages);
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

const OpenAI: React.FC<OpenAIProps> = ({
    cards,
    onSummaryGenerated,
    worry,
    cardImage,
    category,
}) => {
    const hasFetchedRef = useRef<boolean>(false);

    useEffect(() => {
        const askTarotReading = async () => {
            if (hasFetchedRef.current) {
                console.log("Request already sent, skipping...");
                return;
            }

            console.log(worry);

            const initialMessage = {
                role: "system",
                content: `You are a tarot reader and a Korean music recommender. I will give three or more tarot cards and a category, provide the following:
        1. Card Name: <Card Name>
           - **카드요약**: <Card Detail>
           - **카드상세**: <Your Interpretation of this card in the context of the category>
        Overall: <Your Overall Interpretation of all cards in the context of the category>
        Music: <Please provide only the song title and artist name appropriate for the category>
        I've been struggling with ${category}, and it's been weighing on me for a while. Lately, I've been feeling ${worry} about it. I believe that talking it through could really help me gain some clarity. Could you please offer your advice or perspective on this issue? I'd greatly appreciate your help.
        <Card Name> must English and 카드상세 must Korean`,
            };

            let messages = [initialMessage];

            if (cards && cards.length > 0) {
                const cardMessages = cards.map((card) => ({
                    role: "user",
                    content: `Card Name: ${card.name}, Card Detail: ${card.desc}`,
                }));
                messages.push(...cardMessages);
            }

            if (cardImage) {
                messages.push({
                    role: "user",
                    content: `Image URL: data:image/png;base64,${cardImage}`,
                });
            }

            const aiResponse = await fetchOpenAIResponse(messages);

            if (!hasFetchedRef.current) {
                onSummaryGenerated(aiResponse);
                hasFetchedRef.current = true;
            }
        };

        askTarotReading();
    }, [cards, onSummaryGenerated, cardImage, category]);

    return null;
};

export default OpenAI;
