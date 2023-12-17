import { Card } from "@material-tailwind/react";
import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import React from "react";
import { TabsWithIcon } from "./components/NavList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
export const client = new QueryClient()
export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <TabsWithIcon value='dashboard' />,
    },
    {
      path: "/daily-task",
      element: <TabsWithIcon value='dailyTask' />,
    },
    {
      path: "/settings",
      element: <TabsWithIcon value='settings' />,
    }
  ])


  return (

    <div className="mx-auto bg-gray-300 ">
      <ToastContainer />
      <div className="px-5">
        <Card className="rounded-none h-screen" >
          <React.StrictMode>
            <QueryClientProvider client={client}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </React.StrictMode>
        </Card>
      </div>
    </div>

  );
}