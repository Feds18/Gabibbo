const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] //Aggiungere GUILD_VOICE_STATES
})

client.login(process.env.token);

client.on("ready", () => {
    console.log("ONLINE");
})

client.on("messageCreate", (message) => {
    if(message.author.id == 687257327472345128){
        num = Math.round(Math.random() * 100)
        if(num > 80){
        message.channel.send("Stai zitto coglione")
        }
    }
    if(message.author.id == 486610061846904842){
        message.channel.send("Ma tu ancora campi?")
        message.author.send("Comunque ho notato che sei molto stupido, vuoi scopare con me???? <3")
    }
})

const { DisTube } = require("distube")
//Plugin facoltativi
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")

const distube = new DisTube(client, {
    youtubeDL: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
    leaveOnEmpty: true,
    leaveOnStop: true
})

client.on("messageCreate", message => {
    if (message.content.startsWith("Gplay")) {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("Ah coglione devi sta in un canale")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Altri stronzi stanno già ad usa il bot fra")
        }

        let args = message.content.split(/\s+/)
        let query = args.slice(1).join(" ")

        if (!query) {
            return message.channel.send("Che te canto?")
        }

        distube.play(voiceChannelBot || voiceChannel, query, {
            member: message.member,
            textChannel: message.channel,
            message: message
        })
    }

    if (message.content == "Gpause") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("Ah coglione devi sta in un canale")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Altri stronzi stanno già ad usa il bot fra")
        }

        try {
            distube.pause(message)
        } catch {
            return message.channel.send("Se non riproduci un cazzo che te metto in pausa? il cervello?")
        }

        message.channel.send("fra hai messo in pausa la canzone, ora sentiti una persona migliore")
    }

    if (message.content == "Gresume") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("Ah coglione devi sta in un canale")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Altri stronzi stanno già ad usa il bot fra")
        }

        try {
            distube.resume(message)
        } catch {
            return message.channel.send("forse te servirebbe fa riparti il cervello, qua non stai a riprodurre un cazzo")
        }

        message.channel.send("Bravo continua a senti sta merda")
    }

    if (message.content == "Gskip") {
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("Devi essere in un canale vocale")
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Qualun'altro sta già ascoltando della musica")
        }

        try {
            distube.skip(message)
                .catch(() => { return message.channel.send("Nessuna canzone in riproduzione o canzone successiva non presente") })
        } catch {
            return message.channel.send("Nessuna canzone in riproduzione o canzone successiva non presente")
        }

        message.channel.send("Song skipped")
    }
})

distube.on("addSong", (queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Song added")
        .addField("Song", song.name)

    queue.textChannel.send({ embeds: [embed] })
})

distube.on("playSong", (queue, song) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("Playing song...")
        .addField("Song", song.name)
        .addField("Requested by", song.user.toString())

    queue.textChannel.send({ embeds: [embed] })
})

distube.on("searchNoResult", (message, query) => {
    message.channel.send("Ma che canzone de merda è, mica l'ho trovata")
})