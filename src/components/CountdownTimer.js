import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import invitation from '../config/invitation';
import { fadeUp } from '../motion/motionConfig';

function getTimeLeft(targetMs) {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

function CountdownTimer() {
  const { event, countdown } = invitation;
  const targetMs = new Date(event.dateTime).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetMs));

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetMs));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const units = [
    { value: timeLeft.days, label: countdown.days },
    { value: timeLeft.hours, label: countdown.hours },
    { value: timeLeft.minutes, label: countdown.minutes },
    { value: timeLeft.seconds, label: countdown.seconds },
  ];

  return (
    <motion.div className="countdown" variants={fadeUp}>
      <p className="calligraphy-text countdown-title">{countdown.title}</p>
      {timeLeft.isPast ? (
        <p className="calligraphy-title countdown-past">{countdown.past}</p>
      ) : (
        <div className="countdown-grid">
          {units.map((unit) => (
            <div key={unit.label} className="countdown-item">
              <span className="countdown-number">{String(unit.value).padStart(2, '0')}</span>
              <span className="countdown-label">{unit.label}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default CountdownTimer;
