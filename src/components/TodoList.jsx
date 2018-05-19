import React from 'react'

class TodoList extends React.Component {
  constructor( props ) {
    super( props )

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    fetch( 'http://localhost:3000/todos' )
      .then( results => {
        return results.json()
      })
      .then( results => {
        let todos = results.map(( todo ) => {
          return(
            <div key={ todo._id }>
              <div>{ todo.item }</div>
            </div>
          )
        })

        this.setState( { todos: todos } )
      })
  }

  render() {
    return (
      <div>
        <h2>TODO LIST, BABY!</h2>

        <div>
          <div>{this.state.todos}</div>
        </div>
      </div>
    )
  }
}

export default TodoList