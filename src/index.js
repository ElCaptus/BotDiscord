const { default: Collection } = require('@discordjs/collection');
const {Client, MessageEmbed}= require('discord.js');
const { parse } = require('dotenv-flow');
const { moveMessagePortToContext } = require('worker_threads');
const client = new Client();
const cumples = require(`${__dirname}/cumples.js`);
const ytdl = require('ytdl-core-discord'); //para resproducir musica en un futuro

require('dotenv-flow').config();

const config={
    token: process.env.TOKEN,
    prefix: process.env.prefix
}


client.on('ready', () => {
    console.log(`Bot ready as ${client.user.tag}`.green);
    client.user.setStatus('online');
});


client.on('message', async (message) => {
    console.log(msg.content.grey);
    //MODERATORS ONLY
    //ADMINS ONLY
    
    if(message.member._roles.includes('753719262601936942')){
        
        //Read all the channel trying to add biths
        if(message.content ==`!cumpleactualizar`){
            cumples.actualizarDB(message);
        }


         //add births sent by parameter to the db
        if(message.content.startsWith('!cumpleadd')){
            cumples.addCumple(message.content.slice(11));
        }


         //DELETE THE DATABASE                                                          WARNING
        if(message.content == '!cumpleFormat'){
            cumples.formatDB();
        }


         //Prints every birth
        if(message.content.startsWith('!cumplesimprimir')){
            cumples.toString(message);
        }

        //Delets messages                                                               WARNING
        if (message.content.startsWith('!clear')) {
            //divide el comando del numero de mensajes a borrar
            var arrayComando = message.content.split(' ');
            //si no pone numero borra 10 mensajes automaticamente (a demas del mensaje del comando)
            var limitedTo = 11;
            if(arrayComando.length > 1){
                //si llega por parametro una letra en vez de numero se queda en 0
                limitedTo = 0;
                limitedTo = parseInt(arrayComando[1])+1;
            }
            //selecciona la cantidad de mensajes
            const fetched = await message.channel.messages.fetch({limit : limitedTo });
            //borra todos los mensajes seleccionados
            message.channel.bulkDelete(fetched);
            console.log('msgs deleted'.green);
        }
    }
});



client.login(config.token);
