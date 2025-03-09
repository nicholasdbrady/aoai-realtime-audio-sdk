// src/pages/RealtimeAudioChat.tsx

import React, { useEffect, useRef, useState } from 'react';
import { RealtimeClient } from '@openai/realtime-api-beta';
import { WavRecorder, WavStreamPlayer } from '../lib/wavtools';
import { Button } from '../components/button/Button';

const LOCAL_RELAY_SERVER_URL = process.env.REACT_APP_LOCAL_RELAY_SERVER_URL || '';

export function RealtimeAudioChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const apiKey = LOCAL_RELAY_SERVER_URL
    ? ''
    : localStorage.getItem('openai_api_key') || prompt('OpenAI API Key') || '';

  const clientRef = useRef<RealtimeClient>(
    new RealtimeClient(
      LOCAL_RELAY_SERVER_URL
        ? { url: LOCAL_RELAY_SERVER_URL }
        : { apiKey, dangerouslyAllowAPIKeyInBrowser: true }
    )
  );

  const recorderRef = useRef<WavRecorder>(new WavRecorder({ sampleRate: 24000 }));
  const playerRef = useRef<WavStreamPlayer>(new WavStreamPlayer());

  const handleConnect = async () => {
    await clientRef.current.connect();
    setIsConnected(true);
  };

  const handleDisconnect = async () => {
    await recorderRef.current.end();
    clientRef.current.disconnect();
    setIsConnected(false);
    setIsRecording(false);
  };

  const startRecording = async () => {
    if (!isRecording) {
      await recorderRef.current.begin();
      recorderRef.current.record((data) => {
        clientRef.current.appendInputAudio(data.mono);
      });
      setIsRecording(true);
    }
  };

  const stopRecording = async () => {
    if (isRecording) {
      await recorderRef.current.pause();
      setIsRecording(false);
      clientRef.current.createResponse();
      playerRef.current.play(clientRef.current.outputAudioStream());
    }
  };

  useEffect(() => {
    return () => {
      if (isConnected) {
        recorderRef.current.end();
        clientRef.current.disconnect();
      }
    };
  }, [isConnected]);

  return (
    <div className="p-4 flex flex-col space-y-4">
      <Button
        label={isConnected ? 'Disconnect' : 'Connect'}
        buttonStyle={isConnected ? 'alert' : 'action'}
        onClick={isConnected ? handleDisconnect : handleConnect}
      />
      <Button
        label={isRecording ? 'Stop Recording' : 'Start Recording'}
        buttonStyle={isRecording ? 'alert' : 'action'}
        disabled={!isConnected}
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
      />
    </div>
  );
}
