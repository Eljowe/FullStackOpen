import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog component test', () => {
    let blog
    let user
    let deleteBlog
    let container
    let update
    beforeEach(() => {
        deleteBlog = jest.fn()
        update = jest.fn()
        blog = {
            title: 'Test Title',
            url: 'test.com',
            likes: 23,
            user: {
                username: 'marko',
                name: 'Marko A',
                id: '63bd6d7a81c4d21b3eb8220f'
            },
            id: '63c00a50cb7aabc561d2b10a'
        }
        user = {
            username: 'marko',
            name: 'Marko A',
            id: '63bd6d7a81c4d21b3eb8220f'
        }
        container = render(<Blog className='BlogObj' blog={blog} user={user} deleteBlog={deleteBlog} update={update}/>).container
    })

    test('renders content', () => {
        const element = screen.getByText('Test Title')
        expect(element).toBeDefined()
    })
    test('url and likes not visible by default', () => {
        const url = container.querySelector('.url')
        const likes = container.querySelector('.likes')

        expect(url).toBeNull()
        expect(likes).toBeNull()
    })
    test('after toggling, the url, username and likes are shown', async () => {
        const user = userEvent.setup()

        const button = screen.getByText('view')
        await user.click(button)

        const url = container.querySelector('.url')
        const likes = container.querySelector('.likes')
        const username = container.querySelector('.username')

        expect(url).toBeVisible()
        expect(likes).toBeVisible()
        expect(username).toBeVisible()
    })
    test('clicking like-button two times calls mock-function two times', async () => {
        const user = userEvent.setup()
        const view = screen.getByText('view')
        await user.click(view)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(update.mock.calls).toHaveLength(2)
    })
})