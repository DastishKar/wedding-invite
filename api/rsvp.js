const { formatRsvpMessage } = require('./lib/formatRsvpMessage');
const { sendTelegramMessage } = require('./lib/sendTelegramMessage');

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function validateBody(body) {
  const name = body?.name?.toString().trim();
  const guestCount = body?.guestCount?.toString().trim();
  const attendance = body?.attendance?.toString().trim();
  const message = body?.message?.toString().trim() || '';

  if (!name || name.length > 120) {
    return { error: 'Invalid name' };
  }
  if (!guestCount || !/^[1-4]$/.test(guestCount)) {
    return { error: 'Invalid guest count' };
  }
  if (!attendance || !['yes', 'no'].includes(attendance)) {
    return { error: 'Invalid attendance' };
  }
  if (message.length > 500) {
    return { error: 'Message too long' };
  }

  return { name, guestCount, attendance, message };
}

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const payload = validateBody(body);
    if (payload.error) {
      return res.status(400).json({ ok: false, error: payload.error });
    }

    const guestCountLabel = `${payload.guestCount} адам`;
    const text = formatRsvpMessage({
      name: payload.name,
      guestCount: guestCountLabel,
      attendance: payload.attendance,
      message: payload.message,
    });

    await sendTelegramMessage(text);

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('RSVP Telegram error:', err.message);
    return res.status(500).json({ ok: false, error: 'Failed to send RSVP' });
  }
};
