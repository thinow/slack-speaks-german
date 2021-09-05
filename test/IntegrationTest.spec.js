const nock = require('nock')
const {handlers} = require('../index')
const RequestBodyCaptor = require('./common/RequestBodyCaptor')

describe('when triggering the handler', () => {
    it('should have sent a message to the webhook', async () => {
        // given
        const requestBodyCaptor = new RequestBodyCaptor()
        nock('https://mocked-slack-host/')
            .post('/webhook')
            .reply(requestBodyCaptor.reply(200, 'ok'))

        // when
        await handlers({
            webhook: 'https://mocked-slack-host/webhook',
            wordsFolder: './test/resources/folder-single-word'
        })

        // then
        expect(requestBodyCaptor.getValue()).toMatchSnapshot()
    })
})
