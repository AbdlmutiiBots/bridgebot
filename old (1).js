const { startUptime } = require("repl.uptime");
startUptime();
const TelegramBot = require("node-telegram-bot-api");
const { create } = require("sourcebin");
const Discord = require("discord.js");
const Guilded = require("guilded.js");
const gd = require("guilded-webhook-node");

const gld = new Guilded.Client({ token: process.env.gd });
const tgbot = new TelegramBot(process.env.tg, { polling: true });
const bot = new Discord.Client({ intents: 131071 });

const suras = [
  { name_en: "Al-Fatihah", name_ar: "الفاتحة", id: 1 },
  { name_en: "Al-Baqarah", name_ar: "البقرة", id: 2 },
  { name_en: "Al-Imran", name_ar: "آل عمران", id: 3 },
  { name_en: "An-Nisa", name_ar: "النساء", id: 4 },
  { name_en: "Al-Maidah", name_ar: "المائدة", id: 5 },
  { name_en: "Al-Anam", name_ar: "الأنعام", id: 6 },
  { name_en: "Al-Araf", name_ar: "الأعراف", id: 7 },
  { name_en: "Al-Anfal", name_ar: "الأنفال", id: 8 },
  { name_en: "Al-Tawbah", name_ar: "التوبة", id: 9 },
  { name_en: "Yunus", name_ar: "يونس", id: 10 },
  { name_en: "Hud", name_ar: "هود", id: 11 },
  { name_en: "Yusuf", name_ar: "يوسف", id: 12 },
  { name_en: "Ar-Rad", name_ar: "الرعد", id: 13 },
  { name_en: "Ibrahim", name_ar: "إبراهيم", id: 14 },
  { name_en: "Al-Hijr", name_ar: "الحجر", id: 15 },
  { name_en: "An-Nahl", name_ar: "النحل", id: 16 },
  { name_en: "Al-Isra", name_ar: "الإسراء", id: 17 },
  { name_en: "Al-Kahf", name_ar: "الكهف", id: 18 },
  { name_en: "Maryam", name_ar: "مريم", id: 19 },
  { name_en: "Taha", name_ar: "طه", id: 20 },
  { name_en: "Al-Anbiya", name_ar: "الأنبياء", id: 21 },
  { name_en: "Al-Hajj", name_ar: "الحج", id: 22 },
  { name_en: "Al-Muminun", name_ar: "المؤمنون", id: 23 },
  { name_en: "An-Nur", name_ar: "النور", id: 24 },
  { name_en: "Al-Furqan", name_ar: "الفرقان", id: 25 },
  { name_en: "Ash-Shuara", name_ar: "الشعراء", id: 26 },
  { name_en: "An-Naml", name_ar: "النمل", id: 27 },
  { name_en: "Al-Qasas", name_ar: "القصص", id: 28 },
  { name_en: "Al-Ankabut", name_ar: "العنكبوت", id: 29 },
  { name_en: "Ar-Rum", name_ar: "الرّوم", id: 30 },
  { name_en: "Luqman", name_ar: "لقمان", id: 31 },
  { name_en: "As-Sajdah", name_ar: "السجدة", id: 32 },
  { name_en: "Al-Ahzab", name_ar: "الأحزاب", id: 33 },
  { name_en: "Saba", name_ar: "سبأ", id: 34 },
  { name_en: "Fatir", name_ar: "فاطر", id: 35 },
  { name_en: "Ya-Sin", name_ar: "يس", id: 36 },
  { name_en: "As-Saffat", name_ar: "الصافات", id: 37 },
  { name_en: "Sad", name_ar: "ص", id: 38 },
  { name_en: "Az-Zumar", name_ar: "الزمر", id: 39 },
  { name_en: "Ghafir", name_ar: "غافر", id: 40 },
  { name_en: "Fussilat", name_ar: "فصّلت", id: 41 },
  { name_en: "Ash-Shura", name_ar: "الشورى", id: 42 },
  { name_en: "Az-Zukhruf", name_ar: "الزخرف", id: 43 },
  { name_en: "Ad-Dukhan", name_ar: "الدّخان", id: 44 },
  { name_en: "Al-Jathiya", name_ar: "الجاثية", id: 45 },
  { name_en: "Al-Ahqaf", name_ar: "الأحقاف", id: 46 },
  { name_en: "Muhammad", name_ar: "محمد", id: 47 },
  { name_en: "Al-Fath", name_ar: "الفتح", id: 48 },
  { name_en: "Al-Hujurat", name_ar: "الحجرات", id: 49 },
  { name_en: "Qaf", name_ar: "ق", id: 50 },
  { name_en: "Az-Zariyat", name_ar: "الذاريات", id: 51 },
  { name_en: "At-Tur", name_ar: "الطور", id: 52 },
  { name_en: "An-Najm", name_ar: "النجم", id: 53 },
  { name_en: "Al-Qamar", name_ar: "القمر", id: 54 },
  { name_en: "Ar-Rahman", name_ar: "الرحمن", id: 55 },
  { name_en: "Al-Waqiah", name_ar: "الواقعة", id: 56 },
  { name_en: "Al-Hadid", name_ar: "الحديد", id: 57 },
  { name_en: "Al-Mujadilah", name_ar: "المجادلة", id: 58 },
  { name_en: "Al-Hashr", name_ar: "الحشر", id: 59 },
  { name_en: "Al-Mumtahanah", name_ar: "الممتحنة", id: 60 },
  { name_en: "As-Saff", name_ar: "الصف", id: 61 },
  { name_en: "Al-Jumuah", name_ar: "الجمعة", id: 62 },
  { name_en: "Al-Munafiqun", name_ar: "المنافقون", id: 63 },
  { name_en: "At-Taghabun", name_ar: "التغابن", id: 64 },
  { name_en: "At-Talaq", name_ar: "الطلاق", id: 65 },
  { name_en: "At-Tahrim", name_ar: "التحريم", id: 66 },
  { name_en: "Al-Mulk", name_ar: "الملك", id: 67 },
  { name_en: "Al-Qalam", name_ar: "القلم", id: 68 },
  { name_en: "Al-Haqqah", name_ar: "الحاقة", id: 69 },
  { name_en: "Al-Maarij", name_ar: "المعارج", id: 70 },
  { name_en: "Nuh", name_ar: "نوح", id: 71 },
  { name_en: "Al-Jinn", name_ar: "الجن", id: 72 },
  { name_en: "Al-Muzzammil", name_ar: "المزّمّل", id: 73 },
  { name_en: "Al-Muddaththir", name_ar: "المدّثر", id: 74 },
  { name_en: "Al-Qiyamah", name_ar: "القيامة", id: 75 },
  { name_en: "Al-Insan", name_ar: "الإنسان", id: 76 },
  { name_en: "Al-Mursalat", name_ar: "المرسلات", id: 77 },
  { name_en: "An-Naba", name_ar: "النبأ", id: 78 },
  { name_en: "An-Nazi`at", name_ar: "النازعات", id: 79 },
  { name_en: "`Abasa", name_ar: "عبس", id: 80 },
  { name_en: "At-Takwir", name_ar: "التكوير", id: 81 },
  { name_en: "Al-Infitar", name_ar: "الإنفطار", id: 82 },
  { name_en: "Al-Mutaffifin", name_ar: "المطفّفين", id: 83 },
  { name_en: "Al-Inshiqaq", name_ar: "الإنشقاق", id: 84 },
  { name_en: "Al-Buruj", name_ar: "البروج", id: 85 },
  { name_en: "At-Tariq", name_ar: "الطارق", id: 86 },
  { name_en: "Al-A`la", name_ar: "الأعلى", id: 87 },
  { name_en: "Al-Ghashiyah", name_ar: "الغاشية", id: 88 },
  { name_en: "Al-Fajr", name_ar: "الفجر", id: 89 },
  { name_en: "Al-Balad", name_ar: "البلد", id: 90 },
  { name_en: "Ash-Shams", name_ar: "الشمس", id: 91 },
  { name_en: "Al-Lail", name_ar: "الليل", id: 92 },
  { name_en: "Ad-Duha", name_ar: "الضحى", id: 93 },
  { name_en: "Ash-Sharh", name_ar: "الشرح", id: 94 },
  { name_en: "At-Tin", name_ar: "التين", id: 95 },
  { name_en: "Al-Alaq", name_ar: "العلق", id: 96 },
  { name_en: "Al-Qadr", name_ar: "القدر", id: 97 },
  { name_en: "Al-Bayyinah", name_ar: "البينة", id: 98 },
  { name_en: "Az-Zalzalah", name_ar: "الزلزله", id: 99 },
  { name_en: "Al-Adiyat", name_ar: "العاديات", id: 100 },
  { name_en: "Al-Qari`ah", name_ar: "القارعة", id: 101 },
  { name_en: "At-Takathur", name_ar: "التكاثر", id: 102 },
  { name_en: "Al-Asr", name_ar: "العصر", id: 103 },
  { name_en: "Al-Humazah", name_ar: "الهمزة", id: 104 },
  { name_en: "Al-Fil", name_ar: "الفيل", id: 105 },
  { name_en: "Quraysh", name_ar: "قريش", id: 106 },
  { name_en: "Al-Ma`un", name_ar: "الماعون", id: 107 },
  { name_en: "Al-Kawthar", name_ar: "الكوثر", id: 108 },
  { name_en: "Al-Kafirun", name_ar: "الكافرون", id: 109 },
  { name_en: "An-Nasr", name_ar: "النصر", id: 110 },
  { name_en: "Al-Masad", name_ar: "المسد", id: 111 },
  { name_en: "Al-Ikhlas", name_ar: "الاخلاص", id: 112 },
  { name_en: "Al-Falaq", name_ar: "الفلق", id: 113 },
  { name_en: "An-Nas", name_ar: "الناس", id: 114 },
];

const findSurahId = (name) => {
  for (const surah of suras) {
    if (
      surah.name_en.toLowerCase() === name.toLowerCase() ||
      surah.name_ar.includes(name)
    ) {
      return surah.id;
    }
  }
  return null;
};

const createSourceBin = async (content, authorName) => {
  let coderegex = /```([\s\S]*)```/;
  let langregex = /^([^\n]+)/;
  let matched = content.match(coderegex);
  if (matched) {
    return await create({
      title: "snippet." + matched[1].match(langregex)[1],
      description: "A code snippet uploaded by " + authorName + " in nocv",
      files: [
        {
          content: matched[1]
            .replaceAll("\n\n", "\n")
            .replace(matched[1].match(langregex)[1], ""),
          language: matched[1].match(langregex)[1],
        },
      ],
    });
  }
  return null;
};

const fetchChannelAndSendWebhook = async (
  lb,
  imageUrl = null,
  modifiedContent = null
) => {
  let ch = await gld.channels.fetch(lb.raw.channelId);
  let dch = bot.channels.cache.find(
    (i) => i.name === ch.name.replaceAll(" & ", "-").replaceAll(" ", "-")
  );
  let webhooks = await dch.fetchWebhooks();
  let whk = webhooks.find((wh) => wh.token);

  if (!whk) {
    let wc = await dch.createWebhook(lb.author.raw.name, {
      avatar: lb.author.raw.avatar,
    });
    await wc.send({
      content: imageUrl
        ? `[${modifiedContent || "Attachment"}](${imageUrl})`
        : `${lb.content}`,
      username: lb.author.raw.name,
      avatarURL: lb.author.raw.avatar,
    });
    tgbot.sendMessage(
      "-1001761655771",
      `${lb.author.raw.name} in ${ch.name}: ${lb.content}`,
      { parse_mode: "MARKDOWN" }
    );
  } else {
    await whk.send({
      content: imageUrl
        ? `[${modifiedContent || "Attachment"}](${imageUrl})`
        : `${lb.content}`,
      username: lb.author.raw.name,
      avatarURL: lb.author.raw.avatar,
    });
    tgbot.sendMessage(
      "-1001761655771",
      `${lb.author.raw.name} in ${ch.name}: ${lb.content}`,
      { parse_mode: "MARKDOWN" }
    );
  }
};

gld.on("messageCreated", async (lb) => {
  if (lb.content === "" || lb.content.startsWith(":")) return;

  const args = lb.content.split(" ");
  if (lb.content.startsWith("?quran")) {
    let surahid = findSurahId(args[1]);
    if (surahid === null)
      return lb.reply(
        `Follow this format: \`?quran [surah name] [ayah number]\``
      );
    lb.send(
      new Guilded.Embed().setImage(
        `https://surahquran.com/img/ayah/${surahid}-${args[2]}.png`
      )
    );
  } else if (lb.content.startsWith("?bin")) {
    let bin = await createSourceBin(lb.content, lb.author.raw.name);
    if (bin) lb.reply(bin.shortUrl);
  } else if (lb.content.startsWith("?tafseer")) {
    let surahid = findSurahId(args[1]);
    if (surahid === null)
      return lb.reply(
        `Follow this format: \`?tafseer [surah name] [ayah number]\``
      );
    let res = await fetch(
      `http://api.quran-tafseer.com/tafseer/1/${surahid}/${args[2]}`
    ).then((r) => r.json());
    lb.reply(res.text);
    lb.send(
      new Guilded.Embed().setImage(
        `https://surahquran.com/img/ayah/${surahid}-${args[2]}.png`
      )
    );
  }

  let pattern = /!\[\]\((https:\/\/img\.guildedcdn\.com[^\)]+)\)/;
  let match = pattern.exec(lb.content);
  if (match) {
    let imageUrl = match[1];
    let modifiedContent = lb.content.replace(pattern, "");
    await fetchChannelAndSendWebhook(lb, imageUrl, modifiedContent);
  } else {
    await fetchChannelAndSendWebhook(lb);
  }
});

tgbot.on("message", async (lb) => {
  const wc = new Discord.WebhookClient({ url: process.env["wc"] });
  let gdh = new gd.Webhook(process.env.chat);
  gdh.setUsername(lb.from.first_name);
  gdh.setAvatar(process.env.logo + lb.from.first_name);

  const ntj = {
    0: "0️⃣",
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣",
  };

  if (lb.photo) {
    let url = await tgbot.getFileLink(lb.photo[1].file_id);
    let name = url.substring(url.lastIndexOf("/") + 1);
    await wc.send({
      content: `${lb.caption ? lb.caption : name}`,
      files: [{ attachment: url, name: name }],
      username: lb.from.first_name,
      avatarURL: process.env.logo + lb.from.first_name,
    });
    gdh.send(
      new gd.MessageBuilder()
        .setTitle(lb.caption ? lb.caption : name)
        .setColor("#2AABEE")
        .setImage(`${url}`)
    );
  } else if (lb.poll) {
    let mssg = await wc.send({
      content: `**📊 ${lb.poll.question}**\n${lb.poll.options
        .map((op, i) => `${ntj[i + 1]} ${op.text}`)
        .join("\n")}`,
      username: lb.from.first_name,
      avatarURL: process.env.logo + lb.from.first_name,
    });
    gdh.send(
      `**📊 ${lb.poll.question}**\n${lb.poll.options
        .map((op, i) => `${ntj[i + 1]} ${op.text}`)
        .join("\n")}`
    );
  } else if (lb.sticker) {
    let url = await tgbot.getFileLink(lb.sticker.thumb.file_id);
    let name = url.substring(url.lastIndexOf("/") + 1);
    await wc.send({
      content: `${lb.sticker.emoji}.`,
      files: [{ attachment: url, name: name }],
      username: lb.from.first_name,
      avatarURL: process.env.logo + lb.from.first_name,
    });
    gdh.send(`[${lb.sticker.emoji}](${url})`);
  } else {
    await wc.send({
      content: `${lb.text}`,
      username: lb.from.first_name,
      avatarURL: process.env.logo + lb.from.first_name,
    });
    gdh.send(lb.text);
  }
});

process.on("uncaughtException", (err) => {
  console.log("Caught exception: " + err);
});

setInterval(async () => {
  await fetch("https://noctrlv-bot.abdlmutii.repl.co");
}, 5000);

bot.login(process.env.ds);
gld.login();
