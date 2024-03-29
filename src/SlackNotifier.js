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
                attachments: [
                    {
                        color: buildColor(word),
                        blocks: [
                            section([
                                `${link(bold(word.german), buildURL(word))}   ${italic(word.details)}`.trim(),
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

function buildColor(word) {
    const beginning = word.german.substring(0, 4)

    switch (beginning) {
        case 'der ':
            return '#3583f3'
        case 'die ':
            return '#f62a52'
        case 'das ':
            return '#44a822'
        default:
            return '#ecaf14'
    }
}

function buildURL(word) {
    const mapping = [
        ['Ä', 'Ae'],
        ['Ö', 'Oe'],
        ['Ü', 'Ue'],
        ['ä', 'ae'],
        ['ö', 'oe'],
        ['ü', 'ue'],
        ['ß', 'sz'],
    ]

    let key = word.germanWordOnly
    for (const [from, to] of mapping) {
        key = key.replace(from, to)
    }

    return `https://www.duden.de/rechtschreibung/${encodeURIComponent(key)}`
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

const bold = (text) => text ? `*${text}*` : ''
const italic = (text) => text ? `_${text}_` : ''
const link = (text, url) => text ? `<${url}|${text}>` : ''

module.exports = SlackNotifier