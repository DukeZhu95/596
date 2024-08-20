import React, { useEffect, useRef } from 'react';
import './App.css';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

function App() {
    const canvasRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);

    useEffect(() => {
        const initAudio = async () => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audioContextRef.current = audioContext;

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const source = audioContext.createMediaStreamSource(stream);

            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 2048;
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            dataArrayRef.current = dataArray;

            source.connect(analyser);
            draw();
        };

        const draw = () => {
            const canvas = canvasRef.current;
            const canvasCtx = canvas.getContext('2d');
            const analyser = analyserRef.current;
            const dataArray = dataArrayRef.current;

            const drawVisual = () => {
                requestAnimationFrame(drawVisual);

                analyser.getByteTimeDomainData(dataArray);

                canvasCtx.fillStyle = 'rgb(200, 200, 200)';
                canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

                canvasCtx.lineWidth = 2;
                canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

                canvasCtx.beginPath();

                const sliceWidth = canvas.width * 1.0 / dataArray.length;
                let x = 0;

                for (let i = 0; i < dataArray.length; i++) {
                    const v = dataArray[i] / 128.0;
                    const y = v * canvas.height / 2;

                    if (i === 0) {
                        canvasCtx.moveTo(x, y);
                    } else {
                        canvasCtx.lineTo(x, y);
                    }

                    x += sliceWidth;
                }

                canvasCtx.lineTo(canvas.width, canvas.height / 2);
                canvasCtx.stroke();
            };

            drawVisual();
        };

        initAudio();

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

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

    return (
        <div className="App">
            <header className="App-header">
                <h1>Recognizing</h1>
                <div className="button-container">
                    <button onClick={handleAudioRecognizing}>Audio Recognizing</button>
                    <button onClick={handleVideoRecognizing}>Video Recognizing</button>
                    <button onClick={handleImageRecognizing}>Image Recognizing</button>
                </div>
                <canvas ref={canvasRef} width="640" height="100"></canvas>
            </header>
        </div>
    );
}

export default App;