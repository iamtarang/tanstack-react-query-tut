import axios from "axios"
import { TODO } from "../types/todo"
import { PROJECTS } from "../types/projects";
import { PRODUCTS } from "../types/products";

const BASE_URL = 'http://localhost:8080'
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getTodosIds = async () => {
	return (await axiosInstance.get<TODO[]>('/todos')).data.map((todo) => todo.id)
};

export const getTodo = async (id: number) => {
	return (await axiosInstance.get<TODO>(`todos/${id}`)).data
}

export const createTodo = async (data: TODO) => {
	await axiosInstance.post('todos', data)
}

export const updateTodo = async (data: TODO) => {
	await axiosInstance.put(`todos/${data.id}`, data)
}

export const deleteTodo = async (id: number) => {
	await axiosInstance.delete(`todos/${id}`)
}

export const getProjects = async (page: 1) => {
	return (await axiosInstance.get<PROJECTS[]>(`projects?_page=${page}&_limit=3`)).data
}

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
	return (
		await axiosInstance.get<PRODUCTS[]>(`
			products?_page=${pageParam + 1}&_limit=3`)
	).data
}

export const getProduct = async (id: number) => {
	return (
		await axiosInstance.get<PRODUCTS[]>(`products/${id}`)
	).data
}