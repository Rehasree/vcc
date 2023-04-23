import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import axios from 'axios';
import { Button } from '@mui/material';
import './videoroom.css'
import { useImperativeHandle } from 'react';


const VideoRoom = ({ isFullScreen, setIsFullScreen ,setJoined}, ref) => {
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState(null);
  const [token,setToken]=useState(null)
  const fetchToken =async()=>{
    const response = await axios.get('https://activeplushvolcano.rehasreekoneru.repl.co/generate-token')
    console.log('fetch tokenresponse', response)
    setToken(response.data.token.toString())
    return response.data.token;
  }
  useEffect(()=>{
    fetchToken()
  },[])
  
  const APP_ID = '3b3906112c884a43a1730974819db525';
  
  const CHANNEL = 'test-channel';
  
  AgoraRTC.setLogLevel(4);
  
  let agoraCommandQueue = Promise.resolve();
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const handleToggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
    users.find(user => user?.uid === uid)?.audioTrack?.setEnabled(!isAudioMuted);
  };

  const handleToggleVideo = () => {
    setIsVideoMuted(!isVideoMuted);
    users.find(user => user?.uid === uid)?.videoTrack?.setEnabled(!isVideoMuted);
  };

  const createAgoraClient = ({
    onVideoTrack,
    onUserDisconnected,
  }) => {
    const client = createClient({
      mode: 'rtc',
      codec: 'vp8',
    });
  
    let tracks;
  
    const waitForConnectionState = (connectionState) => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (client.connectionState === connectionState) {
            clearInterval(interval);
            resolve();
          }
        }, 200);
      });
    };
  
    const connect = async () => {
      await waitForConnectionState('DISCONNECTED');
      console.log('token', token);
    
      const uid = await client.join(APP_ID, CHANNEL, token, null);
    
      client.on('user-published', (user, mediaType) => {
        client.subscribe(user, mediaType).then(() => {
          if (mediaType === 'video') {
            onVideoTrack(user);
          }
        });
      });
    
      client.on('user-left', (user) => {
        onUserDisconnected(user);
      });
    
      // Configure audio track with echo cancellation
      const audioTrackConfig = {
        encoderConfig: 'high_quality_stereo',
        noiseSuppression: true,
        autoGainControl: true,
        echoCancellation: true,
      };
    
      // Create audio and video tracks with custom configurations
      const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(
        audioTrackConfig
      );
    
      await client.publish([audioTrack, videoTrack]);
    
      return {
        tracks: [audioTrack, videoTrack],
        uid,
      };
    };
    
  
  
    const listDevices = async () => {
      const audioDevices = await AgoraRTC.getDevices('audio');
      console.log('Audio devices:', audioDevices);
  
    
      const videoDevices = await AgoraRTC.getDevices('videoinput');
      console.log('Video devices:', videoDevices);
    };
    
  
    listDevices();
  
    const disconnect = async () => {
      await waitForConnectionState('CONNECTED');
      client.removeAllListeners();
      for (let track of tracks) {
        track.stop();
        track.close();
      }
      await client.unpublish(tracks);
      await client.leave();
    };
  
    return {
      disconnect,
      connect,
    };
  };
  useEffect(() => {
    const onVideoTrack = (user) => {
      setUsers((previousUsers) => [...previousUsers, user]);
    };

    const onUserDisconnected = (user) => {
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u?.uid !== user?.uid)
      );
    };

    
    const { connect, disconnect } = createAgoraClient({
      onVideoTrack,
      onUserDisconnected,
    });

    const setup = async () => {
      const { tracks, uid } = await connect();
      setUid(uid);
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          uid,
          audioTrack: tracks[0],
          videoTrack: tracks[1],
        },
      ]);
    };
   
    
    const cleanup = async () => {
      await disconnect();
      setUid(null);
      setUsers([]);
    };
    
    // setup();
    agoraCommandQueue = agoraCommandQueue.then(setup);

    return () => {
      // cleanup();
      agoraCommandQueue = agoraCommandQueue.then(cleanup);
    };
  }, []);

  const handleEndCall = () => {
    agoraCommandQueue = agoraCommandQueue.then(() => {
      const { cleanup, disconnect } = createAgoraClient({});
      disconnect()
      cleanup();
    });
    setJoined(false)
  };
  const containerStyle = isFullScreen
  ? {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1000,
      backgroundColor: '#000',
       overflowY:"scroll"
    }
  : {};

const handleExitFullScreen = () => {
  if (isFullScreen) {
    setIsFullScreen(false);
  }
};

const onVideoTrack = (user) => {
  setUsers((previousUsers) => {
    // Check if the user is already in the list
    const userExists = previousUsers?.find((u) => u?.uid === user?.uid);
    if (!userExists) {
      return [...previousUsers, user];
    } else {
      // Update the existing user's video track
      const updatedUsers = previousUsers.map((u) => {
        if (u?.uid === user?.uid) {
          return { ...u, videoTrack: user?.videoTrack };
        } else {
          return u;
        }
      });
      return updatedUsers;
    }
  });
};


useImperativeHandle(ref, () => ({
  onVideoTrack,
}));

// useEffect(()=>{
//   onVideoTrack()
// },[users])

  
  return (
    <>
     <div style={containerStyle}>
      {isFullScreen && (
        <Button onClick={handleExitFullScreen} style={{ position: 'absolute', zIndex: 1001 }}>
          Exit Full Screen
        </Button>
      )}
      {/* ... other content ... */}
      <div style={{ color: 'white' }}>{uid&&uid}</div>
      <div className="video-container">
        {users.map((user) => (
          <VideoPlayer
            key={user?.uid}
            user={user}
            isLocal={user?.uid === uid}
            className="video-track"
          />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Button variant="contained" onClick={handleToggleAudio}>
          {isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
        </Button>
        <Button
          variant="contained"
          onClick={handleToggleVideo}
          style={{ marginLeft: 10 }}
        >
          {isVideoMuted ? 'Turn On Video' : 'Turn Off Video'}
        </Button>
        <Button variant="contained" onClick={handleEndCall} style={{ marginLeft: 10 }}>
          End Call
        </Button>
      </div>
    </div>
      
    </>
  );
};
export default React.forwardRef(VideoRoom);
