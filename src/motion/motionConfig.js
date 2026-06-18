export const easeSmooth = [0.22, 1, 0.36, 1];

/** Анимация при каждой прокрутке в зону видимости */
export const viewport = {
  once: false,
  amount: 0.15,
};

export const textDuration = 1.8;
export const staggerStep = 0.4;
export const photoZoomDuration = 40;

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerStep,
      delayChildren: 0.15,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: textDuration, ease: easeSmooth },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: textDuration, ease: easeSmooth },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: textDuration, ease: easeSmooth },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: textDuration, ease: easeSmooth },
  },
};

export const photoZoom = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: { duration: photoZoomDuration, ease: 'linear' },
  },
};

export const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: textDuration, ease: easeSmooth },
  },
};
