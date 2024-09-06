import { User } from "../types/user";

type Props = {
    users: User[] | undefined;
    selectedUser: number;
    handleUserChange: (userId: number) => void;
};

const UserSelector = ({ users, selectedUser, handleUserChange }: Props) => {
    return (
        <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => handleUserChange(parseInt(e.target.value, 10))}
            value={selectedUser}
        >
            <option value={0}>None</option>
            {users?.map(user => (
                <option key={user.id} value={user.id}>
                    {user.username}
                </option>
            ))}
        </select>
    );
};

export default UserSelector;
