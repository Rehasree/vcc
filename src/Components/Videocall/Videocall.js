import { useState } from 'react';
import './Videocall.css';
import { VideoRoom } from './VideoRoom';

function VApp() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="App">
      <h1>WDJ Virtual Call</h1>

      {!joined && (
        <button onClick={() => setJoined(true)}>
          Join Room
        </button>
      )}

      {joined && (
        <>
          <button onClick={() => setJoined(false)}>
            To Lobby
          </button>
          <VideoRoom />
        </>
      )}
    </div>
  );
}

export default VApp;
