type Props = {
    onClickPrevious: () => void
    onClickNext: () => void
    currentPage: number
    totalPages: number
}

const Paginate = ({ currentPage, onClickNext, onClickPrevious, totalPages }: Props) => {
    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button
                className="btn btn-outline btn-primary text-lg disabled:btn-disabled"
                onClick={onClickPrevious}
                disabled={currentPage === 1}
            >
                «
            </button>
            <button
                className="btn btn-outline btn-primary text-lg"
            >
                Page {currentPage}
            </button>
            <button
                className="btn btn-outline btn-primary text-lg"
                onClick={onClickNext}
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    )
}

export default Paginate