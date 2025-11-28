import { Checkbox } from "@/components/ui/checkbox";
import {Label} from '@/components/ui/label'
import {Separator} from "@/components/ui/separator.tsx";
import {useState} from "react";



const colors = ["White", "Beige", "Blue", "Brown", "Green", "Purple"];
const sizes = ["XS", "S", "M", "L", "XL", "2XL"];


interface ProductSidebarProps{
    onFilterChange: (section:string,value:string[])=>void
}

const ProductSidebar=({onFilterChange}:ProductSidebarProps)=>{
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const toggleSelectedColor=(color:string,isChecked:boolean)=>{
        const updated=isChecked?[...selectedColors,color]:selectedColors.filter(item=>color!==item);
        setSelectedColors(updated);
        onFilterChange("color",updated)
    }
    const toggleSelectedSize=(size:string,isChecked:boolean)=>{
        const updated=isChecked?[...selectedSizes,size]:selectedSizes.filter(item=>item!==size);
        setSelectedSizes(()=>{
            return updated;
        });
        onFilterChange('size',updated)

    }


    return(
        <div className={`space-y-8 px-8`}>
            <div>
                <h3 className={"font-medium text-sm mb-4 text-gray-900"}>Colors</h3>
                <div className={`space-y-2 px-3`}>
                    {colors.map(color=>(
                        <div className={`flex items-center space-x-2`} key={color}>
                            <Checkbox
                                id={`color-${color}`}
                                checked={selectedColors.includes(color)}
                                onCheckedChange={checked=>toggleSelectedColor(color,checked===true)}
                            />
                            <Label htmlFor={`color-${color}`} className="text-sm font-light text-gray-600 cursor-pointer">
                                {color}
                            </Label>
                        </div>
                    ))}
                </div>

            </div>
            <Separator/>
            <div>
                <h3 className="font-medium text-sm mb-4 text-gray-900">Sizes</h3>
                <div className="space-y-3">
                    {sizes.map((size) => (
                        <div key={size} className="flex items-center space-x-2">
                            <Checkbox
                                id={`size-${size}`}
                                checked={selectedSizes.includes(size)}
                                onCheckedChange={(checked) => toggleSelectedSize(size,checked===true)}
                            />
                            <Label htmlFor={`size-${size}`} className="text-sm font-light text-gray-600 cursor-pointer">
                                {size}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default ProductSidebar;