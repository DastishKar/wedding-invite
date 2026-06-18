import { useCallback, useEffect, useRef, useState } from "react";
import invitation from "../config/invitation";

const UNLOCK_EVENTS = [
  "touchstart",
  "touchend",
  "click",
  "pointerdown",
  "keydown",
];

function BackgroundMusic() {
  const audioRef = useRef(null);
  const unlockedRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [needsUnlock, setNeedsUnlock] = useState(false);

  const playAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      audio.muted = false;
      audio.volume = 1;
      await audio.play();
      unlockedRef.current = true;
      setPlaying(true);
      setNeedsUnlock(false);
      return true;
    } catch {
      setPlaying(false);
      setNeedsUnlock(true);
      return false;
    }
  }, []);

  const pauseAudio = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const unlock = useCallback(
    async (e) => {
      e?.stopPropagation?.();
      await playAudio();
    },
    [playAudio],
  );

  const toggle = useCallback(
    async (e) => {
      e.stopPropagation();
      playing ? pauseAudio() : await playAudio();
    },
    [pauseAudio, playAudio, playing],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.setAttribute("playsinline", "");
    audio.setAttribute("webkit-playsinline", "true");

    // Попытка автозапуска (работает на ПК и некоторых Android)
    const tryAutoplay = async () => {
      if (unlockedRef.current) return;
      try {
        audio.muted = false;
        await audio.play();
        unlockedRef.current = true;
        setPlaying(true);
        setNeedsUnlock(false);
      } catch {
        // Автозапуск заблокирован — показываем кнопку
        setNeedsUnlock(true);
      }
    };

    tryAutoplay();

    // ключевое: обработчик должен быть синхронным и вызывать play() напрямую
    const onUserGesture = () => {
      if (unlockedRef.current) return;

      // Убираем все обработчики сразу — play() должен быть вызван
      // в одном синхронном стеке с событием
      UNLOCK_EVENTS.forEach((ev) => {
        document.removeEventListener(ev, onUserGesture, { capture: true });
      });

      const audio = audioRef.current;
      if (!audio) return;

      audio.muted = false;
      audio.volume = 1;

      // play() синхронно в обработчике жеста — браузер разрешит
      audio
        .play()
        .then(() => {
          unlockedRef.current = true;
          setPlaying(true);
          setNeedsUnlock(false);
        })
        .catch(() => {
          setNeedsUnlock(true);
        });
    };

    UNLOCK_EVENTS.forEach((ev) => {
      document.addEventListener(ev, onUserGesture, {
        capture: true,
        passive: true,
      });
    });

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      UNLOCK_EVENTS.forEach((ev) => {
        document.removeEventListener(ev, onUserGesture, { capture: true });
      });
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []); // <-- убрали playAudio из зависимостей, чтобы не пересоздавать обработчик

  const sources = invitation.music.sources || [invitation.music.src];

  return (
    <>
      <audio ref={audioRef} loop preload="auto" playsInline>
        {sources.map((src) => (
          <source key={src} src={src} />
        ))}
      </audio>

      {needsUnlock && !playing && (
        <button
          type="button"
          className="music-unlock-hint"
          onClick={unlock}
          aria-label="Музыканы қосу"
        >
          <span className="music-unlock-hint__icon" aria-hidden="true">
            ♪
          </span>
          Музыканы қосу үшін басыңыз
        </button>
      )}

      <button
        type="button"
        className={`music-toggle ${playing ? "music-toggle--playing" : ""} ${needsUnlock && !playing ? "music-toggle--pulse" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Музыканы тоқтату" : "Музыканы қосу"}
      >
        <span className="music-toggle__icon" aria-hidden="true">
          {playing ? "♫" : "♪"}
        </span>
      </button>
    </>
  );
}

export default BackgroundMusic;
