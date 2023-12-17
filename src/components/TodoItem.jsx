import { Button, Tooltip } from '@material-tailwind/react'
import React, { useId } from 'react'
import {
    TimelineItem,
    TimelineConnector,
    TimelineIcon,
    Typography,
    TimelineHeader,
} from "@material-tailwind/react";
import {
    BellIcon,
} from "@heroicons/react/24/solid";
import { COLOR_STATUS } from '../util/AppConstant';



function TodoItem({ task, lastItem, openChangeStatusModal }) {
    const { title, description, start, status } = task;
    const id = useId();
    return (
        <TimelineItem key={id} className="h-24 w-full">
            {!lastItem && <TimelineConnector className="!w-[78px]" />}
            <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                <TimelineIcon className="p-3" variant="ghost">
                    <BellIcon className="h-5 w-5" />
                </TimelineIcon>
                <div className="flex w-10/12 xs:w-8/12 flex-col gap-1">

                    <Typography variant="h6" color="blue-gray">
                        {title}, {start?.substring(0, 5)}
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal">
                        {description}
                    </Typography>
                </div>
                <div className='absolute right-4'>
                    <Button onClick={() => openChangeStatusModal(task)} variant='gradient' className='rounded-sm py-2 px-4' color={COLOR_STATUS[status]}>{status}</Button >
                </div>
            </TimelineHeader>
        </TimelineItem>
    )
}

export default TodoItem