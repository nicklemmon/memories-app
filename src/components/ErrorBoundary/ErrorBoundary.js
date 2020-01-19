import React from 'react'
import Alert from '../Alert'
import PageLayout from '../../layouts/PageLayout'
import PageHeading from '../PageHeading'
import PageContent from '../PageContent'
import MaxWidth from '../MaxWidth'

// See: https://reactjs.org/docs/error-boundaries.html
export default class ErrorBoundary extends React.Component {
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
              <Alert type="attention">
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
