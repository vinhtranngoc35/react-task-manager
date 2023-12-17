import React, { useEffect, useState } from 'react'
import { BASE_API } from '../util/AppConstant';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

export const TASK = 'tasks'
export default function useTask() {
    return useQuery({
        queryKey: [TASK],
        queryFn: () => axios(BASE_API + TASK)
            .then(res => res.data)
    });
}
export async function useUpdateTaskStatus(id, status) {
    return useMutation({
        mutationKey: [TASK, id, status],
        mutationFn: async () => {
            const res = await axios(BASE_API + `${TASK}/status/${id}/${status}`);
            return res.data;
        }
    })

}

