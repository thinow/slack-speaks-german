const request = require('superagent');

class SlackNotifier {
    constructor(wordGenerator) {
        this.wordGenerator = wordGenerator;
    }

    sendWordOfTheDay(opts) {
        const word = this.wordGenerator.generate()
        return this.sendToSlack(opts.webhook, word)
    }

    sendToSlack(webhook, word) {
        if (!webhook) throw new Error('the webhook is missing')

        return request
            .post(webhook)
            .send({text: `Wort des Tages : *${word}*`})
    }
}

module.exports = SlackNotifier