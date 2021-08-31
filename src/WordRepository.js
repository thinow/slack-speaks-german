const fs = require('fs')
const lineReader = require('line-reader')
const Word = require('./Word')
const WordRepositoryFolderError = require('./errors/WordRepositoryFolderError')

function assertFileExists(file) {
    if (!fs.existsSync(file) || !fs.lstatSync(file).isFile()) {
        throw new WordRepositoryFolderError(`File does not exist or is not a file : ${file}`)
    }

    return file
}

function assertPropertyExists(metadata, property) {
    if (!metadata.hasOwnProperty(property)) {
        throw new WordRepositoryFolderError(`Metadata file should contain property : ${property}`)
    }
}

function readJsonFile(file) {
    try {
        return JSON.parse(fs.readFileSync(file));
    } catch (cause) {
        throw new WordRepositoryFolderError(`Error when parsing file (expected to be a json file) : ${file}`)
    }
}

class WordRepository {

    static loadFromFolder(folder) {
        const dataFile = assertFileExists(`${folder}/data.txt`)
        const metadataFile = assertFileExists(`${folder}/metadata.json`)

        const metadata = readJsonFile(metadataFile);
        assertPropertyExists(metadata, 'numberOfLines')
        assertPropertyExists(metadata, 'encoding')

        return new WordRepository(dataFile, metadata)
    }

    constructor(dataFile, metadata) {
        this.dataFile = dataFile
        this.metadata = metadata
    }

    getNumberOfWords() {
        return this.metadata.numberOfLines
    }

    async getWord(index) {
        const line = await this.readLine(index)
        return this.transformLineToWord(line)
    }

    async readLine(index) {
        const options = {encoding: this.metadata.encoding}
        return await new Promise((resolve, reject) => {
            lineReader.eachLine(this.dataFile, options, function (line, last, readerCallback) {
                readerCallback(false)
                // TODO resolve when index has been reached
                resolve(line)
            }, reject)
        })
    }

    transformLineToWord(line) {
        const [german, , english] = line.split('|');
        return new Word(german, english)
    }
}

module.exports = WordRepository