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
            .send({
                text: 'Guten Morgen! Lass uns ein neues Wort lernen...',
                attachments: [
                    {
                        color: '#ff9900',
                        title: `${word.article} ${word.german}`,
                        footer: `${word.english}`
                    },
                    {
                        color: '#ff9900',
                        text: [
                            `:de: Bedeutung : https://www.wortbedeutung.info/${encodeURIComponent(word.german)}`,
                            `:gb: Übersetzung : https://www.wordreference.com/deen/${encodeURIComponent(word.german)}`
                        ].join('\n')
                    }
                ]
            })
    }
}

module.exports = SlackNotifier