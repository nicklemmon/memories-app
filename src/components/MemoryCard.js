import React from 'react'
import classNames from 'classnames'
import { FaTrashAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { Card, CardHeader, CardHeading, CardContent, CardFooter } from './Card'
import Tag from './Tag'
import ModalLauncher from './ModalLauncher'
import ModalLauncherEditMemory from './ModalLauncherEditMemory'
import ScreenReaderOnly from './ScreenReaderOnly'

import './MemoryCard.css'

class MemoryCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: null,
      date: null,
      summary: null,
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind(this)
  }

  handleFormGroupChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  render() {
    const {
      rawId,
      id,
      title,
      tags,
      summary,
      canWrite,
      editSuccessCallback,
      editFailureCallback,
      editModalOpen,
      handleDelete,
      className,
      date,
    } = this.props

    let formattedDate

    if (date) {
      formattedDate = format(date, 'MM/DD/YYYY')
    }

    return (
      <Card className={classNames('MemoryCard', className)} headingLevel="3">
        <CardHeader metaContent={formattedDate}>
          <CardHeading>{title}</CardHeading>
        </CardHeader>
        <CardContent>
          <p>{summary}</p>

          {canWrite && (
            <div className="MemoryCard-actions">
              <ModalLauncherEditMemory
                rawId={rawId}
                id={id}
                title={title}
                date={formattedDate}
                summary={summary}
                editSuccessCallback={editSuccessCallback}
                editFailureCallback={editFailureCallback}
                modalIsOpen={editModalOpen}
              />

              <ModalLauncher
                className="MemoryCard-action"
                content={
                  <>
                    <FaTrashAlt className="MemoryCard-actionIcon" aria-hidden="true" />

                    <ScreenReaderOnly>Delete</ScreenReaderOnly>
                  </>
                }
                id={`delete-memory-${id}`}
                heading={`Delete "${title}"?`}
                hasCTAs={true}
                primaryButtonContent="Delete"
                primaryButtonOnClick={handleDelete}
                primaryButtonCloses={true}
                secondaryButtonContent="Cancel"
                secondaryButtonCloses={true}
              >
                <p>Are you sure you want to delete this memory?</p>
              </ModalLauncher>
            </div>
          )}
        </CardContent>
        <CardFooter>
          {tags && tags.length > 0 && (
            <>
              {tags.map((tag, index) => (
                <Tag key={`tag-${tag.name}-${index}`} content={tag.name} />
              ))}
            </>
          )}
        </CardFooter>
      </Card>
    )
  }
}

export default MemoryCard
