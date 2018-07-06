const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "why_";
var botver = "Version 1.2"

client.on('ready', () => {
    console.log('Hey JP i am ready!')
    client.user.setActivity(botver  + ' | why_help', { type: 'PLAYING' })
});

client.on('message', message => {
    var lc = message.content.toLowerCase();
    var res = Math.random(1,3);
    var rnd = Math.random(1,5);
    var cup = Math.random(1,3);
    if (lc === prefix + 'ping') {
        message.channel.sendMessage(':ping_pong:Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');

    }else if (lc === prefix + 'pong') {
       message.channel.sendMessage(':ping_pong:Ping! Your pong is `' + `${message.createdTimestamp - Date.now()}` + ' ms`');

}else if (lc === prefix + 'help') {
      embed = new Discord.RichEmbed();
      embed.setColor("#80FF66");
      embed.setAuthor("WhyBot Help");
      embed.setDescription("You can use this Commands with WhyBot. Just type why_[command]");
      embed.addField("Commands", "ping\npong\nrps\n8ball\ncups\npizza\nhelp", true);

      embed.setFooter("WhyBot by JPlexer " + botver);
      message.channel.send("", { embed: embed });
return true;

}else if (lc === prefix + 'pizza') {
     message.channel.send('Here is your Pizza! :pizza: ')

}else if(lc === prefix + 'rps'){
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

}else if (lc.startsWith(prefix + '8ball')&(lc.endsWith('?'))){
   console.log(rnd);
   if(rnd===1) message.channel.sendMessage("No.");
   else if(rnd===2) message.channel.sendMessage("Not Probable.");
   else if(rnd===3) message.channel.sendMessage("Maybe.");
   else if(rnd===4) message.channel.sendMessage("Probably.");
   else if(rnd===5) message.channel.sendMessage("Yes.");

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
  message.channel.sendMessage("Cup 1, 2 or 3 (Write the Number with Cup)");
}
  if(lc ==='cup 1'){
    if(cup===2){
      //win
      message.channel.sendMessage("It was "+ result);
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
  }else if(lc ==="cup 2"){
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
  }else if(lc ==="cup 3"){
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

}else if (lc === prefix + 'lol') {
    	message.channel.send(':scream: You found the Secret :scream:');
  	}
});

client.login(process.env.BOT_TOKEN);
