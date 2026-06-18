import { useEffect, useRef, useState } from "react";
import invitation from "../config/invitation";

function getMimeType(src) {
  const ext = src.split(".").pop().toLowerCase();
  const map = {
    mp3: "audio/mpeg",
    ogg: "audio/ogg",
    wav: "audio/wav",
    m4a: "audio/mp4",
    aac: "audio/aac",
  };
  return map[ext] || "audio/mpeg";
}

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const sources = invitation.music.sources || [invitation.music.src];

  // Явно перезагружаем источники при маунте — иначе некоторые
  // мобильные браузеры (особенно старые Android WebView) не видят
  // <source> детей, добавленные React после первого рендера.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
    }
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
        return;
      }

      audio.volume = 1;
      audio.muted = false;

      await audio.play();
      setPlaying(true);
      setUnlocked(true);
    } catch (e) {
      console.warn("Audio play error:", e);
      setPlaying(false);

      // На iOS отказ play() почти всегда означает, что устройство
      // в режиме "без звука" (физический переключатель) — это не
      // ошибка кода, JS не может это обойти через стандартный <audio>.
      if (!unlocked) {
        console.warn(
          "Если звука нет на iPhone — проверьте переключатель звонка/без звука.",
        );
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        muted={false}
        // webkit-playsinline нужен для старых iOS Safari
        webkit-playsinline="true"
      >
        {sources.map((src) => (
          <source key={src} src={src} type={getMimeType(src)} />
        ))}
      </audio>

      <button
        onClick={toggleMusic}
        className={`music-toggle ${playing ? "music-toggle--playing" : ""}`}
        aria-label={playing ? "Остановить музыку" : "Включить музыку"}
        type="button"
      >
        {playing ? "♫" : "♪"}
      </button>
    </>
  );
}

export default BackgroundMusic;
