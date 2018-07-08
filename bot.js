const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "why_";
const botver = "Version 2.0"
const ytdl = require("youtube-dl");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

const yt_api_key = process.env.YT_TOKEN;
const bot_controller = process.env.BOT_CTRL;

let queue = [];
let isPlaying = false;
let dispatcher = null;
let voiceChannel = null;
let skipReq = 0;
let skippers = [];



client.on('ready', () => {
    console.log('Hey JP i am ready!')
    client.user.setActivity(`${botver} | ${prefix}help`, { type: 'PLAYING' })
});



client.login(process.env.BOT_TOKEN);

client.on('message', message => {
  //just some Variables
    const lc = message.content.toLowerCase();
    var res = Math.random(1,3);
    var rnd = Math.random(1,5);
    var cup = Math.random(1,3);
    const member = message.member;
    const args = message.content.split(' ').slice(1).join(" ");


//tells you your ping
    if (lc === `${prefix}ping`) {
        message.channel.send(`:ping_pong:Pong! Your ping is \`${`${Date.now() - message.createdTimestamp}`} ms\``);



        //just a fun feature 'tells you your pong'
    }else if (lc === `${prefix}pong`) {
       message.channel.send(`:ping_pong:Ping! Your pong is \`${`${message.createdTimestamp - Date.now()}`} ms\``);



       //the help
}else if (lc === `${prefix}help`) {
      embed = new Discord.RichEmbed();
      embed.setColor("#00FFFB");
      embed.setAuthor("WhyBot Help");
      embed.setDescription(`You can use this Commands with WhyBot. Just type ${prefix}[command]`);
      embed.addField("Fun & Play Commands", "ping\npong\npizza\nhelp", true);
      embed.addField("Music Commands", "play\nskip\nclear", true);
      

      embed.setFooter(`WhyBot by JPlexer ${botver}`);
      message.channel.send("", { embed });
return true;



//just a fun pizza feature
}else if (lc === `${prefix}pizza`) {
     message.channel.send('Here is your Pizza! :pizza: ')

    //dont tell anyone about this
}else if (lc === `${prefix}lol`) {
      message.channel.send(':scream: You found the Secret :scream:');


//This is the Music Part of the Bot

}else if (lc.startsWith(`${prefix}play`)) {
  if (member.voiceChannel || client.guilds.get("338433261934215171").voiceConnection != null) {
    if (queue.length > 0 || isPlaying) {
      getID(args, id => {
        add_to_queue(id);
        fetchVideoInfo(id, (err, {title}) => {
          if (err) throw new Error(err);
          message.reply(` added to queue: **${title}**`);
        });
      });
    } else {
      isPlaying = true;
      getID(args, id => {
        queue.push("placeholder");
        playMusic(id, message);
        fetchVideoInfo(id, (err, {title}) => {
          if (err) throw new Error(err);
          message.reply(` now playing: **${title}**`);
        })
      });
    }
  } else {
    message.reply(" you need to be in a voice channel!");
  }
} else if (lc.startsWith(`${prefix}skip`)) {
  if (!skippers.includes(message.author.id)) {
    skippers.push(message.author.id);
    skipReq++;
    if (skipReq >= Math.ceil((voiceChannel.members.size - 1) / 2)) {
      skip_song(message);
      message.reply(" your skip has been acknowledged. Skipping now");
    } else {
      message.reply(`${` your skip has been acknolwedged. You need **${Math.ceil((voiceChannel.members.size - 1) / 2)}` - skipReq}** more skip votes!`);
    }
  } else {
    message.reply(" you already voted to skip!");
  }
} else if (lc.startsWith(`${prefix}clear`)) {
  while (queue.length > 0) {
    queue.pop();
  }
  message.reply("cleared the queue!");
} else if (lc.startsWith(`${prefix}delete`)) {
  getID(args, id => {
    console.log(queue);
    if (queue.includes(id)) {
      fetchVideoInfo(id, (err, {title}) => {
        if (err) throw new Error(err);
        message.reply(` removing: **${title}**`);
        const deleteindex = queue.indexOf(id);
        queue.splice(deleteindex, 1);
      });
    } else {
      message.reply(" could not find song in queue!")
    }
  })
 }
});

function skip_song(message) {
  dispatcher.end();
}

function playMusic(id, message) {
  voiceChannel = message.member.voiceChannel;

  voiceChannel.join().then(connection => {
    stream = ytdl(`https://www.youtube.com/watch?v=${id}`,
  );
    skipReq = 0;
    skippers = [];

    dispatcher = connection.playStream(stream);
    dispatcher.on('end', () => {
      skipReq = 0;
      skippers = [];
      queue.shift();
      if (queue.length === 0) {
        console.log('Queue is 0');
        queue = [];
        isPlaying = false;
        voiceChannel.leave();
      } else {
        playMusic(queue[0], message);
      }
    })
  });
}

function getID(str, cb) {
  if (isYoutube(str)) {
    cb(getYouTubeID(str));
  } else {
    search_video(str, id => {
      cb(id);
    });
  }
}

function add_to_queue(strID) {
  if (isYoutube(strID)) {
    queue.push(getYoutubeID(strID));
  } else {
    queue.push(strID);
  }
}

function isYoutube(str) {
  return str.toLowerCase().includes("youtube.com");
}

function search_video(query, callback) {
  request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
    const json = JSON.parse(body);
    callback(json.items[0].id.videoId);
  });
}
