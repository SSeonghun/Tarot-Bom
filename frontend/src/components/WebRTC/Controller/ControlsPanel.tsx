import React, { useState, useEffect } from "react";

interface ControlsPanelProps {
    onCameraChange: (deviceId: string | null, stream: MediaStream | null) => void;
    onAudioChange: (deviceId: string | null, stream: MediaStream | null) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({ onCameraChange, onAudioChange }) => {
    const [selectedTab, setSelectedTab] = useState<'camera' | 'audio' | 'screen' | null>(null);
    const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
    const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
    const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        const fetchDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            setCameraDevices(devices.filter(device => device.kind === 'videoinput'));
            setAudioDevices(devices.filter(device => device.kind === 'audioinput'));
        };

        fetchDevices();
    }, []);

    useEffect(() => {
        const switchCamera = async (deviceId: string | null) => {
            if (videoStream) {
                videoStream.getTracks().forEach(track => track.stop());
            }
            if (deviceId) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { deviceId: { exact: deviceId } }
                });
                setVideoStream(stream);
                onCameraChange(deviceId, stream);
            } else {
                setVideoStream(null);
                onCameraChange(null, null);
            }
        };

        if (selectedCamera !== null) {
            switchCamera(selectedCamera);
            setSelectedTab(null); // 탭 닫기
        }
    }, [selectedCamera, videoStream, onCameraChange]);

    useEffect(() => {
        const switchAudio = async (deviceId: string | null) => {
            if (audioStream) {
                audioStream.getTracks().forEach(track => track.stop());
            }
            if (deviceId) {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: { deviceId: { exact: deviceId } }
                });
                setAudioStream(stream);
                onAudioChange(deviceId, stream);
            } else {
                setAudioStream(null);
                onAudioChange(null, null);
            }
        };

        if (selectedAudio !== null) {
            switchAudio(selectedAudio);
            setSelectedTab(null); // 탭 닫기
        }
    }, [selectedAudio, audioStream, onAudioChange]);

    const handleTabClick = (tab: 'camera' | 'audio' | 'screen') => {
        setSelectedTab(prevTab => (prevTab === tab ? null : tab));
    };

    return (
        <div className="relative bg-gray-300 flex flex-col h-full">
            {/* Tab content */}
            <div
                className={`transition-transform duration-300 ease-in-out ${
                    selectedTab ? 'translate-y-0' : 'translate-y-full'
                } flex-grow p-4 overflow-auto`}
                style={{
                    maxHeight: `calc(100vh - 56px)`, // Assuming the button bar height is 56px
                }}
            >
                {selectedTab === 'camera' && (
                    <div>
                        <h3 className="text-lg font-bold mb-2">카메라 선택</h3>
                        <ul>
                            <li>
                                <button
                                    onClick={() => setSelectedCamera(null)}
                                    className="block p-2 mb-2 bg-gray-200 hover:bg-gray-300 w-full text-left"
                                >
                                    카메라 없음
                                </button>
                            </li>
                            {cameraDevices.map(device => (
                                <li key={device.deviceId}>
                                    <button
                                        onClick={() => setSelectedCamera(device.deviceId)}
                                        className="block p-2 mb-2 bg-gray-200 hover:bg-gray-300 w-full text-left"
                                    >
                                        {device.label || 'Unnamed Camera'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedTab === 'audio' && (
                    <div>
                        <h3 className="text-lg font-bold mb-2">음성 선택</h3>
                        <ul>
                            <li>
                                <button
                                    onClick={() => setSelectedAudio(null)}
                                    className="block p-2 mb-2 bg-gray-200 hover:bg-gray-300 w-full text-left"
                                >
                                    마이크 없음
                                </button>
                            </li>
                            {audioDevices.map(device => (
                                <li key={device.deviceId}>
                                    <button
                                        onClick={() => setSelectedAudio(device.deviceId)}
                                        className="block p-2 mb-2 bg-gray-200 hover:bg-gray-300 w-full text-left"
                                    >
                                        {device.label || 'Unnamed Microphone'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedTab === 'screen' && (
                    <div>
                        <h3 className="text-lg font-bold mb-2">시커 프로필</h3>
                        {/* 화면 전환 기능은 나중에 구현 */}
                        {/* <ResizeComponent/> */}
                    </div>
                )}
            </div>

            {/* Bottom buttons */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-200 p-2 flex space-x-4">
                <button
                    onClick={() => handleTabClick('camera')}
                    className={`flex-1 p-2 ${selectedTab === 'camera' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    카메라
                </button>
                <button
                    onClick={() => handleTabClick('audio')}
                    className={`flex-1 p-2 ${selectedTab === 'audio' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    마이크
                </button>
                <button
                    onClick={() => handleTabClick('screen')}
                    className={`flex-1 p-2 ${selectedTab === 'screen' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    시커 프로필
                </button>
            </div>
        </div>
    );
};

export default ControlsPanel;
