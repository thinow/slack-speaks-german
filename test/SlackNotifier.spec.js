const nock = require('nock')
const SlackNotifier = require('../src/SlackNotifier')

const notifier = new SlackNotifier()

describe('when the argument is undefined', () => {
    it('should throw an error', () => {
        expect(() => {
            notifier.sendWordOfTheDay(undefined)
        }).toThrow('the webhook is missing')
    })
})

describe('when the webhook is undefined', () => {
    it('should throw an error', () => {
        expect(() => {
            notifier.sendWordOfTheDay({webhook: undefined})
        }).toThrow('the webhook is missing')
    })
})

describe('when the webhook is set', () => {
    it('should request the webhook', async () => {
        // given
        const scope = nock('https://mocked-slack-host/')
            .post('/webhook')
            .reply(200, 'ok')

        // when
        await notifier.sendWordOfTheDay({webhook: 'https://mocked-slack-host/webhook'})

        // then
        expect(scope.isDone()).toBeTruthy()
    })
})
