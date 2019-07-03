//Node Packages
const discord = require('discord.js');
const fs = require('fs');

//config files
const botconfig = require('./botconfig.json');

//create bot
const bot = new discord.Client({disableEveryone: true});

//Initialise queue Variable
const queue = new Map();

//command handler
bot.commands = new discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if(err)console.log(err);
    var jsfile = files.filter(f => f.split('.').pop() === 'js');
    global.jsfile = jsfile;
    if(jsfile.lenght <= 0){
        return(console.log('ERROR: No Comamnds Found.'));
    }
    jsfile.forEach((f, i) => {
        var props = require(`./commands/${f}`);
        console.log(`Success: ${f} Loaded`);
        if(props.help && props.help.name && props.help.description){
            bot.commands.set(props.help.name, props)
        } else {
            console.log(`ERROR: ${f} Doesn't contain ether a props.help.name or props.help.description`);
        }
    });
});

//Predefined Functions
function serverCount(){
    var count = 0;
    bot.guilds.forEach((guild) => {
        count += 1;
    });
    return(count)
}

function servers(){
    bot.guilds.forEach((guild)=> {
        console.log(` - ${guild.name}`);
    });
    return;
}

//ready Function
bot.on('ready', async () =>  {
    console.log(`${bot.user.username} is Online`);
    bot.user.setActivity(`Prefix: ${botconfig.prefix} | Server Count: ${serverCount()}`);
    console.log('Servers:')
    servers();
});

//Messages (server) function
bot.on('message', async (message) => {
    if(message.author.bot || message.channel.type === 'dm'){return;}
    var prefix = botconfig.prefix;
    var msgAry = message.content.split(' ');
    var cmd = msgAry[0].toLowerCase();
    var args = msgAry.slice(1);
    var ops = {
        DevID: '',
        BotID: '',
        queue: queue
    }
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(cmd[0] === prefix){
        if(commandFile)(commandFile.run(bot,message,args,ops));
    }
});

//Messages (DMs) function


//Server Join Function


//Server Leave Function


//Login
bot.login(botconfig.token);