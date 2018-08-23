const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const yt_api_key = process.env.YT_TOKEN;
module.exports = {
  play: function (message, guilds, args) {
    if (message.member.voiceChannel || guilds[message.guild.id].voiceChannel != null) {
      if (guilds[message.guild.id].queue.length > 0 || guilds[message.guild.id].isPlaying) {
        this.getID(args, id => {
          this.add_to_queue(id, message, guilds);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            message.reply(` added to queue: **${title}**`);
            guilds[message.guild.id].queueNames.push(title);
          });
        });
      } else {
        isPlaying = true;
        this.getID(args, id => {
          guilds[message.guild.id].queue.push(id);
          this.playMusic(id, message, guilds);
          fetchVideoInfo(id, (err, {
            title
          }) => {
            if (err) throw new Error(err);
            guilds[message.guild.id].queueNames.push(title);

            message.reply(` now playing: **${title}**`);
          })
        });
      }
    } else {
      message.reply(" you need to be in a voice channel!");
    }
  },
  skip: function (message, guilds) {
    if (!guilds[message.guild.id].skippers.includes(message.author.id)) {
      guilds[message.guild.id].skippers.push(message.author.id);
      guilds[message.guild.id].skipReq++;
      if (guilds[message.guild.id].skipReq >= Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
        this.skip_song(message, guilds);
        message.reply(" your skip has been acknowledged. Skipping now");
      } else {
        message.reply(`${` your skip has been acknolwedged. You need **${Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)}` - skipReq}** more skip votes!`);
      }
    } else {
      message.reply(" you already voted to skip!");
    }
  },
  queue: function (message, guilds) {
    let message2 = "```";
    for (let i = 0; i < guilds[message.guild.id].queueNames.length; i++) {
      const temp = `${i + 1}: ${guilds[message.guild.id].queueNames[i]}${i === 0? "**(Current Song)***" : ""}\n`;
      if ((message2 + temp).length <= 2000 - 3) {
        message2 += temp;
      } else if (guilds[message.guild.id].queue.length === 0) {
        message.channel.send("There is Nothing in the Queue")
      } else {
        message2 += "```";
        message.channel.send(message2);
        message2 = "```";
      }
    }
    message2 += "```";
    message.channel.send(message2);
  },
  stop: function (message, guilds) {
    guilds[message.guild.id].queue.length = 0;
    guilds[message.guild.id].dispatcher.end();
    message.reply('Stopped the Music')
  },
  clear: function (message, guilds) {
    guilds[message.guild.id].queue = [guilds[message.guild.id].queue.slice(0, 1)];
    guilds[message.guild.id].queueNames = [guilds[message.guild.id].queueNames.slice(0, 1)];
    message.reply("cleared the queue!");
  },
  skip_song: function (message, guilds) {
    guilds[message.guild.id].dispatcher.end();
  },

  playMusic: function (id, message, guilds) {
    guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



    guilds[message.guild.id].voiceChannel.join().then(connection => {
      stream = ytdl(`https://www.youtube.com/watch?v=${id}`, );
      guilds[message.guild.id].skipReq = 0;
      guilds[message.guild.id].skippers = [];

      guilds[message.guild.id].dispatcher = connection.playStream(stream);
      guilds[message.guild.id].dispatcher.on('end', () => {
        guilds[message.guild.id].skipReq = 0;
        guilds[message.guild.id].skippers = [];
        guilds[message.guild.id].queue.shift();
        guilds[message.guild.id].queueNames.shift();
        if (guilds[message.guild.id].queue.length === 0) {
          guilds[message.guild.id].queue = [];
          guilds[message.guild.id].queueNames = [];
          guilds[message.guild.id].newsongs = [];
          guilds[message.guild.id].isPlaying = false;
          guilds[message.guild.id].voiceChannel.leave();
        } else {
          setTimeout(() => {
            this.playMusic(id, message, guilds, guilds[message.guild.id].queue[0],);
          }, 500)
          console.log(guilds[message.guild.id].queue)
          console.log(guilds[message.guild.id].queueNames)
        }
      })
    });
  },

  getID: function (str, cb) {
    if (this.isYoutube(str)) {
      cb(getYouTubeID(str));
    } else {
      this.search_video(str, id => {
        cb(id);
      });
    }
  },

  add_to_queue: function (id, message, guilds) {
    if (this.isYoutube(id)) {
      guilds[message.guild.id].queue.push(getYoutubeID(id));
    } else {
      guilds[message.guild.id].queue.push(id);
    }
  },

  isYoutube: function (str) {
    return str.toLowerCase().includes("youtube.com");
  },

  search_video: function (query, callback) {
    request(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=${encodeURIComponent(query)}&key=${yt_api_key}`, (error, response, body) => {
      const json = JSON.parse(body);
      if (!json.items[0]) callback("3_-a9nVZYjk");
      else {
        callback(json.items[0].id.videoId);
      }
    });
  },
}
