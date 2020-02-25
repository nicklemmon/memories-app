import React from 'react'
import classNames from 'classnames'
import { useService } from '@xstate/react'
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa'
import { format } from 'date-fns'
import { Card, CardHeader, CardHeading, CardContent, CardFooter } from './Card'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'
import Tag from './Tag'
import Loading from './Loading'
import Modal from './Modal'
import { Toast } from './Toast'
import ScreenReaderOnly from './ScreenReaderOnly'
// import EditMemoryModal from './EditMemoryModal'
import './MemoryCard.css'

export default function MemoryCard(props) {
  const { id, tags, title, date, summary, canWrite, className, memoryRef } = props
  const [state, send] = useService(memoryRef)
  const { value: currentState } = state

  console.log('currentState', currentState)

  return (
    <>
      {currentState === 'deleteSuccess' && <Toast variant="success">Memory deleted</Toast>}

      <Card className={classNames('MemoryCard', className)} headingLevel="3">
        <CardHeader metaContent={date ? format(date, 'MM/DD/YYYY') : undefined}>
          <CardHeading>{title}</CardHeading>
        </CardHeader>

        <CardContent>
          <p>{summary}</p>

          {canWrite && (
            <div className="MemoryCard-actions">
              <button className="MemoryCard-action" onClick={() => send('OPEN_EDIT_MODAL')}>
                <FaPencilAlt className="MemoryCard-actionIcon" aria-hidden="true" />

                <ScreenReaderOnly>Edit</ScreenReaderOnly>
              </button>

              {/* <EditMemoryModal
                id={rawId}
                onSubmit={handleEditSubmit}
                onClose={() => send('CLOSE_MODAL')}
              /> */}

              <button className="MemoryCard-action" onClick={() => send('OPEN_DELETE_MODAL')}>
                <FaTrashAlt className="MemoryCard-actionIcon" aria-hidden="true" />

                <ScreenReaderOnly>Delete</ScreenReaderOnly>
              </button>

              {currentState === 'deleting' && (
                <Modal id={`delete-memory-${id}`} heading={`Delete ${title}?`}>
                  <Loading />
                </Modal>
              )}

              {currentState === 'deleteModalOpen' && (
                <Modal id={`delete-memory-${id}`} heading={`Delete ${title}?`}>
                  <p>Are you sure you want to delete this memory? This cannot be undone.</p>

                  <ButtonWrapper>
                    <Button onClick={() => send('DELETE_MEMORY')} variant="primary">
                      Delete
                    </Button>

                    <Button onClick={() => send('CLOSE_MODAL')} variant="secondary">
                      Cancel
                    </Button>
                  </ButtonWrapper>
                </Modal>
              )}
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
    </>
  )
}
