// import './App.css';


// function App() {
//     return (
//         <div className="App">
//             <header className="App-header">
//                 {/*<img src={logo} className="App-logo" alt="logo" />*/}
//                 <h1>Recognizing</h1>
//                 <div className="button-container">
//                     // 3 buttons
//                     <button onClick={() => alert('button for audio recognizing')}>Audio Recognizing</button>
//                     <button onClick={() => alert('button for video recognizing')}>Video Recognizing</button>
//                     <button onClick={() => alert('button for image recognizing')}>Image Recognizing</button>
//                 </div>
//             </header>
//         </div>
//     );
// }


// export default App;

import './App.css';
import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

function App(){
    const handleAudioRecognizing = async () => {
        const speechConfig = speechsdk.speechConfig.fromSubscription("***subscriptionkey***", "**region**");
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);   

        recognizer.recongnizerOnceAsync(result => {
            console.log(result);
            alert(`Listening:${result.text}`);
        });
    };

    const handleVideoRecognizing = async () => {
        // video recognizing logic

    };

    const handleImageRecognizing = async () => {
        //Image recognition logic
    };

    return (
                <div className="App">
                    <header className="App-header">
                        {/*<img src={logo} className="App-logo" alt="logo" />*/}
                        <h1>Recognizing</h1>
                        <div className="button-container">
                            // 3 buttons
                            <button onClick={handleAudioRecognizing}>Audio Recognizing</button>
                            <button onClick={handleVideoRecognizing}>Video Recognizing</button>
                            <button onClick={handleImageRecognizing}>Image Recognizing</button>
                        </div>
                    </header>
                </div>
            );
}