import { useRef, useState } from "react";
import invitation from "../config/invitation";

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.volume = 1;
        audio.muted = false;

        await audio.play();
        setPlaying(true);
      }
    } catch (e) {
      console.log("Audio play error:", e);
      setPlaying(false);
    }
  };

  const sources = invitation.music.sources || [invitation.music.src];

  return (
    <>
      <audio ref={audioRef} loop preload="auto" playsInline>
        {sources.map((src) => (
          <source key={src} src={src} type="audio/mpeg" />
        ))}
      </audio>

      <button
        onClick={toggleMusic}
        className={`music-toggle ${playing ? "music-toggle--playing" : ""}`}
        aria-label={playing ? "Остановить музыку" : "Включить музыку"}
      >
        {playing ? "♫" : "♪"}
      </button>
    </>
  );
}

export default BackgroundMusic;
