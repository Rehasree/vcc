import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';
import axios from 'axios';




export const VideoRoom = () => {
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
      console.log('token',token)
      // if(TOKEN){
        const uid = await client.join(
          APP_ID,
          CHANNEL,
          token,
          null
        );
      // }
  
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
      
      tracks =
        await AgoraRTC.createMicrophoneAndCameraTracks();
      await client.publish(tracks);
  
      return {
        tracks,
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
        previousUsers.filter((u) => u.uid !== user.uid)
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
  
  return (
    <>
      <div style={{color:"white"}}>{uid}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 200px)',
          }}
        >
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} />
          ))}
        </div>
      </div>
    </>
  );
};
