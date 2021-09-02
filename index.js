const AppContext = require('./src/AppContext')

const RESPONSE_SUCCESS = {statusCode: 200, body: JSON.stringify('ok')}

exports.handlers = async (event = {}) => {
    const appContext = new AppContext(event)
    await appContext.slackNotifier.sendWordOfTheDay(event)
    return RESPONSE_SUCCESS
}
