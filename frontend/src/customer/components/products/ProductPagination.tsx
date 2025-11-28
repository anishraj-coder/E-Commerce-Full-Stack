import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductPaginationProps{
    page: number;
    totalPages:number;
    handleChange:(page:number)=>void;
}

const ProductPagination=({page,totalPages,handleChange}:ProductPaginationProps)=>{
    return(
        <Pagination className={`mt-10`}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={()=>handleChange(page-1)}
                        className={`cursor-pointer ${page===0&&'opacity-50 pointer-events-none'}`}
                    />
                </PaginationItem>
                {Array.from({length:totalPages}).map((_,idx)=>{
                    if(idx<page-1||idx>page+1)return null;
                    return (<PaginationItem key={idx}>
                        <PaginationLink
                            isActive={page===idx}
                            onClick={() => handleChange(idx)}
                            className="cursor-pointer"
                        >
                            {idx+1}
                        </PaginationLink>
                    </PaginationItem>)
                })}
                {totalPages > 3 && page < totalPages - 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handleChange(Math.min(totalPages - 1, page + 1))}
                        className={page === totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
export default  ProductPagination;