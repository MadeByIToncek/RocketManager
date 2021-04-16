// File name: "ping.js"
// Folder "./commands"
const request = require('request');
const fahrenheitToCelsius = require('fahrenheit-to-celsius');

function logo (info) {
    if (info.result[0].provider.slug === "spacex") {
        return "https://www.spacex.com/static/images/share.jpg"
      } else if (info.result[0].provider.slug === "arianespace") {
        return "http://vtlogo.com/wp-content/uploads/2020/07/arianegroup-vector-logo-small.png"
      } else if (info.result[0].provider.slug === "united-launch-alliance-ula") {
        return "https://media-exp1.licdn.com/dms/image/C510BAQFImO2S_Xd4PQ/company-logo_200_200/0/1519888944112?e=2159024400&v=beta&t=uMhw7Eh0jAPRvMXrVhLx0doJCYS7s4yQqyvyfIwmYgk"
      } else {
        return ""
      }
}

module.exports = {
    name: 'Next Start of Rocket', // Optional
    category: 'Launch monitoring',
    description: 'This command shows informations for upcoming start (using fdo.rocketlaunch.live API)', // Required for slash commands
    commands: ['ns'], // Optional
    aliases: ['ns'], // Optional
    callback: ({ message }) => {
        message.channel.startTyping()
        var options = {
            url: 'https://fdo.rocketlaunch.live/json/launches/next/1',
            headers: {
              'User-Agent': 'request'
            }
          };
        request(options, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var info = JSON.parse(body)
        const embed = {
            "title": info.result[0].name + " launch",
            "description": info.result[0].quicktext,
            "color": "00ff00",
            "footer": {
              "icon_url": "https://pbs.twimg.com/profile_images/1042788156712607746/jfbcDLeU_400x400.jpg",
              "text": "Data by RocketLaunch.Live"
            },
            "author": {
              "name": info.result[0].provider.name,
              "icon_url": logo(info)
            },
            "fields": [
              {
                "name": "***Vehicle***",
                "value": info.result[0].vehicle.name
              },
              {
                "name": "***Pad***",
                "value": "**Pad name: **"+ info.result[0].pad.name + "\n**Pad location: **" + info.result[0].pad.location.name
              },
              {
                "name": "***Weather prediction***",
                "value": "**Temperature:** " + info.result[0].weather_temp + "°F (" + Math.round(fahrenheitToCelsius(info.result[0].weather_temp)) + "°C) \n**Weather condition: **" + info.result[0].weather_condition + " \n**Wind: **" + info.result[0].weather_wind_mph + "mph (" + Math.round(info.result[0].weather_wind_mph * 0.44704) + "m/s)\n**Weather update from: **" + info.result[0].weather_updated
              }
            ]
          };
          message.channel.send({ embed });
          message.channel.stopTyping()
    })}}