const {handlers} = require('./index')


async function main() {
    webhook = getEnvironmentVariable('WEBHOOK')

    try {
        await handlers({webhook})
        console.log('🚀 The message has been sent successfully.')
    } catch(error) {
        console.error(error)
    }
}

function getEnvironmentVariable(name) {
    value = process.env[name]

    if (value) {
        return value
    } else {
        console.error(`ERROR : missing environment variable ${name}`)
        process.exit(1)
    }
}

main()
