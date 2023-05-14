import '../styles/GlobalStyle.css';
import '../styles/AddOrEditTaskPageStyle.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

const AddOrEditTaskPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState<string>();
    const [priorityOptions, setPriorityOptions] = useState<number[]>()

    const generatePriorityOptions = () => {
        const options: number[] = []
        for (let option = 1; option <= 10; option++) {
            options.push(option);
        }
        setPriorityOptions(options);
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
                            <input type={'text'}/>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Priority</label>
                            <select className={'select-priority'}>
                                {priorityOptions && priorityOptions.map((option => (<option>{option}</option>)))}
                            </select>
                        </div>

                    </div>
                    <div className={'form-field-container'}>
                        <label>Description</label>
                        <textarea/>
                    </div>
                    <div className={'form-fields-row'}>
                        <div className={'form-field-container'}>
                            <label>Executors</label>
                            <select className={'user-select'}>
                                {/*TODO add dynamic list of users*/}
                                <option>Nemanja</option>
                            </select>
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
                            <select className={'user-select'}>
                                {/*TODO add dynamic list of groups*/}
                                <option>Task Group 1</option>
                            </select>
                        </div>
                        <div className={'form-field-container'}>
                            <label>Due Date</label>
                            <input type={"date"} className={'due-date-input'}/>
                        </div>
                    </div>
                    <div className={'radio-buttons-container'}>
                        <p className={'label'}>Task Status</p>
                        <div className={'radio-button-container'}>
                            <label>Finished</label>
                            <input type={'radio'} name={'task-status'}/>
                        </div>
                        <div className={'radio-button-container'}>
                            <label>Canceled</label>
                            <input type={'radio'} name={'task-status'}/>
                        </div>
                    </div>
                    <div className={'comment-container'}>
                        <label>Comment</label>
                        <textarea/>
                    </div>
                    <button className={'save-button'}>Save</button>
                </div>
            </div>
        </div>
    </div>)
}
export default AddOrEditTaskPage;
