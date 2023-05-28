import '../styles/GlobalStyle.css'
import '../styles/TaskPageStyle.css'
import Table from "../components/Table";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {Task} from "../common/models/task.interface";
import {User} from "../common/models/user.interface";

const TasksPage = () => {
    const navigate = useNavigate();
    const tasksTableColumns = ['Title', 'Description', 'Due date', 'Priority', 'Task group', 'Actions'];

    const [tasks, setTasks] = useState<Task[]>([])
    const [priorityOptions, setPriorityOptions] = useState<number[]>([]);
    const [executors, setExecutors] = useState<User[]>([]);
    const [priority, setPriority] = useState<number>();
    const dateFromRef = useRef<HTMLInputElement>(null);
    const dateToRef = useRef<HTMLInputElement>(null);
    const taskTitleRef = useRef<HTMLInputElement>(null)
    const editTaskNavigationHandler = (taskId: number) => {
        navigate('/task', {state: {mode: 'EDIT', taskId}})
    }
    const generatePriorityOptions = () => {
        const options: number[] = []
        for (let option = 1; option <= 10; option++) {
            options.push(option);
        }
        setPriorityOptions(options);
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

    const getExecutors = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get('/task/getUsers.php?type=izvrsilac', {
                baseURL: process.env.REACT_APP_BASE_URL, headers: {
                    'Access-Token': token
                }
            });
            setExecutors(response.data.data.users);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }
    const deleteHandler = async (id: number) => {
        try {
            const token = await localStorage.getItem('token');
            await axios.post('/task/delete.php', {id: id}, {
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
            toast.success('Successfully finished!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    const getFilteredTasks = async () => {
        try {

            if ((dateFromRef.current?.value && !dateToRef.current?.value) || (!dateFromRef.current?.value && dateToRef.current?.value)) {
                console.log('s')
                toast.error('You must select date to and date from!');
                return;
            }
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (dateFromRef.current?.value && !regex.test(dateFromRef.current.value)) {
                toast.error('Date invalid. Required format is YYYY-MM-DD');
                return;
            }
            if (dateToRef.current?.value && !regex.test(dateToRef.current.value)) {
                toast.error('Date invalid. Required format is YYYY-MM-DD');
                return;
            }
            const token = await localStorage.getItem('token');
            let filterQuery = '?'
            if (taskTitleRef.current?.value?.length! > 1) {
                filterQuery += `&title=${taskTitleRef.current?.value}`;
            }
            if (dateFromRef.current?.value.length! > 1) {
                filterQuery += `&dateFrom=${dateFromRef.current?.value}&dateTo=${dateToRef.current?.value}`;
            }
            if (priority) {
                filterQuery += `&priority=${priority}`;
            }
            const query = `?title=${taskTitleRef.current?.value ? taskTitleRef.current.value : ''}
            &priority=${priority ? priority : ''}&dateFrom=${dateFromRef.current?.value}&dateTo=${dateToRef.current?.value}`
            const response = await axios.get(`/task/all.php${filterQuery}`, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token
                }
            });
            setTasks(response.data.data.tasks);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    useEffect(() => {
        generatePriorityOptions();
        getAllTasks();
        getExecutors();
    }, [])

    return (
        <div className={'card'}>
            <div className={'card-title-container'}>
                <h2>Tasks</h2>
                <button onClick={() => navigate('/task', {state: {mode: 'ADD'}})} className={'card-button'}>+ Add
                </button>
            </div>
            <div className={'filters-container'}>
                <div className={'date-filters'}>
                    <div className={'date-filter-container'}>
                        <label>Date from</label>
                        <input ref={dateFromRef} type={'text'} placeholder={'YYYY-MM-DD'}/>
                    </div>
                    <div className={'date-filter-container'}>
                        <label>Date to</label>
                        <input ref={dateToRef} type={'text'} placeholder={'YYYY-MM-DD'}/>
                    </div>
                </div>
                <div className={'filter'}>
                    <label>Priority</label>
                    <select value={priority}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => setPriority(parseInt(event.target.value))}>
                        <option></option>
                        {priorityOptions.map(option => <option>{option}</option>)}
                    </select>
                </div>
                <div className={'filter'}>
                    <label>Executor</label>
                    <select>
                        <option>Select executor</option>
                        {executors.map(executor => (<option>{executor.firstName} {executor.lastName}</option>))}
                    </select>
                </div>
                <div className={'filter'}>
                    <label>Title</label>
                    <input ref={taskTitleRef} type={'text'}/>
                </div>
                <button onClick={getFilteredTasks} className={'filter-button'}>Filter</button>
            </div>
            <Table hasActionButtons={true} columns={tasksTableColumns} onClickDelete={deleteHandler}
                   onClick={editTaskNavigationHandler} finishTask={finishTask}
                   tasks={tasks}/>
        </div>
    )
}
export default TasksPage;
