import React from 'react'

import './Loading.css'

class Loading extends React.Component {
  render() {
    return (
      <span className='Loading' aria-label='Loading'>
        <span class='Loading-wrapper'>
          <span class='Loading-dot Loading-dot--1' role='presentation'></span>

          <span class='Loading-dot Loading-dot--2' role='presentation'></span>

          <span class='Loading-dot Loading-dot--3' role='presentation'></span>

          <span class='Loading-dot Loading-dot--4' role='presentation'></span>

          <span class='Loading-dot Loading-dot--5' role='presentation'></span>
        </span>
      </span>
    )
  }
}

export default Loading