import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from '../services/mutations';
import { useTodos, useTodosIds } from '../services/queries'
import { TODO } from '../types/todo';

const Todo = () => {

	const todosIdsQuery = useTodosIds();
	const todosQueries = useTodos(todosIdsQuery.data)

	const createTodoMutation = useCreateTodo()
	const updateTodoMutation = useUpdateTodo()
	const deleteTodoMutation = useDeleteTodo()

	const { register, handleSubmit } = useForm<TODO>()

	const handleTodoSubmit: SubmitHandler<TODO> = (data) => {
		createTodoMutation.mutate(data);
	}

	const handleUpdateTodoSubmit = (data: TODO | undefined) => {
		if (data) {
			updateTodoMutation.mutate({ ...data, checked: true })
		}
	}

	const handleDeleteTodo = (id: number | undefined) => {
		if(id){
			deleteTodoMutation.mutate(id);
		}
	}

	if (todosIdsQuery.isPending) {
		return <span>loading</span>
	}
	if (todosIdsQuery.isError) {
		return <span>Error occured</span>
	}

	return (
		<>
			{/* {todosIdsQuery.data.map((id) => (
				<p key={id}>{id}</p>
			))} */}
			<form onSubmit={handleSubmit(handleTodoSubmit)}>
				<h4>New todo:</h4>
				<input placeholder='Title' {...register("title")} />
				<br />
				<input placeholder='Description' {...register("description")} />
				<br />
				<input type='submit' disabled={createTodoMutation.isPending} value={createTodoMutation.isPending ? "Creating..." : "Create Todo"} />
			</form>

			<ul>
				{todosQueries.map(({ data }) => (
					<li key={data?.id}>
						<div>IDs: {data?.id}</div>
						<span>
							<strong>Title: </strong>{data?.title},{" "}
							<strong>Description: </strong>{data?.description},{" "}
						</span>
						<div>
							<button onClick={() => handleUpdateTodoSubmit(data)}>
								{data?.checked ? "Done" : "Mark as done"}
							</button>
							<button onClick={() => handleDeleteTodo(data?.id!)}>
								{/* {data?.checked ? "Done" : "Delete"} */}
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</>
	)
}

export default Todo