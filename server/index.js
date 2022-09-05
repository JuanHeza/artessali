const token = "2131174766:AAGlRFSOTtv59wOgvFdMqZlnCxDtFYIgLcs";

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const bot = new TelegramBot(token, {polling: true});
const inicio = [
    [{text: "Collares", callback_data:"collares"},{text: "Aretes", callback_data:"aretes"}],
    [{text: "Anillos", callback_data:"anillos"},{text: "Pulseras", callback_data:"pulseras"}],
    [{text: "Redes Sociales", callback_data:"redes"}],
]
const redes = [
    [{ text: "volver", callback_data: "inicio"}],
    [{ text: "Facebook" , url: "https://www.facebook.com/artessali/"}],
    [{ text: "Instagram" , url: "https://www.instagram.com/artessali/"}],
    [{ text: "Tiktok" , url: "https://www.tiktok.com/@artessali/"}],
    [{ text: "Whatsapp" , url: "https://wa.me/message/AB7HBXF3QPOQL1"}],
    [{ text: "Correo" , url: "mailto:contacto@artessali.com"}],
]
const bienvenida = "En Artessali estamos para atenderte.\n¿En que podemos ayudarte hoy?";

var obj = { table: []};

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    bot.sendMessage(chatId, bienvenida,{"reply_markup": {
        "inline_keyboard": inicio
        }
    });
  });

bot.onText(/\/start (.+)/, (msg, secret) => {
    const chatId = msg.chat.id;
    if (secret[1] == "JZL2011wezqs"){
        obj.table.push({id: chatId, value: "admin"})
        var json = JSON.stringify(obj);
        fs.writeFileSync('admins.json', json);
    }
  });

  bot.on('callback_query', function onCallbackQuery(action){
      const data = action.data;
      const msg = action.message;
      const id = action.id;
      console.log(data)
      console.log(msg)
      if (data == "inicio"){
        bot.editMessageText(bienvenida,{ "message_id": msg.message_id, "chat_id": msg.chat.id, reply_markup: {
            inline_keyboard: inicio
        }})
    }else if (data == "redes"){
        bot.editMessageText("Visita nuestras Redes Sociales",{ "message_id": msg.message_id, "chat_id": msg.chat.id, reply_markup: {
            inline_keyboard: redes
        }})
    }else{
        bot.editMessageText(data,{ "message_id": msg.message_id, "chat_id": msg.chat.id, reply_markup: {
            inline_keyboard: [[{text:"Volver", callback_data: "inicio"}]]
        }})
    }
  })