import EcommerceCarousel from "@/customer/components/navigation/EcommerceCarousel.tsx";
import ProductSection from "@/customer/components/HomeSectionCard/ProductSection.tsx";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <EcommerceCarousel />

            {/* Dynamic Sections */}
            <div className="space-y-4 py-10 container mx-auto max-w-7xl">

                {/* 1. New Arrivals (Sort by ID desc usually means newest) */}
                <ProductSection
                    sectionName="New Arrivals"
                    sort="id,desc"
                />

                {/* 2. Category Specific */}
                <ProductSection
                    sectionName="Men's Kurtas"
                    filterCategory="men_kurta"
                />

                <ProductSection
                    sectionName="Men's Jeans"
                    filterCategory="men_jeans"
                />

                <ProductSection
                    sectionName="Men's Shirts"
                    filterCategory="men_shirt"
                />
            </div>
        </div>
    );
};

export default HomePage;