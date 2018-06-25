const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "why_";

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setGame('why_help')
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
    	message.channel.send('WhyBot by JPlexer Version: 0.3.1');
  	}
});

client.on('message', message => {
    if (message.content === prefix + 'help') {
    	message.channel.send('```why_ping/pong (You Know what it is!) why_rps rock/paper/scissors/ (Play Rock Paper Scissors) why_about(You Know what it is!)```');
  	}
});

client.on('message', message => {
    if (message.content === prefix + 'rps rock') {
    	message.channel.send('Paper! I won.')
    or (message.channel.send('Rock! Its a Tie.'))
    or (message.channel.send('Scissors! I lost.'));
  	}
});

client.on('message', message => {
    if (message.content === prefix + 'rps paper') {
    	message.channel.send('Scissors! I won.')
      or (message.channel.send('Rock! I lost.'))
      or (message.channel.send('Paper! Its a Tie.'));
  	}
});

client.on('message', message => {
    if (message.content === prefix + 'rps scissors') {
    	message.channel.send('Rock! I won.')
      or (message.channel.send('Scissors! Its a Tie.'))
      or (message.channel.send('Paper! I lost.'));
  	}
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
