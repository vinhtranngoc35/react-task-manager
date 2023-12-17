import React, { useEffect, useRef } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import useCategory from "../../services/useCategory";
import CustomField from "../CustomField/CustomField";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { DAILY_TASKS, useCreateTask } from "../../services/useDailyTask";
import { client } from "../../App";
import { success } from "../../util/ToastUtil";
import { TASK } from "../../services/useTask";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getTimeString, getTodayString } from "../../util/AppUtil";

export function ModalSaveTaskDaily({ search }) {

    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const [open, setOpen] = useState(searchParams.get('action') === 'create')
    const handleOpen = () => {
        setOpen((prev) => !prev)
        if (open) {
            navigate("/daily-task")
        } else {
            navigate("/daily-task?action=create")
        }
        reset();
    };

    const { data: categories } = useCategory();
    const formCreate = yup
        .object({
            title: yup.string()
                .min(2, "Title must be at least 2 characters")
                .max(20, "Title must be at most 20 characters"),
            repeatPerDay: yup
                .lazy((value) => value === '' ? yup.string() : yup.number().typeError("Please enter a number!").min(1)),
            category: yup.number().required("Please enter category"),
            description: yup.string(),
            date: yup.lazy((value) => value === '' ? yup.string() : yup.date().min(new Date().toLocaleDateString(), "Start must be great than now")
            ),
            time: yup.string()
        });
    const { register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        reset } = useForm({
            resolver: yupResolver(formCreate)
        })

    const inputs = [
        {
            name: 'title',
            defaultValue: '',
            label: 'Title'
        },
        {
            name: 'description',
            defaultValue: '',
            label: 'Description'
        },
        {
            name: 'start',
            defaultValue: getTodayString(),
            label: 'Date',
            type: 'date'
        },
        {
            name: 'time',
            defaultValue: getTimeString(),
            label: 'Time',
            type: 'time'
        },
        {
            name: 'repeatPerDays',
            defaultValue: '',
            label: 'Repeat Per Day'
        },
        {
            name: 'category',
            defaultValue: '',
            label: 'Category',
            type: 'select',
            options: categories
        },
    ]
    const form = useRef();
    const mumation = useCreateTask();
    const onSubmit = async (e) => {

        await mumation.mutate(e,
            {
                onSuccess: () => {
                    console.log('success')
                    client.invalidateQueries({
                        queryKey: [TASK]
                    })
                    // client.invalidateQueries(DAILY_TASKS, search);
                }
            });
        setOpen(false);
        success('Created');

    }
    return (
        <>
            <Button onClick={handleOpen} type="button" variant="gradient">
                Create Task
            </Button>
            <Dialog open={open} handler={handleOpen} fullWidth='md' maxWidth='md'>
                <form ref={form} onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>Create Task</DialogHeader>
                    <DialogBody divider>
                        {inputs.map(e => <CustomField key={e.name} {...e} setError={setError} register={register} error={errors[e.name]} setValue={setValue} />)}
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="text"
                            color="red"
                            className="mr-1"
                            onClick={handleOpen}
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button type="submit" variant="gradient" color="purple">
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    );
}