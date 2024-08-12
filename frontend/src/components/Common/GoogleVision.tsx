
const apiKey = process.env.REACT_APP_GOOGLEVISION_API_KEY as string;

const GoogleVision = async (imageBase64: string): Promise<string> => {
    try {
        console.log(apiKey)
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: imageBase64,
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10,
                },
              ],
            },
          ],
        }),
      });
  
      const data = await response.json();
      // 분석된 결과를 처리하여 문자열로 반환
      console.log(data)
      return JSON.stringify(data.responses[0].labelAnnotations);
    } catch (error) {
      console.error('Error recognizing image:', error);
      return '이미지 인식 오류';
    }
  };
  
  export default GoogleVision;