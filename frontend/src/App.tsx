import { useState } from "react";
import { useUserData } from "./hooks/useUserData";
import { useHomeData } from "./hooks/useHomeData";
import HomeListingCard from "./components/HomeListingCard";
import UserSelector from "./components/UserSelector";
import Paginate from "./components/Paginate";

function App() {
  const [offset, setOffSet] = useState(0);
  const [selectedUser, setSelectedUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: users, isLoading: userLoading } = useUserData();
  const homeData = useHomeData(offset, setTotalPages);

  const handleUserChange = (userId: number) => {
    setSelectedUser(userId);
    setOffSet(0);
    setCurrentPage(1);
    homeData.mutate(userId);
  };

  const onClickNext = () => {
    if (currentPage < totalPages) {
      setOffSet((prev) => prev + 50);
      homeData.mutate(selectedUser);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onClickPrevious = () => {
    if (offset > 0) {
      setOffSet((prev) => prev - 50);
      homeData.mutate(selectedUser);
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (homeData.isPending || userLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <UserSelector users={users} handleUserChange={handleUserChange} selectedUser={selectedUser} />

      {Array.from(homeData.data?.homes || [])?.length > 0 && (
        <Paginate currentPage={currentPage} onClickNext={onClickNext} onClickPrevious={onClickPrevious} totalPages={totalPages} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {homeData.data?.homes.map(home => (
          <HomeListingCard key={home.id} home={home} selectedUser={selectedUser} mutateFn={homeData.mutate} />
        ))}
      </div>

      {Array.from(homeData.data?.homes || [])?.length > 0 && (
        <Paginate currentPage={currentPage} onClickNext={onClickNext} onClickPrevious={onClickPrevious} totalPages={totalPages} />
      )}
    </>
  );
}

export default App;
