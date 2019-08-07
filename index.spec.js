const sayHello = require('.')

it('should say hello', () => {
    expect(sayHello()).toEqual('Guten Tag!')
})
