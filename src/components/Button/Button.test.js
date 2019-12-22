import React from 'react'
import { render } from '@testing-library/react'
import Button from './Button'

describe('the Button', () => {
  it('renders with passed in content', () => {
    const { queryByText } = render(<Button>Click Me</Button>)

    expect(queryByText('Click Me')).toBeInTheDocument()
  })
})
