# Welcome to WhyBot.

### This bot is written in combination with Discord.js.

The preferred way to deploy this Bot is via Heroku. Using Heroku means that the bot doesn't run on your computer,
is active 24/7 and you don't have to worry about the ffmpeg installation, which is messy. Therefore this installation guide is
going to describe how to do it.

Heroku is a service which provides servers and much, much more. Depending on your needs, the server (a.k.a. Dyno)
is free of charge the time writing this guide, it will cost you **nothing**. You should create a Heroku account before proceeding.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/JPlexer/WhyBot/tree/master)

After deploying, click manage apps and "Configure Dynos", and make sure "worker node Bot.js" is switched on.

## The accounts (needed to fill in the config variables on the Heroku deploy)
- A new discord app (Bot)
- A google developers account (to get a youtube API key to use for the bots playback service)
- A cleverbot.io account (to get the cleverbot function)

Creating these accounts will cost you **nothing** aswell, by the time writing this guide.

### Step 1
- Navigate to https://discordapp.com/developers/applications/me and create a new App
- Create a bot user
- Reveal your token by clicking "click to reveal" right next to "Token"
- Save this token somewhere
- Copy your client ID and visit https://discordapp.com/oauth2/authorize?&client_id=YOUR_CLIENT_ID&scope=bot&permissions=268561430,
  replacing "YOUR_CLIENT_ID" with the client ID copied
- Join your server

**NOTE: The bot can run without the weather and the playback service!**

### Step 2
- Go to https://console.developers.google.com/ and create and account if you don't have one
- Create a project with the Youtube v3 API
- When created, navigate to "Credentials" and create credentials (API key)
- Save this key somewhere

### Step 3
- Go to https://cleverbot.io/login and create an account
- When created, you will find a API Key and an API USER
- Save this keys somewhere

After you created the Bot in Heroku:
- Navigate to https://dashboard.heroku.com/ into your server and click "Configure Dynos"
- Make sure "worker node Bot.js" is switched on
