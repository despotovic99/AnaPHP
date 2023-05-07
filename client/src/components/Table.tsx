import React from "react";
import '../styles/TableStyle.css'

type TableHeaderProps = {
    columns: string[]
    data: any
}

const Table: React.FC<TableHeaderProps> = (props: TableHeaderProps) => {
    return (
        <div className={'table'}>
            <div className={'table-header'}>
                {props.columns.map((column, index) => (
                    <p key={`column_${index}`}>{column}</p>
                ))}
            </div>
            <div className={'table-body'}>
                {props.data.map((item: any, index: number) => (<div key={index} className={'table-row'}>
                    <p>{item.firstName}</p>
                    <p>{item.lastName}</p>
                    <p>{item.role}</p>
                    <p>{item.phoneNumber}</p>
                    <p>{item.dateOfBirth}</p>
                    <div className={'action-buttons-container'}>
                        <button className={'action-button action-button-edit'}>
                            Edit
                        </button>
                        <button className={'action-button action-button-delete'}>
                            Delete
                        </button>
                    </div>
                </div>))}
            </div>
        </div>)
}
export default Table;
