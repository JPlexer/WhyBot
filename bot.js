const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "why_";

msg = message.content.toLowerCase();

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setGame('why_help')
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'ping') {
    	message.channel.send('PONG!');
  	}
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'pong') {
    	message.channel.send('Ping!');
  	}
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'about') {
    	message.channel.send('WhyBot by JPlexer Version: 0.3.1');
  	}
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'help') {
    	message.channel.send('```why_ping/pong (You Know what it is!) why_rps rock/paper/scissors/ (Play Rock Paper Scissors) why_about(You Know what it is!)```');
  	}
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'rps rock') {
    	message.channel.send('Paper! I won.');
  	}
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'rps paper') {
    	message.channel.send('Scissors! I won.');
  	}
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'rps scissors') {
    	message.channel.send('Rock! I won.');
  	}
});

client.on('message', message => {
    if (msg.startsWith === prefix + 'lol') {
    	message.channel.send(':scream: You found the Secret :scream:');
  	}
});

client.on('message', message => {
    if (msg.startsWith === 'o') {
    	message.channel.send('Oh or Ok??');
  	}
});

client.login(process.env.BOT_TOKEN);
