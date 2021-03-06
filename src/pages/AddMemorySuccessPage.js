import React from 'react'
import Helmet from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { withRouter } from 'react-router-dom'
import { getMemory } from 'src/helpers/api'
import { dateToString } from 'src/helpers/date'
import {
  Button,
  ButtonWrapper,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardHeading,
  MaxWidth,
  PageContent,
  PageHeading,
  PageLoader,
  Tag,
} from 'src/components'
import { PageLayout } from 'src/layouts'

function AddMemorySuccessPage() {
  const { id } = useParams()
  const { status, data } = useQuery(`getMemory${id}`, () => getMemory(id))

  if (status === 'loading') return <PageLoader />

  // TODO: Handle error state here

  const { title, summary, recordedDate, tags } = data

  return (
    <PageLayout>
      <Helmet title="Memory Added" />

      <PageHeading>Memory Added</PageHeading>

      <PageContent>
        <MaxWidth size="xs">
          <Card isBrokenOut={true}>
            <CardContent>
              <Card>
                <CardHeader metaContent={dateToString(recordedDate)}>
                  <CardHeading>{title}</CardHeading>
                </CardHeader>

                <CardContent>
                  <p>{summary}</p>
                </CardContent>

                {tags && Boolean(tags.length) ? (
                  <CardFooter>
                    {tags.map((tag, index) => {
                      return <Tag key={`$tag-${index}`} content={tag.name} />
                    })}
                  </CardFooter>
                ) : null}
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
