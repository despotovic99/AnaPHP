import '../styles/GlobalStyle.css'
import Table from "../components/Table";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {useEffect, useState} from "react";
import {Task} from "../common/models/task.interface";

const TasksPage = () => {
    const navigate = useNavigate();
    const tasksTableColumns = ['Title', 'Description', 'Due date', 'Priority', 'Task group', 'Akcije'];

    const [tasks, setTasks] = useState<Task[]>([])
    const editTaskNavigationHandler = (taskId: number) => {
        navigate('/task', {state: {mode: 'EDIT', taskId}})
    }

    const getAllTasks = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/task/all.php', {
                baseURL: process.env.REACT_APP_BASE_URL, headers: {
                    'Access-Token': token
                }
            });
            setTasks(response.data.data.tasks);
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        }
    }
    const deleteHandler = async (id: number) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.post('/task/delete.php', {id: id}, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Length': 80,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            setTasks(prevState => prevState.filter(group => group.id !== id));
            toast.success('Successfully deleted!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error)
        }
    }

    const finishTask = async (taskId: number) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.post('/task/finishExecutor.php', {taskId: taskId, completed: 1}, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            console.log(response);
            toast.success('Successfully finished!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, [])

    return (
        <div className={'card'}>
            <div className={'card-title-container'}>
                <h2>Tasks</h2>
                <button onClick={() => navigate('/task', {state: {mode: 'ADD'}})} className={'card-button'}>+ Add
                </button>
            </div>
            <Table hasActionButtons={true} columns={tasksTableColumns} onClickDelete={deleteHandler}
                   onClick={editTaskNavigationHandler} finishTask={finishTask}
                   tasks={tasks}/>
        </div>
    )
}
export default TasksPage;
