import React from 'react'
import { shallow, mount } from 'enzyme'
import Button from './Button'
import { BrowserRouter as Router } from 'react-router-dom'

describe( '<Button/>', () => {
  it( 'Renders without crashing', () => {
    shallow( <Button/> )
  })

  it( 'Renders with additional classes via the `className` prop', () => {
    const component = shallow( <Button className='foo'/> )

    expect( component.find( '.Button.foo' ) ).toHaveLength( 1 )
  })

  it( 'Renders with the the appropriate type class when a valid value is passed in via the `type` prop', () => {
    const primaryBtn = shallow( <Button type='primary'/> )
    const secondaryBtn = shallow( <Button type='secondary'/> )
    const tertiaryBtn = shallow( <Button type='tertiary'/> )

    expect( primaryBtn.find( '.Button.Button--primary' ) ).toHaveLength( 1 )
    expect( secondaryBtn.find( '.Button.Button--secondary' ) ).toHaveLength( 1 )
    expect( tertiaryBtn.find( '.Button.Button--tertiary' ) ).toHaveLength( 1 )
  })

  it( 'Does not render as a an HTML <button> when a valid value is passed to the `linkTo` prop', () => {
    const component = mount(
      <Router>
        <Button linkTo='https://nicklemmon.com'/>
      </Router>
    )

    expect( component.find( 'button' ) ).toHaveLength( 0 )

    component.unmount()
  })

  it( 'Renders passed in content via the `content` prop', () => {
    const component = shallow( <Button content='Click Me'/> )

    expect( component.text() ).toBe( 'Click Me' )
  })

  // NOTE: Unsure how to do this properly - need docs
  // it( 'Renders with inline width styles when the `fullWidth` prop is set to `true`', () => {
    //   const component = shallow( <Button fullWidth={ true }/> )
    
    //   expect( component ).toHaveLength( 1 )
    // })
    
  // NOTE: Unsure how to do this properly - need docs
  // it( 'Accepts a function as a value for the `onClick` prop', () => {
  //   const mockFn = jest.fn()
  //   const component = shallow( <Button onClick={ mockFn }/> )

  //   component.click()

  //   expect( mockFn ).toHaveBeenCalled()
  // })

  it( 'Renders the button with a `data-cy` attribute when a value is provided for the `cy` prop', () => {
    const component = shallow( <Button cy='my-button'/> )

    expect( component.find( '[data-cy="my-button"]' ) ).toHaveLength( 1 )
  })

  it( 'Renders the button with passed in attributes via the attributes prop', () => {
    const component = shallow( <Button role="button" data-foo="bar"/> )

    expect( component.find( '[role="button"]' ) ).toHaveLength( 1 )
    expect( component.find( '[data-foo="bar"]' ) ).toHaveLength( 1 )
  })
})
