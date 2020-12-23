import React from 'react'
import { PageLayout } from 'src/layouts'
import { Alert, MaxWidth, PageHeading, PageContent } from 'src/components'

// See: https://reactjs.org/docs/error-boundaries.html
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <PageLayout>
          <PageHeading>Whoops!</PageHeading>

          <PageContent>
            <MaxWidth size="md">
              <Alert variant="attention">
                <p>Unfortunately, something went wrong with our app. Please try again.</p>
              </Alert>
            </MaxWidth>
          </PageContent>
        </PageLayout>
      )
    }

    return this.props.children
  }
}
