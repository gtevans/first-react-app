import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useState } from "react/cjs/react.development";
import Button from "./Button";

const TaskDetails = () => {
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        const fetchTask = async () => {
            console.log(params.id);
            const res = await fetch(`http://localhost:5100/tasks/${params.id}`);

            if (res.status === 404) {
                navigate('/');
            }

            const data = await res.json();
            console.log(data);
            setTask(data);
            setLoading(false);
        };

        fetchTask();
    });

    return loading ? (<h3>Loading...</h3>)
        :
        <div>
            <h3>Task Details - {task.id}</h3>
            <p>{pathname}</p>
            <Button onClick={() => navigate(-1)} text='Go Back' />
        </div>

}
export default TaskDetails
