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
}

const Table: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {

    const handleButtonClick = (event: any) => {
        if (event.stopPropagation) event.stopPropagation();
        //TODO implement function
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
                            <button onClick={handleButtonClick} className={'action-button action-button-delete'}>
                                Delete
                            </button>
                        </div>}
                    </div>))}
                {props.tasks?.map((item: Task, index) => (
                    <div key={`${item.id}_${item.title}_${index}`} onClick={props.onClick.bind(this, item.id)}
                         className={'table-row'}>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        {item.dueDate && <p>{item.dueDate}</p>}
                        <p>{item.priority}</p>
                        {item.taskGroup && <p>{item.taskGroup}</p>}
                    </div>))}
                {props.taskGroups?.map((taskGroup, index) => (
                    <div key={`${taskGroup.id}_${taskGroup.name}_${index}`} className={'table-row'}>
                        <p>{taskGroup.name}</p>
                        <p>{taskGroup.description}</p>
                        <p>{taskGroup.numberOfTasks}</p>
                    </div>
                ))}
            </div>
        </div>)
}
export default Table;
