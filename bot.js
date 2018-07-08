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
      embed.addField("Fun & Play Commands", "ping\npong\nrps\n8ball\ncups\npizza\nhelp", true);
      embed.addField("Music Commands", "play\nskip\nclear", true);
      

      embed.setFooter(`WhyBot by JPlexer ${botver}`);
      message.channel.send("", { embed });
return true;



//just a fun pizza feature
}else if (lc === `${prefix}pizza`) {
     message.channel.send('Here is your Pizza! :pizza: ')

//rock paper scissors (still a bit JS5)
}else if(lc === prefix + 'rps'){
  //scissors 1
  //paper 2
  //rock 3
  if(res===1){
    result="scissors";
  }else if(res===2){
    result="paper";
  }else if(res===3){  s
    result="rock";
  }
  message.channel.send("rock, paper or scissors");
}
  if(lc ==='rock'){
    if(res===2){
      //win
      message.channel.send("I got "+ result);
      message.channel.send("I won!");
    }else if(res===1){
      //lose
      message.channel.send("I got "+ result);
      message.channel.send("I lost");
    }else if(res===3){
      //draw
      message.channel.send("I got "+ result);
      message.channel.send("Draw");
    }else{
      message.channel.send("You have to start the game with "+prefix+"rps")
    }
  }else if(lc ==="paper"){
    if(res===1){
      //win
      message.channel.send("I got "+ result);
      message.channel.send("I won");
    }else if(res===3){
      message.channel.send("I got "+ result);
      message.channel.send("I lost");
    }else if(res===2){
      message.channel.send("I got "+ result);
      message.channel.send("Draw");
    }
  }else if(lc ==="scissors"){
    if(res===3){
      //win
      message.channel.send("I got "+ result);
      message.channel.send("I won");
    }else if(res===2){
      message.channel.send("I got "+ result);
      message.channel.send("I lost");
    }else if(res===1){
      message.channel.send("I got "+ result);
      message.channel.send("Draw");
    }



    //its an 8ball
}else if (lc.startsWith(`${prefix}8ball`)&(lc.endsWith('?'))){
 console.log(rnd);
 if(rnd===1) message.channel.send("No.");
 else if(rnd===2) message.channel.send("Not Probable.");
 else if(rnd===3) message.channel.send("Maybe.");
 else if(rnd===4) message.channel.send("Probably.");
 else if(rnd===5) message.channel.send("Yes.");



 //its a 3 cups game where you must guess where the ball is (still a bit JS5)
}else if(lc === prefix + 'cups'){
//scissors 1
//paper 2
//rock 3
if(cup===1){
  result="Cup 1";
}else if(cup===2){
  result="Cup 2";
}else if(cup===3){
  result="Cup 3";
}
message.channel.send("Cup 1, 2 or 3 (type Cup and then the Number)");
}
if(lc ==='cup 1'){
  if(cup===2){
    //win
    message.channel.send("It was "+ result);
    message.channel.send("You lost!");
  }else if(cup===1){
    //lose
    message.channel.send("It was "+ result);
    message.channel.send("You won!");
  }else if(cup===3){
    //draw
    message.channel.send("It was "+ result);
    message.channel.send("You lost!");
  }else{
    message.channel.send("You have to start the game with "+prefix+"cups")
  }
}else if(lc ==="cup 2"){
  if(cup===1){
    //win
    message.channel.send("It was "+ result);
    message.channel.send("You lost!");
  }else if(cup===3){
    message.channel.send("It was "+ result);
    message.channel.send("You lost!");
  }else if(cup===2){
    message.channel.send("It was "+ result);
    message.channel.send("You won!");
  }
}else if(lc ==="cup 3"){
  if(cup===3){
    //win
    message.channel.send("It was "+ result);
    message.channel.send("You won!");
  }else if(cup===2){
    message.channel.send("It was "+ result);
    message.channel.send("You lost!");
  }else if(cup===1){
    message.channel.send("It was "+ result);
    message.channel.send("You lost!");
  }

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
