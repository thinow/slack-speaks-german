const request = require('superagent');

class SlackNotifier {
    sendWordOfTheDay({webhook} = {}) {
        if (!webhook) throw new Error('the webhook is missing')

        return request
            .post(webhook)
            .send({text: 'Ein neues Wort'});
    }
}

module.exports = SlackNotifier