import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import invitation from '../config/invitation';
import { submitRsvp } from '../utils/submitRsvp';
import { easeSmooth, fadeUp, textDuration } from '../motion/motionConfig';

function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.target);
    const name = formData.get('guestName')?.toString().trim();
    const guestCount = formData.get('guestCount')?.toString();
    const attendance = formData.get('attendance')?.toString();
    const message = formData.get('guestMessage')?.toString().trim() || '';

    if (!name || !guestCount || !attendance) return;

    setSubmitting(true);

    try {
      await submitRsvp({ name, guestCount, attendance, message });
      setSubmitted(true);
    } catch {
      setError(invitation.rsvp.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!submitted ? (
        <motion.form
          key="form"
          className="rsvp-form"
          noValidate
          onSubmit={handleSubmit}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -12, transition: { duration: 0.5, ease: easeSmooth } }}
        >
          <div className="form-group">
            <label htmlFor="guestName">Аты-жөніңіз</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              placeholder="Мысалы: Айгүл Сейтқазы"
              required
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="guestCount">Қонақтар саны</label>
            <select id="guestCount" name="guestCount" defaultValue="" required disabled={submitting}>
              <option value="" disabled>
                Таңдаңыз
              </option>
              <option value="1">1 адам</option>
              <option value="2">2 адам</option>
              <option value="3">3 адам</option>
              <option value="4">4 адам</option>
            </select>
          </div>
          <div className="form-group">
            <label>Қатысасыз ба?</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="attendance" value="yes" required disabled={submitting} />
                <span>Иә, келемін</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="attendance" value="no" disabled={submitting} />
                <span>Өкінішке орай, келе алмаймын</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="guestMessage">Тілек (міндетті емес)</label>
            <textarea
              id="guestMessage"
              name="guestMessage"
              rows={3}
              placeholder="Жылы тілектеріңізді жазыңыз..."
              disabled={submitting}
            />
          </div>
          {error && <p className="rsvp-error">{error}</p>}
          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Жіберілуде...' : 'Жіберу'}
          </button>
        </motion.form>
      ) : (
        <motion.p
          key="success"
          className="rsvp-success"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: textDuration, ease: easeSmooth }}
        >
          {invitation.rsvp.successMessage}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export default RsvpForm;
