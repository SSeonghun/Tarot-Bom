// ScenarioPanel.tsx
import React, { useState } from 'react';

type ScenarioPanelProps = {
    onScenarioChange: () => void;
    onOpenProfile: () => void;
};

const ScenarioPanel: React.FC<ScenarioPanelProps> = ({ onScenarioChange, onOpenProfile }) => {
    // Define the scenarios and the initial state
    const scenarios = ['입장 인사', '카드 선택 시간','카드 선택 확인' ,'결과 확인','마무리 인사'];
    const [currentScenario, setCurrentScenario] = useState(0);

    // Function to handle scenario change
    const handleScenarioChange = () => {
        setCurrentScenario((prev) => prev < scenarios.length - 1 ? prev + 1 : prev);
        onScenarioChange();
    };

    return (
        <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-4 shadow-md flex space-x-4 z-50">
            <p>진행 상황판</p>
            <button
                className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
                onClick={onOpenProfile}
            >
                <p>시커 프로필</p>
            </button>
            <button
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                onClick={handleScenarioChange}
            >
                {scenarios[currentScenario]}
            </button>
        </div>
    );
};

export default ScenarioPanel;
