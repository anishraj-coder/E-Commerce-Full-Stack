import { useSearchParams } from "react-router-dom"; // 1. Import this
import { useGetOrderHistory } from "@/hooks/useOrders";
import OrderHistoryFilter from "@/customer/components/OrderHistory/OrderHistoryFilter.tsx";
import OrderHistoryCard from "@/customer/components/OrderHistory/OrderHIstoryCard.tsx";
import { Spinner } from "@/components/ui/spinner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import type { Order, OrderStatus } from "@/types/order.ts";

const OrderHistory = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 0;

    const statusString = searchParams.get("status");
    const selectedStatus: OrderStatus[] = statusString
        ? (statusString.split(",") as OrderStatus[])
        : [];

    const { data, isLoading, isError } = useGetOrderHistory({
        page,
        size: 5,
        status: selectedStatus.length > 0 ? selectedStatus : undefined
    });

    const handleFilterChange = (value: OrderStatus, checked: boolean) => {
        const newParams = new URLSearchParams(searchParams);

        let newStatus = [...selectedStatus];
        if (checked) {
            newStatus.push(value);
        } else {
            newStatus = newStatus.filter((s) => s !== value);
        }

        if (newStatus.length > 0) {
            newParams.set("status", newStatus.join(","));
        } else {
            newParams.delete("status");
        }

        newParams.set("page", "0");

        setSearchParams(newParams);
    };

    const handlePageChange = (newPage: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage.toString());
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (isLoading) return <div className="h-[80vh] flex items-center justify-center"><Spinner className="h-12 w-12" /></div>;
    if (isError) return <div className="text-center py-20 text-red-500">Failed to load orders.</div>;

    return (
        <div className="container min-h-[70vh] mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">

            <OrderHistoryFilter
                selectedStatus={selectedStatus} // Pass derived URL state
                handleFilterChange={handleFilterChange}
            />

            <div className="flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-gray-900">Order History</h1>

                {data && data.content.length > 0 ? (
                    <div className="space-y-4">
                        {data.content.map((order: Order) => (
                            order.orderItems.map((item) => (
                                <OrderHistoryCard
                                    key={`${order.id}-${item.id}`}
                                    order={order}
                                    item={item}
                                />
                            ))
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 border-2 border-dashed rounded-xl">
                        <p className="text-gray-500">No orders found.</p>
                    </div>
                )}

                {data && data.totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(Math.max(0, page - 1))}
                                    className={page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>{page + 1}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(Math.min(data.totalPages - 1, page + 1))}
                                    className={page === data.totalPages - 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;