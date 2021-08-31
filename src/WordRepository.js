const fs = require('fs')
const lineReader = require('line-reader')
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
            return new WordRepository(dataFile, readJsonFile(metadataFile))
        } catch (cause) {
            throw new Error('folder should be a directory containing the two following files : data.txt, metadata.json')
        }
    }

    constructor(dataFile, metadata) {
        this.dataFile = dataFile
        this.metadata = metadata
    }

    getNumberOfWords() {
        return this.metadata.numberOfLines
    }

    // TODO make all executors of the function async
    async getWord(index) {
        const line = await this.readLine(index)
        return this.transformLineToWord(line)
    }

    async readLine(index) {
        const options = {encoding: this.metadata.encoding}
        return await new Promise(resolve => {
            // TODO figure out how errors are raised (should it be wrapped with a try/catch?)
            lineReader.eachLine(this.dataFile, options, function (line, last, readerCallback) {
                readerCallback(false)
                // TODO resolve when index has been reached
                resolve(line)
            })
        })
    }

    transformLineToWord(line) {
        const [german, , english] = line.split('|');
        return new Word(german, english)
    }
}

module.exports = WordRepository