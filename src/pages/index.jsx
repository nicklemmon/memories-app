import React from 'react'

import Hero from '../components/Hero.jsx'
import Content from '../components/Content.jsx'
import Heading from '../components/Heading.jsx'
import MemoryGrid from '../components/MemoryGrid.jsx'
import ModalLauncher from '../components/ModalLauncher'
import Button from '../components/Button.jsx'

const IndexPage = () => (
  <div>
    <Hero/>

    <Content>
      <Heading
        level='2'
        content='Latest Memories'
        alignment='center'
      />

      <ModalLauncher
        launcherContent={ <Button role='presentation' type='primary' content='Herro' /> }
        id='demo'
        heading='A thingy opened!'
      >
        <p>Herro.</p>
      </ModalLauncher>

      <MemoryGrid/>
    </Content>
  </div>
)

export default IndexPage
