import React, {useEffect, useState} from "react";
import '../styles/TableStyle.css'
import {User, UserRole} from "../common/models/user.interface";
import {Task, TaskGroup} from "../common/models/task.interface";

type TableHeaderProps = {
    columns: string[]
    users?: User[]
    userRoles?: UserRole[]
    tasks?: Task[]
    taskGroups?: TaskGroup[]
    hasActionButtons?: boolean
    onClick: (id: number) => void
    onClickDelete?: (id: number) => void
    finishTask?: (id: number) => void
}

const Table: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {

    const [roleName, setRoleName] = useState('');
    const handleButtonClick = (event: any, id: number) => {
        if (event.stopPropagation) event.stopPropagation();
        props.onClickDelete && props.onClickDelete(id);
    }
    const finishTaskHandler = (event: any, id: number) => {
        if (event.stopPropagation) event.stopPropagation();
        props.finishTask && props.finishTask(id);
    }
    const getRole = async () => {
        const role = await localStorage.getItem('role')
        if (!role) return;
        setRoleName(role);
    }

    useEffect(() => {
        getRole();
    }, [])

    return (
        <div className={'table'}>
            <div className={'table-header'}>
                {props.columns.map((column, index) => (
                    <p key={`column_${index}`}>{column}</p>
                ))}
            </div>
            <div className={'table-body'}>
                {props.users?.map((item: User, index: number) => (
                    <div key={index} className={'table-row'} onClick={props.onClick.bind(this, item.id)}>
                        <p className={'column'}>{item.firstName}</p>
                        <p className={'column'}>{item.lastName}</p>
                        <p className={'column'}>{item.userRole}</p>
                        <p className={'column'}> {item.phone}</p>
                        <p className={'column'}>{item.birthday}</p>
                        {props.hasActionButtons && <div className={'action-buttons-container'}>
                            <button onClick={props.onClick.bind(this, item.id)}
                                    className={'action-button action-button-edit'}>
                                Edit
                            </button>
                        </div>}
                    </div>))}
                {props.tasks?.map((item: Task, index) => (
                    <div key={`${item.id}_${item.title}_${index}`} onClick={props.onClick.bind(this, item.id)}
                         className={'table-row'}>
                        <p className={'column'}>{item.title}</p>
                        <p className={'column'}>{item.description}</p>
                        {item.dueDate && <p className={'column'}>{item.dueDate.split(' ')[0]}</p>}
                        <p className={'priority-column'}>{item.priority}</p>
                        {item.taskGroupName && <p className={'column'}>{item.taskGroupName}</p>}
                        {props.hasActionButtons && <div className={'action-buttons-container'}>
                            <button onClick={props.onClick.bind(this, item.id)}
                                    className={'action-button action-button-edit'}>
                                Edit
                            </button>
                            <button onClick={(event) => handleButtonClick(event, item.id)}
                                    className={'action-button action-button-delete'}>
                                Delete
                            </button>
                            {roleName?.toLowerCase() === 'izvrsilac' &&
                                <button onClick={(event) => finishTaskHandler(event, item.id)}
                                        className={`action-button ${item.completed ? 'action-button-done' : 'action-button-finish'}`}>
                                    {item.completed ? 'Done' : 'Finish'}
                                </button>}
                        </div>}
                    </div>))}
                {props.taskGroups?.map((taskGroup, index) => (
                    <div key={`${taskGroup.id}_${taskGroup.name}_${index}`} className={'table-row'}
                         onClick={props.onClick.bind(this, taskGroup.id)}>
                        <p>{taskGroup.id}</p>
                        <p>{taskGroup.name}</p>
                        {props.hasActionButtons && <div className={'action-buttons-container'}>
                            <button onClick={props.onClick.bind(this, taskGroup.id)}
                                    className={'action-button action-button-edit'}>
                                Edit
                            </button>
                            <button onClick={(event) => handleButtonClick(event, taskGroup.id)}
                                    className={'action-button action-button-delete'}>
                                Delete
                            </button>
                        </div>}
                    </div>
                ))}
                {props.userRoles?.map((role, index) => (
                    <div key={`${role.id}_${role.name}_${index}`} className={'table-row'}
                         onClick={props.onClick.bind(this, role.id)}>
                        <p>{role.id}</p>
                        <p>{role.name}</p>
                        {props.hasActionButtons && <div className={'action-buttons-container'}>
                            <button onClick={props.onClick.bind(this, role.id)}
                                    className={'action-button action-button-edit'}>
                                Edit
                            </button>

                        </div>}
                    </div>))}
            </div>
        </div>)
}
export default Table;
