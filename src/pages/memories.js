import React from 'react'
import Helmet from 'react-helmet'

import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import MemoryGrid from '../components/MemoryGrid'

class MemoriesPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Memories" />

        <PageHeading content="Memories" />

        <PageContent>
          <MemoryGrid />
        </PageContent>
      </div>
    )
  }
}

export default MemoriesPage
