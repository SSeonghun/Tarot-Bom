import React, { useState } from 'react'

import OpenAI from '../../components/Common/OpenAI';
const ImageUpload: React.FC = () => {
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [result, setResult] = useState<string>('결과가 여기에 표시됩니다.');
    // 이미지 크기를 줄이는 함수
  const resizeBase64Img = (
    base64Str: string,
    maxWidth = 300,
    maxHeight = 300
  ): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `data:image/png;base64,${base64Str}`;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        const resizedBase64 = canvas.toDataURL().split(',')[1];
        resolve(resizedBase64);
      };
    });
  };
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result?.toString().split(',')[1];
          if (base64Image) {
            console.log("Base64 Image:", base64Image);  // 디버깅: base64 이미지 확인
            const resizedImage = await resizeBase64Img(base64Image);
            setImageSrc(resizedImage);
            // const visionResult = await OpenAI(base64Image);
            // setResult(JSON.stringify(visionResult, null, 2));

          }
        };
        reader.readAsDataURL(file);
      }
    };
    const handleSummaryGenerated = (summary: string) => {
      setResult(summary);
      console.log("Summary generated:", summary);  // 디버깅: 요약 결과 확인
    };
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">GPT-4 이미지 분석 테스트</h1>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {imageSrc && (
            <>
            <img
              src={`data:image/png;base64,${imageSrc}`}
              alt="Uploaded"
              className="max-w-full max-h-96 mx-auto mb-4"
            />
            <OpenAI
              cardImage={imageSrc as string}
              onSummaryGenerated={handleSummaryGenerated}
              worry="some worry"
              category="some category"
            />
          </>
          )}
          <pre className="bg-gray-200 p-4 rounded">{result}</pre>
        </div>
      </div>
    );

    }
export default ImageUpload
