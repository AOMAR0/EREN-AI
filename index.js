const { default: makeWASocket, useSingleFileAuthState } = require('@whiskeysockets/baileys');
const { state, saveState } = require('./auth_handler');
const handler = require('./Handler');

async function startBot() {
  const conn = makeWASocket({
    auth: state,
  });

  // حفظ الحالة عند أي تغيير
  conn.ev.on('creds.update', saveState);

  // تمرير اتصال البوت إلى Handler
  handler(conn);

  console.log('البوت الذكي شغال وجاهز!');
}

startBot();