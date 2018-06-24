const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setGame('why_help')
});

client.on('message', message => {
    if (message.content === 'why_ping') {
    	message.channel.send('PONG!');
  	}
});

client.on('message', message => {
    if (message.content === 'why_pong') {
    	message.channel.send('Ping!');
  	}
});

client.on('message', message => {
    if (message.content === 'why_about') {
    	message.channel.send('WhyBot by JPlexer Version: 0.3.1');
  	}
});

client.on('message', message => {
    if (message.content === 'why_help') {
    	message.channel.send('```why_ping/pong (You Know what it is!) why_rps rock/paper/scissors/ (Play Rock Paper Scissors) why_about(You Know what it is!)```');
  	}
});

client.on('message', message => {
    if (message.content === 'why_rps rock') {
    	message.channel.send('Paper! I won.');
  	}
});

client.on('message', message => {
    if (message.content === 'why_rps paper') {
    	message.channel.send('Scissors! I won.');
  	}
});

client.on('message', message => {
    if (message.content === 'why_rps scissors') {
    	message.channel.send('Rock! I won.');
  	}
});

client.on('message', message => {
    if (message.content === 'why_lol') {
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
