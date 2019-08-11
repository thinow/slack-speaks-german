const WORDS_FILTER = new RegExp(/^[a-zäöüß]{5,16}$/, 'i')

const words = require('all-the-german-words')
const filtered = words.filter(word => WORDS_FILTER.test(word))

console.log(JSON.stringify(filtered))