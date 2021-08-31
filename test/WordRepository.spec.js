const WordRepository = require('../src/WordRepository')
const WordRepositoryFolderError = require('../src/errors/WordRepositoryFolderError')

describe('when loading folder', () => {

    describe('used in production', () => {
        it('should successfully load the repository', () => {
            // when
            const repository = WordRepository.loadFromFolder('./resources/words')

            // then
            expect(repository).toBeInstanceOf(WordRepository)
        })
    })

    describe('which is not a folder', () => {
        it('should throw an error', () => {
            expect(() => {
                WordRepository.loadFromFolder('Not a folder')
            }).toThrow(WordRepositoryFolderError)
        })
    })

    describe('which does not contain data.txt', () => {
        it('should throw an error', () => {
            expect(() => {
                WordRepository.loadFromFolder('./test/resources/folder-without-data')
            }).toThrow(WordRepositoryFolderError)
        })
    })

    describe('which does not contain metadata.json', () => {
        it('should throw an error', () => {
            expect(() => {
                WordRepository.loadFromFolder('./test/resources/folder-without-metadata')
            }).toThrow(WordRepositoryFolderError)
        })
    })
})


describe('with a single word', () => {
    it('should return the word as the first item', async () => {
        // when
        const repository = WordRepository.loadFromFolder('./test/resources/folder-single-word');

        // then
        expect(repository.getNumberOfWords()).toEqual(1)
        expect(await repository.getWord(0)).toEqual(expect.objectContaining(({
            german: 'einzig',
            english: 'only, unique',
        })))
    })
})

describe('with multiple words', () => {
    it('should the word based on the index', async () => {
        // when
        const repository = WordRepository.loadFromFolder('./test/resources/folder-multiple-words');

        // then
        expect(await repository.getWord(1)).toEqual(expect.objectContaining(({
            german: 'erzählen',
            english: 'to tell',
        })))
    })
})
