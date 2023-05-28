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
    const tasksTableColumns = ['Title', 'Status', 'Due date', 'Priority', 'Task group', 'Actions'];
    const [tasks, setTasks] = useState<Task[]>([])
    const [priorityOptions, setPriorityOptions] = useState<number[]>([]);
    const [executors, setExecutors] = useState<User[]>([]);
    const [managers, setManagers] = useState<User[]>([])
    const [priority, setPriority] = useState<number>();
    const [selectedExecutor, setSelectedExecutor] = useState<string>();
    const [selectedManager, setSelectedManager] = useState<string>();
    const [userRole, setUserRole] = useState<string>();
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

    const getExecutorsAndManagers = async () => {
        try {
            const token = await localStorage.getItem('token');
            const executorsResponse = await axios.get('/task/getUsers.php?type=izvrsilac', {
                baseURL: process.env.REACT_APP_BASE_URL, headers: {
                    'Access-Token': token
                }
            })

            const managersResponse = await axios.get('/task/getUsers.php?type=rukovodilac', {
                baseURL: process.env.REACT_APP_BASE_URL, headers: {
                    'Access-Token': token
                }
            })
            setManagers(managersResponse.data.data.users);
            setExecutors(executorsResponse.data.data.users);
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
            await axios.post('/task/finishExecutor.php', {taskId: taskId, completed: 1}, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });
            const updatedTasks = [...tasks];
            const task = tasks.find(item => item.id === taskId);
            if (!task) return;
            const updatedTask = {
                ...task,
                completed: 1
            };
            const updatedArray = updatedTasks.map(item => item.id === taskId ? updatedTask : item);
            setTasks(updatedArray);
            toast.success('Successfully finished!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    const getFilteredTasks = async () => {
        try {

            if ((dateFromRef.current?.value && !dateToRef.current?.value) || (!dateFromRef.current?.value && dateToRef.current?.value)) {
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
                filterQuery += `&from=${dateFromRef.current?.value}&to=${dateToRef.current?.value}`;
            }
            if (priority) {
                filterQuery += `&priority=${priority}`;
            }
            if (selectedExecutor) {
                filterQuery += `&executor=${selectedExecutor}`
            }
            if (selectedManager) {
                filterQuery += `&manager=${selectedManager}`
            }
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

    const getUserRole = async () => {
        const role = await localStorage.getItem('role');
        if (!role) return;
        setUserRole(role);
    }

    useEffect(() => {
        generatePriorityOptions();
        getAllTasks();
        getExecutorsAndManagers();
        getUserRole();
    }, [])


    return (
        <div className={'card'}>
            <div className={'card-title-container'}>
                <h2>Tasks</h2>
                {userRole?.toLowerCase() !== 'izvrsilac' &&
                    <button onClick={() => navigate('/task', {state: {mode: 'ADD'}})} className={'card-button'}>+ Add
                    </button>}
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
                {userRole?.toLowerCase() !== 'izvrsilac' && <div className={'filter'}>
                    <label>Priority</label>
                    <select value={priority}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => setPriority(parseInt(event.target.value))}>
                        <option value={undefined}></option>
                        {priorityOptions.map(option => <option>{option}</option>)}
                    </select>
                </div>}
                <div className={'filter'}>
                    <label>Executor</label>
                    <select value={selectedExecutor}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setSelectedExecutor(event.target.value);
                            }}>
                        <option></option>
                        {executors.map(executor => (<option key={executor.id}
                                                            value={executor.id}>{executor.firstName} {executor.lastName}</option>))}
                    </select>
                </div>
                {userRole?.toLowerCase() === 'izvrsilac' && <div className={'filter'}>
                    <label>Manager</label>
                    <select value={selectedManager}
                            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                setSelectedManager(event.target.value);
                            }}>
                        <option></option>
                        {managers.map(manager => (<option key={manager.id}
                                                          value={manager.id}>{manager.firstName} {manager.lastName}</option>))}
                    </select>
                </div>}
                <div className={'filter'}>
                    <label>Title</label>
                    <input ref={taskTitleRef} type={'text'}/>
                </div>
                <div className={'filter-buttons-container'}>
                    <button onClick={getFilteredTasks} className={'filter-button'}>Filter</button>
                </div>
            </div>
            <Table hasActionButtons={true} columns={tasksTableColumns} onClickDelete={deleteHandler}
                   onClick={editTaskNavigationHandler} finishTask={finishTask}
                   tasks={tasks}/>
        </div>
    )
}
export default TasksPage;
