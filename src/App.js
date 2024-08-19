import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/*<img src={logo} className="App-logo" alt="logo" />*/}
                <h1>Recognizing</h1>
                <div className="button-container">
                    // 3 buttons
                    <button onClick={() => alert('button for audio recognizing')}>Audio Recognizing</button>
                    <button onClick={() => alert('button for video recognizing')}>Video Recognizing</button>
                    <button onClick={() => alert('button for image recognizing')}>Image Recognizing</button>
                </div>
            </header>
        </div>
    );
}


export default App;
