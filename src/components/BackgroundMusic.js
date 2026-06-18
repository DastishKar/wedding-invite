import { useEffect, useRef, useState } from 'react';
import invitation from '../config/invitation';

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    try {
      audio.volume = 1;
      await audio.play();
      setPlaying(true);
      return true;
    } catch {
      setPlaying(false);
      return false;
    }
  };

  const pauseAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  };

  const toggle = async (e) => {
    e.stopPropagation();
    if (playing) {
      pauseAudio();
    } else {
      await playAudio();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;

    const tryAutoplay = () => {
      playAudio();
    };

    tryAutoplay();
    audio.addEventListener('canplaythrough', tryAutoplay);

    const unlock = () => {
      playAudio();
    };
    document.addEventListener('pointerdown', unlock);
    document.addEventListener('keydown', unlock);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('canplaythrough', tryAutoplay);
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const sources = invitation.music.sources || [invitation.music.src];

  return (
    <>
      <audio ref={audioRef} loop preload="auto" playsInline>
        {sources.map((src) => (
          <source key={src} src={src} />
        ))}
      </audio>
      <button
        type="button"
        className={`music-toggle ${playing ? 'music-toggle--playing' : ''}`}
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
