const WordRepository = require('../src/WordRepository')
const Word = require('../src/Word')

const WRONG_FOLDER_ERROR = 'folder should be a directory containing the two following files : data.txt, metadata.json'

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
            }).toThrow(WRONG_FOLDER_ERROR)
        })
    })

    describe('which does not contain data.txt', () => {
        it('should throw an error', () => {
            expect(() => {
                WordRepository.loadFromFolder('./test/resources/folder-without-data')
            }).toThrow(WRONG_FOLDER_ERROR)
        })
    })

    describe('which does not contain metadata.json', () => {
        it('should throw an error', () => {
            expect(() => {
                WordRepository.loadFromFolder('./test/resources/folder-without-metadata')
            }).toThrow(WRONG_FOLDER_ERROR)
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
