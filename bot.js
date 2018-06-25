const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "why_";
var randomInt = require('random-int');

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setGame(' Alpha 1.1| why_help')
});

client.on('message', message => {
    if (message.content === prefix + 'ping') {
    	message.channel.send('PONG!');
  	}
});

client.on('message', message => {
    if (message.content === prefix + 'pong') {
    	message.channel.send('Ping!');
  	}
});

client.on('message', message => {
    if (message.content === prefix + 'about') {
    	message.channel.send('WhyBot by JPlexer Version: Alpha 1.1');
  	}
});

client.on('message', message => {
    if (message.content === prefix + 'help') {
    	message.channel.send('```why_ping/pong (You dont know what it is!) why_rps (Play Rock Paper Scissors) why_about(You Know what it is!) why_8ball [Question]? (Its an 8ball)```');
  	}
});
// rps and 8ball code by github.com/gtarraga/discord-bot
client.on('message', message => {
if(message.content === prefix + 'rps'){
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
    if(message.content==='rock'){
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
    }else if(message.content==="paper"){
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
    }else if(message.content==="scissors"){
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
 if ((message.content.startsWith(prefix + '8ball')) && (message.content.endsWith('?'))) {
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
    if (message.content === prefix + 'lol') {
    	message.channel.send(':scream: You found the Secret :scream:');
  	}
});

client.on('message', message => {
    if (message.content === 'o') {
    	message.channel.send('Oh or Ok??');
  	}
});

client.on('message', message => {
    if (message.content === 'O') {
    	message.channel.send('Oh or Ok??');
  	}
});

client.login(process.env.BOT_TOKEN);
