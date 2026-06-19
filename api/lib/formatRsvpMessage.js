function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatRsvpMessage({ name, guestCount, attendance, message, eventTitle = 'Диляра — Қыз Ұзату' }) {
  const attendanceLabel =
    attendance === 'yes' ? '✅ Иә, келемін' : '😔 Өкінішке орай, келе алмаймын';

  const lines = [
    `<b>🎉 Жаңа RSVP</b>`,
    `<b>${escapeHtml(eventTitle)}</b>`,
    '',
    `👤 <b>Аты-жөні:</b> ${escapeHtml(name)}`,
    `👥 <b>Қонақтар саны:</b> ${escapeHtml(guestCount)}`,
    `📋 <b>Қатысу:</b> ${attendanceLabel}`,
  ];

  if (message?.trim()) {
    lines.push(`💬 <b>Тілек:</b> ${escapeHtml(message.trim())}`);
  }

  lines.push('', `🕐 ${new Date().toLocaleString('kk-KZ', { timeZone: 'Asia/Almaty' })}`);

  return lines.join('\n');
}

module.exports = { formatRsvpMessage };
