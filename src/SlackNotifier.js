const request = require('superagent');

class SlackNotifier {
    constructor(wordSelector) {
        this.wordSelector = wordSelector;
    }

    async sendWordOfTheDay(opts) {
        const word = await this.wordSelector.select()
        return this.sendToSlack(opts.webhook, word)
    }

    sendToSlack(webhook, word) {
        if (!webhook) throw new Error('the webhook is missing')

        return request
            .post(webhook)
            .send({
                text: 'Guten Morgen! Lass uns ein neues Wort lernen...',
                attachments: [
                    {
                        color: '#ff9900',
                        title: `${word.german}`,
                        footer: `${word.english}`
                    },
                    {
                        color: '#ff9900',
                        text: [
                            `:de: Bedeutung : https://www.wortbedeutung.info/${encodeURIComponent(word.germanWordOnly)}`,
                            `:gb: Übersetzung : https://www.wordreference.com/deen/${encodeURIComponent(word.germanWordOnly)}`
                        ].join('\n')
                    }
                ]
            })
    }
}

module.exports = SlackNotifier