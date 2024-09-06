import { UseMutateFunction, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { HomeDetails } from "../types/home"
import { User } from "../types/user"
import { useState } from "react"

type Props = {
    home: HomeDetails
    selectedUser: number
    mutateFn: UseMutateFunction<{ homes: HomeDetails[] }, Error, number, unknown>
}

const EditUsersModal = ({ home, selectedUser, mutateFn }: Props) => {

    const [unCheckedUsers, setUnCheckedUsers] = useState<number[]>([])

    const queryClient = useQueryClient()

    const closeModal = () => (document.getElementById(`edit_home_${home.id}`) as any).close()

    const userData = useQuery({
        queryKey: [`users_for_${home.id}`],
        queryFn: async (): Promise<User[]> => {
            return (await fetch('http://localhost:3000/user/find-by-home', {
                method: 'POST',
                body: JSON.stringify({ home_id: home.id }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })).json()
        }
    })


    const onEdit = useMutation({
        mutationKey: [`edit_${home.id}`],
        mutationFn: async (): Promise<void> => {
            (await fetch('http://localhost:3000/home/update-users', {
                method: 'PATCH',
                body: JSON.stringify({ home_id: home.id, unchecked_users: unCheckedUsers }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }))
        },
        onSuccess() {
            try {
                mutateFn(selectedUser)
                queryClient.invalidateQueries({ queryKey: [`users_for_${home.id}`] })
            } catch (error) {
                console.error(error)
            }
            finally {
                closeModal()
            }
        },
    })

    return (
        <dialog id={`edit_home_${home.id}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center">
                    Edit Users for: {home.street_address}
                </h3>
                <div className="modal-action">
                    <form method="dialog" className="w-full flex flex-col items-center">
                        <div className="flex flex-col items-start w-full space-y-2"> {/* Aligning items to the left */}
                            {Array.from(userData.data || []).map((user) => (
                                <label className="label cursor-pointer flex items-center" key={user.id}>
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="checkbox checkbox-primary mr-2"
                                        value={user.id}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setUnCheckedUsers((prevState) => {
                                                    return prevState.filter(i => i != user.id)
                                                })
                                            } else {
                                                setUnCheckedUsers((prevState) => {
                                                    return [...new Set([...prevState, user.id])]
                                                })
                                            }
                                        }}
                                    />
                                    <span className="label-text">{user.username}</span>
                                </label>
                            ))}
                        </div>
                        <div className="flex space-x-2 mt-4">
                            <button onClick={() => onEdit.mutate()} className="btn btn-primary" type="button">
                                Save
                            </button>
                            <button onClick={closeModal} className="btn" type="button">
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>


    )
}

export default EditUsersModal