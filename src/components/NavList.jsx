import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { TodoList } from "../pages/TodoList";
import { Link, useNavigate } from "react-router-dom";
import TaskDaily from "../pages/TaskDaily";
import { ModalSaveTaskDaily } from "./TaskDaily/ModalSaveTaskDaily";

export function TabsWithIcon({ value }) {
    const data = [
        {
            label: "Task",
            value: "dashboard",
            icon: Square3Stack3DIcon,
            desc: <TodoList />,
            href: '/'
        },
        {
            label: "Daily Task",
            value: "dailyTask",
            icon: UserCircleIcon,
            desc: <TaskDaily />,
            href: '/daily-task'
        },
        {
            label: "Settings",
            value: "settings",
            icon: Cog6ToothIcon,
            desc: <ModalSaveTaskDaily />,
            href: '/settings'
        },
    ];
    const navigate = useNavigate();

    function navigateToUrl(url) {
        navigate(url);
    }
    return (
        <Tabs value={value} className={'overflow-y-scroll'}>
            <TabsHeader>
                {data.map(({ label, value, icon, href }) => (

                    <Tab key={value} value={value} onClick={() => navigateToUrl(href)}>
                        <div className="flex items-center gap-2">
                            {React.createElement(icon, { className: "w-5 h-5" })}
                            {label}
                        </div>
                    </Tab>


                ))}
            </TabsHeader>
            <TabsBody>
                {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                        {desc}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs >
    );
}
