import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('BlogForm tests', () => {
    let container
    let createBlog
    beforeEach(() => {
        createBlog = jest.fn()

        container = render(<BlogForm className='BlogForm' createBlog={createBlog} />).container
    })
    test('form works', async () => {
        const user = userEvent.setup()
        const title = container.querySelector('#title')
        const author = container.querySelector('#author')
        const url = container.querySelector('#url')
        const createButton = container.querySelector('#create-id')

        await user.type(title, 'test title')
        await user.type(author, 'test author')
        await user.type(url, 'test url')
        await user.click(createButton)

        expect(createBlog.mock.calls).toHaveLength(1)

        expect(createBlog.mock.calls[0][0]['title']).toBe('test title')
        expect(createBlog.mock.calls[0][0]['author']).toBe('test author')
        expect(createBlog.mock.calls[0][0]['url']).toBe('test url')
    })
})
