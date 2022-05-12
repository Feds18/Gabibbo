const Discord = require('discord.js');
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] //Aggiungere GUILD_VOICE_STATES
})

client.login("OTczOTcyODg5MTg5NjEzNjA4.GeIv7d.3NzHwRYfyOtqzvpyMZbaRdgxMO5xarpj6KIa4Y");

client.on("ready", () => {
    console.log("ONLINE");
})

//INSULTI AI BOYS

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

const {MessageButton, MessageActionRow} = require("discord-buttons");
const { GuildScheduledEventPrivacyLevels } = require('discord.js/typings/enums');

let embed = new Discord.MessageEmbed()
    .setColor("423189")
    .setTitle("te sto a canta...")
        .addField(song.name)
        .addField("Richiesta da sto coglione:", song.user.toString())
    .setThumbnail("https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2F3sPmAFsadvo%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3sPmAFsadvo&tbnid=9hT_yp2Xr_w6tM&vet=12ahUKEwiuxK_Iq9r3AhUP8LsIHQpDDwEQMygOegUIARDxAQ..i&docid=nlUzIgEJkPg9hM&w=1280&h=720&q=gabibbo&client=opera-gx&ved=2ahUKEwiuxK_Iq9r3AhUP8LsIHQpDDwEQMygOegUIARDxAQ")
    .setFooter("Er gabibbo è sempre a tua disposizione", "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2F3sPmAFsadvo%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D3sPmAFsadvo&tbnid=9hT_yp2Xr_w6tM&vet=12ahUKEwiuxK_Iq9r3AhUP8LsIHQpDDwEQMygOegUIARDxAQ..i&docid=nlUzIgEJkPg9hM&w=1280&h=720&q=gabibbo&client=opera-gx&ved=2ahUKEwiuxK_Iq9r3AhUP8LsIHQpDDwEQMygOegUIARDxAQ")
    .setTimestamp();

client.on("message", (message) => {
    message.channel.send(embed)
})




//REPARTO MUSICA

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
        let button1 = new Discord.MessageButton()
        .setLabel("PAUSE")
        .setStyle("PRIMARY")
        .setCustomId("idPAUSE")
        let button2 = new Discord.MessageButton()
        .setLabel("RESUME")
        .setStyle("SUCCESS")
        .setCustomId("idRESUME")
        let button3 = new Discord.MessageButton()
        .setLabel("STOP")
        .setStyle("DANGER")
        .setCustomId("idSTOP")
        let button4 = new Discord.MessageButton()
        .setLabel("SKIP")
        .setStyle("SECONDARY")
        .setCustomId("idSKIP")
        let row = new Discord.MessageActionRow()
           .addComponents(button1)
           .addComponents(button2)
           .addComponents(button3)
           .addComponents(button4)
       
        message.channel.send({embdes: [embed], components: [row]})
    }

client.on("interactionCreate", interaction =>{
    if(interaction.isButton()){
    if(interaction.customId == "idPAUSE"){
        button.reply.defer()
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("Ah coglione devi sta in un canale")
            .setDisabled()
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Altri stronzi stanno già ad usa il bot fra")
            .setDisabled()
        }

        try {
            distube.pause(message)
        } catch {
            return message.channel.send("Se non riproduci un cazzo che te metto in pausa? il cervello?")
            .setDisabled()
        }

        message.channel.send("fra hai messo in pausa la canzone, ora sentiti una persona migliore")
    }
    if(interaction.customId == "idRESUME"){
        button.reply.defer()
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) {
            return message.channel.send("Ah coglione devi sta in un canale")
            .setDisabled()
        }

        const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return message.channel.send("Altri stronzi stanno già ad usa il bot fra")
            .setDisabled()
        }

        try {
            distube.resume(message)
        } catch {
            return message.channel.send("forse te servirebbe fa riparti il cervello, qua non stai a riprodurre un cazzo")
            .setDisabled()
        }

        message.channel.send("Bravo continua a senti sta merda")
}
    if(interaction.customId == "idSTOP"){
        button.reply.defer()
            const voiceChannel = message.member.voice.channel
            if (!voiceChannel) {
                return message.channel.send("Devi essere in un canale vocale")
                .setDisabled()
            }
    
            const voiceChannelBot = message.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
            if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
                return message.channel.send("Altri stronzi stanno già ad usa il bot fra")
                .setDisabled()
                
            }
    
            try {
                distube.stop(message)
                    .catch(() => { return message.channel.send("Se non stai a senti un cazzo che te stoppo?") })
            } catch {
                return message.channel.send("Se non stai a senti un cazzo che te stoppo?")
            }
    
            message.channel.send("Bravo ora hai fermato la canzone...")
        }
    if(interaction.customId == "idSKIP"){
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
    }
})

})

distube.on("searchNoResult", (message, query) => {
    message.channel.send("Ma che canzone de merda è, mica l'ho trovata")
})

client.on("message", (message) => {
    if(message.content.startsWith("!clear")){
        if(message.member.hasPermission("MANAGE_MESSAGES")){
             var count = message.content.slice(7);
             count = parseInt(count);
             if(!count){
                 message.channel.send("ma che cazzo hai scritto");
                 return
             } 
             message.channel.bulkDelete(count, true);

        }
        else{
            message.channel.send("Non puoi usare il comando coglione");
            message.channel.send("Ho atomizzato" + count + "messaggi di merda")
            .then(msg=>{
                msg.delete({timeout:2000})
            })
        }
    }
})

