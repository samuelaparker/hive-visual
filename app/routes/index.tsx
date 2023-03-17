import { useEffect, useRef } from "react";

import testSong from "../../public/testSong.mp3";

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

export default function Index() {
  // const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  // const [song, setSong] = useState(testSong);

  const audioRef = useRef<HTMLMediaElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (audioRef.current) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    const track = audioContext.createMediaElementSource(audioRef.current);
    // use the track object as needed
    track.connect(audioContext.destination);
  }

  // useEffect(() => {
  //   if (audioRef.current) {
  //     const AudioContext = window.AudioContext || window.webkitAudioContext;
  //     const audioContext = new AudioContext();
  //     const track = audioContext.createMediaElementSource(audioRef.current);
  //     // use the track object as needed
  //     track.connect(audioContext.destination);
  //   }
  // }, [audioRef]);

  return (
    <>
      <div>audio context</div>
      <audio controls ref={audioRef} src={testSong}></audio>
      <button
        onClick={handlePlay}
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
        Play
      </button>
      <button
        onClick={handleStop}
        className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
      >
        Stop
      </button>
    </>
  );
}
