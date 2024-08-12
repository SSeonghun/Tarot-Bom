
const apiKey = process.env.REACT_APP_OPENAI_API_KEY as string;

const analyzeImageWithGPT4 = async (imageBase64: string): Promise<any> => {
    try {
        console.log(imageBase64)
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', 
                messages: [
                    {
                        role: "system",
                        content:[
                            {
                                content: `You are a tarot reader and a Korean music recommender. Given three or more tarot cards, provide the following:
                                            1. **Card Name**: <Card Name>
                                                - **Detail**: <Card Detail>
                                                - **Interpretation**: <Your Interpretation>
                                            Overall: <Your Overall Interpretation of all cards>
                                            Music: <Please provide only the song title and artist name>`
                            }
                        ]
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/png;base64,${imageBase64}`
                                }
                            }
                        ]
                    }
                ],
                max_tokens: 300
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response)
        const data = await response.json();
        console.log(data)
        return data; // 응답 처리
    } catch (error) {
        console.error('Error analyzing image with GPT-4:', error);
        return 'Image analysis error';
    }
};
export default analyzeImageWithGPT4