import React from 'react'
import Helmet from 'react-helmet'

import Content from '../components/Content'
import PageHeading from '../components/PageHeading'
import Alert from '../components/Alert'
import MaxWidth from '../components/MaxWidth'
import Card from '../components/Card'
import ButtonWrapper from '../components/ButtonWrapper'
import Button from '../components/Button'

function AddMemorySuccessPage( props ) {
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
              cy='alert-success'
            />

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

export default AddMemorySuccessPage
