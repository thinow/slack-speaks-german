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

        // TODO color depending on the article
        const color = '#3583f3'
        // TODO replace characters in word.germanWordOnly, e.g. ä to ae
        const linkToTheWord = `https://www.duden.de/rechtschreibung/${encodeURIComponent(word.germanWordOnly)}`

        return request
            .post(webhook)
            .send({
                attachments: [
                    {
                        color,
                        blocks: [
                            context('Wort des Tages'),
                            section([
                                // TODO adds details only if it exists
                                `${link(bold(word.german), linkToTheWord)}   ${italic(word.details)}`,
                                word.english,
                            ]),
                            divider(),
                            ...word.examples.map(example => section([
                                bold(example.german),
                                example.english,
                            ])),
                        ],
                    },
                ]
            })
    }
}

function context(value) {
    return {
        type: 'context',
        elements: [
            {type: 'mrkdwn', text: value},
        ],
    }
}

function section(value) {
    const text = Array.isArray(value) ? value.join('\n') : value;
    return {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text,
        },
    }
}

function divider() {
    return {type: 'divider'}
}

const bold = (text) => `*${text}*`
const italic = (text) => `_${text}_`
const link = (text, url) => `<${url}|${text}>`

module.exports = SlackNotifier