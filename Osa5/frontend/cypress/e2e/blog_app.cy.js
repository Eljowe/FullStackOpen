describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:8080/api/testing/reset')
        // create here a user to backend
        const user = {
            name: 'Matti',
            username: 'Mattiusername',
            password: 'matti123'
        }
        cy.request('POST', 'http://localhost:8080/api/users/', user)

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('Mattiusername')
            cy.get('#password').type('matti123')
            cy.get('#submit').click()
            cy.contains('Matti logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('Mattiusername')
            cy.get('#password').type('matti12343')
            cy.get('#submit').click()
            cy.contains('wrong')
        })
    })
})