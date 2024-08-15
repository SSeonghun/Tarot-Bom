
import React, { useEffect, useState } from 'react'
import OpenAI from '../../../components/Common/OpenAI';
import { useNavigate } from 'react-router-dom';
interface TarotCard {
  id: number;
  name: string;
}

const tarotCards: TarotCard[] = [
  { id: 1, name: "The Fool" },
  { id: 2, name: "The Magician" },
  { id: 3, name: "The High Priestess" },
  { id: 4, name: "The Empress" },
  { id: 5, name: "The Emperor" },
  { id: 6, name: "The Hierophant" },
  { id: 7, name: "The Lovers" },
  { id: 8, name: "The Chariot" },
  { id: 9, name: "Strength" },
  { id: 10, name: "The Hermit" },
  { id: 11, name: "Wheel of Fortune" },
  { id: 12, name: "Justice" },
  { id: 13, name: "The Hanged Man" },
  { id: 14, name: "Death" },
  { id: 15, name: "Temperance" },
  { id: 16, name: "The Devil" },
  { id: 17, name: "The Tower" },
  { id: 18, name: "The Star" },
  { id: 19, name: "The Moon" },
  { id: 20, name: "The Sun" },
  { id: 21, name: "Judgement" },
  { id: 22, name: "The World" },
  { id: 23, name: "Ace of Wands" },
  { id: 24, name: "Two of Wands" },
  { id: 25, name: "Three of Wands" },
  { id: 26, name: "Four of Wands" },
  { id: 27, name: "Five of Wands" },
  { id: 28, name: "Six of Wands" },
  { id: 29, name: "Seven of Wands" },
  { id: 30, name: "Eight of Wands" },
  { id: 31, name: "Nine of Wands" },
  { id: 32, name: "Ten of Wands" },
  { id: 33, name: "Page of Wands" },
  { id: 34, name: "Knight of Wands" },
  { id: 35, name: "Queen of Wands" },
  { id: 36, name: "King of Wands" },
  { id: 37, name: "Ace of Cups" },
  { id: 38, name: "Two of Cups" },
  { id: 39, name: "Three of Cups" },
  { id: 40, name: "Four of Cups" },
  { id: 41, name: "Five of Cups" },
  { id: 42, name: "Six of Cups" },
  { id: 43, name: "Seven of Cups" },
  { id: 44, name: "Eight of Cups" },
  { id: 45, name: "Nine of Cups" },
  { id: 46, name: "Ten of Cups" },
  { id: 47, name: "Page of Cups" },
  { id: 48, name: "Knight of Cups" },
  { id: 49, name: "Queen of Cups" },
  { id: 50, name: "King of Cups" },
  { id: 51, name: "Ace of Swords" },
  { id: 52, name: "Two of Swords" },
  { id: 53, name: "Three of Swords" },
  { id: 54, name: "Four of Swords" },
  { id: 55, name: "Five of Swords" },
  { id: 56, name: "Six of Swords" },
  { id: 57, name: "Seven of Swords" },
  { id: 58, name: "Eight of Swords" },
  { id: 59, name: "Nine of Swords" },
  { id: 60, name: "Ten of Swords" },
  { id: 61, name: "Page of Swords" },
  { id: 62, name: "Knight of Swords" },
  { id: 63, name: "Queen of Swords" },
  { id: 64, name: "King of Swords" },
  { id: 65, name: "Ace of Pentacles" },
  { id: 66, name: "Two of Pentacles" },
  { id: 67, name: "Three of Pentacles" },
  { id: 68, name: "Four of Pentacles" },
  { id: 69, name: "Five of Pentacles" },
  { id: 70, name: "Six of Pentacles" },
  { id: 71, name: "Seven of Pentacles" },
  { id: 72, name: "Eight of Pentacles" },
  { id: 73, name: "Nine of Pentacles" },
  { id: 74, name: "Ten of Pentacles" },
  { id: 75, name: "Page of Pentacles" },
  { id: 76, name: "Knight of Pentacles" },
  { id: 77, name: "Queen of Pentacles" },
  { id: 78, name: "King of Pentacles" },
];


interface ScreenShootImageUploadProps {
  isVisible: boolean;
  imageData: any| null; 
  onClose: () => void;  
  candidateId:number;
}
const ScreenShootImageUpload: React.FC<ScreenShootImageUploadProps> = (props) => {
  const { isVisible, imageData, onClose,candidateId } = props;
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
    const [result, setResult] = useState<number[]>([]);
    const [vbutton, setvbutton]=useState(true);
    const navigate =useNavigate();
    // 이미지 크기를 줄이는 함수
    useEffect(()=>{
      const handleImageUpload = async () => {
        //const file = event.target.files?.[0];
        if (imageData) {
          //const reader = new FileReader();
          //reader.onloadend = async () => {
            const base64Image = imageData.toString().split(',')[1];
            if (base64Image) {
              console.log("Base64 Image:", base64Image);  // 디버깅: base64 이미지 확인
              const resizedImage = await resizeBase64Img(base64Image);
              setImageSrc(resizedImage);
              // const visionResult = await OpenAI(base64Image);
              // setResult(JSON.stringify(visionResult, null, 2));
  
            }
          };
          //reader.readAsDataURL(imageDate);
       // }
      };
      handleImageUpload();
    }, [imageData]);
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
    
  const handleSummaryGenerated = (summary: string) => {
    
    console.log(summary)
    const cardData: number[] = [];
  
    const cardNameRegex = /\*\*Card Name\*\*: ([^>]+)/g;
    let match;
    while ((match = cardNameRegex.exec(summary)) !== null) {
      const cardName = match[1];
  
      // tarotCards 배열에서 카드 이름과 일치하는 카드의 ID를 찾음
      const foundCard = tarotCards.find(card => card.name === cardName);
  
      if (foundCard) {
        cardData.push(foundCard.id);
      }
    }
    setResult(cardData);
    setvbutton(false);
    console.log("Extracted card names:", cardData);  // 디버깅: 추출된 카드 이름 확인
  };
  const gotaro = ()=>{
    navigate("/tarot-result", {
      state: {
        reader: "reader",
        selectedCard: result,
        worry:"worry", // worry 전달
        category: "G01" || "기본 카테고리", // category 전달, 기본값 설정
        candidateId:candidateId,
      },})
  }
    if (!isVisible) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
          <h1 className="text-2xl font-bold mb-4">AI 타로 분석</h1>
          {/* <input
            type="file"
            accept="image/*"
            onChange={imageData}
            className="mb-4"
          /> */}
          {imageSrc && (
            <>
            <img
              src={`data:image/png;base64,${imageSrc}`}
              alt="Uploaded"
              className="max-w-full h-auto mb-4 rounded"
            />
            <div className=''>
              <OpenAI
              cardImage={imageSrc as string}
              onSummaryGenerated={handleSummaryGenerated}
              worry="some worry"
              category="some category"
            />
            </div>
            
          </>
          )}
          {vbutton?<pre className="bg-gray-200 p-4 rounded">{result}</pre>
          :<button onClick={gotaro}>결과 보러가기</button>}
        </div>
      </div>
    );

    }
export default ScreenShootImageUpload

