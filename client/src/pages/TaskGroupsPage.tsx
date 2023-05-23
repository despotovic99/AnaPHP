import '../styles/GlobalStyle.css'
import {useNavigate} from "react-router-dom";
import Table from "../components/Table";
import {dummyTaskGroups} from "../common/dummy-data/dummy-data";
import {useEffect, useState} from "react";
import {TaskGroup} from "../common/models/task.interface";
import axios from "axios";
import {toast} from "react-toastify";

const TaskGroupsPage = () => {
    const taskGroupsColumns = ['ID', 'Name', 'Actions'];
    const navigate = useNavigate();

    const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);

    const getAllTaskGroups = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/task-group/all.php', {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token
                }
            })
            setTaskGroups(response.data.data.taskGroups);
        } catch (error: any) {
            toast.error(error?.data?.data?.message);
        }
    }
    const editTaskGroupNavigationHandler = (id: number) => {
        navigate('/task-group', {state: {mode: 'EDIT', id}})
    }

    const deleteHandler = async (id: number) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.post('/task-group/delete.php', {id: id}, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Length': 80,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            setTaskGroups(prevState => prevState.filter(group => group.id !== id));
            toast.success('Successfully deleted!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error)
        }
    }


    useEffect(() => {
        getAllTaskGroups();
    }, [])

    return <div className={'card'}>
        <div className={'card-title-container'}>
            <h2>Task Groups</h2>
            <button onClick={() => navigate('/task-group', {state: {mode: 'ADD'}})} className={'card-button'}>+ Add
            </button>
        </div>
        <Table columns={taskGroupsColumns} hasActionButtons={true} onClickDelete={deleteHandler}
               onClick={editTaskGroupNavigationHandler}
               taskGroups={taskGroups}/>
    </div>
}
export default TaskGroupsPage;
