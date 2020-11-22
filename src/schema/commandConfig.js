const { TwitchApi, } = require('../js/twitchLib',);
const twitchApi = new TwitchApi();
const wxApi = require('../js/weatherApi',);

/**
 * @todo permissions
 * //permission 0 == all, 1 == mod, 2 == author, others vary from 11 to 20
 */

const config = {
    commands : [
        {
            commandString    : 'paolo',
            commandType      : 'defaults',
            isCommandActive  : true,
            isCoolDownActive : false,
            permissions      : 0,
            commandFunction  : async function(client, channel,){
                try {
                    let res = await twitchApi.getUser();
                    res = JSON.parse(res,);
                    console.log(res,);
                    if (res.data[0] !== undefined){
                        client.say(channel, res.data[0].description,);
                    } else if (res.message !== undefined){
                        throw (res.message);
                    } else throw ('Unknown Error on the loop not OK');
                } catch (error) {
                    client.say(channel, error,);
                }
            },
        },
        {
            commandString    : 'social',
            commandType      : 'defaults',
            isCommandActive  : true,
            isCoolDownActive : false,
            permissions      : 0,
            commandFunction  : async function(client, channel,){
                client.say(channel, 'Socials link tbh use !social',);

            },
        },
        {
            commandString    : 'stick',
            commandType      : 'defaults',
            isCommandActive  : true,
            isCoolDownActive : false,
            permissions      : 0,
            commandFunction  : async function(client, channel,){
                client.say(channel, 'Stick link tbh use !stick',);
            },
        },
        {
            commandString    : 'tutorials',
            commandType      : 'defaults',
            isCommandActive  : true,
            isCoolDownActive : false,
            permissions      : 0,
            commandFunction  : async function(client, channel,){
                client.say(channel, 'Tutorials link tbh use !social to get my Youtube Channel',);
            },
        },
        {
            commandString    : 'discord',
            commandType      : 'defaults',
            isCommandActive  : true,
            isCoolDownActive : false,
            permissions      : 0,
            commandFunction  : async function(client, channel,){
                client.say(channel, 'Discord link tbh use !discord',);
            },
        },
        {
            commandString    : 'donate',
            commandType      : 'defaults',
            isCommandActive  : true,
            isCoolDownActive : false,
            permissions      : 0,
            commandFunction  : async function(client, channel,){
                client.say(channel, 'Il link per le donazioni è streamlabs.com/paolom346_/tip Grazie per il supporto !!',);
            },
        },
        {
            commandString    : 'version',
            commandType      : 'debug',
            isCommandActive  : true,
            isCoolDownActive : false,
            permissions      : 0,
            commandFunction  : async function(client, channel,){
                client.say(channel, 'Bot version returned: '+ process.env.APP_VERSION+ ' permissions: 0',);
            },
        },
        {
            commandString    : 'metar',
            commandType      : 'weather',
            isCommandActive  : true,
            isCoolDownSet    : true,
            isCoolDownActive : false,
            coolDownTime     : 60000,
            permissions      : 0,
            commandFunction  : async function(client, channel, icao,){
                console.log('Called with icao: '+icao,);
                if ( icao !== undefined && icao.length === 4 ){
                    console.log('Called with icao: '+icao,);
                    let response  = await  wxApi.getMetarByIcao(icao,);
                    console.log(response,);
                    response = JSON.parse(response,);
                    client.say(channel, response.data[0].raw_text,);
                    if (this.isCoolDownActive ===  false && this.isCoolDownSet === true ){
                        this.isCoolDownActive = true;
                        setTimeout(() => {
                            this.isCoolDownActive = false;
                            console.log('Out from cooldown',);
                        }, parseInt(this.coolDownTime,),);
                    }
                } else client.say(channel, 'Invalid  Args [SyntaxError] invalid argumet at position 1',);
            },
        },
        {
            commandString    : 'taf',
            commandType      : 'weather',
            isCommandActive  : true,
            isCoolDownSet    : true,
            isCoolDownActive : false,
            coolDownTime     : 30000,
            permissions      : 0,
            commandFunction  : async function(client, channel, icao,){
                console.log('Called with icao: '+icao,);
                if ( icao !== undefined && icao.length === 4 ){
                    console.log('Called with icao: '+icao,);
                    let response  = await  wxApi.getTafByIcao(icao,).catch((e,) => { console.log(e,); },);
                    response = JSON.parse(response,);
                    client.say(channel, response.data[0].raw_text,);
                    if (this.isCoolDownActive ===  false && this.isCoolDownSet === true ){
                        this.isCoolDownActive = true;
                        setTimeout(() => {
                            this.isCoolDownActive = false;
                            console.log('Out from cooldown',);
                        }, parseInt(this.coolDownTime,),);
                    }
                } else client.say(channel, 'Invalid  Args [SyntaxError] invalid argumet at position 1',);
            },
        },
    ],
};

exports.configData = config;
