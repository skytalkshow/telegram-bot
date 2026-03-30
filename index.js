require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const OpenAI = require('openai');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const userText = msg.text;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userText }],
        });

        const reply = response.choices[0].message.content;
        bot.sendMessage(chatId, reply);
    } catch (error) {
        bot.sendMessage(chatId, "Lỗi rồi 😢");
    }
    
});
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
