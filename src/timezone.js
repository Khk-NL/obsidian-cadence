'use strict';

function systemTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
}

function resolveTimezone(value) {
  const zone = value && value !== 'system' ? String(value).trim() : systemTimezone();
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: zone }).format();
    return zone;
  } catch (_) {
    return systemTimezone();
  }
}

function parts(date, timezone) {
  const values = new Intl.DateTimeFormat('en-CA', {
    timeZone: resolveTimezone(timezone), year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date).reduce((result, part) => {
    if (part.type !== 'literal') result[part.type] = part.value;
    return result;
  }, {});
  return values;
}

function ymd(date, timezone) {
  const value = parts(date, timezone);
  return `${value.year}-${value.month}-${value.day}`;
}

module.exports = { systemTimezone, resolveTimezone, ymd };
