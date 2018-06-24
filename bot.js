const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setGame('why_help')
});

client.on('message', message => {
    if (message.content === 'why_ping') {
    	message.reply('PONG!');
  	}
});

client.on('message', message => {
    if (message.content === 'why_pong') {
    	message.reply('Ping!');
  	}
});

client.on('message', message => {
    if (message.content === 'why_about') {
    	message.reply('WhyBot by JPlexer Version: 0.3.1');
  	}
});

client.on('message', message => {
    if (message.content === 'why_help') {
    	message.reply('```why_ping/pong (You Know what it is!) why_rps rock/paper/scissors/ (Play Rock Paper Scissors) why_about(You Know what it is!)```');
  	}
});

client.on('message', message => {
    if (message.content === 'why_rps rock') {
    	message.reply('Paper! I won.');
  	}
});

client.on('message', message => {
    if (message.content === 'why_rps paper') {
    	message.reply('Scissors! I won.');
  	}
});

client.on('message', message => {
    if (message.content === 'why_rps scissors') {
    	message.reply('Rock! I won.');
  	}
});

client.on('message', message => {
    if (message.content === 'why_lol') {
    	message.reply(':scream: You found the Secret :scream:');
  	}
});

client.on('message', message => {
    if (message.content === 'o') {
    	message.reply('Oh or Ok??');
  	}
});

client.on('message', message => {
    if (message.content === 'O') {
    	message.reply('Oh or Ok??');
  	}
});

client.login(process.env.BOT_TOKEN);
