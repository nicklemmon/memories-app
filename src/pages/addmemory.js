import React from 'react'
import Helmet from 'react-helmet'

import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import FormAddMemory from '../components/FormAddMemory'

class AddMemoryPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Add a Memory" />

        <PageHeading content="Add a Memory" />

        <PageContent>
          <FormAddMemory />
        </PageContent>
      </div>
    )
  }
}

export default AddMemoryPage
