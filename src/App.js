import React, { useState } from 'react';
import './App.css';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

function App() {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const handleAudioRecognizing = async () => {
        const speechConfig = speechsdk.SpeechConfig.fromSubscription("***subscriptionkey***", "**region**");
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();

        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(
            result => {
                if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
                    alert(`Listening: ${result.text}`);
                } else {
                    alert(`Error: ${result.errorDetails}`);
                }
            },
            err => {
                console.error(err);
                alert(`Error: ${err}`);
            }
        );
    };

    const handleVideoRecognizing = () => {
        alert('Button for video recognizing');
        // Implement video recognizing logic here
    };

    const handleImageRecognizing = () => {
        alert('Button for image recognizing');
        // Implement image recognizing logic here
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);

            const chunks = [];
            recorder.ondataavailable = event => {
                chunks.push(event.data);
            };

            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/wav' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.display = 'none';
                a.href = url;
                a.download = 'recording.wav';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            };

            recorder.start();
            setIsRecording(true);

            setTimeout(() => {
                recorder.stop();
                setIsRecording(false);
            }, 10000); // Stop recording after 10 seconds
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Recognizing</h1>
                <div className="button-container">
                    <button onClick={handleAudioRecognizing}>Audio Recognizing</button>
                    <button onClick={handleVideoRecognizing}>Video Recognizing</button>
                    <button onClick={handleImageRecognizing}>Image Recognizing</button>
                    <button onClick={startRecording} disabled={isRecording}>
                        {isRecording ? 'Recording...' : 'Start Recording'}
                    </button>
                </div>
            </header>
        </div>
    );
}

export default App;