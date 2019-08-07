class RequestBodyCaptor {
    reply(statusCode, responseBody) {
        return (uri, requestBody) => {
            this.value = requestBody
            return [statusCode, responseBody]
        }
    }

    getValue() {
        return this.value
    }
}

module.exports = RequestBodyCaptor