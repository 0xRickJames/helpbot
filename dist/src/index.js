"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
//import { connectDatabase } from "./database/connectDatabase";
const ask_pdf_1 = require("./ask-pdf");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const BOT = new discord_js_1.Client({
        intents: [discord_js_1.GatewayIntentBits.Guilds,
            discord_js_1.GatewayIntentBits.GuildMessages,
            discord_js_1.GatewayIntentBits.MessageContent]
    });
    BOT.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Logged in as ${BOT.user.username}!`);
    }));
    BOT.on("messageCreate", (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("messageCreate");
            // Don't respond to yourself or other bots
            if (message.author.bot)
                return;
            // If the message does not contain the word
            if (!(message.content.toLowerCase().includes("helpbot") ||
                message.content.toLowerCase().includes("helpbot"))) {
                // check if at least chatgpt was tagged, if not, return
                if (!message.mentions.has(BOT.user))
                    return;
            }
            try {
                const answer = yield (0, ask_pdf_1.askPdf)(message.content);
                message.reply(`${answer}`);
            }
            catch (error) {
                console.log(error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }));
    //await connectDatabase();
    yield BOT.login(process.env.BOT_TOKEN);
}))();
//# sourceMappingURL=index.js.map