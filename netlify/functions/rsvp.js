const { formatRsvpMessage } = require('../../api/lib/formatRsvpMessage');
const { sendTelegramMessage } = require('../../api/lib/sendTelegramMessage');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ ok: false, error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const name = body?.name?.toString().trim();
    const guestCount = body?.guestCount?.toString().trim();
    const attendance = body?.attendance?.toString().trim();
    const message = body?.message?.toString().trim() || '';

    if (!name || !guestCount || !attendance || !['yes', 'no'].includes(attendance)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: 'Invalid form data' }),
      };
    }

    const text = formatRsvpMessage({
      name,
      guestCount: `${guestCount} адам`,
      attendance,
      message,
    });

    await sendTelegramMessage(text);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('RSVP Telegram error:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ ok: false, error: 'Failed to send RSVP' }),
    };
  }
};
