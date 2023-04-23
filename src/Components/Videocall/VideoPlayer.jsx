import React, { useEffect, useRef } from 'react';

export const VideoPlayer = ({ user, isLocal }) => {
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

  const videoPlayerStyle = isLocal
    ? {
        position: 'absolute',
        top: 20,
        right: 20,
        width: '30%',
        zIndex: 1,
      }
    : {
        width: '100%',
        height: '100%',
      };

  return (
    <div style={videoPlayerStyle}>
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        autoPlay
        playsInline
        muted={isLocal}
      />
      {isLocal || <audio ref={audioRef} autoPlay />}
    </div>
  );
};
