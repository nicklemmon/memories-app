import React from 'react'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router-dom'
import PageContent from '../components/PageContent'
import PageHeading from '../components/PageHeading'
import MaxWidth from '../components/MaxWidth'
import { Toast } from '../components/Toast'
import { Card, CardHeader, CardContent, CardFooter, CardHeading } from '../components/Card'
import ButtonWrapper from '../components/ButtonWrapper'
import Button from '../components/Button'
import Tag from '../components/Tag'
import PageLayout from '../layouts/PageLayout'

function AddMemorySuccessPage(props) {
  const { title, summary, date, tags } = props.location.state

  return (
    <PageLayout>
      <Helmet title="Memory Added" />

      <PageHeading>Memory Added</PageHeading>

      <PageContent>
        <MaxWidth size="xs">
          <Card isBrokenOut={true}>
            <CardContent>
              <Toast variant="success">Memory successfully added</Toast>

              <Card>
                <CardHeader metaContent={date}>
                  <CardHeading>{title}</CardHeading>
                </CardHeader>

                <CardContent>
                  <p>{summary}</p>

                  {tags && Boolean(tags.length) ? (
                    <CardFooter>
                      {tags.map((tag, index) => {
                        return <Tag key={`$tag-${index}`} content={tag.name} />
                      })}
                    </CardFooter>
                  ) : null}
                </CardContent>
              </Card>

              <p style={{ marginBottom: '1rem', marginTop: '2rem' }}>
                Add additional memories, or see your new memory with the rest of the bunch.
              </p>

              <ButtonWrapper>
                <Button variant="primary" linkTo="/addmemory" cy="button-add-another">
                  Add Another Memory
                </Button>

                <Button variant="secondary" linkTo="/memories" cy="button-view-memories">
                  View Memories
                </Button>
              </ButtonWrapper>
            </CardContent>
          </Card>
        </MaxWidth>
      </PageContent>
    </PageLayout>
  )
}

export default withRouter(AddMemorySuccessPage)
