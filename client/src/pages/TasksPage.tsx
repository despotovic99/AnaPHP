import '../styles/GlobalStyle.css'
import Table from "../components/Table";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {useEffect, useState} from "react";
import {Task} from "../common/models/task.interface";

const TasksPage = () => {
    const navigate = useNavigate();
    const tasksTableColumns = ['Title', 'Description', 'Due date', 'Priority', 'Task group'];

    const [tasks, setTasks] = useState<Task[]>()
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
            <Table columns={tasksTableColumns} onClick={editTaskNavigationHandler} tasks={tasks}/>
        </div>
    )
}
export default TasksPage;
