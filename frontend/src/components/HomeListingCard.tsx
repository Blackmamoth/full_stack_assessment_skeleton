import { UseMutateFunction } from "@tanstack/react-query";
import { HomeDetails } from "../types/home";
import EditUsersModal from "./EditUsersModal";

type Props = {
    home: HomeDetails;
    selectedUser: number;
    mutateFn: UseMutateFunction<{ homes: HomeDetails[] }, Error, number, unknown>;
};

const HomeListingCard = ({ home, selectedUser, mutateFn }: Props) => {
    const onClickEdit = () => {
        (document.getElementById(`edit_home_${home.id}`) as any)?.showModal();
    };

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">
                    {home.street_address}
                    <div className="badge badge-secondary">${home.list_price}</div>
                </h2>
                <p>State: {home.state}</p>
                <p>Zip: {home.zip}</p>
                <p>Sqft: {home.sqft}</p>
                <p>Beds: {home.beds}</p>
                <p>Baths: {home.baths}</p>
                <button
                    onClick={onClickEdit}
                    className="btn btn-outline btn-primary"
                    aria-label="Edit User"
                >
                    Edit User
                </button>
            </div>
            <EditUsersModal home={home} selectedUser={selectedUser} mutateFn={mutateFn} />
        </div>
    );
};

export default HomeListingCard;
