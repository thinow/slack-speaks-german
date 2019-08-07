const WordOfTheDayGenerator = require('.')

describe('when generating a word', () => {
    it('should say hello', () => {
        const generator = new WordOfTheDayGenerator();
        expect(generator.generate()).toEqual('Guten Tag!')
    })
})
