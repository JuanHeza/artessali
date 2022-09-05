// server.js
var express = require("express");
var path = require("path");
const fs = require("fs");

const token = "2131174766:AAGlRFSOTtv59wOgvFdMqZlnCxDtFYIgLcs";
const secretKey = "JZL2011wezqs";
const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(token, { polling: true });
bot.setWebHook(`www.artessali.com/bot${token}`);
console.log(bot.getWebHookInfo())

let rawdata = fs.readFileSync("admins.json");
let data = JSON.parse(rawdata);
var evento_nuevo = {
  fecha: "",
  evento: "",
  hora: "",
  lugar: "",
  direccion: "",
  msg_id: 0,
};
let active_callback = "";
let active_inline = {};
app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.post("/ContactoBot", (req, res) => {
  // alert("Su informacion ha sido recibida con exito")
  const mensaje = `*Hola, tienes un nuevo mensaje*\n\n_Nombre:_\n${req.body.nombre} \n\n_Telefono:_\n${req.body.telefono} \n\n_Correo:_\n${req.body.correo}\n\n${req.body.mensaje}`;
  data.admins.forEach((admin) => {
    bot.sendMessage(admin.id, mensaje, { parse_mode: "Markdown" });
  });
  res.redirect("/");
});

app.get("/variables", (req, res) => {
  output = {};
  // output["textos"] = req.query.textos != null ? data.textos : "";
  // output["destacado"] = req.query.destacado != null ? data.destacado : "";
  // output["galeria"] = req.query.galeria != null ? data.galeria : "";
  req.query.productos != null ? (output["productos"] = data.productos) : "";
  req.query.eventos != null ? (output["eventos"] = data.eventos) : "";
  req.query.piedras != null ? (output["piedras"] = data.piedras) : "";
  res.json(output);
});
app.get("/img", express.static('build/img'))

app.post(`/bot`, (req, res) => {
  console.log(req.body)
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

var port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);

//==========================//
//         TECLADOS         //
//==========================//
const bienvenida =
  "En Artessali estamos para atenderte.\n¿En que podemos ayudarte hoy?";
const inicio_admin = [
  [
    {
      text: "\u{1F48D} Productos",
      callback_data: JSON.stringify({ callback: "productos" }),
    },
    {
      text: "\u{1F48E} Cuarzos",
      callback_data: JSON.stringify({ callback: "cuarzos" }),
    },
  ],
  [
    {
      text: "\u{1F4C5} Eventos",
      callback_data: JSON.stringify({ callback: "eventos" }),
    },
    {
      text: "\u{2709} Mensaje",
      callback_data: JSON.stringify({ callback: "mensaje" }),
    },
  ],
  [
    {
      text: "\u{1F517} Redes Sociales",
      callback_data: JSON.stringify({ callback: "redes" }),
    }
],[
    {
      text: "\u{1F52E} Interfaz de invitado",
      callback_data: JSON.stringify({ callback: "urls" }),
    },
//   ],[
//     {
//       text: "\u{1F310} Comandos",
//       callback_data: JSON.stringify({ callback: "comandos" }),
//     }
  ],
];
const inicio_urls = [
  [
    { text: "\u{1F48D} Productos", url: "http://www.artessali.com/productos" },
    { text: "\u{1F48E} Cuarzos", url: "http://www.artessali.com/cuarzos" },
  ],
  [
    { text: "\u{1F4C5} Eventos", url: "http://www.artessali.com/eventos" },
    {
      text: "\u{1F517} Contacto",
      callback_data: JSON.stringify({ callback: "redes" }),
    },
  ],
];
const redes = [
  [
    {
      text: "\u{1F519} Volver",
      callback_data: JSON.stringify({ callback: "inicio" }),
    },
  ],
  [
    { text: "\u{1F465} Facebook", url: "https://www.facebook.com/artessali/" },
    {
      text: "\u{1F4F7} Instagram",
      url: "https://www.instagram.com/artessali/",
    },
  ],
  [
    { text: "\u{1F3B6} Tiktok", url: "https://www.tiktok.com/@artessali/" },
    { text: "\u{1F4AC} Whatsapp", url: "https://wa.me/message/AB7HBXF3QPOQL1" },
  ],
  [
    { text: "\u{2709} Correo", url: "mailto:contacto@artessali.com" },
    { text: "\u{1F469} Contacto directo", url: "t.me/AriFlores" },
  ],
];
const edit_keyboard = [
  [
    {
      text: "\u{1F3E0} Evento",
      callback_data: JSON.stringify({ callback: "setEvento" }),
    },
    {
      text: "\u{1F4C5} Fecha",
      callback_data: JSON.stringify({ callback: "setFecha" }),
    },
  ],
  [
    {
      text: "\u{1F551} Hora",
      callback_data: JSON.stringify({ callback: "setHora" }),
    },
    {
      text: "\u{1F4CD} Lugar",
      callback_data: JSON.stringify({ callback: "setLugar" }),
    },
  ],
  [
    {
      text: "\u{2705} Aceptar",
      callback_data: JSON.stringify({ callback: "updateEvento" }),
    },
  ],
  [
    {
      text: "\u{274C} Eliminar",
      callback_data: JSON.stringify({ callback: "deleteEvento" }),
    },
  ],
  [
    {
      text: "\u{26D4} Cancelar",
      callback_data: JSON.stringify({ callback: "inicio" }),
    },
  ],
];
const new_keyboard = [
  [
    {
      text: "\u{1F3E0} Evento",
      callback_data: JSON.stringify({ callback: "setEvento" }),
    },
    {
      text: "\u{1F4C5} Fecha",
      callback_data: JSON.stringify({ callback: "setFecha" }),
    },
  ],
  [
    {
      text: "\u{1F551} Hora",
      callback_data: JSON.stringify({ callback: "setHora" }),
    },
    {
      text: "\u{1F4CD} Lugar",
      callback_data: JSON.stringify({ callback: "setLugar" }),
    },
  ],
  [
    {
      text: "\u{2705} Aceptar",
      callback_data: JSON.stringify({ callback: "completeEvento" }),
    },
  ],
  [
    {
      text: "\u{26D4} Cancelar",
      callback_data: JSON.stringify({ callback: "inicio" }),
    },
  ],
];
let eventos_keyboard = [];
//==========================//
//         COMANDOS         //
//==========================//
bot.onText(/\/start (.+)/, (msg, secret) => {
  const chatId = msg.chat.id;

  if (
    secret[1] == secretKey &&
    !data.admins.find((user) => user.id == chatId)
  ) {
    data.admins.push({ id: chatId, value: "admin" });
    var json = JSON.stringify(data);
    fs.writeFileSync("admins.json", json);
    bot.sendMessage(chatId, "Felicidades ahora eres Administrador");
  } else {
    bot.sendMessage(chatId, "Ya cuentas con permisos de Administrador");
  }
});
bot.onText(/\/start/, (msg) => {
  console.log("START");
  evento_nuevo = {
    fecha: "",
    evento: "",
    hora: "",
    lugar: "",
    direccion: "",
    msg_id: 0,
  };
  active_callback = "";
  const chatId = msg.chat.id;
kb = data.admins.find((user) => user.id == chatId)
  ? inicio_admin
  : inicio_urls,
  bot.sendMessage(chatId, bienvenida, {
    reply_markup: {
      inline_keyboard: kb,
    },
  });
});

bot.onText(/\/eventos/, (msg) => {
  eventos(msg);
});

bot.onText(/\/productos/, (msg) => {
  if (data.admins.find((user) => user.id == chatId)) {
    const chatId = msg.chat.id;
    let inline_productos = [];
    data.productos.forEach((categoria) => {
      let value = [
        {
          text: `${categoria.categoria}`,
          callback_data: JSON.stringify({
            callback: "productSection",
            data: categoria.categoria,
          }),
        },
      ];
      inline_productos.push(value);
    });
    bot.sendMessage(
      chatId,
      "Presione un boton para ver los detalles y opciones de un evento.",
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: inline_productos,
        },
      }
    );
  }
});
bot.onText(/(.+)/, (msg, text) => {
  if (active_callback != "") {
    const chatId = msg.chat.id;
    switch (active_callback) {
      case "setEvento":
        evento_nuevo.evento = text[0];
        active_callback = "";
        break;
      case "setFecha":
        evento_nuevo.fecha = text[0];
        active_callback = "";
        break;
      case "setHora":
        evento_nuevo.hora = text[0];
        active_callback = "";
        break;
      case "setLugar":
        evento_nuevo.lugar = text[0];
        active_callback = "";
        break;
      case "setDireccion":
        evento_nuevo.direccion = text[0];
        active_callback = "";
        break;
    }
    // bot.editMessageText(
    //   `*Evento:* \n${evento_nuevo.evento}\n\n*Fecha:* \n${evento_nuevo.fecha}\n\n*Hora:* \n${evento_nuevo.hora}\n\n*Lugar:* \n${evento_nuevo.lugar}`,
    //   {
    //     message_id: evento_nuevo.msg_id,
    //     chat_id: msg.chat.id,
    //     reply_markup: { inline_keyboard: active_inline },
    //     parse_mode: "Markdown",
    //   }
    // );
	eventMessage(evento_nuevo.msg_id)
  }
});

//==========================//
//         CALLBACK         //
//==========================//
bot.on("callback_query", function onCallbackQuery(action) {
  const command = JSON.parse(action.data);
  console.log(command);
  const msg = action.message;
  const chatId = msg.chat.id;
  switch (command.callback) {
    case "comandos":
      bot.sendMessage(
        chatId,
        "Lista de comandos\n\n /start \u{27A1} Menu principal\n /eventos \u{27A1} Administrar eventos\n /productos \u{27A1} Lista de productos"
      );
      break;
    case "inicio":
      evento_nuevo = {
        fecha: "",
        evento: "",
        hora: "",
        lugar: "",
        direccion: "",
        msg_id: 0,
      };
      active_callback = "";
	  kb = data.admins.find((user) => user.id == chatId)
		? inicio_admin
		: inicio_urls,
		console.log(kb)
      bot.editMessageText(bienvenida, {
        message_id: msg.message_id,
        chat_id: msg.chat.id,
        reply_markup: {
          inline_keyboard: kb,
        },
      });
      break;
    case "urls":
      active_callback = "";
      bot.editMessageText(bienvenida, {
        message_id: msg.message_id,
        chat_id: msg.chat.id,
        reply_markup: {
          inline_keyboard: inicio_urls,
        },
      });
      break;
    case "redes":
      bot.editMessageText("Visita nuestras Redes Sociales", {
        message_id: msg.message_id,
        chat_id: msg.chat.id,
        reply_markup: {
          inline_keyboard: redes,
        },
      });
      break;

    case "nuevo_evento":
      console.log("active" + active_inline);
      evento_nuevo = {
        fecha: "",
        evento: "",
        hora: "",
        lugar: "",
        direccion: "",
        msg_id: msg.message_id,
        id: msg.message_id,
      };
      active_inline = new_keyboard;
      eventMessage(msg);
      break;
    case "completeEvento":
      active_callback = "";
      data.eventos.push(evento_nuevo);
      fs.writeFileSync("admins.json", JSON.stringify(data));
      eventKeyboard();
      bot.editMessageText(
        "Evento Creado.\n\nPresione un boton para ver los detalles y opciones de un evento.",
        {
          message_id: msg.message_id,
          chat_id: msg.chat.id,
          reply_markup: {
            inline_keyboard: eventos_keyboard,
          },
        }
      );
      break;
    case "updateEvento":
      fs.writeFileSync("admins.json", JSON.stringify(data));
      eventKeyboard();
      bot.editMessageText(
        "Evento Actualizado.\n\nPresione un boton para ver los detalles y opciones de un evento.",
        {
          message_id: msg.message_id,
          chat_id: msg.chat.id,
          reply_markup: {
            inline_keyboard: eventos_keyboard,
          },
        }
      );
      break;
    case "editarEvento":
      evento_nuevo = data.eventos.find((e) => e.id == command.data);
      evento_nuevo.msg_id = msg.message_id;
      active_inline = edit_keyboard;
      eventMessage(msg);
      break;
    case "deleteEvento":
      data.eventos = data.eventos.filter((e) => e.id != evento_nuevo.id);
      fs.writeFileSync("admins.json", JSON.stringify(data));
      eventKeyboard();
      bot.editMessageText(
        "Evento Eliminado.\n\nPresione un boton para ver los detalles y opciones de un evento.",
        {
          message_id: msg.message_id,
          chat_id: msg.chat.id,
          reply_markup: {
            inline_keyboard: eventos_keyboard,
          },
        }
      );
      break;
    case "setEvento":
      active_callback = command.callback;
      eventMessage(msg, "Por favor escribe el Nombre del Evento.");
      break;
    case "setFecha":
      active_callback = command.callback;
      eventMessage(msg, "Por favor escribe la Fecha del evento.");
      break;
    case "setHora":
      active_callback = command.callback;
      eventMessage(msg, "Por favor escribe la Hora del evento.");
      break;
    case "setLugar":
      active_callback = command.callback;
      eventMessage(msg, "Por favor escribe el Lugar del evento.");
      break;
    case "setDireccion":
      active_callback = command.callback;
      eventMessage(msg, "Por favor escribe la Direccion del evento.");
      break;

    case "productSection":
      let inline_product = [];
      if (command.data == "Collares") {
        inline_product = [
          [
            {
              text: "Cadena",
              callback_data: JSON.stringify({ callback: "collarCadena" }),
            },
          ],
          [
            {
              text: "Cordón",
              callback_data: JSON.stringify({ callback: "collarCordon" }),
            },
          ],
        ];
      } else {
        switch (command.data) {
          case "Pulseras":
            list = data.productos.find((v) => v.categoria == "Pulseras");
            list.secciones[0].productos.forEach((e) => {
              console.log(e);
              inline_product.push([
                {
                  text: e.nombre,
                  callback_data: JSON.stringify({
                    callback: "Pulseras",
                    data: e.nombre,
                  }),
                },
              ]);
            });
            break;
          case "Anillos":
            list = data.productos.find((v) => v.categoria == "Anillos");
            list.secciones[0].productos.forEach((e) => {
              inline_product.push([
                {
                  text: e.nombre,
                  callback_data: JSON.stringify({
                    callback: "Anillos",
                    data: e.nombre,
                  }),
                },
              ]);
            });
            break;
          case "Aretes":
            list = data.productos.find((v) => v.categoria == "Aretes");
            list.secciones[0].productos.forEach((e) => {
              inline_product.push([
                {
                  text: e.nombre,
                  callback_data: JSON.stringify({
                    callback: "Aretes",
                    data: e.nombre,
                  }),
                },
              ]);
            });
            break;
        }
      }
      bot.editMessageText(`Usted esta en ${command.data}`, {
        message_id: msg.message_id,
        chat_id: msg.chat.id,
        reply_markup: {
          inline_keyboard: inline_product,
        },
      });
      break;
    case "eventos":
      eventos(msg);
      break;
    /*
		case "":
			break;
		*/
    default:
      bot.editMessageText("Comando no configurado", {
        message_id: msg.message_id,
        chat_id: msg.chat.id,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Inicio",
                callback_data: JSON.stringify({ callback: "inicio" }),
              },
            ],
          ],
        },
      });
  }
});

function eventKeyboard() {
  eventos_keyboard = [];
  data.eventos.forEach((evento) => {
    let value = [
      {
        text: `${evento.fecha} - ${evento.evento}`,
        callback_data: JSON.stringify({
          callback: "editarEvento",
          data: evento.id,
        }),
      },
    ];
    eventos_keyboard.push(value);
  });
  eventos_keyboard.push([
    {
      text: `Agregar Evento`,
      callback_data: JSON.stringify({ callback: "nuevo_evento" }),
    },
  ]);
}

function eventos(msg) {
  const chatId = msg.chat.id;
  if (data.admins.find((user) => user.id == chatId)) {
    evento_nuevo = {
      fecha: "",
      evento: "",
      hora: "",
      lugar: "",
      direccion: "",
      msg_id: 0,
    };
    active_callback = "";
    eventos_keyboard = [];
    eventKeyboard();
    console.log(eventos_keyboard);
    bot.sendMessage(
      chatId,
      "Presione un boton para ver los detalles y opciones de un evento.",
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: eventos_keyboard,
        },
      }
    );
  }
}

function eventMessage(msg, text = "") {
  text != "" ? (text = `_ \u{270F} ${text} \u{270F} _`) : (text = "");
  bot.editMessageText(
    `*\u{1F3E0} Evento:* \n${evento_nuevo.evento}\n\n*\u{1F4C5} Fecha:* \n${evento_nuevo.fecha}\n\n*\u{1F551} Hora:* \n${evento_nuevo.hora}\n\n*\u{1F4CD} Lugar:* \n${evento_nuevo.lugar}\n\n _ ${text} _`,
    {
      message_id: msg.message_id,
      chat_id: msg.chat.id,
      reply_markup: {
        inline_keyboard: active_inline,
      },
      parse_mode: "Markdown",
    }
  );
}
