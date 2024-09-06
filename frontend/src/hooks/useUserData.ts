import { useQuery } from "@tanstack/react-query";
import { User } from "../types/user";

export const useUserData = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: async (): Promise<User[]> => {
            const response = await fetch('http://localhost:3000/user/find-all');
            return response.json();
        },
        retry: 5,
    });
};
