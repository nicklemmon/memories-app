/* eslint-disable */
import React from 'react'
import { useMachine } from '@xstate/react'
import { memoriesMachine } from '../state-machines'
import { FaPencilAlt } from 'react-icons/fa'
import FormGroup from './FormGroup'
import ModalLauncher from './ModalLauncher'
import ScreenReaderOnly from './ScreenReaderOnly'

export default function ModalLauncherEditMemory(props) {
  return (
    <ModalLauncher
      className="MemoryCard-action"
      content={
        <>
          <FaPencilAlt className="MemoryCard-actionIcon" aria-hidden="true" />
          <ScreenReaderOnly>Edit</ScreenReaderOnly>
        </>
      }
      id={`edit-memory-${id}`}
      heading="Edit Memory"
      hasCTAs
      primaryButtonContent="Submit"
      primaryButtonOnClick={handleEditSubmit}
      primaryButtonCloses
      secondaryButtonContent="Cancel"
      secondaryButtonCloses
      isOpen={editModalOpen}
    >
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
        value={date}
      />

      <FormGroup
        label="Summary"
        type="textarea"
        id="summary"
        handleChange={e => setSummary(e.target.value)}
        value={summary}
      />
    </ModalLauncher>
  )
}
