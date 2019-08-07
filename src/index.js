const WordOfTheDayGenerator = require('./WordOfTheDayGenerator')

const RESPONSE_SUCCESS = {statusCode: 200, body: JSON.stringify('ok')};

const generator = new WordOfTheDayGenerator()

exports.handlers = event => {
    generator.generate(event)
    return RESPONSE_SUCCESS
}
