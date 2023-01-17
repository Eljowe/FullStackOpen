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
    describe('after logging in', function () {
        beforeEach(function () {
            cy.request('POST', 'http://localhost:8080/api/login', {
                username: 'Mattiusername',
                password: 'matti123'
            }).then((response) =>
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
            )
            cy.visit('http://localhost:3000')
        })
        it('users can create blogs', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Test title')
            cy.get('#author').type('Test auth')
            cy.get('#url').type('test.com')

            cy.get('#create-id').click()

            cy.contains('Test title')
            cy.contains('Test auth')
        })

        it('users can like blogs', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('Test title')
            cy.get('#author').type('Test auth')
            cy.get('#url').type('test.com')

            cy.get('#create-id').click()
            cy.contains('view').click()
            cy.get('#likebutton').click()

            cy.contains('1 likes')
        })

        it('user can delete their blogs', () => {
            cy.contains('new blog').click()
            cy.get('#title').type('Test title')
            cy.get('#author').type('Test auth')
            cy.get('#url').type('test.com')

            cy.get('#create-id').click()
            cy.contains('view').click()

            cy.get('#deletebutton').click()
            cy.contains('Test title').should('not.exist')
        })
        it('blogs are in correct order', () => {
            const testblog = {
                title: 'First added',
                author: 'Test Author',
                url: 'Test.com',
                likes: 2
            }
            cy.addBlog(testblog)
            const mostlikes = {
                title: 'Most likes',
                author: 'Test Author',
                url: 'Test.com',
                likes: 302
            }
            cy.addBlog(mostlikes)
            const secondmostlikes = {
                title: 'Second Most likes',
                author: 'Test Author',
                url: 'Test.com',
                likes: 201
            }
            cy.addBlog(secondmostlikes)
            console.log()
            cy.get('.defaultview').eq(0).should('contain', 'Most likes')
            cy.get('.defaultview').eq(1).should('contain', 'Second')
            cy.get('.defaultview').eq(2).should('contain', 'First added')

        })
    })
})