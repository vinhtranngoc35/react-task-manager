import axios from 'axios';
import { BASE_API } from '../util/AppConstant';
import { useMutation, useQuery } from '@tanstack/react-query';
import { client } from '../App';

export const DAILY_TASKS = 'daily-tasks';

export default function useDailyTask(search) {
    const fetchData = async (searchValue) => {
        const { data } = await axios(BASE_API + 'daily-tasks?search=' + searchValue);
        return data;
    }
    return useQuery({
        queryKey: [DAILY_TASKS, search],
        queryFn: () => fetchData(search)
    })
}

export function useCreateTask() {
    return useMutation({
        mutationFn: async (data) => {
            data = {
                ...data,
                category: {
                    id: data.category
                }
            }
            const res = await axios.post(BASE_API + DAILY_TASKS, data);
            return res.data;
        }
    })
}

