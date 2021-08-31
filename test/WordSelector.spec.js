const WordSelector = require('../src/WordSelector')

describe('when trying to instantiate with undefined words', () => {
    it('should raise an error', () => {
        expect(() => new WordSelector(undefined))
            .toThrow('the argument `words` is missing or empty')
    })
})

describe('when trying to instantiate with empty words', () => {
    it('should raise an error', () => {
        expect(() => new WordSelector([]))
            .toThrow('the argument `words` is missing or empty')
    })
})

describe('when selecting a word', () => {
    it('should pick a value from given words', () => {
        // given
        const words = [
            ['das', 'Wort', 'word']
        ]

        // when
        const word = new WordSelector(words).select()

        // then
        expect(word).toEqual({
            article: 'das',
            german: 'Wort',
            english: 'word'
        })
    })
})
