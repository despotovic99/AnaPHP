import '../styles/GlobalStyle.css'
import Table from "../components/Table";
import {dummyTasks} from "../common/dummy-data/dummy-data";
import {useNavigate} from "react-router-dom";

const TasksPage = () => {
    const navigate = useNavigate();
    const tasksTableColumns = ['Title', 'Description', 'Due date', 'Priority', 'Task group'];

    const editTaskNavigationHandler = (taskId: number) => {
        navigate('/task', {state: {mode: 'EDIT', taskId}})
    }

    return (
        <div className={'card'}>
            <div className={'card-title-container'}>
                <h2>Tasks</h2>
                <button onClick={() => navigate('/task', {state: {mode: 'ADD'}})} className={'card-button'}>+ Add
                </button>
            </div>
            <Table columns={tasksTableColumns} onClick={editTaskNavigationHandler} tasks={dummyTasks}/>
        </div>
    )
}
export default TasksPage;
