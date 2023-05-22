import '../styles/GlobalStyle.css';
import '../styles/AddOrEditTaskPageStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {TaskGroup} from "../common/models/task.interface";
import axios from "../api/axios";
import {AuthContext} from "../store/AuthContext";


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

    const authContext = useContext(AuthContext);

    const [executors, setExecutors] = useState<any[]>(dummyExecutors)
    const [title, setTitle] = useState<string>();
    const [priorityOptions, setPriorityOptions] = useState<number[]>()
    const [taskTitle, setTaskTitle] = useState<string>();
    const [priority, setPriority] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [selectedExecutors, setSelectedExecutors] = useState<any[]>([]);
    const [taskGroup, setTaskGroup] = useState<TaskGroup>();
    const [dueDate, setDueDate] = useState<string>();
    const [files, setFiles] = useState<FileList | undefined>();
    const [taskStatus, setTaskStatus] = useState()


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

    const onClickSaveHandler = async () => {
        const data = {
            title: taskTitle,
            priority,
            description,
            executors: [26,27],
            taskGroupId: taskGroup?.id,
            dueDate,
            files,
            manager: null
        }
        console.log(files)
        const token = await localStorage.getItem('token');
        console.log(token);
        const response = await axios.post(`/task/create.php`, data, {
            baseURL: process.env.REACT_APP_BASE_URL,
            headers: {
                'Access-Token': token,
                'Content-Type': 'multipart/form-data',
                'Content-Length': 200
            }
        });
        console.log(response);
    }


    useEffect(() => {
        generatePriorityOptions();
        if (!location.state || !location.state.mode) return;
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
                                   value={taskTitle}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskTitle(event.currentTarget.value)}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Priority</label>
                            <select className={'select-priority'}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => setPriority(event.target.value)}
                                    value={priority}>
                                {priorityOptions && priorityOptions.map((option => (<option>{option}</option>)))}
                            </select>
                        </div>

                    </div>
                    <div className={'form-field-container'}>
                        <label>Description</label>
                        <textarea value={description}
                                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}/>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'checkbox-container'}>
                            <label>Executors</label>
                            {executors.map((executor, index) => (
                                <div className={'options-container'}><label>
                                    <input
                                        type="checkbox"
                                        checked={selectedExecutors.includes(executor.id)}
                                        onChange={() => handleExecutor(executor.id)}
                                    />
                                    {executor.name}
                                </label></div>))}
                        </div>
                        <div className={'form-field-container'}>
                            <label>Managers</label>
                            <select className={'user-select'}>
                                {/*TODO add dynamic list of users*/}
                                <option>Nemanja</option>
                            </select>
                        </div>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Task Group</label>
                            <select className={'user-select'}
                                    value={taskGroup?.name}
                                    onChange={handleTaskGroup}
                            >
                                {/*TODO add dynamic list of groups*/}
                                {dummyTaskGroups.map((group, index) => (
                                    <option key={index} value={index}>{group.name}</option>))}
                            </select>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Due Date</label>
                            <input type={"date"} className={'due-date-input'} value={dueDate}
                                   onChange={(event: ChangeEvent<HTMLDataElement>) => setDueDate(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={'form-field-container'}>
                        <label>File</label>
                        <input type={'file'}
                               multiple={true}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setFiles(event?.target?.files ? event.target.files : undefined)}/>
                    </div>
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
