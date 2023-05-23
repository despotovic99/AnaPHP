import '../styles/GlobalStyle.css';
import '../styles/AddOrEditTaskPageStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Task, TaskGroup} from "../common/models/task.interface";
import axios from "../api/axios";
import {User} from "../common/models/user.interface";
import {toast} from "react-toastify";


const AddOrEditTaskPage = () => {
    const dummyTaskGroups: TaskGroup[] = [
        {id: 1, name: 'Task group 1', description: '1', numberOfTasks: 1},
        {id: 2, name: 'Task group 2', description: '1', numberOfTasks: 1},
        {id: 3, name: 'Task group 3', description: '1', numberOfTasks: 1},
        {id: 4, name: 'Task group 4', description: '1', numberOfTasks: 1}
    ]

    const dummyExecutors: any = [
        {id: 1, name: 'Petar'}, {id: 2, name: 'Marko'}, {id: 3, name: 'Mirko'}, {id: 4, name: 'Milos'},
    ]


    const navigate = useNavigate();
    const location = useLocation();

    const [task, setTask] = useState<Task>();
    const [executors, setExecutors] = useState<User[]>([]);
    const [managers, setManagers] = useState<User[]>([])
    const [title, setTitle] = useState<string>();
    const [priorityOptions, setPriorityOptions] = useState<number[]>()
    const [taskTitle, setTaskTitle] = useState<string>();
    const [priority, setPriority] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [selectedExecutors, setSelectedExecutors] = useState<number[]>([]);
    const [selectedManager, setSelectedManager] = useState<number>()
    const [taskGroup, setTaskGroup] = useState<TaskGroup>();
    const [dueDate, setDueDate] = useState<string>();
    const [files, setFiles] = useState<FileList | undefined>();
    const [taskStatus, setTaskStatus] = useState();
    const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);

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

    const generatePriorityOptions = () => {
        const options: number[] = []
        for (let option = 1; option <= 10; option++) {
            options.push(option);
        }
        setPriorityOptions(options);
    }

    const handleTaskGroup = (event: ChangeEvent<HTMLSelectElement>) => {
        setTaskGroup({
            name: dummyTaskGroups[parseInt(event.target.value)].name,
            id: dummyTaskGroups[parseInt(event.target.value)].id
        });
    }

    const handleExecutor = (optionId: number) => {
        const isSelected = selectedExecutors.includes(optionId);
        let updatedOptions;

        if (isSelected) {
            updatedOptions = selectedExecutors.filter((id) => id !== optionId);
        } else {
            updatedOptions = [...selectedExecutors, optionId];
        }
        setSelectedExecutors(updatedOptions)
    }

    const getTask = async (id: number) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get(`/task/get.php?id=${id}`, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token
                }
            });
            console.log(response);
            console.log(response.data.data.task.files)
            setTask(response.data.data.task);
            const date = new Date(response.data.data.task.dueDate)
            setDueDate(`${date.getMonth() + 1}` + '/' + date.getDate() + '/' + date.getFullYear())
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

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

    const onClickSaveHandler = async () => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dueDate ? dueDate : '')) {
            toast.error('Date invalid. Required format is YYYY-MM-DD');
            return;
        }
        const data = {
            title: taskTitle,
            priority,
            description,
            executors: selectedExecutors,
            taskGroupId: taskGroup?.id,
            dueDate,
            files,
            manager: selectedManager
        }
        const token = await localStorage.getItem('token');
        const response = await axios.post(`/task/create.php`, data, {
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                'Access-Token': token,
                'Content-Type': 'multipart/form-data',
                'Content-Length': 200
            }
        });
    }


    useEffect(() => {
        getExecutorsAndManagers();
        generatePriorityOptions();
        if (!location.state || !location.state.mode) return;
        if (location.state.taskId) {
            getTask(location.state.taskId);
        }
        getAllTaskGroups();
        setTitle(location.state.mode === 'EDIT' ? 'Edit Task' : 'Add Task');
    }, [])

    return (<div className={'card'}>
        <div className={'detail-card-container'}>
            <div className={'card-navigation-container'}>
                <FontAwesomeIcon onClick={() => navigate('/tasks')} className={'icon'} icon={faChevronLeft}/>
                {title && <h2>{title}</h2>}
            </div>
            <div className={'card-detail-page'}>
                <div className={'form-container'}>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Title</label>
                            <input type={'text'}
                                   value={taskTitle ? taskTitle : task?.title}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Priority</label>
                            <select className={'select-priority'}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => setPriority(event.target.value)}
                                    value={priority ? priority : task?.priority}>
                                {priorityOptions && priorityOptions.map((option => (<option>{option}</option>)))}
                            </select>
                        </div>

                    </div>
                    <div className={'form-field-container'}>
                        <label>Description</label>
                        <textarea value={description ? description : task?.description}
                                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}/>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'checkbox-container'}>
                            <label>Executors</label>
                            {executors.length > 0 ? executors.map((executor, index) => (
                                <div className={'options-container'}><label>
                                    <input
                                        type="checkbox"
                                        checked={selectedExecutors.includes(executor.id)}
                                        onChange={() => handleExecutor(executor.id)}
                                    />
                                    {executor.firstName}
                                </label></div>)) : (<p>No executors found</p>)}
                        </div>
                        <div className={'form-field-container'}>
                            <label>Managers</label>
                            <select value={selectedManager}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedManager(parseInt(event.target.value))}
                                    className={'user-select'}>
                                {managers.length > 0 ? managers.map(((manager) => (
                                    <option key={manager.id} value={manager.id}>{manager.firstName}</option>))) : (
                                    <option>No managers found</option>)}
                            </select>
                        </div>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Task Group</label>
                            <select className={'user-select'}
                                    value={taskGroup?.name ? taskGroup.name : task?.taskGroupName}
                                    onChange={handleTaskGroup}
                            >
                                {taskGroups.map((group, index) => (
                                    <option key={index} value={index}>{group.name}</option>))}
                            </select>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Due Date</label>
                            <input type={"text"} className={'due-date-input'}
                                   value={dueDate}
                                   placeholder={'YYYY-MM-DD'}
                                   onChange={(event: ChangeEvent<HTMLDataElement>) => setDueDate(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={'form-field-container'}>
                        <label>File</label>
                        <input multiple={true} type={'file'}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setFiles(event?.target?.files ? event.target.files : undefined)}/>
                    </div>
                    {task && task.files && (<div className={'form-field-container'}>
                        {Object.values(task?.files).map((file: any) => (<p>{file}</p>))}

                    </div>)}
                    {location.state.mode === 'EDIT' && <div className={'radio-buttons-container'}>
                        <p className={'label'}>Task Status</p>
                        <div className={'radio-button-container'}>
                            <label>Finished</label>
                            <input type={'radio'} name={'task-status'}/>
                        </div>
                        <div className={'radio-button-container'}>
                            <label>Canceled</label>
                            <input type={'radio'} name={'task-status'}/>
                        </div>
                    </div>}
                    {location.state.mode === 'EDIT' && <div className={'comment-container'}>
                        <label>Comment</label>
                        <textarea/>
                    </div>}
                    <button className={'save-button'} onClick={onClickSaveHandler}>Save</button>
                </div>
            </div>
        </div>
    </div>)
}
export default AddOrEditTaskPage;
