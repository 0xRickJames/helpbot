import { Client, GatewayIntentBits } from "discord.js";
//import { connectDatabase } from "./database/connectDatabase";
import { askPdf } from "./ask-pdf";

(async () => {
  const BOT = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  BOT.on("ready", async () => {
    console.log(`Logged in as ${BOT.user!.username}!`);
  });

  BOT.on("messageCreate", async (message) => {
    try {
      console.log("messageCreate");
      // Don't respond to yourself or other bots
      if (message.author.bot) return;

      // If the message does not contain the word
      if (
        !(
          message.content.toLowerCase().includes("helpbot") ||
          message.content.toLowerCase().includes("helpbot")
        )
      ) {
        // check if at least chatgpt was tagged, if not, return
        if (!message.mentions.has(BOT.user!)) return;
      }

      try {
        message.channel.sendTyping();
        const answer = await askPdf(message.content);
        message.reply(`${answer}`);
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  });

  //await connectDatabase();

  await BOT.login(process.env.BOT_TOKEN);
})();
