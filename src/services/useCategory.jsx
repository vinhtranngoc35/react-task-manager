import axios from 'axios';
import { BASE_API } from '../util/AppConstant';
import { useQuery } from '@tanstack/react-query';

const CATEGORY = 'categories';
export default function useCategory() {
    return useQuery({
        queryKey: [CATEGORY],
        queryFn: () => axios(BASE_API + CATEGORY)
            .then(res => res.data)
    });

}
