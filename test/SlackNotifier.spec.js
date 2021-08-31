const nock = require('nock')
const SlackNotifier = require('../src/SlackNotifier')
const WordSelector = require('../src/WordSelector')
const Word = require('../src/Word')

class MockedWordSelector extends WordSelector {
    constructor() {
        super(undefined);
    }

    async select() {
        return new Word('german', 'english')
    }
}

describe('when the webhook is set', () => {
    it('should request the webhook', async () => {
        // given
        const notifier = new SlackNotifier(new MockedWordSelector())

        const scope = nock('https://mocked-slack-host/')
            .post('/webhook')
            .reply(200, 'ok')

        // when
        await notifier.sendWordOfTheDay({webhook: 'https://mocked-slack-host/webhook'})

        // then
        expect(scope.isDone()).toBeTruthy()
    })
})
