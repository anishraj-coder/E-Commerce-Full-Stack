import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { OrderStatus } from "@/types/order.ts";

interface OrderStatusLabel {
    label: string;
    value: OrderStatus;
}

const orderStatus: OrderStatusLabel[] = [
    { label: "Pending", value: "PENDING" },
    { label: "Placed", value: "PLACED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

interface FilterProps {
    selectedStatus: OrderStatus[];
    handleFilterChange: (value: OrderStatus, checked: boolean) => void;
}

const OrderHistoryFilter = ({ selectedStatus, handleFilterChange }: FilterProps) => {
    return (
        <div className="hidden lg:block sticky top-24 h-fit p-6 border rounded-xl shadow-sm bg-white">
            <h2 className="font-bold text-xl mb-4">Filters</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-sm text-gray-900 mb-3">Order Status</h3>
                    <div className="space-y-3">
                        {orderStatus.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={option.value}
                                    checked={selectedStatus.includes(option.value)}
                                    onCheckedChange={(checked) =>
                                        handleFilterChange(option.value, checked === true)
                                    }
                                />
                                <Label
                                    htmlFor={option.value}
                                    className="text-sm font-medium leading-none cursor-pointer"
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryFilter;