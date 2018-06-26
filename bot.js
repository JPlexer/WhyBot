const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "why_";
const botver = "0.0.3"
var randomInt = require('random-int');

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setActivity('version' + botver + ' | why_help', { type: 'PLAYING' })
});

client.on('message', message => {
    var lc = message.content.toLowerCase();
    if (lc === prefix + 'ping') {
    	message.channel.send('PONG!');
  	}
});

client.on('message', message => {
    var lc = message.content.toLowerCase();
    if (lc === prefix + 'pong') {
    	message.channel.send('Ping!');
  	}
});

client.on('message', message => {
    var lc = message.content.toLowerCase();
    if (lc === prefix + 'help') {
      var embed = new Discord.RichEmbed();
      embed.setColor("#3C3C96");
      embed.setAuthor("WhyBot Help");
      embed.setDescription("Here are some things you can try. Just type why_[command]");

      embed.addField("User Commands", "ping\npong\nrps\n8ball\ncups\nhelp", true);

      embed.setFooter("WhyBot by JPlexer Version: " + botver);
      message.channel.send("", { embed: embed });
return true;
  	}
});
// rps and 8ball code by github.com/gtarraga/discord-bot
client.on('message', message => {
    var lc = message.content.toLowerCase();
if(lc === prefix + 'rps'){
  res = randomInt(1,3);
    //scissors 1
    //paper 2
    //rock 3
    if(res===1){
      result="scissors";
    }else if(res===2){
      result="paper";
    }else if(res===3){
      result="rock";
    }
    message.channel.sendMessage("rock, paper or scissors");
  }
    if(lc ==='rock'){
      if(res===2){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I won!");
      }else if(res===1){
        //lose
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I lost");
      }else if(res===3){
        //draw
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Draw");
      }else{
        message.channel.sendMessage("You have to start the game with why_rps")
      }
    }else if(lc ==="paper"){
      if(res===1){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I won");
      }else if(res===3){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I lost");
      }else if(res===2){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Draw");
      }
    }else if(lc ==="scissors"){
      if(res===3){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I won");
      }else if(res===2){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("I lost");
      }else if(res===1){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage("Draw");
      }
    }
});

client.on("message", message => {
    var lc = message.content.toLowerCase();
 if ((lc.startsWith(prefix + '8ball')) && (lc.endsWith('?'))) {
   var rnd = randomInt(1,5);
   console.log(rnd);
   if(rnd===1) message.channel.sendMessage("No.");
   else if(rnd===2) message.channel.sendMessage("Not Probable.");
   else if(rnd===3) message.channel.sendMessage("Maybe.");
   else if(rnd===4) message.channel.sendMessage("Probably.");
   else if(rnd===5) message.channel.sendMessage("Yes.");
 };
});

client.on('message', message => {
  var lc = message.content.toLowerCase();
if(lc === prefix + 'cups'){
cup = randomInt(1,3);
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
  message.channel.sendMessage("Cup 1, 2 or 3 (Only the Numbers)");
}
  if(lc ==='1'){
    if(cup===2){
      //win
      message.channel.sendMessage("It was"+ result);
      message.channel.sendMessage("You lost!");
    }else if(cup===1){
      //lose
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You won!");
    }else if(cup===3){
      //draw
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You lost!");
    }else{
      message.channel.sendMessage("You have to start the game with why_cups")
    }
  }else if(lc ==="2"){
    if(cup===1){
      //win
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You lost!");
    }else if(cup===3){
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You lost!");
    }else if(cup===2){
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You won!");
    }
  }else if(lc ==="3"){
    if(cup===3){
      //win
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You won!");
    }else if(cup===2){
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You lost!");
    }else if(cup===1){
      message.channel.sendMessage("It was "+ result);
      message.channel.sendMessage("You lost!");
    }
  }
});

client.on('message', message => {
    var lc = message.content.toLowerCase();
    if (lc === prefix + 'lol') {
    	message.channel.send(':scream: You found the Secret :scream:');
  	}
});

client.on('message', message => {
    var lc = message.content.toLowerCase();
    if (lc === 'o') {
    	message.channel.send('Oh or Ok??');
  	}
});

client.login(process.env.BOT_TOKEN);
