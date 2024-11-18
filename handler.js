const { handleMessage } = require('./Main');

module.exports = (conn) => {
  conn.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    const msg = messages[0];

    // التحقق من أن الرسالة ليست من نفسك
    if (!msg.key.fromMe && msg.message) {
      console.log(`رسالة جديدة من ${msg.key.remoteJid}: ${msg.message.conversation || ''}`);
      await handleMessage(conn, msg); // تمرير الرسالة إلى Main.js
    }
  });
};