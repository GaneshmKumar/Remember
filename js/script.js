var todos = localStorage.getItem('remember');
todos = (todos == null || todos == '[]') ? [] : JSON.parse(todos);

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
				<div className="form-group col-md-8 col-md-offset-2">
					<input type="text" className="form-control" id="input" placeholder="Type a todo and hit enter" required="true" maxLength="32"/>	
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
				<div className="col-md-8 col-md-offset-2 col-xs-12">
					{this.props.todos}		
				</div>	
			</div>
		);
	}
}

class NoteComponent extends React.Component {
	render() {
		return (
			<div className="todo row" id={this.props.id}>
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
			<button className="btn pull-right delete" onClick={this.deleteTodo}>&#x2718;</button>
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