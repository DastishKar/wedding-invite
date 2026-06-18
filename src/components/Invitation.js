import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import invitation from '../config/invitation';
import BackgroundMusic from './BackgroundMusic';
import MotionText from './MotionText';
import PhotoSlide from './PhotoSlide';
import OrnamentDivider from './OrnamentDivider';
import CountdownTimer from './CountdownTimer';
import { easeSmooth, fadeUp, textDuration } from '../motion/motionConfig';

function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('guestName')?.toString().trim();
    const count = formData.get('guestCount');
    const attendance = formData.get('attendance');
    if (!name || !count || !attendance) return;
    setSubmitted(true);
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
            <input type="text" id="guestName" name="guestName" placeholder="Мысалы: Айгүл Сейтқазы" required />
          </div>
          <div className="form-group">
            <label htmlFor="guestCount">Қонақтар саны</label>
            <select id="guestCount" name="guestCount" defaultValue="" required>
              <option value="" disabled>Таңдаңыз</option>
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
                <input type="radio" name="attendance" value="yes" required />
                <span>Иә, келемін</span>
              </label>
              <label className="radio-label">
                <input type="radio" name="attendance" value="no" />
                <span>Өкінішке орай, келе алмаймын</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="guestMessage">Тілек (міндетті емес)</label>
            <textarea id="guestMessage" name="guestMessage" rows={3} placeholder="Жылы тілектеріңізді жазыңыз..." />
          </div>
          <button type="submit" className="btn-submit">Жіберу</button>
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

function Invitation() {
  const { bride, event, greeting, welcome, hosts, location, contacts, footer, photos } = invitation;

  return (
    <div className="page-bg">
      <div className="page-wrapper">
        <BackgroundMusic />

        <section className="section" id="hero">
          <PhotoSlide photoSrc={photos[0]} textZone="center" className="hero-slide">
            <MotionText as="p" className="wedding-bride-name calligraphy-title hero-bride-name" from="left">
              {bride.name}
            </MotionText>
            <MotionText as="p" className="wedding-kaz-text--caps details-text hero-date" from="right">
              {event.dateDisplay}
            </MotionText>
            <MotionText as="p" className="wedding-kaz-text--caps details-text hero-event-title" from="right">
              {event.title}
            </MotionText>
          </PhotoSlide>
        </section>

        <section className="section" id="greeting">
          <PhotoSlide photoSrc={photos[1]} textZone="lower" className="greeting-slide">
            <MotionText as="p" className="calligraphy-title greeting-title" from="up">
              {greeting.title}
            </MotionText>
            <MotionText as="p" className="calligraphy-text greeting-body" from="up">
              {greeting.lines.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </MotionText>
          </PhotoSlide>
        </section>

        <section className="section" id="welcome">
          <PhotoSlide photoSrc={photos[2]} textZone="lower">
            <MotionText as="p" className="calligraphy-text welcome-intro" from="left">
              {welcome.intro}
            </MotionText>
            <MotionText as="p" className="calligraphy-title welcome-name" from="left">
              {bride.nameGenitive}
            </MotionText>
            <MotionText as="p" className="calligraphy-text welcome-body" from="right">
              {welcome.bodyLines.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </MotionText>
          </PhotoSlide>
        </section>

        <section className="section" id="hosts">
          <PhotoSlide photoSrc={photos[3]} textZone="center" className="hosts-slide">
            <MotionText as="p" className="calligraphy-text hosts-label" from="up">
              {hosts.label}
            </MotionText>
            <MotionText as="p" className="calligraphy-title hosts-names" from="up">
              {hosts.names}
            </MotionText>
            <MotionText as="p" className="calligraphy-text hosts-invite" from="up">
              {hosts.inviteLines.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </MotionText>
          </PhotoSlide>
        </section>

        <section className="section" id="datetime">
          <PhotoSlide photoSrc={photos[4]} textZone="center">
            <MotionText as="p" className="calligraphy-text datetime-label" from="up">
              Той салтанаты:
            </MotionText>
            <MotionText as="p" className="details-text datetime-month" from="up">
              {event.month}
            </MotionText>
            <motion.div className="date-block" variants={fadeUp}>
              <div className="date-side">
                <span className="date-side-text">{event.dayOfWeek}</span>
                <span className="date-line" />
              </div>
              <span className="wedding-date-number date-number">{event.day}</span>
              <div className="date-side">
                <span className="date-side-text">{event.year}</span>
                <span className="date-line" />
              </div>
            </motion.div>
            <MotionText as="p" className="calligraphy-text datetime-time-label" from="up">
              Басталуы:
            </MotionText>
            <MotionText as="p" className="details-text datetime-time" from="up">
              {event.time}
            </MotionText>
            <CountdownTimer />
          </PhotoSlide>
        </section>

        <section className="section" id="location">
          <PhotoSlide photoSrc={photos[5]} textZone="center" className="location-slide">
            <MotionText as="p" className="calligraphy-title location-label" from="up">
              {location.label}
            </MotionText>
            <MotionText as="p" className="calligraphy-text location-address" from="up">
              {location.city}<br />
              {location.venue}<br />
              <span className="location-street">{location.street}</span>
            </MotionText>
            <motion.a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-map"
              variants={fadeUp}
            >
              {location.mapButton}
            </motion.a>
          </PhotoSlide>
        </section>

        <section className="section" id="rsvp">
          <PhotoSlide textZone="center" className="rsvp-slide plain-slide">
            <MotionText as="p" className="calligraphy-title rsvp-title" from="up">
              {invitation.rsvp.title}
            </MotionText>
            <MotionText as="p" className="calligraphy-text rsvp-subtitle" from="up">
              {invitation.rsvp.subtitle}
            </MotionText>
            <motion.div variants={fadeUp}>
              <RsvpForm />
            </motion.div>
          </PhotoSlide>
        </section>

        <section className="section" id="contacts">
          <PhotoSlide textZone="center" className="plain-slide">
            <MotionText as="p" className="calligraphy-title contacts-title" from="up">
              {contacts.title}
            </MotionText>
            {contacts.hosts.map((host, index) => (
              <motion.div key={host.name} variants={fadeUp}>
                {index > 0 && <OrnamentDivider />}
                <div className="contact-item">
                  <p className="calligraphy-text contact-label">Той иелері</p>
                  <p className="calligraphy-text contact-value">
                    <a href={`tel:${host.phone}`}>{host.phoneDisplay}</a>
                  </p>
                  <p className="calligraphy-text contact-name">{host.name}</p>
                </div>
              </motion.div>
            ))}
          </PhotoSlide>
        </section>

        <section className="section" id="footer">
          <PhotoSlide textZone="center" className="plain-slide footer-slide">
            <MotionText as="p" className="calligraphy-title footer-names" from="right">
              {bride.name}
            </MotionText>
            <MotionText as="p" className="details-text footer-date" from="up">
              {event.dateDisplay}
            </MotionText>
            <MotionText as="p" className="details-text footer-event" from="up">
              {event.title}
            </MotionText>
            <MotionText as="p" className="calligraphy-text footer-copy" from="up">
              {footer.message} ♥
            </MotionText>
          </PhotoSlide>
        </section>
      </div>
    </div>
  );
}

export default Invitation;
