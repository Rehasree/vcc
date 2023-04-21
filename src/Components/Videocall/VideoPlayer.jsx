import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (user.videoTrack && videoRef.current) {
      user.videoTrack.play(videoRef.current);
    }

    if (user.audioTrack && audioRef.current) {
      user.audioTrack.play(audioRef.current);
    }

    return () => {
      if (user.videoTrack) {
        user.videoTrack.stop();
      }

      if (user.audioTrack) {
        user.audioTrack.stop();
      }
    };
  }, [user]);

  return (
    <div>
      Uid: {user.uid}
      <div
        ref={videoRef}
        style={{ width: '400px', height: '500px' }}
      ></div>
      <audio ref={audioRef} autoPlay />
    </div>
  );
};
