/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.1fe8f569-48e3-4d17-a543-63a8e355d18a";

const languageStrings = {
    'de': {
        translation: {
            FACTS: [
                'Eene meene nasse Sachen, Wind der soll sie trocken machen. Hex-hex!',
                'Eene meene Baum, die Wanne ist voll Schaum! Hex-hex!',
                'Eene meene Mei, zurück nach Haus Kartoffelbrei! Hex-hex!',
                'Eene meene Mei, Kartoffelbrei mein Flugzeug sei! Hex-hex!',
                'Eene meene Adebar, zeig mir, wie das damals war! Hex-hex!',
                'Eene meene Mut, klitzeklein mit Hut! Hex-hex!',
                'Eene meene dicke Masche, sei ein Brief und nicht mehr Asche! Hex-hex!',
                'Eene meene nebenbei, fort der lange Rüssel sei! Hex-hex!',
                'Eene meene Satteltasche, blauer Brief werde zu Asche. Hex Hex!',
            ],
            SKILL_NAME: 'Bibi Blocksberg Zaubersprüche',
            GET_FACT_MESSAGE: 'Hier dein Zauberspruch: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Zauberspruch“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetMagicSpellIntend');
    },
    'GetMagicSpellIntend': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
