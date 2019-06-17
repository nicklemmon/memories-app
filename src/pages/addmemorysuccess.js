import React from 'react'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'

import Content from '../components/Content'
import PageHeading from '../components/PageHeading'
import Alert from '../components/Alert'
import MaxWidth from '../components/MaxWidth'
import Card from '../components/Card'
import MemoryCard from '../components/MemoryCard'
import ButtonWrapper from '../components/ButtonWrapper'
import Button from '../components/Button'

function AddMemorySuccessPage( props ) {
  const {
    title,
    summary,
    date,
    tags
  } = props.location.state

  return (
    <div>
      <Helmet title='Memory Added'/>

      <PageHeading content='Memory Added'/>

      <Content>
        <MaxWidth size='xs'>
          <Card isBrokenOut={ true }>
            <Alert
              type='success'
              content='Memory successfully added'
              className='Card-alert'
              cy='alert-success'
            />


            <MemoryCard
              id='success-card'
              title={ title }
              summary={ summary }
              date={ date }
              tags={ tags }
              canWrite={ false }
            />

            <p style={{ 'marginBottom': '1rem', 'marginTop': '2rem' }}>Add additional memories, or see your new memory with the rest of the bunch.</p>

            <ButtonWrapper>
              <Button
                type='primary'
                linkTo='/addmemory'
                content='Add Another Memory'
                cy='button-add-another'
              />

              <Button
                type='secondary'
                linkTo='/memories'
                content='View Memories'
                cy='button-view-memories'
              />
            </ButtonWrapper>
          </Card>
        </MaxWidth>
      </Content>
    </div>
  )
}

export default withRouter( AddMemorySuccessPage )
