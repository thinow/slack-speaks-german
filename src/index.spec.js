const {handlers} = require('.')

describe('when triggering the handler', () => {
    it('should return a successful response', () => {
        // when
        const response = handlers()

        // then
        expect(response).toEqual(expect.objectContaining({
            statusCode: 200
        }))
    })
})
