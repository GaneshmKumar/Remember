var todos = localStorage.getItem('remember');
todos = (todos == null) ? [{'id': 'abcdef', 'todo': 'i am god'}] : JSON.parse(todos);

class RememberComponent extends React.Component {
	render() {
		return (
			<div>
				<InputComponent />
				<NotesComponent />
			</div>
			);
	}
}

class InputComponent extends React.Component {
	addTodo(e) {
		e.preventDefault();
		var id = generateID();
		var todo = $('#input').val()
		var curr_todo = {'id': id, 'todo': todo}
		todos.push(curr_todo);
		$('#input').val('');
		updateLocalStorage();
	}
	render() {
		return (
			<div>
				<div className="row">
				<form className="form" id="form" onSubmit={this.addTodo}>
				<div className="form-group col-md-11 col-xs-8">
			<input type="text" className="form-control" id="input" placeholder="Type a todo" required="true" maxLength="32"/>	
				</div>
				<div className="form-group col-md-1 col-xs-4">
					<button className="btn btn-primary btn-block">ADD</button>
				</div>
				
				</form>
				</div>
			</div>
		);
	}
}

class NotesComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			todos: todos,
		};
	}
	render() {
		return (
			<div className="todos row">
				{this.props.todos}			
			</div>
		);
	}
}

class NoteComponent extends React.Component {
	render() {
		return (
			<div className="col-md-12 col-xs-12 todo" id={this.props.id}>
				<span>{this.props.todo}</span>
				<DeleteComponent />
			</div>
		
		);
	}
}

class DeleteComponent extends React.Component {
	deleteTodo(e) {
		for(var i = 0; i < todos.length; i ++)
		{
			if(todos[i].id == e.target.parentNode.getAttribute('id'))
			{
				todos.splice(i, 1);
				break;
			}
		}
		updateLocalStorage();
		
	}
	render() {
		return (
			<button className="btn btn-danger pull-right" onClick={this.deleteTodo}>Delete</button>
		);
	}
}

ReactDOM.render(
	<InputComponent />,
	document.getElementById('input-box')
);

function updateLocalStorage() {

	localStorage.setItem('remember', JSON.stringify(todos));
	const tempNotes = todos.map((todo) => {
		return <NoteComponent todo={todo.todo} key={todo.id} id={todo.id}/>
	});
	ReactDOM.render(<NotesComponent todos={tempNotes}/>, document.getElementById('todo-box'))
}

function generateID() {
	return Math.random().toString(36).slice(-8);
}


updateLocalStorage();