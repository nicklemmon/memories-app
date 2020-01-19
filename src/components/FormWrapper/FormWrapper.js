import React from 'react'
import { Card, CardAlert, CardContent, CardFooter } from '../Card'

export default function FormWrapper(props) {
  const { method, hasAlert, alertType, alertContent, children, footerContent, handleSubmit } = props

  return (
    <Card className="FormWrapper" isBrokenOut={true}>
      <CardContent>
        {hasAlert && (
          <CardAlert type={alertType}>
            <p>{alertContent}</p>
          </CardAlert>
        )}

        <form method={method} onSubmit={handleSubmit}>
          {children}
        </form>
      </CardContent>

      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  )
}
