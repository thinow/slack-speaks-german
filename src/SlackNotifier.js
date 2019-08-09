const request = require('superagent');

class SlackNotifier {
    constructor(wordGenerator) {
        this.wordGenerator = wordGenerator;
    }

    sendWordOfTheDay(opts) {
        const word = this.wordGenerator.generate(opts)
        return this.sendToSlack(word, opts)
    }

    sendToSlack(word, {webhook}) {
        if (!webhook) throw new Error('the webhook is missing')

        return request
            .post(webhook)
            .send({text: `Wort des Tages : *${word}*`})
    }
}

module.exports = SlackNotifier