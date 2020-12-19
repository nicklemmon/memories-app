import React from 'react'
import Parse from 'parse'
import { Redirect } from 'react-router-dom'

import FormWrapper from './FormWrapper'
import FormGroup from './FormGroup'
import FormGroupTagInput from './FormGroupTagInput'
import ButtonWrapper from './ButtonWrapper'
import Button from './Button'
// import AppStore from '../stores/AppStore'

class FormAddMemory extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      date: '',
      summary: '',
      tags: [],
      tagMax: 3,
      tagMaxReached: false,
      errorMsg: false,
      redirect: false,
    }

    this.handleFormGroupChange = this.handleFormGroupChange.bind(this)
    this.handleFormGroupTagChange = this.handleFormGroupTagChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddTagClick = this.handleAddTagClick.bind(this)
    this.handleFormGroupTagDeleteClick = this.handleFormGroupTagDeleteClick.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.render = this.render.bind(this)
  }

  handleFormGroupChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleFormGroupTagChange(e, index) {
    const newTags = this.state.tags.map((tag, subIndex) => {
      if (index !== subIndex) return tag

      return { ...tag, name: e.target.value }
    })

    this.setState({ tags: newTags })
  }

  resetForm() {
    this.setState({
      title: '',
      date: '',
      summary: '',
      tags: [],
    })
  }

  handleSubmit(e) {
    const { title, summary, tags, date } = this.state

    e.preventDefault()

    const filteredTags = tags.filter(value => Object.keys(value).length !== 0)
    const Memory = Parse.Object.extend('memory')
    const NewMemory = new Memory()

    NewMemory.set('title', title)
    NewMemory.set('summary', summary)
    NewMemory.set('tags', filteredTags)
    NewMemory.set('recordedDate', new Date(date))

    NewMemory.save()
      .then(() => {
        this.setState({ redirect: true })
      })
      .catch(() => this.setState({ errorMsg: true }))
  }

  handleAddTagClick(e) {
    e.preventDefault()

    // Show the tax max reached message when one below the tag max for a memory
    this.setState({
      tags: this.state.tags.concat([{}]),
    })

    if (this.state.tags.length === this.state.tagMax - 1) {
      this.setState({ tagMaxReached: true })
    }
  }

  handleFormGroupTagDeleteClick(e, index) {
    e.preventDefault()

    this.setState({
      tags: this.state.tags.filter((tag, subIndex) => index !== subIndex),
    })

    if (this.state.tags.length < this.state.tagMax + 1) {
      this.setState({ tagMaxReached: false })
    }
  }

  render() {
    const { tags, tagMaxReached, errorMsg, redirect } = this.state

    let hasAlert
    let alertVariant
    let alertContent

    if (errorMsg) {
      hasAlert = true
      alertVariant = 'error'
      alertContent = 'Whoops! Memory failed to be added. Try again.'
    }

    return (
      <React.Fragment>
        {redirect && (
          <Redirect
            to={{
              pathname: '/addmemorysuccess',
              state: {
                title: this.state.title,
                summary: this.state.summary,
                tags: this.state.tags,
                date: this.state.date,
              },
            }}
          />
        )}

        {!redirect && (
          <FormWrapper
            handleSubmit={this.handleSubmit}
            hasAlert={hasAlert}
            alertVariant={alertVariant}
            alertContent={alertContent}
          >
            <FormGroup
              label="Title"
              type="text"
              id="title"
              handleChange={this.handleFormGroupChange}
              value={this.state.title}
            />

            <FormGroup
              label="Memory Date"
              type="date"
              id="date"
              handleChange={this.handleFormGroupChange}
              value={this.state.date}
            />

            <FormGroup
              label="Summary"
              type="textarea"
              id="summary"
              handleChange={this.handleFormGroupChange}
              value={this.state.summary}
            />

            {tags.map((tag, index) => {
              return (
                <FormGroupTagInput
                  index={index}
                  key={`tag-input-${index}`}
                  handleChange={e => this.handleFormGroupTagChange(e, index)}
                  buttonOnClick={e => this.handleFormGroupTagDeleteClick(e, index)}
                  value={tag.name}
                />
              )
            })}

            <ButtonWrapper>
              {tagMaxReached ? (
                <p>Maximum of 3 tags per memory.</p>
              ) : (
                <Button variant="tertiary" onClick={this.handleAddTagClick} fullWidth={true}>
                  {tags.length > 0 ? 'Add Another Tag' : 'Add Tag'}
                </Button>
              )}
            </ButtonWrapper>

            <ButtonWrapper>
              <Button variant="primary" fullWidth onClick={this.handleFormSubmit}>
                Add Memory
              </Button>
            </ButtonWrapper>
          </FormWrapper>
        )}
      </React.Fragment>
    )
  }
}

export default FormAddMemory
