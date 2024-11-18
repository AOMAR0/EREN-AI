const { useSingleFileAuthState } = require('@whiskeysockets/baileys');  // تأكد من أن هذه الدالة موجودة

// حفظ بيانات المصادقة في ملف
const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json');

// تصدير الحالة
module.exports = {
  state,
  saveState,
};
