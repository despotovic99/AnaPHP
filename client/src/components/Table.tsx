import React from "react";
import '../styles/TableStyle.css'
import {User} from "../common/models/user.interface";
import {Task, TaskGroup} from "../common/models/task.interface";

type TableHeaderProps = {
    columns: string[]
    users?: User[]
    tasks?: Task[]
    taskGroups?: TaskGroup[]
    hasActionButtons?: boolean
    onClick: (id: number) => void
    onClickDelete?: (id: number) => void
    finishTask?: (id: number) => void
}

const Table: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {

    const handleButtonClick = (event: any, id: number) => {
        if (event.stopPropagation) event.stopPropagation();
        props.onClickDelete && props.onClickDelete(id);
    }
    const finishTaskHandler = (event: any, id: number) => {
        if (event.stopPropagation) event.stopPropagation();
        props.finishTask && props.finishTask(id);
    }

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
                        <p>{item.firstName}</p>
                        <p>{item.lastName}</p>
                        <p>{item.role}</p>
                        <p>{item.phoneNumber}</p>
                        <p>{item.dateOfBirth}</p>
                        {props.hasActionButtons && <div className={'action-buttons-container'}>
                            <button onClick={props.onClick.bind(this, item.id)}
                                    className={'action-button action-button-edit'}>
                                Edit
                            </button>
                            <button onClick={(event) => handleButtonClick(event, item.id)}
                                    className={'action-button action-button-delete'}>
                                Delete
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
                            <button onClick={(event) => finishTaskHandler(event, item.id)}
                                    className={'action-button action-button-finish'}>
                                Finish
                            </button>
                        </div>}
                    </div>))}
                {props.taskGroups?.map((taskGroup, index) => (
                    <div key={`${taskGroup.id}_${taskGroup.name}_${index}`} className={'table-row'}>
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
            </div>
        </div>)
}
export default Table;
