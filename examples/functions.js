/**
 * Created by Mijn PC on 6/05/2017.
 */
var portfolio = require("./portfolio");

module.exports.parseCommand = function(spark, command, message) {
    console.log("PARSING");
    switch(command.keyword)
         {
             case 'test':
                 var email = command.message.personEmail; // Spark User that created the message orginally
                 sendMessage(spark,command.message.roomId,"Just a little test my good friend <@personEmail:" + email + ">","WARNING: could not post Hello message to room: " + command.message.roomId,true);
                 break;
            case 'color' :
                sendMessage(spark,command.message.roomId,"> Item sqdfsdfdsf  qsdfqsdfqsdfqs sqdfsqfqsdf qsdfqsdfsqdfqsdfqsdf qsdfqsdfqsfqsdf","WARNING: could not post message to room: " + command.message.roomId,true);
                 break;
            case 'help' :
                sendMessage(spark,command.message.roomId,"Hi, I am Jeff's bot !\n\nType /hello to see me in action.","WARNING: could not post message to room: " + command.message.roomId,true);
                 break;
            case 'hello':
                 var email = command.message.personEmail; // Spark User that created the message orginally
                sendMessage(spark,command.message.roomId,"Hello <@personEmail:" + email + ">","WARNING: could not Hello message to room: " + command.message.roomId,true);
                 break;
            case 'whoami' :
                 // Check usage
                sendMessage(spark,command.message.roomId,"Hi there\n\n Your Person Id is: " + command.message.personId + "\n\nYour email is: " + command.message.personEmail,"WARNING: could not Hello message to room: " + command.message.roomId,true);
                 break;
            case 'aa' :
                // let's acknowledge we received the order
                sendMessage(spark,command.message.roomId,"_heard you! asking my crystal ball..._","WARNING: could not ask crystal ball",true);
                var portfolioElement = "UC";
                var collateral = "yes";

                var limit = parseInt(command.args[0]);
                if (!limit) limit = 5;
                if (limit < 1) limit = 1;

                portfolio.SendBotRequest(portfolioElement,collateral,function (err,events) {
                    console.log("retrieved events: " + events);
                    if (err) {
                        console.log("ERROR fetching!!!");
                        sendMessage(spark,command.message.roomId,events,"**sorry, ball seems broken :-(**",true);
                    }
                    console.log("NO error detected");

                    sendMessage(spark,command.message.roomId,events,"WARNING: could not ask crystal ball",true);
                    });
                ;
             break;
            default :
                sendMessage(spark,command.message.roomId,"Sorry, I did not understand.\n\nTry /help.","WARNING: could not post Fallback message to room: " + command.message.roomId,true);

         }
}


module.exports.sendMessage = function(spark, roomID,messageText, errormessage, markdown) {


    console.log("In function sendMessage: " + messageText);
    spark.createMessage(roomID, messageText, {"markdown": markdown}, function (err, message) {
                            if (err) {
                                console.log(errormessage);
                                return;
                            }
                        });

}

module.exports.sdcontact = function(bot, trigger) {
    // Open a Spark room with SD team
    var tosay = '';
    var Spark = require('node-sparky');
    var spark = new Spark(process.env['SPARK_TOKEN']);

    room = spark.roomAdd(config.SD.roomtitle)
        .then(function(room) {
            memberroom = spark.membershipAdd(room.id, config.SD.email, '0')
                .then(function(room) { bot.say('* Membership added with '+config.SD.email); })
                .catch(function(err) { bot.say('* Error during membership'); console.log(err); });
            memberroom = spark.membershipAdd(room.id, trigger.personEmail, '0')
                .then(function(room) { bot.say('* Membership addded with '+trigger.personEmail); })
                .catch(function(err) { bot.say('* Error during membership'); console.log(err); });
            bot.say('* Room "'+room.title+'" created');
        })
        .catch(function(err) { bot.say('* Error during room creation'); console.log(err); });
    bot.say(config.SD.roommsg);
}

module.exports.listWebhooks = function(spark) {

    spark.listWebhooks(5, function(err, webhooks) {
        if (!err)
            for (i=0;i<webhooks.items.length;i++) {
                console.log(webhooks.items[i].id)
                console.log(webhooks.items[i].name)
                console.log(webhooks.items[i].resource)
                console.log(webhooks.items[i].event)
                console.log(webhooks.items[i].targetUrl)
                console.log(webhooks.items[i].filter)
            }
        //support for pagination
        spark.listWebhooks("next",function(err,webhooks){
            // do something here
        })


    })

}

module.exports.pushContent = function(spark,personEmail) {

    messageParams = {}  // Message Parameters are optional
    messageParams.file = 'http://www.dimensiondata.com/Global/Downloadable%20Documents/Unified%20Communications%20and%20Collaboration%20Development%20Model%20Brochure.pdf'  // The file to attach to the message.
    messageParams.filename = 'Unified Communications and Collaboration Development Model'
    messageParams.markdown = 'markdown'

    //To set the type of your messageText to HTML or Markdown set messageParams.html messageParams.markdown to true.  If both are set, message will be sent as markdown.
    //messageParams.html = true

    // for a direct 1:1 message just use the users email address as the first parameter or person id
    spark.createMessage(personEmail, '_Message push dear sir, hope you like it!!_', messageParams, function(err, response) {
        if (!err)
            console.dir(response.id)
    })

// or send to a room by using the room id as the first parameter
//     sparkClient.createMessage('Y2lzY29zcGFyazovL3VzL1JPT00vZjcwZjQ0ODAtYTA1Ny0xMWU1LTg4MTktODNkODA5ZDZlZjc2', 'Hello!', messageParams, function(err, response) {
//         if (!err)
//             console.dir(response.id)
//     })

}




