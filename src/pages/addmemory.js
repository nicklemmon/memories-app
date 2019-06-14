import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content'
import PageHeading from '../components/PageHeading'
import FormAddMemory from '../components/FormAddMemory'

class AddMemoryPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title='Add a Memory'/>
        
        <PageHeading content='Add a Memory'/>

        <Content>
          <FormAddMemory/>
        </Content>
      </div>
    )
  }
}

export default AddMemoryPage
