import React, { useState } from 'react';

const Chatting: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isMe: boolean }[]>([
    { text: 'Hello!', isMe: false },
    { text: 'How are you?', isMe: true },
    { text: 'This is a test message.', isMe: false }
  ]);
  const [isVisible, setIsVisible] = useState(true); // 채팅창 표시 상태

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, isMe: true }]);
      setMessage('');
    }
  };

  const toggleChat = () => {
    setIsVisible(!isVisible); // 채팅창의 표시 상태를 토글
  };

  return (
    <div className="relative">
      <div
        className={`h-[80vh] flex flex-col bg-gray-800 bg-opacity-80 text-white shadow-lg rounded-lg p-4 mt-4 ml-12 mr-4 transition-transform ${isVisible ? 'translate-x-0' : 'translate-x-[calc(100%_-_3rem)]'}`}
        style={{ zIndex: 5 }}
      >
        <button
          onClick={toggleChat}
          className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-white transition-transform"
          style={{ zIndex: 10, left: '-1.5rem' }}
        >
          {isVisible ? '>' : '<'}
        </button>
        <h1 className="text-xl font-bold mb-5">Chatting</h1>
        <div className="flex-1 overflow-y-scroll mb-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-3 ml-2 flex items-start ${msg.isMe ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isMe && (
                <img
                  src="/placeholder-user.png" // 대체 이미지 경로
                  alt="User"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`p-2 rounded-lg ${
                  msg.isMe ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'
                }`}
              >
                {msg.text}
              </div>
              {msg.isMe && (
                <img
                  src="/placeholder-user.png" // 대체 이미지 경로
                  alt="Me"
                  className="w-8 h-8 rounded-full ml-2 mr-4"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-600 p-2 flex-1 rounded-lg bg-gray-900 text-white"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatting;
