/**
 * Все тексты и данные приглашения — меняйте здесь
 */
const invitation = {
  meta: {
    title: "Диляра — Қыз Ұзату",
    description: "Диляраның қыз ұзату тойына шақыру",
  },

  music: {
    src: "/music/background.mp3",
    sources: [
      "/music/background.mp3",
      "/music/background.mpeg",
      "/music/background.mp4",
      "/music/background.wav",
    ],
  },

  // Слайды 1–6: public/photos/1.jpg … 6.jpg (белый фон на фото)
  photos: Array.from({ length: 6 }, (_, i) => `/photos/${i + 1}.jpg`),

  bride: {
    // name: "Диляра",
    nameGenitive: "Диляраның",
  },

  event: {
    // title: "қыз ұзату",
    // dateDisplay: "25.07.2026",
    dateTime: "2026-07-25T17:00:00+05:00",
    month: "ШІЛДЕ",
    day: "25",
    dayOfWeek: "СЕНБІ",
    year: "2026",
    time: "17:00",
  },

  greeting: {
    title: "Құрметті",
    lines: [
      "ағайын-туыс, бауырлар,",
      "құда-жекжат, дос-жарандар,",
      "әріптестер!",
    ],
  },

  welcome: {
    intro: "Сіз(дер)ді қызымыз",
    bodyLines: [
      "ұзату тойына арналған ақ",
      "дастарханымыздың",
      "қадірлі қонағы",
      "болуға шақырамыз!",
    ],
  },

  hosts: {
    label: "Той иелері:",
    names: "Сағынбек — Алия",
    inviteLines: ["Келіңіздер,", "қуанышымызға ортақ болыңыздар!"],
  },

  location: {
    label: "Мекен — жайымыз:",
    city: "Семей қаласы,",
    venue: "KUN men Ai рестораны",
    street: "Абая Кунанбаева көшесі, 97/1",
    mapUrl: "https://2gis.kz/semej/firm/70000001111685878",
    mapButton: "Картада ашу",
  },

  rsvp: {
    title: "Қатысуыңызды растаңыз",
    subtitle: "Сіздің жауабыңыз біз үшін маңызды",
    successMessage: "Рақмет! Сіздің жауабыңыз қабылданды.",
    errorMessage: "Жіберу сәтсіз аяқталды. Қайта көріңіз немесе байланыс номеріне хабарласыңыз.",
  },

  contacts: {
    title: "Байланыс",
    hosts: [
      {
        name: "Сағынбек",
        phone: "+77001234567",
        phoneDisplay: "+7 (700) 123-45-67",
      },
      {
        name: "Алия",
        phone: "+77007654321",
        phoneDisplay: "+7 (700) 765-43-21",
      },
    ],
  },

  footer: {
    message: "Сізбен бірге болуды асыға күтеміз",
  },

  countdown: {
    title: "Тойға дейін:",
    days: "күн",
    hours: "сағат",
    minutes: "минут",
    seconds: "секунд",
    past: "Той басталды!",
  },
};

export default invitation;
