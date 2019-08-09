const AppContext = require('./src/AppContext')

const RESPONSE_SUCCESS = {statusCode: 200, body: JSON.stringify('ok')}

AppContext.init()

exports.handlers = async (event = {}) => {
    await AppContext.slackNotifier.sendWordOfTheDay(event)
    return RESPONSE_SUCCESS
}
