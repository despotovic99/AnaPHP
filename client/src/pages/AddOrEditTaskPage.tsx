import '../styles/GlobalStyle.css';
import '../styles/AddOrEditTaskPageStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faTimes} from "@fortawesome/free-solid-svg-icons";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Comment, Task, TaskGroup} from "../common/models/task.interface";
import axios from "../api/axios";
import {User} from "../common/models/user.interface";
import {toast} from "react-toastify";

const AddOrEditTaskPage = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [task, setTask] = useState<Task>({} as Task);
    const [executors, setExecutors] = useState<User[]>([]);
    const [managers, setManagers] = useState<User[]>([])
    const [title, setTitle] = useState<string>();
    const [priorityOptions, setPriorityOptions] = useState<number[]>()
    const [selectedExecutors, setSelectedExecutors] = useState<number[]>([]);
    const [files, setFiles] = useState<FileList | undefined>();
    const [filesToShow, setFilesToShow] = useState<string[]>([]);
    const [taskStatus, setTaskStatus] = useState<boolean>();
    const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');
    const [isExecutor, setIsExecutor] = useState<boolean>();


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
            const executorsArray: number[] = [];
            response.data.data.task.executors.forEach((executor: any) => executorsArray.push(executor.userId));
            setSelectedExecutors(executorsArray);
            setTask(response.data.data.task);
            setFiles(response.data.data.task.files);
            const filesFromTask: string[] = Object.values(response.data.data.task.files)
            setFilesToShow(filesFromTask);
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

    const handleFormChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        param: string,
    ) => {
        setTask((prevState: Task) => {
            return {
                ...prevState,
                [param]: event.target.value,
            };
        });
    };

    const onClickSaveHandler = async () => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(task.dueDate ? task.dueDate : '')) {
            toast.error('Date invalid. Required format is YYYY-MM-DD');
            return;
        }

        const dto = {
            ...task,
            executors: selectedExecutors,
            priority: task.priority ? task.priority : 1,
            files: files,
            status: task.status
        };
        try {
            const token = await localStorage.getItem('token');
            const config = {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'multipart/form-data',
                }
            };
            if (location.state.mode === 'ADD') {
                await axios.post(`/task/create.php`, dto, config);
            } else {
                await axios.post('/task/update.php', {
                    ...dto,
                    id: location.state.taskId,
                }, config);
            }
            toast.success('Successfully saved!');
            navigate('/tasks');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }


    const downloadFile = async (taskId: number, fileName: string) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get(`/task/getFile.php?id=${taskId}&fileName=${fileName}`, {
                baseURL: process.env.REACT_APP_BASE_URL,
                responseType: 'blob',
                headers: {
                    'Access-Token': token
                }
            });
            const fileBlob = new Blob([response.data], {type: 'application/octet-stream'});
            const fileUrl = URL.createObjectURL(fileBlob);
            const downloadLink = document.createElement('a');
            downloadLink.href = fileUrl;
            downloadLink.setAttribute('download', fileName); // Set the desired file name

            // Programmatically trigger a click event on the link to start the download
            downloadLink.click();

            // Clean up the temporary URL
            URL.revokeObjectURL(fileUrl);
        } catch (error: any) {
            toast.error('File not downloaded!');
        }

    }

    const handleUploadingFiles = (event: ChangeEvent<HTMLInputElement>) => {
        setFiles(event?.target?.files ? event.target.files : undefined);
        Object.values(event?.target?.files!).forEach(file => {
            setFilesToShow(prevState => [...prevState, file.name])
        })
    }

    const getComments = async (taskId: number) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get(`/comment/all.php?taskId=${taskId}`, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token
                }
            });
            setComments(response.data.data.comments);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error)
        }
    }

    const deleteCommentHandler = async (id: number) => {
        try {
            const token = await localStorage.getItem('token');
            await axios.post('/comment/delete.php', {id: id}, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Token': token
                }
            });
            setComments(prevState => prevState.filter(comment => comment.id !== id));
            toast.success('Successfully deleted!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    const deleteFileHandler = async (id: number, fileName: string) => {
        try {
            const token = await localStorage.getItem('token');
            await axios.post('/task/deleteFile.php', {id: id, fileName: fileName}, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Token': token
                }
            });
            setFilesToShow(prevState => prevState.filter(file => file !== fileName));
            toast.success('Successfully deleted!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }
    const saveCommentHandler = async () => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.post('/comment/add.php', {
                taskId: location.state.taskId,
                content: commentText
            }, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Access-Token': token
                }
            });
            setComments(prevState => [...prevState, {id: response.data.data.commentId, content: commentText}])
            setCommentText('');
            toast.success('Successfully saved!');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }

    const getUserRole = async () => {
        const role = await localStorage.getItem('role');
        if (!role) return;
        setIsExecutor(role.toLowerCase() === 'izvrsilac');
    }


    useEffect(() => {
        getUserRole();
        getExecutorsAndManagers();
        generatePriorityOptions();
        getAllTaskGroups();
        if (!location.state || !location.state.mode) return;
        if (location.state.taskId) {
            getComments(location.state.taskId);
            getTask(location.state.taskId);
        }
        setTitle(location.state.mode === 'EDIT' ? 'Edit Task' : 'Add Task');
    }, [])


    return (<div className={'card'}>
        <div className={'detail-card-container'}>
            <div className={'card-navigation-container'}>
                <FontAwesomeIcon onClick={() => navigate('/tasks')} className={'icon'} icon={faChevronLeft}/>
                {title && <h2>{isExecutor ? 'View task' : title}</h2>}
            </div>
            <div className={'card-detail-page'}>
                <div className={'form-container'}>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Title</label>
                            <input type={'text'}
                                   disabled={isExecutor}
                                   value={task?.title ? task.title : ''}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'title')}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Priority</label>
                            <select className={'select-priority'}
                                    disabled={isExecutor}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>) => handleFormChange(event, 'priority')}
                                    value={task.priority ? task.priority : ''}>
                                {priorityOptions && priorityOptions.map((option => (<option>{option}</option>)))}
                            </select>
                        </div>

                    </div>
                    <div className={'form-field-container'}>
                        <label>Description</label>
                        <textarea disabled={isExecutor} value={task.description ? task.description : ''}
                                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => handleFormChange(event, 'description')}/>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'checkbox-container'}>
                            <label>Executors</label>
                            {executors.length > 0 ? executors.map((executor, index) => (
                                <div className={'options-container'}><label>
                                    <input
                                        disabled={isExecutor}
                                        type="checkbox"
                                        checked={selectedExecutors.includes(executor.id)}
                                        onChange={() => handleExecutor(executor.id)}
                                    />
                                    {executor.firstName} {executor.lastName}
                                </label></div>)) : (<p>No executors found</p>)}
                        </div>
                        <div className={'form-field-container'}>
                            <label>Managers</label>
                            <select disabled={isExecutor} value={task.managerId ? task.managerId : ''}
                                    onChange={event => handleFormChange(event, 'managerId')}
                                    className={'user-select'}>
                                {managers.length > 0 ? managers.map(((manager) => (
                                    <option key={manager.id} value={manager.id}
                                            selected={task.managerId === manager.id}>{manager.firstName}</option>))) : (
                                    <option>No managers found</option>)}
                            </select>
                        </div>
                    </div>
                    <div className={'form-fields-row'}>
                        {!isExecutor && <div className={'form-field-container'}>
                            <label>Task Group</label>
                            <select disabled={isExecutor} className={'user-select'}
                                    value={task.taskGroupId ? task.taskGroupId : ''}
                                    onChange={(event => handleFormChange(event, 'taskGroupId'))}
                            >
                                {taskGroups.map((group, index) => (
                                    <option key={index}
                                            value={group.id}>{group?.name}</option>))}
                            </select>
                        </div>}
                        <div className={'form-field-container'}>
                            <label>Due Date</label>
                            <input disabled={isExecutor} type={"text"} className={'due-date-input'}
                                   value={task.dueDate ? task.dueDate.split(' ')[0] : ''}
                                   placeholder={'YYYY-MM-DD'}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleFormChange(event, 'dueDate')}
                            />
                        </div>
                    </div>
                    <div className={'form-field-container'}>
                        <label>File</label>
                        <input disabled={isExecutor} multiple={true} type={'file'}
                               onChange={handleUploadingFiles}/>
                    </div>
                    {task && task.files && (<div className={'form-field-container'}>
                        <div className={'files-container'}>
                            {filesToShow.map((file: string, index) => (
                                <div className={'file-preview-container'}>
                                    <button key={index + '_' + task?.id}
                                            onClick={() => downloadFile(task?.id, file)}
                                            className={'file-download-button'}>{file}</button>
                                    <FontAwesomeIcon className={'times-icon'} icon={faTimes}
                                                     onClick={() => deleteFileHandler(task?.id, file)}/>
                                </div>))}
                        </div>
                    </div>)}

                    {location.state.mode === 'EDIT' && <div className={'form-field-container'}>
                        <label>Task status</label>
                        <select disabled={isExecutor} value={task.status ? task.status : ''}
                                onChange={(event: ChangeEvent<HTMLSelectElement>) => handleFormChange(event, 'status')}
                                className={'user-select'}>
                            <option>Completed</option>
                            <option>Canceled</option>
                        </select>
                    </div>}
                    {location.state.mode === 'EDIT' && comments.length > 0 && <div className={'all-comments-container'}>
                        <label>All comments</label>
                        {comments.map(comment => (<div className={'show-comment-container'}><textarea disabled={true}
                                                                                                      value={comment.content}/>
                            <button onClick={() => deleteCommentHandler(comment?.id!)}>Delete</button>
                        </div>))}
                    </div>}
                    {location.state.mode === 'EDIT' && <div className={'comment-container'}>
                        <label>Add Comment</label>
                        <textarea value={commentText}
                                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setCommentText(event.target.value)}/>
                        <button className={'save-button'} onClick={saveCommentHandler}>Save Comment</button>
                    </div>}
                    {!isExecutor && <button className={'save-button'} onClick={onClickSaveHandler}>Save</button>}
                </div>
            </div>
        </div>
    </div>)
}
export default AddOrEditTaskPage;
