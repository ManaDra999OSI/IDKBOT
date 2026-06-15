import {
  Client,
  GatewayIntentBits,
  EmbedBuilder
} from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const OWNER_ID = "1414408612238983233";
const ANNOUNCEMENT_CHANNEL_ID = "1516130109193719962";

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!event") {

    if (message.author.id !== OWNER_ID) {
      return message.reply("Only the owner can use this command.");
    }

    const channel =
      client.channels.cache.get(ANNOUNCEMENT_CHANNEL_ID);

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("#ff9900")
      .setTitle("📢 New Event")
      .setDescription(
        `<@${message.author.id}> created an event!`
      )
      .setThumbnail(
        "https://cdn-icons-png.flaticon.com/512/1827/1827392.png"
      )
      .setTimestamp();

    await channel.send({
      embeds: [embed]
    });

    await message.reply("Event announced.");
  }
});

client.login(process.env.DISCORD_TOKEN);
