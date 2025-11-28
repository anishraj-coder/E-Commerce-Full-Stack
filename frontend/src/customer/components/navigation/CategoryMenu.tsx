import type {CategoryNode} from "@/types/category.ts";
import {cn} from "@/lib/utils.ts";
import {NavigationMenuLink} from "@/components/ui/navigation-menu.tsx";

const CategoryMenu=({category}:{category:CategoryNode})=>{
    return (
        <div className={`grid w-[600px] grid-cols-3 gap-4 p-4 bg-white relative`}>
            {category.childNodes.map((level2) => (
                <div key={level2.path} className="space-y-3">
                    <h4 className="font-bold text-sm text-gray-900 border-b pb-1 mb-2">
                        {level2.name}
                    </h4>

                    <ul className="space-y-2">
                        {level2.childNodes.map((level3) => (
                            <li key={level3.path}>
                                <NavigationMenuLink asChild>
                                    <a
                                        href={`/products?category=${level3.path}`}
                                        className={cn(
                                            "block select-none space-y-1 rounded-md p-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm text-gray-500 "
                                        )}
                                    >
                                        {level3.name}
                                    </a>
                                </NavigationMenuLink>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default  CategoryMenu;