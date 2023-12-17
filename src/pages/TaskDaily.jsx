import React from 'react'
import useDailyTask from '../services/useDailyTask'
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { useState } from 'react';
import { useEffect } from 'react';
import { ModalSaveTaskDaily } from '../components/TaskDaily/ModalSaveTaskDaily';

const TABLE_HEAD = ["Title", "Description", "Start", "Repeat Per Day", "Category", "Action"];

function TaskDaily() {
    const [search, setSearch] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const { data: dailyTasks } = useDailyTask(searchQuery);

    useEffect(() => {
        const searchTimeOut =
            setTimeout(() => setSearchQuery(search), 500);
        return () => clearTimeout(searchTimeOut)
    }, [search])

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none py-1">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Management Tasks
                        </Typography>

                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                type='search'
                                onChange={(e) => setSearch(e.target.value)}
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>

                    </div>
                </div>
                <div className='my-4'>
                    <ModalSaveTaskDaily search={search} />
                </div>
            </CardHeader>
            <CardBody className="overflow-hidden px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dailyTasks?.map((item, index) => <ItemTaskDaily key={index} dailyTasks={dailyTasks} item={item} index={index} />)}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}

const ItemTaskDaily = ({ dailyTasks, item, index }) => {
    const {
        id,
        title,
        description,
        start,
        category,
        repeatPerDays
    } = item;
    const isLast = index === dailyTasks.length - 1;
    const classes = isLast
        ? "p-4"
        : "p-4 border-b border-blue-gray-50";

    return (
        <tr key={id}>
            <td className={classes}>
                <div className="flex items-center gap-3">

                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                    >
                        {title || ''}
                    </Typography>
                </div>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {description || ''}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {start?.substring(0, 5) || ''}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {repeatPerDays || ''}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {category || ''}
                </Typography>
            </td>


            <td className={classes}>
                <Tooltip content="Edit Task">
                    <IconButton variant="text">
                        <PencilIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Delete Task">
                    <IconButton color='pink' variant="text">
                        <TrashIcon className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}

export default TaskDaily