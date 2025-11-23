

const orderStatus=[
    { id: "id1",label:"Shipping",value:"shipping"},
    {id:'id2',label:"On the way",value: "on_the_way"},
    {id:'id3',label:'Delivered',value: "delivered"},
    {id:'id4',label:"Cancelled",value: "cancelled"},
    {id:'id5',label: 'Return',value:"return"}
]
const OrderHistoryFilter=()=>{
    return(
        <div className={`lg:sticky top-10 w-full h-fit py-6 px-8 rounded-2xl shadow-2xl shadow-gray-600/40 space-y-4`}>
            <h2 className={`font-bold text-2xl`}>Filter</h2>
            <hr/>
            <h2 className={`text-lg font-semibold text-gray-700`}>Order Status</h2>
            <hr/>
            {orderStatus.map(item=>(
                <div key={item.id} className={`grid grid-cols-[10%_90%] gap-5`}>
                    <input
                        name={item.value}
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <label htmlFor={item.value} className={`font-light text-gray-700 `} >{item.label}</label>
                </div>
            ))}
        </div>
    );
};
export default OrderHistoryFilter;