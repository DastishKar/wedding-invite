const DEFAULT_API_URL = '/api/rsvp';

function getApiUrl() {
  return process.env.REACT_APP_RSVP_API_URL || DEFAULT_API_URL;
}

export async function submitRsvp({ name, guestCount, attendance, message }) {
  const response = await fetch(getApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, guestCount, attendance, message }),
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Submit failed');
  }

  return data;
}
