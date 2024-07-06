import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import '../styles/AddOrEditTaskGroupStyle.css'

const AddOrEditTaskGroup = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>();
    const [taskGroupName, setTaskGroupName] = useState('');
    const getTaskGroup = async (id: number) => {
        try {
            const token = await localStorage.getItem('token');
            const response = await axios.get(`/task-group/get.php?id=${id}`, {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token
                }
            })
            setTaskGroupName(response.data.data.taskGroup.name);
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }
    }


    const onClickSaveHandler = async () => {
        try {
            const token = await localStorage.getItem('token');
            const config = {
                baseURL: process.env.REACT_APP_BASE_URL,
                headers: {
                    'Access-Token': token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };

            if (location.state.mode === 'ADD') {
                await axios.post('/task-group/create.php', {name: taskGroupName}, config)
            } else {
                await axios.post(`/task-group/update.php`, {name: taskGroupName, id: location.state.id}, config)
            }
            toast.success('Successfully saved!');
            navigate('/task-groups');
        } catch (error: any) {
            toast.error(error?.response?.data?.data?.error);
        }

    }

    useEffect(() => {
        if (!location.state || !location.state.mode) return;
        if (location.state.id) {
            getTaskGroup(location.state.id);
        }
        setTitle(location.state.mode === 'EDIT' ? 'Edit Task Group' : 'Add Task Group');
    }, [])

    return <div className={'card'}>
        <div className={'detail-card-container'}>
            <div className={'card-navigation-container'}>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => navigate('/task-groups')} className={'icon'}/>
                {title && <h2>{title}</h2>}
            </div>
            <div className={'card-detail-page'}>
                <div className={'form-container'}>
                    <div className={'form-field-container'}>
                        <label>Name</label>
                        <input className={'input-field'} type={'text'} value={taskGroupName}
                               onChange={(event: ChangeEvent<HTMLInputElement>) => setTaskGroupName(event.target.value)}/>
                    </div>
                    <button className={'save-button'} onClick={onClickSaveHandler}>Save</button>
                </div>
            </div>
        </div>
    </div>
}
export default AddOrEditTaskGroup;
