const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setGame('why_help')
});

msg = message.content.toLowerCase();

    if (msg.startsWith = ("why_ping")) {
    	message.reply('Pong!');
  	}

    if (msg.startsWith = ("why_pong") {
    	message.reply('Ping!');
  	}

    if (msg.startsWith = ("why_about") {
    	message.reply('WhyBot by JPlexer Version: 0.3.0');
  	}

    if (msg.startsWith = ("why_help") {
    	message.reply('```why_ping/pong (You Know what it is!) why_rps rock/paper/scissors/ (Play Rock Paper Scissors) why_about(You Know what it is!)```');
  	}

    if (msg.startsWith = ("why_rps rock") {
    	message.reply('Paper! I won.');
  	}

    if (msg.startsWith = ("why_rps paper") {
    	message.reply('Scissors! I won.');
  	}

    if (msg.startsWith = ("why_rps scissors") {
    	message.reply('Rock! I won.');
  	}

    if (msg.startsWith = ("why_lol") {
    	message.reply(':scream: You found the Secret :scream:');
  	}

    if (msg.startsWith = ("o") {
    	message.reply('Oh or Ok??');
  	}
});

client.login(process.env.BOT_TOKEN);
