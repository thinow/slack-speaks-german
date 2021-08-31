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

        const color = '#0073ff'
        return request
            .post(webhook)
            .send({
                // TODO try out new Kit builder. New API?
                attachments: [
                    {
                        color,
                        mrkdwn_in: ['pretext', 'text', 'fields'],
                        pretext: `*Wort des Tages*`,
                        title: `:de: ${word.german}`,
                        // TODO replace characters in word.germanWordOnly, e.g. ä to ae
                        title_link: `https://www.duden.de/rechtschreibung/${encodeURIComponent(word.germanWordOnly)}`,
                        text: word.details ? [`_${word.details}_`, `:gb: ${word.english}`].join('\n') : `:gb: ${word.english}`,
                        fields: [
                            {}, // enforce line in-between
                            ...word.examples.map(example => ({
                                value: [
                                    `*${example.german}*`,
                                    `_${example.english}_`,
                                ].join('\n'),
                                short: false,
                            }))
                        ]
                    },
                ]
                // TODO try out adding actions buttons to "Duden" and "WordReference"
            })
    }
}

module.exports = SlackNotifier