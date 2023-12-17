import {
    Timeline,
    Button,
} from "@material-tailwind/react";
import useTask, { useUpdateTaskStatus } from "../services/useTask";
import TodoItem from "../components/TodoItem";
import { useState } from "react";
import ModalCustom from "../components/ModalCustom";
import { COLOR_STATUS } from "../util/AppConstant";
import { client } from "../App";
import { success } from "../util/ToastUtil";

export function TodoList() {


    const [task, setTask] = useState({});

    const [open, setOpen] = useState(false);



    const { data: tasks } = useTask();

    const openChangeStatusModal = (task) => {
        setTask(task);
        setOpen(true);
    }
    const handleUpdateStatus = async (status) => {
        await useUpdateTaskStatus(task.id, status);
        client.invalidateQueries('tasks')
        setOpen(false)
        success('Updated task');
    }
    const showFoursStatusButton = () => {
        const statuses = ['TODO', 'IN_PROGRESS', 'DONE', 'DISMISS'];
        return <div className="flex flex-col sm:flex-row justify-around">
            {statuses.map((status, i) => <Button key={i} onClick={() => handleUpdateStatus(status)} variant='gradient' className='rounded-sm m-2 sm:mg-0' color={COLOR_STATUS[status]}>{status}</Button >)}
        </div>
    }

    return (
        <>
            <ModalCustom size={'md'} title={'Choose status for task: ' + task.title + '!'} open={open} handleOpen={setOpen} body={showFoursStatusButton()} />
            <Timeline>
                {tasks && tasks.map((e, i) => <TodoItem key={Math.random() + 'Todo' + i} task={e} lastItem={i === tasks.length - 1} open={open} openChangeStatusModal={openChangeStatusModal} />)}
            </Timeline>
        </>

    );
}
