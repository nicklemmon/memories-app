import React from 'react'

import Hero from '../components/Hero.jsx'
import Content from '../components/Content.jsx'
import Heading from '../components/Heading.jsx'
import MemoryGrid from '../components/MemoryGrid.jsx'

class IndexPage extends React.Component {
  render() {
    return (
      <div>
        <Hero { ...this.props }/>

        <Content>
          <Heading
            level='2'
            content='Latest Memories'
            alignment='center'
          />

          <MemoryGrid/>
        </Content>
      </div>
    )
  }
}

export default IndexPage
