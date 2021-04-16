// File name: "ping.js"
// Folder "./commands"
const request = require('request');

module.exports = {
    name: 'Five upcoming launches', // Optional
    category: 'Launch monitoring',
    description: 'This command shows informations for 5 upcoming start (using fdo.rocketlaunch.live API)', // Required for slash commands
    commands: ['ll'], // Optional
    aliases: ['ll'], // Optional
    callback: ({ message }) => {
        message.channel.startTyping()
        var options = {
            url: 'https://fdo.rocketlaunch.live/json/launches/next/5',
            headers: {
              'User-Agent': 'IToncek'
            }
          };
        request(options, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var info = JSON.parse(body)
        const embed = {
            "title": "Next five launches",
            "description": "Brief information for five upcoming launches",
            "color": "ffff00",
            "footer": {
                "icon_url": "https://pbs.twimg.com/profile_images/1042788156712607746/jfbcDLeU_400x400.jpg",
                "text": "Data by RocketLaunch.Live"
            },
            "fields": [
              {
                "name": "***Launch 1***",
                "value": "*Name:* " + info.result[0].name + "\n*Rocket*: " + info.result[0].vehicle.name + "\n*Launch window opening:* " + info.result[0].win_open
              },
              {
                "name": "***Launch 2***",
                "value": "*Name:* " + info.result[1].name + "\n*Rocket*: " + info.result[1].vehicle.name + "\n*Launch window opening:* " + info.result[1].win_open
              },              
              {
                "name": "***Launch 3***",
                "value": "*Name:* " + info.result[2].name + "\n*Rocket*: " + info.result[2].vehicle.name + "\n*Launch window opening:* " + info.result[2].win_open
              },
              {
                "name": "***Launch 4***",
                "value": "*Name:* " + info.result[3].name + "\n*Rocket*: " + info.result[3].vehicle.name + "\n*Launch window opening:* " + info.result[3].win_open
              },
              {
                "name": "***Launch 5***",
                "value": "*Name:* " + info.result[4].name + "\n*Rocket*: " + info.result[4].vehicle.name + "\n*Launch window opening:* " + info.result[4].win_open
              },
            ]
          };
          message.channel.send({ embed });
          message.channel.stopTyping()
    })}}