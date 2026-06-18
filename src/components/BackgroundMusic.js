import { useCallback, useEffect, useRef, useState } from 'react';
import invitation from '../config/invitation';

const UNLOCK_EVENTS = ['touchstart', 'touchend', 'click', 'pointerdown', 'keydown'];

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
      if (!unlockedRef.current) {
        setNeedsUnlock(true);
      }
      return false;
    }
  }, []);

  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  }, []);

  const unlock = useCallback(
    async (e) => {
      e?.stopPropagation?.();
      await playAudio();
    },
    [playAudio]
  );

  const toggle = useCallback(
    async (e) => {
      e.stopPropagation();
      if (playing) {
        pauseAudio();
      } else {
        await playAudio();
      }
    },
    [pauseAudio, playAudio, playing]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    audio.setAttribute('playsinline', '');
    audio.setAttribute('webkit-playsinline', 'true');

    const tryAutoplay = async () => {
      if (unlockedRef.current) return;

      // На мобильных иногда срабатывает тихий автозапуск — затем включаем звук
      try {
        audio.muted = true;
        await audio.play();
        audio.muted = false;
        unlockedRef.current = true;
        setPlaying(true);
        setNeedsUnlock(false);
      } catch {
        audio.muted = false;
        setNeedsUnlock(true);
      }
    };

    const onUserGesture = () => {
      if (!unlockedRef.current) {
        playAudio();
      }
    };

    tryAutoplay();
    audio.addEventListener('canplaythrough', tryAutoplay);

    UNLOCK_EVENTS.forEach((eventName) => {
      document.addEventListener(eventName, onUserGesture, { capture: true, passive: true });
    });

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => {
      if (!unlockedRef.current) {
        setNeedsUnlock(true);
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('canplaythrough', tryAutoplay);
      UNLOCK_EVENTS.forEach((eventName) => {
        document.removeEventListener(eventName, onUserGesture, { capture: true });
      });
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, [playAudio]);

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
        className={`music-toggle ${playing ? 'music-toggle--playing' : ''} ${needsUnlock && !playing ? 'music-toggle--pulse' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Музыканы тоқтату' : 'Музыканы қосу'}
      >
        <span className="music-toggle__icon" aria-hidden="true">
          {playing ? '♫' : '♪'}
        </span>
      </button>
    </>
  );
}

export default BackgroundMusic;
