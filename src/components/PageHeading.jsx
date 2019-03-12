import React from 'react';

import Heading from './Heading'

import backgroundImage from '../images/cityscape.jpg'
import './PageHeading.css'

class PageHeading extends React.Component {
  constructor( props ) {
    super( props )

    this.pageheading = React.createRef()
  }

  componentDidMount() {
    this.pageheading.current.focus()
  }

  render() {
    const {
      content,
      cy
    } = this.props

    return (
      <div
        className='PageHeading'
        tabIndex='-1'
        ref={ this.pageheading }
        data-cy={ cy }
      >
        <Heading
          className='PageHeading-heading'
          content={ content }
          level='1'
          alignment='center'
        />

        <img
          className='PageHeading-background'
          src={ backgroundImage }
          alt=''
          aria-hidden='true'
        />
      </div>
    )
  }
}

export default PageHeading
