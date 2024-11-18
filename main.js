const { Configuration, OpenAIApi } = require("openai");
const { openaiApiKey, botName, welcomeMessage } = require('./config');

// إعداد OpenAI API
const configuration = new Configuration({
  apiKey: openaiApiKey,
});
const openai = new OpenAIApi(configuration);

async function getAIResponse(userMessage) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // أو gpt-3.5 حسب ما تفضله
      messages: [
        { role: "system", content: "أنت مساعد ذكي. حاول الرد بأفضل طريقة ممكنة." },
        { role: "user", content: userMessage },
      ],
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    return "عذرًا، حدث خطأ في معالجة طلبك.";
  }
}

module.exports = {
  async handleMessage(conn, msg) {
    const sender = msg.key.remoteJid;
    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text;

    if (text) {
      let replyText = welcomeMessage;

      // الردود الذكية بناءً على النص المرسل
      if (text.toLowerCase() === 'سلام') {
        replyText = 'وعليكم السلام! كيف يمكنني مساعدتك اليوم؟';
      } else {
        // استخدام الذكاء الاصطناعي للرد على الرسائل
        replyText = await getAIResponse(text);
      }

      // إرسال الرد
      await conn.sendMessage(sender, { text: replyText });
    }
  },
};