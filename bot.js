const Discord = require('discord.js');
const client = new Discord.Client();
const cleverbot = require("cleverbot.io");
const prefix = "why#";
const botver = "b.2.1.1"
const branch = "WhyBeta"
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const yt_api_key = process.env.YT_TOKEN;
const clbot = new cleverbot(process.env.CL_USER, process.env.CL_TOKEN);

const guilds = {};

global.getRandom = function (...args) {
  if (args.length == 1) {
    if (typeof args[0] == Array) {
      var random = Math.floor(Math.random() * 1000) % args[0].length;
      return args[0][random];
    }
  } else {
    var random = Math.floor(Math.random() * 1000) % args.length;
    return args[random];
  }
}

function setGame() {
  client.user.setActivity(getRandom(
    "with my Users",
    "Annoying JPlexer",
    `${prefix}help`,
    `${botver}`,
    `${botver}`,
    `${prefix}help`), {
    type: "PLAYING"
  });
}

client.on('ready', () => {
  console.log('Hey JP i am ready!')
  client.setInterval(setGame, 30000);
  setGame();
  clbot.setNick('WhyBot');
});


client.login(process.env.BOT_TOKEN);

client.on('message', message => {
  //just some Variables
  const lc = message.content.toLowerCase();
  const args = message.content.split(' ').slice(1).join(" ");
  const member = message.member;
  const gmgid = guilds[message.guild.id];


  if (!gmgid) {
    gmgid = {
      queue: [],
      queueNames: [],
      isPlaying: false,
      dispatcher: null,
      voiceChannel: null,
      skipReq: 0,
      newsongs: [],
      newsongNames: [],
      skippers: []
    };
  }

  //tells you your ping
  if (lc === `${prefix}ping`) {
    message.channel.send(`:ping_pong:Pong! Your ping is \`${`${Date.now() - message.createdTimestamp}`} ms\``);



    //just a fun feature 'tells you your pong'

  } else if (lc === `${prefix}pong`) {
    message.channel.send(`:ping_pong:Ping! Your pong is \`${`${message.createdTimestamp - Date.now()}`} ms\``);



    //the help
  } else if (lc === `${prefix}help`) {
    embed = new Discord.RichEmbed();
    embed.setColor("#00FFFB");
    embed.setAuthor(`${branch} Help`);
    embed.setDescription(`You can use this Commands with ${branch}. Just type ${prefix}[command]`);
    embed.addField("Fun & Play Commands", `ping\npong\npizza\nhelp\nPing ${branch} at the beginning of a Message to chat with him`, true);
    embed.addField("Music Commands", "play\nskip\nstop\nclear\nqueue", true);


    embed.setFooter(`WhyBeta by JPlexer ${botver}`);
    message.channel.send("", {
      embed
    });
    return true;



    //just a fun pizza feature
  } else if (lc === `${prefix}pizza`) {
    message.channel.send('Here is your Pizza! :pizza: ')

    //Cleverbot
  } else if (message.isMentioned(client.user)) {
    clbot.create((err, session) => {
      clbot.ask(message.content, (err, response) => {
        message.channel.send(response)
      });
    });

    //dont tell anyone about this
  } else if (lc === `${prefix}lol`) {
    message.channel.send(':scream: You found the Secret :scream:');

    //This is the Music Part of the Bot
  } else if (lc.startsWith(`${prefix}play`)) {
    if (message.member.voiceChannel || gmgid.voiceChannel != null) {
      if (gmgid.queue.length > 0 || gmgid.isPlaying) {
        getID(args, id => {
          add_to_queue(id, message);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            message.reply(` added to queue: **${title}**`);
            gmgid.queueNames.push(title);
          });
        });
      } else {
        isPlaying = true;
        getID(args, id => {
          gmgid.queue.push(id);
          playMusic(id, message);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            gmgid.queueNames.push(title);
            message.reply(` now playing: **${title}**`);
          })
        });
      }
    } else {
      message.reply(" you need to be in a voice channel!");
    }
  } else if (lc.startsWith(`${prefix}skip`)) {
    if (!gmgid.skippers.includes(message.author.id)) {
      gmgid.skippers.push(message.author.id);
      gmgid.skipReq++;
      if (gmgid.skipReq >= Math.ceil((gmgid.voiceChannel.members.size - 1) / 2)) {
        skip_song(message);
        message.reply(" your skip has been acknowledged. Skipping now");
      } else {
        message.reply(`${` your skip has been acknolwedged. You need **${Math.ceil((gmgid.voiceChannel.members.size - 1) / 2)}` - skipReq}** more skip votes!`);
      }
    } else {
      message.reply(" you already voted to skip!");
    }
  } else if (lc.startsWith(`${prefix}queue`)) {
    let message2 = "```";
    for (let i = 0; i < gmgid.queueNames.length; i++) {
      const temp = `${i + 1}: ${gmgid.queueNames[i]}${i === 0? "**(Current Song)***" : ""}\n`;
      if ((message2 + temp).length <= 2000 - 3) {
        message2 += temp;
      } else if (gmgid.queue.length === 0) {
        message.channel.send("There is Nothing in the Queue")
      } else {
        message2 += "```";
        message.channel.send(message2);
        message2 = "```";
      }
    }
    message2 += "```";
    message.channel.send(message2);

  } else if (lc === `${prefix}stop`) {
    stop_song(message);
    message.reply('Stopped the Music')

  } else if (lc.startsWith(`${prefix}clear`)) {
    while (gmgid.queue.length > 0) {
      gmgid.queue = [];
      gmgid.queueNames = [gmgid.queueNames[0]];
    }
    message.reply("cleared the queue!");
  }
});


function skip_song({
  guild
}) {
  guilds[guild.id].dispatcher.end();
}

function stop_song({
  guild
}) {
  guilds[guild.id].queue.length = 0;
  guilds[guild.id].dispatcher.end();
}


function playMusic(id, message) {
  gmgid.voiceChannel = message.member.voiceChannel;



  gmgid.voiceChannel.join().then(connection => {
    stream = ytdl(`https://www.youtube.com/watch?v=${id}`, );
    gmgid.skipReq = 0;
    gmgid.skippers = [];

    gmgid.dispatcher = connection.playStream(stream);
    gmgid.dispatcher.on('end', () => {
      gmgid.skipReq = 0;
      gmgid.skippers = [];
      gmgid.queue.shift();
      gmgid.queueNames.shift();
      if (gmgid.queue.length === 0) {
        gmgid.queue = [];
        gmgid.queueNames = [];
        gmgid.newsongs = [];
        gmgid.isPlaying = false;
        gmgid.voiceChannel.leave();
      } else {
        setTimeout(() => {
          playMusic(gmgid.queue[0], message);
        }, 500)
      }
    })
  });
}

function getID(str, cb, message) {
  if (isYoutube(str)) {
    cb(getYouTubeID(str));
  } else {
    search_video(str, id => {
      cb(id);
    });
  }
}

function add_to_queue(strID, {
  guild
}) {
  if (isYoutube(strID)) {
    guilds[guild.id].queue.push(getYoutubeID(strID));
  } else {
    guilds[guild.id].queue.push(strID);
  }
}

function isYoutube(str) {
  return str.toLowerCase().includes("youtube.com");
}

function search_video(query, callback) {
  request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
    const json = JSON.parse(body);
    if (!json.items[0]) callback("3_-a9nVZYjk");
    else {
      callback(json.items[0].id.videoId);
    }
  });
}
