import React from 'react'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import MaxWidth from '../components/MaxWidth'
import { Card, CardAlert, CardContent } from '../components/Card'
import MemoryCard from '../components/MemoryCard'
import ButtonWrapper from '../components/ButtonWrapper'
import Button from '../components/Button'

function AddMemorySuccessPage(props) {
  const { title, summary, date, tags } = props.location.state

  return (
    <>
      <Helmet title="Memory Added" />

      <PageHeading>Memory Added</PageHeading>

      <PageContent>
        <MaxWidth size="xs">
          <Card isBrokenOut={true}>
            <CardContent>
              <CardAlert type="success" cy="alert-success">
                <p>Memory successfully added</p>
              </CardAlert>

              <MemoryCard
                id="success-card"
                title={title}
                summary={summary}
                date={date}
                tags={tags}
                canWrite={false}
              />

              <p style={{ marginBottom: '1rem', marginTop: '2rem' }}>
                Add additional memories, or see your new memory with the rest of the bunch.
              </p>

              <ButtonWrapper>
                <Button type="primary" linkTo="/addmemory" cy="button-add-another">
                  Add Another Memory
                </Button>

                <Button type="secondary" linkTo="/memories" cy="button-view-memories">
                  View Memories
                </Button>
              </ButtonWrapper>
            </CardContent>
          </Card>
        </MaxWidth>
      </PageContent>
    </>
  )
}

export default withRouter(AddMemorySuccessPage)
