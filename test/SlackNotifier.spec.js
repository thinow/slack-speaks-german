const nock = require('nock')
const SlackNotifier = require('../src/SlackNotifier')
const WordSelector = require('../src/WordSelector')
const Word = require('../src/Word')
const RequestBodyCaptor = require('./common/RequestBodyCaptor')

class MockedWordSelector extends WordSelector {
    constructor(word) {
        super(undefined);
        this.word = word;
    }

    async select() {
        return this.word
    }
}

describe('when the webhook is set', () => {
    it('should request the webhook', async () => {
        // given
        const notifier = new SlackNotifier(new MockedWordSelector(createWord()))

        const scope = nock('https://mocked-slack-host/')
            .post('/webhook')
            .reply(200, 'ok')

        // when
        await notifier.sendWordOfTheDay({webhook: 'https://mocked-slack-host/webhook'})

        // then
        expect(scope.isDone()).toBeTruthy()
    })

    it('should transform special german character in the link', async () => {
        // given
        const notifier = new SlackNotifier(new MockedWordSelector(createWord('ÄÖÜäöüß')))

        const requestBodyCaptor = new RequestBodyCaptor()
        nock('https://mocked-slack-host/')
            .post('/webhook')
            .reply(requestBodyCaptor.reply(200, 'ok'))

        // when
        await notifier.sendWordOfTheDay({webhook: 'https://mocked-slack-host/webhook'})

        // then
        expect(requestBodyCaptor.getValue()).toEqual({
            attachments: [
                expect.objectContaining({
                    blocks: expect.arrayContaining([
                        {
                            type: 'section',
                            text: {
                                type: "mrkdwn",
                                text: "<https://www.duden.de/rechtschreibung/AeOeUeaeoeuesz|*german*>\nenglish",
                            }
                        }
                    ])
                })
            ]
        })
    })
})

function createWord(germanWordOnly = 'germanWordOnly') {
    return new Word(germanWordOnly, 'german', 'english', '', [])
}
