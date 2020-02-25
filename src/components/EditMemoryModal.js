import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import FormGroup from './FormGroup'
import Modal from './Modal'
import Loading from './Loading'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'

export default function EditMemoryModal(props) {
  const { id, machineState, onSubmit } = props
  const [title, setTitle] = useState()
  const [date, setDate] = useState()
  const [summary, setSummary] = useState()
  const { context } = machineState
  const { memoryToEdit } = context
  const modalID = `edit-memory-${id}`
  const send = () => console.log('send')

  useEffect(() => {
    const { title, summary, recordedDate = {} } = memoryToEdit

    setTitle(title)
    setSummary(summary)
    setDate(recordedDate.iso)
  }, [memoryToEdit])

  return (
    <>
      {machineState.matches({ editModalOpen: 'loading' }) && (
        <Modal id={modalID} heading="Edit Memory">
          <Loading />
        </Modal>
      )}

      {machineState.matches({ editModalOpen: 'idle' }) && (
        <Modal id={modalID} heading="Edit Memory">
          <form onSubmit={e => onSubmit(e, { id, content: { title, date, summary } })}>
            <FormGroup
              label="Title"
              type="text"
              id="title"
              handleChange={e => setTitle(e.target.value)}
              value={title}
            />

            <FormGroup
              label="Memory Date"
              type="date"
              id="date"
              handleChange={e => setDate(e.target.value)}
              value={format(date, 'YYYY-MM-DD')}
            />

            <FormGroup
              label="Summary"
              type="textarea"
              id="summary"
              handleChange={e => setSummary(e.target.value)}
              value={summary}
            />

            <ButtonWrapper>
              <Button variant="primary" type="submit">
                Save
              </Button>

              <Button type="button" onClick={() => send('CLOSE_MODAL')} variant="secondary">
                Cancel
              </Button>
            </ButtonWrapper>
          </form>
        </Modal>
      )}
    </>
  )
}
