const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!')
    client.user.setGame('why_help')
});

msg = message.content.toLowerCase();

client.on('message', message => {
    if (msg.startsWith === 'why_ping') {
    	message.reply('PONG!');
  	}
});

client.on('message', message => {
    if (msg.startsWith === 'why_pong') {
    	message.reply('Ping!');
  	}
});

client.on('message', message => {
    if (msg.startsWith === 'why_about') {
    	message.reply('WhyBot von JPlexer Version: 0.3.0');
  	}
});

client.on('message', message => {
    if (msg.startsWith === 'why_help') {
    	message.reply('```why_ping/pong (Finde heraus was es tut!) why_ssp stein/schere/papier/ (Spiele Stein Schere Papier!) why_about(Du verstehst was das bedeutet...)```');
  	}
});

client.on('message', message => {
    if (msg.startsWith === 'why_ssp stein') {
    	message.reply('Papier! Ich gewinne.');
  	}
});

client.on('message', message => {
    if (msg.startsWith === 'why_ssp papier') {
    	message.reply('Schere! Ich gewinne.');
  	}
});

client.on('message', message => {
    if (msg.startsWith === 'why_ssp schere') {
    	message.reply('Stein! Ich gewinne.');
  	}
});

client.on('message', message => {
    if (message.content === 'why_lol') {
    	message.reply(':scream: Du hast das Secret gefunden :scream:');
  	}
});

client.on('message', message => {
    if (message.content === 'o') {
    	message.reply('Meintest du Oh oder Ok??');
  	}
});

client.on('message', message => {
    if (message.content === 'O') {
    	message.reply('Meintest du Oh oder Ok??');
  	}
});

client.login(process.env.BOT_TOKEN);
