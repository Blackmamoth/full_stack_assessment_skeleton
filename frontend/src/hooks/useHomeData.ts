import { useMutation } from "@tanstack/react-query";
import { HomeDetails } from "../types/home";

export const useHomeData = (offset: number, setTotalPages: (totalPages: number) => void) => {
    return useMutation({
        mutationKey: ['homes'],
        mutationFn: async (userId: number): Promise<{ homes: HomeDetails[], total_count: number }> => {
            const response = await fetch('http://localhost:3000/home/find-by-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, offset: offset })
            });
            return response.json();
        },
        onSuccess: (data) => {
            setTotalPages(Math.ceil(data.total_count / 50));
        },
        retry: 5,
    });
};
