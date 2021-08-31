const WordSelector = require('../src/WordSelector')
const Word = require('../src/Word')

const SINGLE_TEST_WORD = new Word()

const mockedWordRepository = {
    getNumberOfWords: jest.fn(() => 1),
    getWord: jest.fn(() => SINGLE_TEST_WORD),
}

describe('when selecting a word', () => {
    it('should pick a value from given words', async () => {
        // when
        const word = await new WordSelector(mockedWordRepository).select()

        // then
        expect(word).toEqual(SINGLE_TEST_WORD)

        const onlyAvailableIndex = 0;
        expect(mockedWordRepository.getWord).toHaveBeenCalledWith(onlyAvailableIndex)
    })
})
