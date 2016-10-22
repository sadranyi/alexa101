// import the library
var Alexa = require('alexa-sdk');

var APP_ID = 'amzn1.ask.skill.8b099b9a-1e03-4821-b288-267c2fdcc369';
var SKILL_NAME = 'Skills Facts';

/**Array Containing Facts, This can be replaced with an API Call */
var FACTS = [
    "Skills are fun to Develop",
    "Skills are the future",
    "there are over 1000 skills already",
];


// Common Variables
var speechOutput = "Hello, welcome to the Skill Facts!";
var repromptSpeech = "Hello Again!";
var cardTitle = "Skill Facts";
var cardContent = "This is a skill about creating Alexa Skills";
var imageObj = {
    smallImageUrl:'',
    largeImageUrl:''
};


// Create Instance of alexa Object
exports.handler = function(event, context, callback){
    // Create instance of Alexa object
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;

    //Register handlers with Alexa Object
    alexa.registerHandlers(handlers);
    //alexa.registerHandlers(handlers, handlers2, handlers3, ...);

    // execute the Alexa Object to run the logic
    alexa.execute();
};



// Create Handlers for all the intents your skill will use
var handlers = {
    
    //Skill Fact Intent handler
    'SkillFactIntent': function(){

        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];
        speechOutput = "Here's your fact: " + randomFact;
        cardTitle = SKILL_NAME;

        // Tell the user something and Close the session
        this.emit(':tell', speechOutput);
        //this.emit(':tell', speechOutput);
        //this.emit(':tellWithCard', speechOutput, cardTitle, cardContent, imageObj);

        // Ask the user for information and keep the session Opened
        //this.emit(':ask', 'What would you like to do?', 'Please say that again?');
        //this.emit(':ask', speechOutput, repromptSpeech);
        //this.emit(':askWithCard', speechOutput, repromptSpeech, cardTitle, cardContent,imageObj)
    },

    'LaunchRequest':function(){
        this.emit('WelcomeIntent');
    },

    'WelcomeIntent':function(){
        this.emit(':tell','Welcome to Skills Development');
    },

    'AMAZON.HelpIntent':function(){
        speechOutput = "You can say tell me a space fact, or, you can say exit... What can I help you with?";
        repromptSpeech = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },

     'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};