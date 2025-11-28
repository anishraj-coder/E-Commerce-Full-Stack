import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {useState} from "react";
import ProductSidebar from "@/customer/components/products/ProductSidebar.tsx";
import {nanoid} from "nanoid";
import {useGetAllProducts} from "@/hooks/useProducts.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import ProductCard from "@/customer/components/products/ProductCard.tsx";
import ProductPagination from "@/customer/components/products/ProductPagination.tsx";
import {useSearchParams} from "react-router-dom";


type SortType='price,asc'|'price,desc'|'id,asc'|'id,desc';
interface SortOptionsType{
    label:string,
    value:SortType
}

const sortOptions:Array<SortOptionsType>=[
    {label: 'Price low to high',value:'price,asc'},
    {label:'Price high to low',value: 'price,desc'},
    {label:'Newest first',value:'id,desc'}
]


const ProductPage=()=>{

    const [selectedSort, setSelectedSort] = useState<SortType>('price,asc');
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSize, setSelectedSize] = useState<Array<string>>([]);
    const [page, setPage] = useState<number>(0);
    const handleSortChange=(value:SortType)=>{
        setSelectedSort(value);
    }
    const [searchParams]=useSearchParams();
    const {data,isLoading,isError}= useGetAllProducts({
        page: page,
        size: 8,
        sort: selectedSort,
        colors:selectedColors.length>0?selectedColors.join(','):undefined,
        sizes:selectedSize.length>0?selectedSize.join(','):undefined,
        category:searchParams.get('category')||undefined
    });

    const handleFilterChange=(section:string,value:string[])=>{
        if(section==='color'){
            setSelectedColors(value);
        }else if(section ==='size'){
            setSelectedSize(value);
        }
    }

    return(
        <div className={`container  mx-auto py-10`}>

            <div className={`flex w-full shrink-0 justify-between items-baseline border-b border-gray-200 pb-6 mb-8 px-10`}>
                <h1 className={`font-bold text-4xl `}>{`Products`}</h1>
                <div className={`flex  items-center`}>
                    <Select onValueChange={handleSortChange} defaultValue={'price,asc'}>
                        <SelectTrigger className={`w-[180px]`}>
                            <SelectValue  placeholder={`Sort By`}/>
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map(item=>(
                                <SelectItem key={nanoid()} value={item.value}>{item.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

            </div>
            <section className={`flex relative overflow-hidden  gap min-h-[60vh]`}>
                <aside className={`hidden lg:block sticky top-20 w-64`}>
                    <ProductSidebar onFilterChange={handleFilterChange}/>
                </aside>
                <main className={`w-full`}>
                    {isLoading?<div className={`w-full h-[60vh] flex items-center justify-center`}>
                        <Spinner className={`h-32 w-32 `}/>
                    </div>:
                    isError?<div className={` font-light flex items-center justify-center`}>
                        <h2 className={`text-red-500 text-3xl`}>Error occurred while loading data</h2>
                    </div>:
                    data?.content&&<div className={`w-full  grid grid-cols-1 place-items-center mid:grid-cols-2 lg:grid-cols-4 gap-6`}>
                        {data?.content.map((item)=>(
                            <ProductCard key={nanoid()} product={item}/>
                        ))}
                    </div>}

                </main>
            </section>
            {data&&data.totalPages>1 && (
                <ProductPagination
                    page={page}
                    totalPages={data.totalPages}
                    handleChange={setPage}
                />
            )}
        </div>
    );
};
export default ProductPage;