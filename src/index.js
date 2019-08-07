const SlackNotifier = require('./SlackNotifier')

const RESPONSE_SUCCESS = {statusCode: 200, body: JSON.stringify('ok')}

const slackNotifier = new SlackNotifier()

exports.handlers = async event => {
    await slackNotifier.sendWordOfTheDay(event)
    return RESPONSE_SUCCESS
}
