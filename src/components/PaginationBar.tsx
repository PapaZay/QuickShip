import Link from "next/link";

interface PaginationBarProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationBar({currentPage, totalPages}: PaginationBarProps){
    const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
    const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

    const numberPageItems: JSX.Element[] = []

    for (let page = minPage; page <= maxPage; page++){
        numberPageItems.push(
            <Link
            href={"?page=" + page}
            key={page}
            className={`join-item btn ${currentPage === page ? "btn-active pointer-events-none" : ""} text-white`}
            >
                {page}
            </Link>
        );
    }

    return(
        <>
        <div className="join hidden sm:block ">
            <span className="text-white">{numberPageItems}</span>
        </div>
        <div className="join block sm:hidden">
            {currentPage > 1 && 
            <Link href={"?page=" + (currentPage - 1)} className="btn join-item text-white"> 
                «
            </Link>
            }
            <button className="join-item btn pointer-events-none text-white">
                Page {currentPage}
            </button>
            {currentPage < totalPages &&
                <Link href={"?page=" + (currentPage + 1)} className="join-item btn text-white">
                    »
                </Link>
            }
        </div>
        </>
    )
}
               