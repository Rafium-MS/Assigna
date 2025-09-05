const format = (level, msg) => {
  const ts = new Date().toISOString();
  return `[${ts}] ${level.toUpperCase()}: ${msg}`;
};

module.exports = {
  info: (msg) => console.log(format('info', msg)),
  warn: (msg) => console.warn(format('warn', msg)),
  error: (msg) => console.error(format('error', msg)),
};

