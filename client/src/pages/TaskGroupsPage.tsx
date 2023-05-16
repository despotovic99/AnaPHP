import '../styles/GlobalStyle.css'
import {useNavigate} from "react-router-dom";
import Table from "../components/Table";
import {dummyTaskGroups} from "../common/dummy-data/dummy-data";

const TaskGroupsPage = () => {
    const taskGroupsColumns = ['Name', 'Description', 'Number of tasks'];
    const navigate = useNavigate();
    return <div className={'card'}>
        <div className={'card-title-container'}>
            <h2>Task Groups</h2>
            <button onClick={() => navigate('/task-group', {state: {mode: 'ADD'}})} className={'card-button'}>+ Add
            </button>
        </div>
        <Table columns={taskGroupsColumns} onClick={() => {
        }} taskGroups={dummyTaskGroups}/>
    </div>
}
export default TaskGroupsPage;
