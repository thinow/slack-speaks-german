const fs = require('fs')
const Word = require('./Word')

function assertFileExists(file) {
    if (!fs.existsSync(file) || !fs.lstatSync(file).isFile()) {
        throw new Error(`Does not exist or is not a file : ${file}`)
    }
}

function readJsonFile(file) {
    return JSON.parse(fs.readFileSync(file));
}

class WordRepository {
    static loadFromFolder(folder) {
        const dataFile = `${folder}/data.txt`;
        const metadataFile = `${folder}/metadata.json`;

        try {
            assertFileExists(dataFile);
            readJsonFile(metadataFile);

            return new WordRepository()
        } catch (cause) {
            throw new Error('folder should be a directory containing the two following files : data.txt, metadata.json')
        }
    }

    getNumberOfWords() {
        return 0
    }

    getWord(index) {
        return new Word('das Wort, -"er', 'word')
    }
}

module.exports = WordRepository