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
  // Флаг чтобы не вызывать load() повторно
  const loadedRef = useRef(false);

  const sources = invitation.music.sources || [invitation.music.src];

  // НЕ вызываем audio.load() здесь — пусть браузер сам загрузит
  // через preload. load() будет вызван только один раз перед первым play()
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      loadedRef.current = true;
    };

    audio.addEventListener("canplay", handleCanPlay);
    return () => audio.removeEventListener("canplay", handleCanPlay);
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio.volume = 1;
    audio.muted = false;

    // Если аудио ещё не было загружено — загружаем один раз синхронно,
    // но play() вызываем сразу в том же tick жеста пользователя.
    // НЕ используем async/await — это критично для iOS Safari,
    // который требует прямой вызов play() внутри обработчика события.
    if (!loadedRef.current) {
      audio.load();
      loadedRef.current = true;
    }

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true);
        })
        .catch((e) => {
          // AbortError после load() — пробуем ещё раз через небольшую паузу
          if (e.name === "AbortError") {
            setTimeout(() => {
              audio
                .play()
                .then(() => setPlaying(true))
                .catch((e2) => {
                  console.warn("Audio play error (retry):", e2);
                  setPlaying(false);
                });
            }, 300);
          } else {
            console.warn("Audio play error:", e);
            setPlaying(false);
          }
        });
    } else {
      // Старые браузеры — play() не возвращает Promise
      setPlaying(true);
    }
  };

  return (
    <>
      {/* 
        preload="none" на мобильных — браузер не будет пытаться
        загрузить файл заранее и не создаст конфликт с play().
        На десктопе preload="auto" работал бы лучше, но на iOS
        он всё равно игнорируется.
      */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        playsInline
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
