const Discord = require("discord.js")
const voiceDiscord = require("@discordjs/voice")
const inspirobot = require("inspirobot.js")
const fetch = require("node-fetch")
const insulter = require('insult');
const Chat = require("easy-discord-chatbot");
const chat = new Chat({ name: "Alpha Bot"})
const moment = require('moment');
const translate = require('@iamtraction/google-translate');
const client = new Discord.Client({ intents: 32767 });
const axios = require('axios');
const canvacord = require("canvacord")
const weather = require('weather-js')
const mongoose = require('mongoose')
const Levels = require('discord-xp')
const fs = require('fs');
const request = require("request");
const { SlashCommandBuilder } = require('@discordjs/builders');
//const UserSchema = new mongoose.Schema({
  //username: mongoose.SchemaTypes.String,
//})

Levels.setURL("mongodb+srv://imaammian123:9e7VALHF@cluster0.38fgy.mongodb.net/?retryWrites=true&w=majority")

const snipes = new Discord.Collection()
const editsnipes = new Discord.Collection()
const oldsnipes = new Discord.Collection()
const flowClient = new inspirobot.FlowClient()
const cooldowns = new Set()


var delete_time = 0;
var today = new Date();

var edit_time = 0;
var edit_today = new Date();

const die = ["die ","kms"," suicide"," die","suicide ","kill myself","kill myself "," kill myself", " kill myself ",]
const donut_noob = [
  "donut is a noob", "donut cringe", "get gud donut",
  "breathe if u hate donut", "Donuts 🥰  Donut 😐 ",
  "Donut is so annoying he makes his Happy Meal into a Sad Meal",
  "Donut you make onions cry",
  "Donut you bring me so much joy... when you go offline",
  "Donut you're so ugly your portraits hang themselves",
  "Donut is like a slinkie — not really good for much, but he brings a smile to my face when pushed down the stairs.",
  "Donut and Rapunzel have a lot in common. Only Rapunzel let down her hair while he let down everyone in his life",
  "Donut is like a cloud. When he disappear, it's a beautiful day",
  "What's the difference between Donut and eggs? Eggs get laid and Donut doesn't"
]
//alpha desp layan nix peepee floppa 
//const jeyyapi = ["!cow","!glitch","!scrapbook"]
/*const jeyyapi = ["/glitch","/boil","/earthquake","/hearts","/shear","/wave","/patpat","/burn","/shock","/bomb","/bonks","/explicit","/blur",
    "/lamp","/rain","/canny","/cartoon","/layers","/radiate","/shoot","/tv","/magnify","/print","/matrix","/sensitive","/dilate","/pattern","/logoff",
    "/ace","/gallery","/paparazzi","/balls","/equations","/half_invert","/roll","/clock","/warp","/ads","/optics","/abstract","/infinity","/bubble",
    "/cloth","/youtube", "/scrapebook", "/ace"]

const jeyyapi = ["!glitch","!boil","!earthquake","!hearts","!shear","!wave","!patpat","!burn","!shock","!bomb","!bonks","!explicit","!blur",
    "!lamp","!rain","!canny","!cartoon","!layers","!radiate","!shoot","!tv","!magnify","!print","!matrix","!sensitive","!dilate","!pattern","!logoff",
    "!gallery","!paparazzi","!balls",,"!half_invert","!roll","!clock","!warp","!ads","!optics","!abstract","!infinity","!bubble",
    "!cloth","!youtube", "!scrapebook","!cow","!cube"]*/


const jeyyapi = ["!glitch","!boil","!earthquake","!hearts","!shear","!wave","!patpat","!burn","!shock","!bomb","!bonks","!explicit","!blur",
"!lamp","!rain","!canny","!cartoon","!layers","!radiate","!shoot","!tv","!magnify","!print","!matrix","!sensitive","!dilate","!pattern","!logoff","!fire","!fan","!melt", "!cracks","!endless", "!bayer" , "!slice", "!spikes", "!blocks", "!phone", "!laundry", "!pizza", "!ripped", "!cinema", "!emojify", "!stretch", "!dots", "!tunnel", "!zonk", "!knit", "!plank", "!shred", "!liquefy", "!liquefy", "!spin", "!plates", "!plates", "!lines", "!ipcam", "!reflection" , "!stereo", "!kanye", "!letters", "!wiggle", "!tiles", "!billboard","!flag",
"!gallery","!paparazzi","!balls",,"!half_invert","!roll","!clock","!warp","!ads","!optics","!abstract","!infinity","!bubble",
"!cloth","!gameboy_camera", "!gameboy_camera", "!globe", "!pyramid", "!wall", "!paint", "!shine", "!neon", "!flush" ,"!youtube", "!scrapbook","!cow","!cube"]

let snipe_shortcut = ["320100972846120970", "705678629853724683", "220951538170855424", "300411278663614464", "810813249763147787"]
const pp = ["320100972846120970","551545596368912384","220951538170855424","190747796452671488","300411278663614464","810813249763147787"]
const alpha_snipe = ["lol","what u doing?","what u tryna snipe?","y","idk","hmmmm","sus","i cant be bothered","cap","suuuuuuure","bruh","too slow bruv","ion even know bruh","nah","nah","BRO","aint no way","fr"]

client.on("guildMemberAdd", async member => {
  if(member.guild.id !== "817355640375607297") return;
  const Channel = client.channels.cache.get("817359874182742038")
  const welcomeCard = new canvacord.Welcomer()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setGuildName("The Dark Side")
  .setAvatar(member.user.displayAvatarURL({format: "png"}))
  .setColor("title", "#6B2995")
  .setColor("username-box", "#6B2995")
  .setColor("discriminator-box", "#6B2995")
  .setColor("message-box", "#6B2995")
  .setColor("border", "#000000")
  .setColor("avatar", "#6B2995")
  //.setBackground("https://freepikpsd.com/file/2019/10/nice-background-png-2-Transparent-Images-Free.jpg")
  .setBackground("https://cdn.wallpapersafari.com/33/91/6Vhuy7.jpg")
  .setMemberCount(member.guild.memberCount) 
  Channel.send({content: member.user.toString() ,files: [await welcomeCard.build() ]})
  //let attachment = new Discord.MessageAttachment(await welcomeCard.build(),"welcome.png")
  //member.guild.channels.cache.get("817359874182742038").send(member.user.toString(), attachment)
})

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}
//type for activity is watching listening streaming and default is playing
client.on("ready", async() => {
  await mongoose.connect('mongodb+srv://imaammian123:9e7VALHF@cluster0.38fgy.mongodb.net/?retryWrites=true&w=majority',{}).then(
    console.log("connected to database")).catch((err) => console.log(error))
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("How Things Used To Be",{type:"LISTENING"});
})

client.on("messageDelete", async function(msg){
  if (msg.author.bot) return
  //console.log(msg.guildId) 987271991130214420
  if (msg.attachments.size==0){
    snipes.set(msg.guild.id, msg)

    today = new Date();
  
    del_minutes = today.getMinutes()
    del_seconds = today.getSeconds()
    if(today.getMinutes()<10){
      del_minutes = "0"+ today.getMinutes()
    }
    if(today.getSeconds()<10){
      del_seconds = "0"+ today.getSeconds()
    }
    delete_time = today.getHours() + ":" + del_minutes + ":" + del_seconds;
  }
  
  if(msg.guildId == 987271991130214420){
    const LogChannel = client.channels.cache.get("992023982423420948")
    const DeletedLog = new Discord.MessageEmbed()
    .setTitle("Deleted Message")
    .addField("Deleted By:", `${msg.author}`)
    .addField("Deleted In:", `${msg.channel}`)  
    //.addField("Content:", msg.content)
    .setColor("RANDOM")
    .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
    .setTimestamp() 
    .setImage(msg.attachments.first() ? msg.attachments.first().proxyURL : null)
    .setFooter({text: "User ID: " + msg.author.id})
    if(msg.content){
      DeletedLog.addField("Content:", msg.content)
    }
    LogChannel.send({embeds: [DeletedLog]});
  }
  //alpha server
  // let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null
  if(msg.guildId == 817355640375607297){
    const LogChannel = client.channels.cache.get("1038700671890882600")
    const DeletedLog = new Discord.MessageEmbed()
    .setTitle("Deleted Message")
    .addField("Deleted By:", `${msg.author}`)
    .addField("Deleted In:", `${msg.channel}`)  
    //.addField("Content:", msg.content)
    .setColor("RANDOM")
    .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
    .setTimestamp() 
    .setImage(msg.attachments.first() ? msg.attachments.first().proxyURL : null)
    .setFooter({text: "User ID: " + msg.author.id})
    if(msg.content){
      DeletedLog.addField("Content:", msg.content)
    }
    //console.log(msg.attachments.first().proxyURL)
    LogChannel.send({embeds: [DeletedLog]});
  }
  //snipes.set(msg.guild.id,{
    //content: msg.content,
    //author :msg.author.id,
    //iconURL: msg.author.displayAvatarURL({ dynamic: true}),
    //image: msg.attachments.first() ? msg.attachments.first().proxyURL : null
  //})
})

client.on("messageUpdate", async(oldmsg, newmsg) =>{
  if (newmsg.author.bot) return
  if (oldmsg.content.startsWith("https://")) return
  if (newmsg.content.startsWith("https://")) return
  editsnipes.set(newmsg.guild.id, newmsg)
  oldsnipes.set(oldmsg.guild.id, oldmsg)

  if(oldmsg.guildId == 987271991130214420){
    const LogChannel = client.channels.cache.get("992023982423420948")
    const EditedLog = new Discord.MessageEmbed()
    .setTitle("Edited Message")
    .addField("Edited By:", `${oldmsg.author}`)
    .addField("Edited In:", `${oldmsg.channel}`)  
    .addField("Original Message:", oldmsg.content)
    .addField("Edited Message:", newmsg.content)
    .setColor("RANDOM")
    .setThumbnail(oldmsg.author.displayAvatarURL({dynamic: true}))
    .setTimestamp() 
    .setFooter({text: "User ID: " + oldmsg.author.id})
    LogChannel.send({embeds: [EditedLog]});
  }
  
  edit_today = new Date();
  minutes = edit_today.getMinutes()
  seconds = edit_today.getSeconds()
  if(edit_today.getMinutes()<10){
    minutes = "0"+edit_today.getMinutes()
  }
  if(edit_today.getSeconds()<10){
    seconds = "0"+edit_today.getSeconds()
  }
  edit_time = edit_today.getHours() + ":" + minutes + ":" + seconds;
})


client.on("messageCreate", async msg => {
  message = msg
  if (msg.author.bot) return
  //if(msg.author.id == "810813249763147787") return
  //if(msg.author.id == "320100972846120970") return


  if(msg.guildId == 987271991130214420){
    const LogChannel = client.channels.cache.get("1008242276163653643")
    const DeletedLog = new Discord.MessageEmbed()
    .setTitle("Message sent")
    .addField("Sent By:", `${msg.author}`)
    .addField("Sent In:", `${msg.channel}`)  
    //.addField("Content:", msg.content)
    .setColor("RANDOM")
    .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
    .setTimestamp() 
    .setImage(msg.attachments.first() ? msg.attachments.first().proxyURL : null)
    .setFooter({text: "User ID: " + msg.author.id})
    if(msg.content){
      DeletedLog.addField("Content:", msg.content)
    }
    LogChannel.send({embeds: [DeletedLog]});
  }

  //if(msg.content.startsWith("!chat") || msg.content.startsWith("!c")){
    //let reply = await chat.chat(msg.content)
    //msg.channel.send(reply)
  //}
  /*
  if(msg.content.startsWith("!c")){
    const args = msg.content.slice(2);
      await axios.get(`http://api.brainshop.ai/get?bid=167153&key=jaAOaqtRFesnAkhm&uid=[uid]&msg=[${args}]`).then(res => {
        let data = res.data;
        let reply = data.cnt
        if(reply){
          msg.channel.send(reply).catch(error => {
            console.error(error)
          })
        }
      })
  }*/

  if(msg.channel.id == 987570997156802570 || msg.channel.id == 989469792027181097){
    try{
    const args = msg.content
      await axios.get(`http://api.brainshop.ai/get?bid=167153&key=jaAOaqtRFesnAkhm&uid=[uid]&msg=[${args}]`).then(res => {
        let data = res.data;
        let reply = data.cnt
        if(reply){
          msg.channel.send(reply).catch(error => {
            console.error(error)
          })
        }
      })
    }catch(error){
      console.error(error);
    }
  }

  if(msg.content.toLowerCase()=== "!snipe" || msg.content.toLowerCase()=== "pls snipe"|| msg.content.toLowerCase()=== "~snipe"){
    if(msg.author.id!= 705570989735542885){
      let snipe = snipes.get(msg.guild.id);
      if(!snipe) return msg.channel.send("There is nothing to snipe")
        const snipeEmbed = new Discord.MessageEmbed()
        .setTitle("Deleted Message")
        .setAuthor({name: `${snipe.author.tag}`, iconURL: snipe.author.displayAvatarURL({ dynamic: true})})
        //.setAuthor({name: `${snipe.author.tag}`, iconURL: snipe.iconURL}) 
        .setColor("RANDOM")
        .setDescription("`"+snipe.content+"`")
        .setFooter({text: "Message Deleted • " + delete_time})

        //if(snipe.image) snipeEmbed.setImage(snipe.image)
        msg.channel.send({embeds: [snipeEmbed]}).then((resultMessage) =>{
          snipes.set(msg.guild.id, null)
          
          //snipes.set(msg.guild.id,{
            //content: null,
            //author : null,
            //image: null
          //})
          if(msg.guildId == 947717227287810089){
            setTimeout(() => {
              resultMessage.delete();
            }, 5000);
          }
        })
    }
  }
  /*
  if(msg.content.toLowerCase()=== "!snipe" || msg.content.toLowerCase()=== "pls snipe"|| msg.content.toLowerCase()=== "~snipe"){
    let snipe = snipes.get(msg.guild.id);
    if(!snipe) return msg.channel.send("There is nothing to snipe")
    
    const snipeEmbed = new Discord.MessageEmbed()
    .setTitle("Deleted Message")
    .setAuthor({name: `peepee#3278`, iconURL: "https://images-ext-2.discordapp.net/external/5wefggPYZHosGL7aokfbUcGrFfH5ZweUM1dNedECI98/%3Fsize%3D4096/https/cdn.discordapp.com/avatars/810813249763147787/a_a4fbdf98ceacf55e77e51b124670021a.gif"})
    .setColor("RANDOM")
    .setDescription("`"+snipe.content+"`")
    .setFooter({text: "Message Deleted • " + delete_time})
    msg.channel.send({embeds: [snipeEmbed]})
    snipes.set(msg.guild.id, null)
  }*/

  if(msg.content.toLowerCase()=== "!editsnipe" || msg.content.toLowerCase()=== "pls editsnipe" || msg.content.toLowerCase()=== "!esnipe" || msg.content.toLowerCase()=== "pls esnipe"||msg.content.toLowerCase()=== "~esnipe" ||msg.content.toLowerCase()=== "~editsnipe" ){
    let editsnipe = editsnipes.get(msg.guild.id)
    let oldsnipe = oldsnipes.get(msg.guild.id)
    if(!editsnipe) return msg.channel.send("There is nothing to snipe")
    if(!oldsnipe) return msg.channel.send("There is nothing to snipe")
 
    const editsnipeEmbed = new Discord.MessageEmbed()
    .setAuthor({name:`${editsnipe.author.tag}`,iconURL: editsnipe.author.displayAvatarURL({ dynamic: true})})
    .setColor("RANDOM")
    .setFooter({text: "Message Edited • "+ edit_time})
    .addFields(
    {name: 'Original Message:',value: "`"+oldsnipe.content+"`"},
    {name: 'Edited Message:', value: "`"+editsnipe.content+"`"})
    msg.channel.send({embeds: [editsnipeEmbed]}).then((resultMessage) =>{
      editsnipes.set(msg.guild.id, null)
      oldsnipes.set(msg.guild.id, null)
      if(msg.guildId == 947717227287810089){
        setTimeout(() => {
          resultMessage.delete();
          }, 5000);
      }
    })
  }
    
  ///alpha  snipe and esnipe shortcut 
  if(msg.content.toLowerCase()=== "e"){
    if(snipe_shortcut.includes(msg.author.id)){
      let editsnipe = editsnipes.get(msg.guild.id)
      let oldsnipe = oldsnipes.get(msg.guild.id)
      if(!editsnipe) return msg.channel.send("There is nothing to snipe")
      if(!oldsnipe) return msg.channel.send("There is nothing to snipe")

      const editsnipeEmbed = new Discord.MessageEmbed()
      .setAuthor({name:`${editsnipe.author.tag}`,iconURL: editsnipe.author.displayAvatarURL({ dynamic: true})})
      .setColor("RANDOM")
      .setFooter({text: "Message Edited • "+ edit_time})
      .addFields(
      {name: 'Original Message:',value: "`"+oldsnipe.content+"`"},
      {name: 'Edited Message:', value: "`"+editsnipe.content+"`"})
      msg.channel.send({embeds: [editsnipeEmbed]}).then((resultMessage) =>{
        editsnipes.set(msg.guild.id, null)
        oldsnipes.set(msg.guild.id, null)
        if(msg.guildId == 947717227287810089){
          setTimeout(() => {
            resultMessage.delete();
          }, 5000);
        }
      })
    }
  }
/*
  if(msg.content.toLowerCase()=== "s"){ 
    if(snipe_shortcut.includes(msg.author.id)){
      let snipe = snipes.get(msg.guild.id);
      if(!snipe) return msg.channel.send("There is nothing to snipe")
        const snipeEmbed = new Discord.MessageEmbed()
        .setTitle("Deleted Message")
        .setAuthor({name: `${snipe.author.tag}`, iconURL: snipe.author.displayAvatarURL({ dynamic: true})})
        .setColor("RANDOM")
        .setDescription("`"+snipe.content+"`")
        .setFooter({text: "Message Deleted • " + delete_time})
        msg.channel.send({embeds: [snipeEmbed]}).then((resultMessage) =>{
          snipes.set(msg.guild.id, null)
          if(msg.guildId == 947717227287810089){
            setTimeout(() => {
              resultMessage.delete();
              }, 5000);
            }
        })
    }
  }*/

  if(msg.content.toLowerCase()=== "s"){ 
    fs.readFile('snipe.json', 'utf8', (err, data) => {
      const obj = JSON.parse(data);
      const snipe_list = obj.snipe_shortcut_json;

      if(snipe_list.includes(msg.author.id)){
        let snipe = snipes.get(msg.guild.id);
        if(!snipe) return msg.channel.send("There is nothing to snipe")
          const snipeEmbed = new Discord.MessageEmbed()
          .setTitle("Deleted Message")
          .setAuthor({name: `${snipe.author.tag}`, iconURL: snipe.author.displayAvatarURL({ dynamic: true})})
          .setColor("RANDOM")
          .setDescription("`"+snipe.content+"`")
          .setFooter({text: "Message Deleted • " + delete_time})
          msg.channel.send({embeds: [snipeEmbed]}).then((resultMessage) =>{
            snipes.set(msg.guild.id, null)
            if(msg.guildId == 947717227287810089){
              setTimeout(() => {
                resultMessage.delete();
                }, 5000);
              }
          })
      }
    });
    
  }
  
  ////////////////////// end of alpha shorcut 

  if (msg.content.toLowerCase() === "!inspire"|| msg.content.toLowerCase() === "~inspire") {
    getQuote().then(quote => msg.channel.send(quote))
  }

  if (msg.content.toLowerCase() === "!quote" || msg.content.toLowerCase() === "!q" || msg.content.toLowerCase() === "~q" || msg.content.toLowerCase() === "~quote" ) {
    inspirobot.generateImage().then(image => {
      message.channel.send(image)
    }).catch(error => {
      console.error(error)
    })
  }
  if (msg.content.toLowerCase() === "!ping" || msg.content.toLowerCase() === "~ping") {
    msg.channel.send("Calculating Ping...").then((resultMessage) =>{
      const ping =  resultMessage.createdTimestamp - msg.createdTimestamp
      resultMessage.edit(`Bot Latency: ${ping}, API Latency: ${client.ws.ping}`) 
      //resultMessage.delete()
      //message.channel.send(`Bot Latency: ${ping}, API Latency: ${client.ws.ping}`)
    })
  }
  //insult command using npm install insult
  if (msg.content.toLowerCase() === "!roast" || msg.content.toLowerCase() === "~roast") {
    msg.channel.send(insulter.Insult());
  }

  /*if ( msg.content.toLowerCase().startsWith("!pfp") || msg.content.toLowerCase().startsWith("~pfp")) {
    //const Target = msg.mentions.users.first() || msg.author
    const args = msg.content.slice(4);
    const mem = args[0]
    const Target = msg.guild.members.cache.get(mem)

    const Response = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({name: `${Target}\'s Avatar`}) 
    .setImage(Target.displayAvatarURL({ size: 4096, dynamic: true }))
    .setFooter({text: `Requested By ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
    msg.channel.send({embeds: [Response]});
  }*/
  /*
  if ( msg.content.toLowerCase().startsWith("!pfp") || msg.content.toLowerCase().startsWith("~pfp")) {
    const Target = msg.mentions.users.first() || msg.author

    const Response = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({name: `${Target.tag}\'s Avatar`}) 
    .setImage(Target.displayAvatarURL({ size: 4096, dynamic: true }))
    .setFooter({text: `Requested By ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
    msg.channel.send({embeds: [Response]});
  }*/
  if ( msg.content.toLowerCase().startsWith("!pfp") || msg.content.toLowerCase().startsWith("~pfp")) {
    const Target = msg.mentions.users.first() || client.users.cache.get(msg.content.slice(5)) || msg.author
    //let Target = msg.content.slice(5).length ? this.resolveUser(message.channel.guild, msg.content.slice(5)) : message.author;

    const Response = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({name: `${Target.username}\'s Avatar`, iconURL: Target.displayAvatarURL({ dynamic: true})})  
    .setImage(Target.displayAvatarURL({ size: 4096, dynamic: true }))
    .setFooter({text: `Requested By ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
    .addField('Image Link:', `[Pfp Link](${Target.displayAvatarURL({ size: 4096, dynamic: true, format: "png"})})`, true )
    msg.channel.send({embeds: [Response]});
  }


  if (msg.content.toLowerCase().startsWith("!user") || msg.content.toLowerCase().startsWith("~user")) {
    const Target = msg.mentions.users.first() || client.users.cache.get(msg.content.slice(6)) || msg.author
    const Member = msg.guild.members.cache.get(Target.id);
    //|| client.users.cache.get(message.slice(5))

    const Response = new Discord.MessageEmbed()
    .setAuthor({name: `${Target.username}`,iconURL: Target.displayAvatarURL({dynamic: true})})
    .setThumbnail(Target.displayAvatarURL({dynamic: true}))
    .setColor("NOT_QUITE_BLACK")
    .addField("UserID",`${Target.id}`, false)
    .addField("Roles", `${Member.roles.cache.size > 1 ? Member.roles.cache.filter(x => x.id !== Member.guild.id).map(r => r.toString()).join(', ') : 'No Roles'}`)
    //.addField("Roles", `${Member.roles.cache.size > 1 ? Member.roles.cache.map(r => r.toString()).join(', ').replace('@everyone','') : 'No Roles'}`)
    .addField("Server Member Since", `${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Member.joinedAt).startOf('day').fromNow()}`)
    .addField("Discord User Since", `${moment(Target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Target.createdAt).startOf('day').fromNow()}`)
    msg.channel.send({embeds: [Response]});
  }

  if (msg.content.toLowerCase() === "!help"  || msg.content.toLowerCase() === "~help") {
    const embed = new Discord.MessageEmbed()
    .setTitle("Help Commands")
    .setColor("RANDOM")
    .addField("EditSnipe", "~esnipe, ~editsnipe, !esnipe, !editsnipe, pls editsnipe or pls esnipe: Retrieve the last edited message")
    .addField("Snipe", "~snipe , !snipe or pls snipe: Retrieve the last deleted message")
    .addField("Quotes", "~q, ~quote, !q, !quote: Create an AI generated quote")
    .addField("Latency", "~ping or !ping: Check the bot latency ")
    .addField("Roast", "~roast or !roast: Create a roast")
    .addField("pfp", "~pfp, !pfp: To enlarge your profile picture, if you want to enlarge another users pfp use the prefix and @someone e.g. !pfp @alphabot")
    .addField("UserInfo", "~ui, ~user, !ui, !user: To get user info for userself (if you want to get info of another member do the prefix and tag someone e.g. ~user @theperson)")
    .addField("Say", "~say, !say: write the prefix and then type ur message after it (in the same message) and the bot will say whatever u have written ")
    .addField("PP", "~pp or !pp: To show ur schlong size")
    .addField("Translate", "~translate , !translate, ~t or !t: Type the prefix first and then your sentence \n e.g. !t 你好 -> Hello")
    .addField("Poll", "~poll or !poll: To use this use the prefix and (mention the channel u want the poll sent to)- (optional) then contents of the poll e.g. !poll #general am I smart? or !poll am i smart?")
    .addField("Note:", "Commands are not case sensitive")
    msg.channel.send({embeds: [embed]});
  }

  if (msg.content.toLowerCase().startsWith("!translate") || msg.content.toLowerCase().startsWith("~translate")){
    if(msg.content.length > 1900) return
    const message = msg.content;
    const args = message.slice(10);
    if(!args) return msg.channel.send("Please specify a text to translate");
    translate(args, { to: 'en' }).then(res => {
      msg.channel.send(res.text); 
    }).catch(err => {
      console.error(err);
    });
  }
  //shortcut for translate
  if ( msg.content.toLowerCase().startsWith("~t") || msg.content.toLowerCase().startsWith("!t")){
    if(msg.content.toLowerCase().startsWith("!translate") || msg.content.toLowerCase().startsWith("~translate") || msg.content.length > 1900) return
    else{
      const message = msg.content;
      const args = message.slice(2);
      if(!args) return msg.channel.send("Please specify a text to translate");
      translate(args, { to: 'en' }).then(res => {
        msg.channel.send(res.text); 
      }).catch(err => {
        console.error(err);
      });
    }
  }

  if (msg.content.toLowerCase().startsWith("!poll")|| msg.content.toLowerCase().startsWith("~poll")) {
    let pollChannel = msg.mentions.channels.first() || msg.channel;
    let pollDescription = msg.content.slice(5)
    if(!pollDescription) return msg.channel.send("Please specify poll content");
    let embedPoll = new Discord.MessageEmbed()
    .setTitle("😮 New Poll! 😮")
    .setDescription(pollDescription)
    .setColor("RANDOM")
    let msgEmbed = await pollChannel.send({embeds: [embedPoll]}); 
    await msgEmbed.react('👍')
    await msgEmbed.react('👎')
  }

  //trying to improve say command 
  if (msg.content.toLowerCase().startsWith("!say") || msg.content.toLowerCase().startsWith("~say")) {
    const message = msg.content;
    msg.delete().catch(O => {});
    const args = message.slice(4);
    msg.channel.send(args);
    return;
  } 
//second alpha rand is for justin compsci
  if (msg.content.toLowerCase().startsWith("!pp") ||msg.content.toLowerCase().startsWith("~pp")) {
    const Target = msg.mentions.users.first() || msg.author
    if(pp.includes(Target.id)){
        const alpharand = String(((Math.random() * (1 - 0.9) + 0.95)*9).toPrecision(3))
        msg.channel.send(alpharand + " inches")
      }
      else if(Target.id == 760442252262375434 || Target.id == 705678629853724683 ){
        const rand = String((Math.random()).toPrecision(3))
        msg.channel.send(rand + " inches")
      }
      else{
      const rand = String((Math.random()*9).toPrecision(3))
      msg.channel.send(rand + " inches")
      }
      
  }
  
  /// donut roast
  /*
  if (donut_name.some(word => msg.content.toLowerCase().includes(word))){
      const donut_roast = donut_noob[Math.floor(Math.random()*donut_noob.length)]
      const rand = Math.random()
      if(rand<0.3){
        msg.channel.send(donut_roast)
      }
  }*/
  /*if(msg.guildId == 987271991130214420){
    if (die.some(word => msg.content.toLowerCase().includes(word))){
      msg.channel.send("Don't die baby gorl")
    }
    if(msg.content == "die"){
      msg.channel.send("Don't die baby gorl")
    }
  }*/
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //this is the random stuff which can be deleted
  /*
  if (msg.content.toLowerCase() ==="hello") {
      msg.channel.send("Hello" +" "+ msg.author.username+"!")    
  }
  if (msg.content.toLowerCase().startsWith("hola")) {
      msg.channel.send("Hola" +" "+ msg.author.username+"!")    
  }
  if (msg.content.toLowerCase().startsWith("ola")) {
      msg.channel.send("Ola" +" "+ msg.author.username+"!")    
  }  


  if (msg.content.toLowerCase() == "rip") {
       msg.channel.send("💀")
  }

  if (msg.content.toLowerCase() == "hi") {
       //msg.reply("Hi")
       msg.channel.send("Hi" +" "+ msg.author.username+"!")
  }

   if (msg.content.toLowerCase() == "bye") {
       msg.channel.send("Good Bye" +" "+ msg.author.username+"!")
  }
  */

  if (msg.content.toLowerCase() == "good bot") {
      if(msg.author.id == 320100972846120970){
        msg.channel.send("Thanks Supreme Master" +" "+ msg.author.username+" :)")
      }
      else{
       msg.channel.send("Thanks" +" "+ msg.author.username+" :)")
      }
  }

  if (msg.content.toLowerCase() == "bad bot") {
      if(msg.author.id == 320100972846120970){
        msg.channel.send("Sorry Supreme Master" +" "+ msg.author.username)
      }
      else{
       msg.channel.send("Sorry" +" "+ msg.author.username)
      }
  }
  /*
  if (msg.content.toLowerCase() == "hey" ) {
       //msg.reply("Hey")
       msg.channel.send("Hey" +" "+ msg.author.username+"!")
  }
  if (msg.content.toLowerCase().startsWith("no one asked")) {
       //msg.reply("Hey")
       msg.channel.send("Actually I did")
  }*/
  if (msg.content.toLowerCase().startsWith("pat pat")) {
       //msg.reply("Hey")
       msg.channel.send("Woof")
  }



  if (msg.content.toLowerCase() == "!willy"){
    msg.channel.send("Thank you for your feedback. It really comes down to a balance between mastery and competency. I have no doubt that given enough time, the problems themselves can be solved (since they aren't exactly different to what you have been exposed to in the coursework), and this gives an indication of one's competency with the materials. But the ability to do so in a short-time on the other hand requires a different set of skills (in making optimal choices based on what is provided, and a good sense of foresight based on where you need to go) that demonstrates mastery of the materials and, as your peers have indicated, time management. \n \n In questions especially of multi-choice nature, it is hard to isolate the two skill sets (it is also infeasible for us to run more tests to isolate these factors) since all we can assess on are your final choices and this reveals very little about the argument formed to get to the choices. This means any inadequacy in time in this situation may suggests either (1) a lack of mastery, or (2) an excessively long test. however I hope you can see to isolate the issues it requires reflection from both sides (i.e., the instructors and the learners).\n \n To that end, you would have noticed the test this year is shorter than previous years' (35 questions down to 25 for the same amount of time) and this is based on my reflections of the past feedback while maintaining our expectations and standards. But I really do appreciate your comments and feedback, these are immensely useful. I understand that unfamiliar contexts tend to lower one's own confidence in their abilities, and hence the likelihood of errors, all while under a timing constraint. I will certainly reflect upon this and take this into consideration for any future assessments, but remember the important thing is that everyone is treated equally and assessed in fairness.\n \n Hope this helps.\n \n :willy:")
  }

  
  if(msg.author.id == 12){
    msg.reply("lol");
  }
  //if(msg.author.id == 787868705396621312){
    //msg.react("🪦");
 // }

  if(msg.author.id == 12){
    msg.react("💦");
    msg.react("❌");
    msg.react("🙃");
    msg.react("🤐");
    msg.react("😒");
    msg.react("🤥");
    msg.react("😔");
    msg.react("🤢");
    msg.react("🤮");
    msg.react("😵");
    msg.react("🤯");
    msg.react("🤠");
    //msg.react("🇼");
    //msg.react("🇭");
    //msg.react("🇴");
    //msg.react("🇨");
    //msg.react("🇦");
    //msg.react("🇷");
    //msg.react("🇪");
    //msg.react("🇸");
  }
  if(msg.content=="heroku testing"){
    msg.channel.send("heroku works")
  }

  if(msg.author.id == 12 || msg.author.id == 12|| msg.author.id == 12){
    //msg.channel.send( "seef said "+ msg.content);
    msg.delete();
  }
  if(msg.content == "https://tenor.com/view/jamescharlestiktok-gif-19999996"|| msg.content == "https://tenor.com/view/james-charles-renegade-james-charles-tiktok-tiktok-gif-18258171" || msg.content == "https://tenor.com/view/bubby-hey-bubby-hi-bubby-gif-19756899" ||  msg.content == "https://tenor.com/view/whats-behind-james-charles-barf-puke-ugh-gif-16161689"){ 
    msg.delete();
  }
  if(msg.content == "!joinvc"){
    const channel = msg.member.voice.channel;
    if(!channel) return msg.channel.send("Please join a voice channel to use this command")
    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,  
      guildId: msg.guild.id,
      adapterCreator: msg.guild.voiceAdapterCreator,
    })
  }
  
  if(msg.content == "!dog" ||msg.content == "!seef" ){
    axios.get("https://dog.ceo/api/breeds/image/random")
    .then((res) =>{
      //console.log(res.data.message)
      msg.channel.send(res.data.message)
    })
  }

  if(msg.content.startsWith("!weather")){
    var city = msg.content.slice(9);
    if(!city){
      msg.channel.send("Selecting Auckland as default city");
      //return msg.channel.send("Please provide a city name");
      city = "Auckland"
    }

    const options = {
      method: 'GET',
      url: 'http://api.weatherapi.com/v1/current.json?key=114557f6f1744cb3a4403405222007',
      params: {q: city}
    };

    axios.request(options).then(function (response) {
      //console.log(response.data);
      //console.log("_______________________________")
      //console.log(response.data.current.condition.icon.slice(2))
      
      const embed = new Discord.MessageEmbed()
      .setAuthor({ name: 'Weather Forecast', iconURL: 'http://blob.weather.microsoft.com/static/weather4/en-us/law/34.gif' })
      .setColor('RANDOM')
      .setThumbnail('http://blob.weather.microsoft.com/static/weather4/en-us/law/34.gif')
      .addField("Country", response.data.location.country, true)
      .addField("City", response.data.location.name, true)
      .addField("Sky condition", response.data.current.condition.text,true)
      .addField("Temperature", response.data.current.temp_c.toString() + "°C", true) 
      .addField("Windspeed", response.data.current.gust_kph.toString() +" km/h", true)
      .addField("Date & Time", response.data.location.localtime, true)
      msg.channel.send({embeds: [embed]});

    }).catch(err => {
      console.error(err);
      msg.channel.send("Error unable to determine location")
    });
  }
  if(msg.content=="!guildid"){
    msg.channel.send(msg.channel.guildId)
  }
  if (!cooldowns.has(msg.author.id)){
    const randomXp = Math.floor(Math.random()*13)+6
    const hasLeveledUp = await Levels.appendXp(msg.author.id,message.guild.id,randomXp)
    cooldowns.add(msg.author.id);
    setTimeout(() => cooldowns.delete(msg.author.id), 60000)
  }
  //if(hasLeveledUp){}
  if(msg.content =="!lb" || msg.content == "!leaderboard"){
    const rawLeaderboard = await Levels.fetchLeaderboard(msg.guild.id, 5);
    if (rawLeaderboard.length < 1) return msg.channel.send("Nobody's in leaderboard yet.");
    const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard);
    //const lb = leaderboard.map(e => `**#${e.position}** **${e.userID}**\nLevel: \`${e.level}\`\nXP: \`${(e.xp - Levels.xpFor(e.level))}/${(Levels.xpFor(e.level + 1) - Levels.xpFor(e.level))}\``)
    const lb = leaderboard.map(e => `\`${e.position}\` | ${e.username}#${e.discriminator} | level **${e.level}** | **${e.xp.toLocaleString()}** XP`).join("\n")
    const lbEmbed = new Discord.MessageEmbed()
    .setTitle(`Rank Leaderboard for ${msg.guild.name}`)
    .setColor("RED")
    .setThumbnail(msg.guild.iconURL({dynamic:true}))
    .setDescription(`${lb}`)
    .setTimestamp()
    msg.channel.send({embeds:[lbEmbed]});

  }


  if (msg.content.toLowerCase().startsWith("!rank")) {
    const Target = msg.mentions.users.first() || client.users.cache.get(msg.content.slice(6)) || msg.author
    if(Target.bot) return msg.channel.send("Bots have no rank :(")
    var user = await Levels.fetch(Target.id, msg.guild.id, true)

    if(!user){
      await Levels.createUser(Target.id, msg.guild.id);
      var user = await Levels.fetch(Target.id, msg.guild.id, true)
      if(!user) return msg.channel.send("user has no xp yet")
    }
    const neededXp = Levels.xpFor(parseInt(user.level)+1)
    const rank = new canvacord.Rank()
      .setAvatar(Target.displayAvatarURL({dynamic: false, format:'png'}))
      .setCurrentXP(user.xp)
      .setRequiredXP(neededXp)
      .setRank(user.position)
      .setStatus("offline")
      .setLevel(user.level)
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(Target.username)
      .setDiscriminator(Target.discriminator);
      msg.channel.send({files: [await rank.build()]})
  }

  if(msg.content.toLowerCase().startsWith("!comment")){
      var commentmsg =  msg.content.slice(9);
      var commentname = msg.author.username;
      fetch("https://cws.auckland.ac.nz/gas/api/Comment",{
        method: 'POST',
        body: JSON.stringify({
          comment:commentmsg,
          name:commentname
        }),
        headers:{
          "Content-Type":"application/json;"
        }
      })
      .then((response) => response.text())
      .then((data) => msg.channel.send("added message to database"));
  }

  if(msg.content.toLowerCase().startsWith("!cname")){
    var commentmsg =  msg.content.slice(7);
    const array = commentmsg.split(':');
    var commentname = array[0];
    var comment = array[1];
    fetch("https://cws.auckland.ac.nz/gas/api/Comment",{
      method: 'POST',
      body: JSON.stringify({
        comment:comment,
        name:commentname
      }),
      headers:{
        "Content-Type":"application/json;"
      }
    })
    .then((response) => response.text())
    .then((data) => msg.channel.send("added message to database"));
}
  if(msg.content.toLowerCase().startsWith("!anoncomment")){
    var commentmsg =  msg.content.slice(13);
    var commentname = "";
    fetch("https://cws.auckland.ac.nz/gas/api/Comment",{
      method: 'POST',
      body: JSON.stringify({
        comment:commentmsg,
        name:commentname
      }),
      headers:{
        "Content-Type":"application/json;"
      }
    })
    .then((response) => response.text())
    .then((data) => msg.channel.send("added message to database"));
}
  if(msg.content.toLowerCase() == "!showcomments"){
    msg.channel.send("https://cws.auckland.ac.nz/gas/api/Comments")
  }
  /*
  if(msg.content.toLowerCase() == "!rank"){
    const Target = msg.author
    const user = await Levels.fetch(Target.id, msg.guild.id)
    const neededXp = Levels.xpFor(parseInt(user.level)+1)
    if(!user) return msg.channel.send("User currently has no xp try sending some messages")
    const rank = new canvacord.Rank()
      .setAvatar(Target.displayAvatarURL({dynamic: false, format:'png'}))
      .setCurrentXP(user.xp)
      .setRequiredXP(neededXp)
      .setStatus("offline")
      .setLevel(user.level)
      .setProgressBar("#FFFFFF", "COLOR")
      .setUsername(Target.username)
      .setDiscriminator(Target.discriminator);

      //msg.channel.send({content: "test" ,files: [await rank.build()]})
      msg.channel.send({files: [await rank.build()]})
  }*/
  

  /*
  if(msg.content.startsWith("!weather")){
    const city = msg.content.slice(9);
    if(!city){
      return msg.channel.send("Please provide a city name");
    }
    weather.find({search: city, degreeType: 'C'}, function(err, result) {
      if(err) console.log(err)
      if(err) return msg.channel.send("An error occured :(")
      else if(result.length == 0){
        return msg.channel.send("The city you provided could not be found")
      }
      //console.log(city)
      let data = result[0]
      let time = `${data.current.date}, ${data.current.observationtime}`
      //console.log(data)

      const embed = new Discord.MessageEmbed()
      .setAuthor({ name: 'Weather Forecast', iconURL: data.current.imageUrl})
      .setColor('RANDOM')
      .setThumbnail(data.current.imageUrl)
      .addField("City", data.location.name, true)
      .addField("Sky condition", data.current.skytext,true)
      .addField("Temperature", data.current.temperature, true)
      .addField("Windspeed", data.current.windspeed, true)
      .addField("Timezone", data.location.timezone, true)
      .addField("Day", data.current.day, true)
      //.setFooter({text: time})
      .setTimestamp()
      msg.channel.send({embeds: [embed]});
    })
  }*/
 //817355640375607297
 /*
 const guild = client.guilds.cache.get(817355640375607297)
  let slashcommands
  if(guild){
    slashcommands = guild.commands
  }
  else{
  slashcommands?.create({
    name:'ping',
    description : "slash commands"
  })
  }
  client.on('interactionCreate', async (interaction) =>{
    if(!interaction.isCommand()) {
      interaction.reply({content:"ping"})
    }
    const {commandName, options} = 
      interaction
    if(commandName === "ping"){
      interaction.reply({content:"ping"})
    }
  })
 ////////////////////////////////////////////
 
 /////////////////////////////////////////////
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  client.on('interactionCreate', async (interaction) =>{
    await interaction.reply("Pinging bot...")
  })
  
  if (msg.content === '!makegif') {
    const user = msg.mentions.users.first();
    if (!user) {
      return msg.reply('Please mention a valid user');
    }
    const avatarUrl = user.displayAvatarURL({ format: 'png', size: 2048 });

    // Use a library such as Axios to retrieve the image from the URL.
    const response = await axios.get(avatarUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    // Use an image processing library to process the image as needed.
    // ...

    // Use a GIF creation library to generate the GIF.
    // ...

    // Send the generated GIF to the user.
    msg.channel.send({ files: [{ attachment: gifBuffer, name: 'pfp.gif' }] });
  }
  */
 if(msg.content.toLowerCase() =="!wffwefer3g3gcow"){
  const avatarUrl = msg.author.displayAvatarURL({ format: 'png', size: 2048 });
  api_url = `https://api.jeyy.xyz/image/cow?image_url=${avatarUrl}`
  console.log(api_url)
  let chunks = [];

  const params = {
    'image_url': avatarUrl,
  };
  //IMPORTAAAAAAAAAAAAAAANT ----------->   resp.data

  //const resp = await axios.get('https://api.jeyy.xyz/image/cow', {params});
  const resp = await axios.get(api_url)
  console.log(resp.data)
  //msg.channel.send(resp.data.content)
  //console.log(resp.content)
  //chunks.push(resp.content);
    //msg.channel.send(res)
  let buffer = Buffer.from(resp.data);
  msg.channel.send(({ files: [{ attachment: buffer, name: 'cow.gif' }] }))

  //.channel.send({ files: [{ attachment: buffer, name: 'image.gif' }] })


  //const buf = Buffer.from(resp.data, 'binary');
  //await msg.channel.send({files: [{attachment: buf, name: 'cow.gif'}]});


  //api_url = `https://api.jeyy.xyz/image/cow?image_url=${avatarUrl}`
  //https://api.jeyy.xyz/image/cow?image_url=https://cdn.discordapp.com/avatars/320100972846120970/a_88f3a35f9f2a4264adbce949909feb06.png?size=2048
  //fetch(api_url)
  //.then((response) => msg.channel.send(response))
  //console.log(avatarUrl)
  //msg.channel.send(avatarUrl)
  
 }
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
////////////JEYS APIS/////////////////////////////////////////

/*
if(msg.content.toLowerCase().startsWith("!heart_locket")){
  let otherTarget = ""
  let otherAvatarUrl = ""
  const Target = message.mentions.users.first() || message.author
  const userArray =  message.mentions.users.array();
  if(userArray.length>1){
    otherTarget = userArray[1]
    otherAvatarUrl = otherTarget.displayAvatarURL({ format: 'png', size: 2048 });
  }

  let avatarUrl = Target.displayAvatarURL({ format: 'png', size: 2048 });
  let api_url = "https://api.jeyy.xyz/image/"+ "endpoint" +"?image_url="+avatarUrl+"&image_url_2="+otherAvatarUrl
  //msg.channel.send(api_url)

  //const url = "https://api.jeyy.xyz/image/cow?image_url=https://cdn.discordapp.com/avatars/320100972846120970/a_88f3a35f9f2a4264adbce949909feb06.png?size=2048";
  const url = api_url

    request.get({ url, encoding: null }, (error, response, body) => {
      if (response.statusCode!=200) return msg.channel.send("Something went wrong try again later");
      msg.channel.send({ files: [{ attachment: body, name: "img.gif" }] });
    });
}*/

/*
THESE ONES DONT WORK 
if(msg.content.toLowerCase().startsWith("!ace")){
  processImage(msg,"ace")
}

if(msg.content.toLowerCase().startsWith("!equations")){
  processImage(msg,"equations")
}*/

/*
if(msg.content.toLowerCase().startsWith("!glitch")){
  processImage(msg,"glitch")
}

if(msg.content.toLowerCase().startsWith("!boil")){
  processImage(msg,"boil")
}

if(msg.content.toLowerCase().startsWith("!earthquake")){
  processImage(msg,"earthquake")
}
if(msg.content.toLowerCase().startsWith("!hearts")){
  processImage(msg,"hearts")
}

if(msg.content.toLowerCase().startsWith("!shear")){
  processImage(msg,"shear")
}
if(msg.content.toLowerCase().startsWith("!wave")){
  processImage(msg,"wave")
}

if(msg.content.toLowerCase().startsWith("!patpat")){
  processImage(msg,"patpat")
}

if(msg.content.toLowerCase().startsWith("!burn")){
  processImage(msg,"burn")
}

if(msg.content.toLowerCase().startsWith("!shock")){
  processImage(msg,"shock")
}

if(msg.content.toLowerCase().startsWith("!bomb")){
  processImage(msg,"bomb")
}

if(msg.content.toLowerCase().startsWith("!bonks")){
  processImage(msg,"bonks")
}
////////////
if(msg.content.toLowerCase().startsWith("!explicit")){
  processImage(msg,"explicit")
}
if(msg.content.toLowerCase().startsWith("!blur")){
  processImage(msg,"blur")
}
if(msg.content.toLowerCase().startsWith("!lamp")){
  processImage(msg,"lamp")
}
if(msg.content.toLowerCase().startsWith("!rain")){
  processImage(msg,"rain")
}
if(msg.content.toLowerCase().startsWith("!canny")){
  processImage(msg,"canny")
}
if(msg.content.toLowerCase().startsWith("!cartoon")){
  processImage(msg,"cartoon")
}
if(msg.content.toLowerCase().startsWith("!layers")){
  processImage(msg,"layers")
}
if(msg.content.toLowerCase().startsWith("!radiate")){
  processImage(msg,"radiate")
}
if(msg.content.toLowerCase().startsWith("!shoot")){
  processImage(msg,"shoot")
}
if(msg.content.toLowerCase().startsWith("!tv")){
  processImage(msg,"tv")
}
if(msg.content.toLowerCase().startsWith("!magnify")){
  processImage(msg,"magnify")
}
if(msg.content.toLowerCase().startsWith("!print")){
  processImage(msg,"print")
}
if(msg.content.toLowerCase().startsWith("!matrix")){
  processImage(msg,"matrix")
}
if(msg.content.toLowerCase().startsWith("!sensitive")){
  processImage(msg,"sensitive")
}
if(msg.content.toLowerCase().startsWith("!dilate")){
  processImage(msg,"dilate")
}
if(msg.content.toLowerCase().startsWith("!pattern")){
  processImage(msg,"pattern")
}
if(msg.content.toLowerCase().startsWith("!logoff")){
  processImage(msg,"logoff")
}
/////////////////////
if(msg.content.toLowerCase().startsWith("!fire")){
  processImage(msg,"fire")
}
if(msg.content.toLowerCase().startsWith("!fan")){
  processImage(msg,"fan")
}
if(msg.content.toLowerCase().startsWith("!melt")){
  processImage(msg,"melt")
}
if(msg.content.toLowerCase().startsWith("!cracks")){
  processImage(msg,"cracks")
}
if(msg.content.toLowerCase().startsWith("!endless")){
  processImage(msg,"endless")
}
if(msg.content.toLowerCase().startsWith("!bayer")){
  processImage(msg,"bayer")
}
if(msg.content.toLowerCase().startsWith("!slice")){
  processImage(msg,"slice")
}
if(msg.content.toLowerCase().startsWith("!spikes")){
  processImage(msg,"spikes")
}
if(msg.content.toLowerCase().startsWith("!blocks")){
  processImage(msg,"blocks")
}
if(msg.content.toLowerCase().startsWith("!phone")){
  processImage(msg,"phone")
}
if(msg.content.toLowerCase().startsWith("!laundry")){
  processImage(msg,"laundry")
}
if(msg.content.toLowerCase().startsWith("!pizza")){
  processImage(msg,"pizza")
}
if(msg.content.toLowerCase().startsWith("!ripped")){
  processImage(msg,"ripped")
}
if(msg.content.toLowerCase().startsWith("!cinema")){
  processImage(msg,"cinema")
}
if(msg.content.toLowerCase().startsWith("!emojify")){
  processImage(msg,"emojify")
}
if(msg.content.toLowerCase().startsWith("!stretch")){
  processImage(msg,"stretch")
}
if(msg.content.toLowerCase().startsWith("!dots")){
  processImage(msg,"dots")
}
if(msg.content.toLowerCase().startsWith("!tunnel")){
  processImage(msg,"tunnel")
}
if(msg.content.toLowerCase().startsWith("!zonk")){
  processImage(msg,"zonk")
}
if(msg.content.toLowerCase().startsWith("!knit")){
  processImage(msg,"knit")
}
if(msg.content.toLowerCase().startsWith("!plank")){
  processImage(msg,"plank")
}
if(msg.content.toLowerCase().startsWith("!shred")){
  processImage(msg,"shred")
}
if(msg.content.toLowerCase().startsWith("!liquefy")){
  processImage(msg,"liquefy")
}
if(msg.content.toLowerCase().startsWith("!liquefy")){
  processImage(msg,"poly")
}
if(msg.content.toLowerCase().startsWith("!spin")){
  processImage(msg,"spin")
}
if(msg.content.toLowerCase().startsWith("!plates")){
  processImage(msg,"plates")
}
if(msg.content.toLowerCase().startsWith("!plates")){
  processImage(msg,"lsd")
}
if(msg.content.toLowerCase().startsWith("!lines")){
  processImage(msg,"lines")
}
if(msg.content.toLowerCase().startsWith("!ipcam")){
  processImage(msg,"ipcam")
}
if(msg.content.toLowerCase().startsWith("!reflection")){
  processImage(msg,"reflection")
}
if(msg.content.toLowerCase().startsWith("!stereo")){
  processImage(msg,"stereo")
}
if(msg.content.toLowerCase().startsWith("!kanye")){
  processImage(msg,"kanye")
}
if(msg.content.toLowerCase().startsWith("!letters")){
  processImage(msg,"letters")
}
if(msg.content.toLowerCase().startsWith("!wiggle")){
  processImage(msg,"wiggle")
}
if(msg.content.toLowerCase().startsWith("!tiles")){
  processImage(msg,"tiles")
}

if(msg.content.toLowerCase().startsWith("!billboard")){
  processImage(msg,"billboard")
}
if(msg.content.toLowerCase().startsWith("!flag")){
  processImage(msg,"flag")
}







if(msg.content.toLowerCase().startsWith("!gallery")){
  processImage(msg,"gallery")
}
if(msg.content.toLowerCase().startsWith("!paparazzi")){
  processImage(msg,"paparazzi")
}
if(msg.content.toLowerCase().startsWith("!balls")){
  processImage(msg,"balls")
}

if(msg.content.toLowerCase().startsWith("!half_invert")){
  processImage(msg,"half_invert")
}
if(msg.content.toLowerCase().startsWith("!roll")){
  processImage(msg,"roll")
}
if(msg.content.toLowerCase().startsWith("!clock")){
  processImage(msg,"clock")
}
if(msg.content.toLowerCase().startsWith("!warp")){
  processImage(msg,"warp")
}
if(msg.content.toLowerCase().startsWith("!ads")){
  processImage(msg,"ads")
}
if(msg.content.toLowerCase().startsWith("!optics")){
  processImage(msg,"optics")
}
if(msg.content.toLowerCase().startsWith("!abstract")){
  processImage(msg,"abstract")
}
if(msg.content.toLowerCase().startsWith("!infinity")){
  processImage(msg,"infinity")
}
if(msg.content.toLowerCase().startsWith("!bubble")){
  processImage(msg,"bubble")
}
if(msg.content.toLowerCase().startsWith("!cloth")){
  processImage(msg,"cloth")
}
if(msg.content.toLowerCase().startsWith("!gameboy_camera")){
  processImage(msg,"gameboy_camera")
}
if(msg.content.toLowerCase().startsWith("!gameboy_camera")){
  processImage(msg,"ripple")
}
if(msg.content.toLowerCase().startsWith("!globe")){
  processImage(msg,"globe")
}

if(msg.content.toLowerCase().startsWith("!cow")){
  processImage(msg,"cow")
}
if(msg.content.toLowerCase().startsWith("!pyramid")){
  processImage(msg,"pyramid")
}
if(msg.content.toLowerCase().startsWith("!wall")){
  processImage(msg,"wall")
}
if(msg.content.toLowerCase().startsWith("!cube")){
  processImage(msg,"cube")
}
if(msg.content.toLowerCase().startsWith("!paint")){
  processImage(msg,"paint")
}
if(msg.content.toLowerCase().startsWith("!shine")){
  processImage(msg,"shine")
}
if(msg.content.toLowerCase().startsWith("!neon")){
  processImage(msg,"neon")
}
if(msg.content.toLowerCase().startsWith("!flush")){
  processImage(msg,"flush")
}
if(msg.content.toLowerCase().startsWith("!scrapbook")){
  processImage(msg,"scrapbook")
}
*/
///////////////////////////////////////////////////////////////////////////////////
///////// ADD AND REMOVE PEOPLE FROM SNIPE SHORTCUT USING JSON FILE////////////////
///////////////////////////////////////////////////////////////////////////////////
if(msg.content.toLowerCase().startsWith("!add")){
  if(msg.author.id == 320100972846120970){
    fs.readFile('snipe.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        msg.channel.send("something went wrong")
        return;
      }
      const obj = JSON.parse(data);
      
      if(!client.users.cache.get(msg.content.slice(5))){
        return msg.channel.send("please provide a valid user ID")
      }
      let name = client.users.cache.get(msg.content.slice(5)).username

      if(obj.snipe_shortcut_json.includes(msg.content.slice(5))){
        return msg.channel.send(`${name} already has snipe shortcut`)
      }
      obj.snipe_shortcut_json.push(msg.content.slice(5));

      fs.writeFile('snipe.json', JSON.stringify(obj), (err) => {
        if (err) {
          console.error(err);
          msg.channel.send("something went wrong")
          return;
        }
        msg.channel.send(`${name} added to snipe shortcut successfully!`);
      });
    });
  }
  else{
    msg.channel.send('You do not have permission for this command')
  }
}

if(msg.content.toLowerCase().startsWith("!remove")){
  const valueToRemove = msg.content.slice(8)
  if(!client.users.cache.get(valueToRemove)){
    return msg.channel.send("please provide a valid user ID")
  }
  const Target = client.users.cache.get(valueToRemove)
  let name = Target.username

  if(msg.author.id == 320100972846120970){
    fs.readFile('snipe.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        msg.channel.send("something went wrong")
        return;
      }

      const jsonObject = JSON.parse(data);
      const updatedArray = jsonObject.snipe_shortcut_json.filter(value => value !== valueToRemove);
      jsonObject.snipe_shortcut_json = updatedArray;
      const updatedJsonString = JSON.stringify(jsonObject, null, 2);

      fs.writeFile('snipe.json', updatedJsonString, 'utf8', err => {
        if (err) throw err;
        msg.channel.send(`${name} removed from snipe shortcut.`);
      });
    });
  }
  else{
    msg.channel.send(`${name} you do not have permission for this command`)
  }
}
//SHOW PEOPLE WHO HAVE SNIPE SHORTCUT
if(msg.content.toLowerCase() == "!snipelist"){
  fs.readFile('snipe.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      msg.channel.send("An error occured")
      return;
    }
    const obj = JSON.parse(data);
    const list = obj.snipe_shortcut_json;
    let snipe_list_names = new Array();

    for(let i=0; i<list.length;i++){
      let Target =  client.users.cache.get(list[i])
      let name = Target.username
      if(list[i] == "300411278663614464"){
        name = "nix"
      }
      snipe_list_names.push(name);
    }
    
    const Response = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("snipe list users")
    .addField("\n", snipe_list_names.join(", "))
    .setFooter({text: `Requested By ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
    msg.channel.send({embeds: [Response]}); 
    //msg.channel.send(snipe_list_names.join(", "))
  });
}

if(msg.content.toLowerCase() == "!jeyy" || msg.content.toLowerCase() == "!image"){
  const Response = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Image manipulation commands")
    .addField("\n", jeyyapi.join(", "))
    .setFooter({text: `Requested By ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
    msg.channel.send({embeds: [Response]});
}

if(jeyyapi.includes(msg.content.toLowerCase().split(" ")[0])){
  let endpointName = msg.content.toLowerCase().split(" ")[0].slice(1)
  processImage(msg, endpointName)
}

function processImage(message, endpoint) {
  const Target = message.mentions.users.first() || client.users.cache.get(message.content.split(" ")[1]) || message.author

  let avatarUrl = Target.displayAvatarURL({ format: 'png', size: 2048 });
  let api_url = "https://api.jeyy.xyz/image/"+ endpoint +"?image_url="+avatarUrl
  
  const url = api_url
    request.get({ url, encoding: null }, (error, response, body) => {
      if (response.statusCode!=200) return msg.channel.send("Something went wrong try again later");
      msg.channel.send({ files: [{ attachment: body, name: "img.gif" }] });
    });
}

if(msg.content.startsWith("!urban")){
  const word = msg.content.slice(7)

  const Dictionary = new Discord.MessageEmbed()
  .setTitle("Urban Dictionary")
  .addField(`Word: ${word}`, ' ') 
  .addField("Definition:", ' ')  
  .setColor("RANDOM")
  .setTimestamp() 
  .setFooter({text: `Requested By ${msg.author.tag}`, iconURL: msg.author.displayAvatarURL({dynamic: true})})
  
  const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`)
  const {list} = await response.json()
  //console.log(list)

  if(list.length ==0){
    return msg.channel.send(`The word ${word} does not exist`)
  }
  for(let i=0;i<list.length;i++){
    if(list[i].definition.length <1024){
      Dictionary.addField("\n",list[i].definition ) 
    }
  }
  msg.channel.send({embeds: [Dictionary]});
}

})

//alpha bot token
client.login("ODg3MTYyMjg2MzQxNTEzMzE2.GL_CMK.ifCG4RtXIMaI14jevwD3tv7iC7rCcbhtSknq14")

//beta bot token  
//client.login("ODg3NjY4ODQyOTc1ODY2ODkx.GPOyBw.lrOSm0BfiQBEyCrZ-i2l4nfDKMkPq-ZZkTsjq0")  


// client.channels.cache.get("").send
// channel = client.channels.cache.get("")

/*
if (msg.content.toLowerCase() === "!inspire"|| msg.content.toLowerCase() === "~inspire") {
  getQuote().then(quote => msg.channel.send(quote))
}

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}
*/