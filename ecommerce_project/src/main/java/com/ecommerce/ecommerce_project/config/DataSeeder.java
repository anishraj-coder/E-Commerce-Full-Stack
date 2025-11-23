package com.ecommerce.ecommerce_project.config;

import com.ecommerce.ecommerce_project.entity.AppUser;
import com.ecommerce.ecommerce_project.entity.Category;
import com.ecommerce.ecommerce_project.entity.Product;
import com.ecommerce.ecommerce_project.entity.Size;
import com.ecommerce.ecommerce_project.entity.types.Provider;
import com.ecommerce.ecommerce_project.entity.types.RoleTypes;
import com.ecommerce.ecommerce_project.repository.AppUserRepository;
import com.ecommerce.ecommerce_project.repository.ProductRepository;
import com.ecommerce.ecommerce_project.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final AppUserRepository appUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedUser();
        if (productRepository.count() == 0) {
            seedProducts();
            System.out.println("---------------------------------------------------------");
            System.out.println("DATABASE SEEDED SUCCESSFULLY WITH 50+ PRODUCTS");
            System.out.println("---------------------------------------------------------");
        }
    }

    private void seedUser() {
        String testEmail = "test@user.com";
        // Check if user exists to avoid duplicates
        if (appUserRepository.findByEmail(testEmail).isEmpty()) {
            AppUser testUser = AppUser.builder()
                    .firstName("Test")
                    .lastName("User")
                    .email(testEmail)
                    .password(passwordEncoder.encode("9576331487@As"))
                    .phoneNo("1234567890")
                    .provider(Provider.EMAIL)
                    .roles(Set.of(RoleTypes.CUSTOMER))
                    .build();
            appUserRepository.save(testUser);
            System.out.println("Created Test User: " + testEmail + " / password123");
        }
    }
    private void seedProducts() {
        // ==========================================
        // 1. FASHION & CLOTHING
        // ==========================================

        // --- Men ---
        List<String> menShirtPath = Arrays.asList("Men", "Clothing", "Shirts");
        createProduct("Classic Oxford Shirt", "Ralph Lauren", "White", "https://placehold.co/600x400?text=Oxford+Shirt", 59.99, 10.0, "A premium cotton oxford shirt suitable for formal and casual wear.", menShirtPath, createSizes("S", 10, "M", 20, "L", 15, "XL", 5));
        createProduct("Flannel Check Shirt", "Levis", "Red/Black", "https://placehold.co/600x400?text=Flannel+Shirt", 45.00, 0.0, "Warm flannel shirt for winter days.", menShirtPath, createSizes("M", 15, "L", 15, "XL", 10));
        createProduct("Linen Summer Shirt", "Uniqlo", "Beige", "https://placehold.co/600x400?text=Linen+Shirt", 39.90, 5.0, "Breathable linen blend for hot weather.", menShirtPath, createSizes("S", 10, "M", 20, "L", 20));

        List<String> menJeansPath = Arrays.asList("Men", "Clothing", "Jeans");
        createProduct("Slim Fit Denim", "Levi's", "Blue", "https://placehold.co/600x400?text=Blue+Jeans", 89.50, 0.0, "Durable slim fit jeans with a modern cut.", menJeansPath, createSizes("30", 10, "32", 20, "34", 15));
        createProduct("Distressed Skinny Jeans", "Zara", "Black", "https://placehold.co/600x400?text=Black+Jeans", 59.90, 15.0, "Edgy distressed look with stretch fabric.", menJeansPath, createSizes("30", 5, "32", 15, "34", 10));

        List<String> menJacketsPath = Arrays.asList("Men", "Clothing", "Jackets");
        createProduct("Leather Biker Jacket", "AllSaints", "Black", "https://placehold.co/600x400?text=Leather+Jacket", 350.00, 0.0, "Genuine leather biker jacket.", menJacketsPath, createSizes("M", 5, "L", 5));
        createProduct("Denim Trucker Jacket", "Levis", "Light Blue", "https://placehold.co/600x400?text=Denim+Jacket", 98.00, 10.0, "Classic trucker jacket style.", menJacketsPath, createSizes("S", 5, "M", 10, "L", 8));

        // --- Women ---
        List<String> womenDressPath = Arrays.asList("Women", "Clothing", "Dresses");
        createProduct("Floral Summer Dress", "H&M", "Red", "https://placehold.co/600x400?text=Summer+Dress", 35.00, 5.0, "Lightweight floral dress perfect for summer outings.", womenDressPath, createSizes("XS", 5, "S", 15, "M", 15, "L", 10));
        createProduct("Evening Cocktail Dress", "Zara", "Black", "https://placehold.co/600x400?text=Cocktail+Dress", 89.00, 0.0, "Elegant black dress for formal events.", womenDressPath, createSizes("S", 10, "M", 10, "L", 5));
        createProduct("Maxi Boho Dress", "Free People", "Cream", "https://placehold.co/600x400?text=Maxi+Dress", 120.00, 20.0, "Flowy bohemian style maxi dress.", womenDressPath, createSizes("S", 8, "M", 8, "L", 4));

        List<String> womenTopsPath = Arrays.asList("Women", "Clothing", "Tops");
        createProduct("Silk Blouse", "Everlane", "Pink", "https://placehold.co/600x400?text=Silk+Blouse", 110.00, 0.0, "100% clean silk blouse.", womenTopsPath, createSizes("XS", 5, "S", 10, "M", 10));

        // --- Accessories ---
        List<String> accessoriesWatchPath = Arrays.asList("Fashion", "Accessories", "Watches");
        createProduct("Chronograph Leather Watch", "Fossil", "Brown", "https://placehold.co/600x400?text=Watch", 129.00, 10.0, "Classic analog watch with leather strap.", accessoriesWatchPath, createSizes("One Size", 50));
        createProduct("Minimalist Mesh Watch", "Skagen", "Silver", "https://placehold.co/600x400?text=Silver+Watch", 95.00, 5.0, "Sleek minimalist design.", accessoriesWatchPath, createSizes("One Size", 40));

        List<String> accessoriesBagPath = Arrays.asList("Fashion", "Accessories", "Bags");
        createProduct("Leather Tote Bag", "Madewell", "Tan", "https://placehold.co/600x400?text=Tote+Bag", 168.00, 0.0, "Spacious leather tote for daily use.", accessoriesBagPath, createSizes("One Size", 20));
        createProduct("Canvas Backpack", "Herschel", "Grey", "https://placehold.co/600x400?text=Backpack", 65.00, 15.0, "Durable backpack for travel and school.", accessoriesBagPath, createSizes("One Size", 30));

        // ==========================================
        // 2. FOOTWEAR
        // ==========================================
        List<String> sneakerPath = Arrays.asList("Men", "Footwear", "Sneakers");
        createProduct("Air Max 90", "Nike", "Black/White", "https://placehold.co/600x400?text=Air+Max", 120.00, 0.0, "Iconic sneakers with air cushioning.", sneakerPath, createSizes("8", 10, "9", 20, "10", 20, "11", 5));
        createProduct("Chuck Taylor All Star", "Converse", "White", "https://placehold.co/600x400?text=Converse", 60.00, 0.0, "Classic canvas high-top sneakers.", sneakerPath, createSizes("8", 15, "9", 25, "10", 25));

        List<String> runningPath = Arrays.asList("Women", "Footwear", "Running");
        createProduct("Ultraboost Light", "Adidas", "Pink", "https://placehold.co/600x400?text=Ultraboost", 180.00, 15.0, "High-performance running shoes.", runningPath, createSizes("6", 10, "7", 15, "8", 10));
        createProduct("Pegasus 40", "Nike", "Blue", "https://placehold.co/600x400?text=Pegasus", 130.00, 10.0, "Reliable daily trainer.", runningPath, createSizes("6", 10, "7", 20, "8", 15));

        List<String> formalShoesPath = Arrays.asList("Men", "Footwear", "Formal");
        createProduct("Oxford Leather Shoes", "Clarks", "Black", "https://placehold.co/600x400?text=Oxford+Shoes", 110.00, 5.0, "Formal leather shoes for office.", formalShoesPath, createSizes("9", 10, "10", 10));

        // ==========================================
        // 3. ELECTRONICS
        // ==========================================
        List<String> laptopPath = Arrays.asList("Electronics", "Computers", "Laptops");
        createProduct("MacBook Air M2", "Apple", "Midnight", "https://placehold.co/600x400?text=MacBook+Air", 1199.00, 5.0, "Supercharged by M2 chip.", laptopPath, createSizes("256GB", 50, "512GB", 20));
        createProduct("XPS 13", "Dell", "Silver", "https://placehold.co/600x400?text=Dell+XPS", 1099.00, 10.0, "Ultra-thin Windows laptop with InfinityEdge display.", laptopPath, createSizes("512GB", 20, "1TB", 10));
        createProduct("Gaming Laptop Rog Strix", "Asus", "Black", "https://placehold.co/600x400?text=Gaming+Laptop", 1599.00, 0.0, "High performance gaming laptop with RTX 4070.", laptopPath, createSizes("1TB", 15));

        List<String> phonePath = Arrays.asList("Electronics", "Mobile", "Smartphones");
        createProduct("Galaxy S24 Ultra", "Samsung", "Titanium Gray", "https://placehold.co/600x400?text=Galaxy+S24", 1299.00, 10.0, "The ultimate Galaxy smartphone with AI.", phonePath, createSizes("256GB", 100, "512GB", 50));
        createProduct("iPhone 15 Pro", "Apple", "Natural Titanium", "https://placehold.co/600x400?text=iPhone+15", 999.00, 0.0, "Forged in titanium with A17 Pro chip.", phonePath, createSizes("128GB", 80, "256GB", 60));
        createProduct("Pixel 8 Pro", "Google", "Bay Blue", "https://placehold.co/600x400?text=Pixel+8", 999.00, 15.0, "Google's best phone with pro-level camera.", phonePath, createSizes("128GB", 40, "256GB", 20));

        List<String> audioPath = Arrays.asList("Electronics", "Audio", "Headphones");
        createProduct("WH-1000XM5", "Sony", "Silver", "https://placehold.co/600x400?text=Sony+Headphones", 349.00, 20.0, "Industry-leading noise canceling.", audioPath, createSizes("One Size", 200));
        createProduct("AirPods Pro 2", "Apple", "White", "https://placehold.co/600x400?text=AirPods", 249.00, 0.0, "Active Noise Cancellation and Transparency mode.", audioPath, createSizes("One Size", 300));

        List<String> consolePath = Arrays.asList("Electronics", "Gaming", "Consoles");
        createProduct("PlayStation 5", "Sony", "White", "https://placehold.co/600x400?text=PS5", 499.00, 0.0, "Next-gen gaming console.", consolePath, createSizes("Standard", 50, "Digital", 30));
        createProduct("Switch OLED", "Nintendo", "Red/Blue", "https://placehold.co/600x400?text=Switch", 349.00, 5.0, "7-inch OLED screen gaming system.", consolePath, createSizes("64GB", 100));

        // ==========================================
        // 4. HOME & KITCHEN
        // ==========================================
        List<String> appliancesPath = Arrays.asList("Home", "Kitchen", "Appliances");
        createProduct("Air Fryer Max XL", "Ninja", "Grey", "https://placehold.co/600x400?text=Air+Fryer", 119.00, 15.0, "Cooks with up to 75% less fat.", appliancesPath, createSizes("5.5qt", 30));
        createProduct("High-Speed Blender", "Vitamix", "Black", "https://placehold.co/600x400?text=Blender", 349.00, 0.0, "Professional grade blender for smoothies.", appliancesPath, createSizes("64oz", 20));
        createProduct("Espresso Machine", "Breville", "Stainless Steel", "https://placehold.co/600x400?text=Espresso", 699.00, 10.0, "Barista quality coffee at home.", appliancesPath, createSizes("One Size", 15));

        List<String> furniturePath = Arrays.asList("Home", "Furniture", "Living Room");
        createProduct("Mid-Century Sofa", "Article", "Teal", "https://placehold.co/600x400?text=Sofa", 899.00, 5.0, "Velvet sofa with wooden legs.", furniturePath, createSizes("3-Seater", 10));
        createProduct("Coffee Table", "West Elm", "Walnut", "https://placehold.co/600x400?text=Table", 299.00, 0.0, "Solid wood coffee table.", furniturePath, createSizes("One Size", 20));

        List<String> decorPath = Arrays.asList("Home", "Decor", "Lighting");
        createProduct("Floor Lamp", "IKEA", "Black", "https://placehold.co/600x400?text=Lamp", 59.00, 0.0, "Modern industrial floor lamp.", decorPath, createSizes("One Size", 50));
        createProduct("Smart LED Bulbs", "Philips Hue", "Multicolor", "https://placehold.co/600x400?text=Bulb", 49.00, 10.0, "Color changing smart bulbs.", decorPath, createSizes("2-Pack", 100));

        // ==========================================
        // 5. BEAUTY & PERSONAL CARE
        // ==========================================
        List<String> skincarePath = Arrays.asList("Beauty", "Skincare", "Moisturizers");
        createProduct("Daily Facial Moisturizer", "CeraVe", "White", "https://placehold.co/600x400?text=Moisturizer", 15.00, 0.0, "Oil-free moisturizer with Hyaluronic Acid.", skincarePath, createSizes("12oz", 100));
        createProduct("Vitamin C Serum", "The Ordinary", "Clear", "https://placehold.co/600x400?text=Serum", 12.00, 0.0, "Brightening serum for all skin types.", skincarePath, createSizes("30ml", 80));

        List<String> makeupPath = Arrays.asList("Beauty", "Makeup", "Lips");
        createProduct("Matte Lipstick", "MAC", "Ruby Woo", "https://placehold.co/600x400?text=Lipstick", 22.00, 0.0, "Iconic red matte lipstick.", makeupPath, createSizes("One Size", 200));

        List<String> hairPath = Arrays.asList("Beauty", "Hair", "Tools");
        createProduct("Supersonic Hair Dryer", "Dyson", "Fuchsia", "https://placehold.co/600x400?text=Hair+Dryer", 429.00, 0.0, "Fast drying with no extreme heat.", hairPath, createSizes("One Size", 15));

        // ==========================================
        // 6. SPORTS & OUTDOORS
        // ==========================================
        List<String> fitnessPath = Arrays.asList("Sports", "Fitness", "Equipment");
        createProduct("Adjustable Dumbbells", "Bowflex", "Black/Red", "https://placehold.co/600x400?text=Dumbbells", 399.00, 20.0, "Select-Tech adjustable weights.", fitnessPath, createSizes("Set", 20));
        createProduct("Yoga Mat", "Lululemon", "Purple", "https://placehold.co/600x400?text=Yoga+Mat", 68.00, 0.0, "Non-slip mat for yoga and pilates.", fitnessPath, createSizes("5mm", 40));

        List<String> outdoorPath = Arrays.asList("Sports", "Outdoor", "Camping");
        createProduct("4-Person Tent", "Coleman", "Green", "https://placehold.co/600x400?text=Tent", 120.00, 15.0, "Easy setup camping tent.", outdoorPath, createSizes("One Size", 25));
        createProduct("Sleeping Bag", "The North Face", "Orange", "https://placehold.co/600x400?text=Sleeping+Bag", 99.00, 0.0, "Warm mummy-style sleeping bag.", outdoorPath, createSizes("Regular", 30, "Long", 10));

        // ==========================================
        // 7. BOOKS
        // ==========================================
        List<String> fictionPath = Arrays.asList("Books", "Fiction", "Sci-Fi");
        createProduct("Dune", "Frank Herbert", "Paperback", "https://placehold.co/600x400?text=Dune", 18.00, 0.0, "The classic science fiction masterpiece.", fictionPath, createSizes("Standard", 100));
        createProduct("Project Hail Mary", "Andy Weir", "Hardcover", "https://placehold.co/600x400?text=Hail+Mary", 28.00, 10.0, "A lone astronaut must save the earth.", fictionPath, createSizes("Standard", 50));

        List<String> nonFictionPath = Arrays.asList("Books", "Non-Fiction", "Self-Help");
        createProduct("Atomic Habits", "James Clear", "Hardcover", "https://placehold.co/600x400?text=Atomic+Habits", 25.00, 20.0, "An easy way to build good habits.", nonFictionPath, createSizes("Standard", 150));

        // ==========================================
        // 8. TOYS
        // ==========================================
        List<String> toysPath = Arrays.asList("Toys", "Building Sets", "LEGO");
        createProduct("Star Wars Millennium Falcon", "LEGO", "Grey", "https://placehold.co/600x400?text=Lego", 169.99, 0.0, "Build the iconic Starship.", toysPath, createSizes("1351 pcs", 20));
        createProduct("Harry Potter Hogwarts Castle", "LEGO", "Multicolor", "https://placehold.co/600x400?text=Hogwarts", 399.99, 5.0, "Detailed microscale model of Hogwarts.", toysPath, createSizes("6020 pcs", 10));

        List<String> gamesPath = Arrays.asList("Toys", "Games", "Board Games");
        createProduct("Catan", "Catan Studio", "Box", "https://placehold.co/600x400?text=Catan", 45.00, 10.0, "Strategy game of trading and building.", gamesPath, createSizes("Standard", 60));
        // ==========================================
        // 9. EXTENDED FASHION (Targeted Filters)
        // ==========================================

        // --- MEN'S TOPS ---
        List<String> menCasualPath = Arrays.asList("Men", "Clothing", "Casual");
        createProduct("Basic Heavyweight Tee", "Uniqlo", "White", "https://placehold.co/600x400?text=White+Tee", 19.90, 0.0, "Essential heavyweight cotton t-shirt.", menCasualPath, createSizes("XS", 20, "S", 30, "XL", 20, "2XL", 10));
        createProduct("Oversized Hoodie", "Nike", "Purple", "https://placehold.co/600x400?text=Purple+Hoodie", 65.00, 10.0, "Streetwear style oversized hoodie.", menCasualPath, createSizes("S", 15, "XL", 25, "2XL", 20));
        createProduct("Vintage Polo", "Ralph Lauren", "Green", "https://placehold.co/600x400?text=Green+Polo", 85.00, 5.0, "Classic fit polo shirt.", menCasualPath, createSizes("XS", 5, "S", 10, "XL", 15, "2XL", 15));
        createProduct("Corduroy Shirt", "Gap", "Brown", "https://placehold.co/600x400?text=Brown+Corduroy", 49.95, 0.0, "Textured corduroy button-down.", menCasualPath, createSizes("S", 10, "XL", 20, "2XL", 10));
        createProduct("Linen Henley", "J.Crew", "Beige", "https://placehold.co/600x400?text=Beige+Henley", 39.50, 0.0, "Breathable linen blend henley.", menCasualPath, createSizes("XS", 10, "S", 20, "XL", 10));
        createProduct("Graphic Sweatshirt", "H&M", "Blue", "https://placehold.co/600x400?text=Blue+Sweatshirt", 29.99, 0.0, "Comfortable cotton sweatshirt with print.", menCasualPath, createSizes("XS", 15, "XL", 15, "2XL", 15));
        createProduct("Zip-Up Fleece", "Patagonia", "Green", "https://placehold.co/600x400?text=Green+Fleece", 119.00, 0.0, "Warm fleece layer for outdoors.", menCasualPath, createSizes("S", 10, "XL", 20, "2XL", 10));
        createProduct("Muscle Fit Tee", "Gymshark", "Purple", "https://placehold.co/600x400?text=Purple+Tee", 25.00, 0.0, "Stretchy fit for training.", menCasualPath, createSizes("XS", 10, "S", 20, "XL", 20));

        // --- MEN'S BOTTOMS ---
        List<String> menPantsPath = Arrays.asList("Men", "Clothing", "Pants");
        createProduct("Cargo Joggers", "H&M", "Green", "https://placehold.co/600x400?text=Green+Cargo", 34.99, 0.0, "Utility style joggers with pockets.", menPantsPath, createSizes("XS", 10, "S", 15, "XL", 15, "2XL", 10));
        createProduct("Chino Shorts", "J.Crew", "Beige", "https://placehold.co/600x400?text=Beige+Shorts", 45.00, 10.0, "Classic summer chinos.", menPantsPath, createSizes("XS", 10, "S", 20, "XL", 20, "2XL", 10));
        createProduct("Relaxed Fit Jeans", "Levis", "White", "https://placehold.co/600x400?text=White+Jeans", 69.50, 20.0, "Summer denim in white.", menPantsPath, createSizes("S", 15, "XL", 15, "2XL", 10));
        createProduct("Wool Trousers", "Banana Republic", "Brown", "https://placehold.co/600x400?text=Brown+Trousers", 120.00, 0.0, "Formal wool trousers.", menPantsPath, createSizes("S", 10, "XL", 10, "2XL", 5));
        createProduct("Track Pants", "Adidas", "Blue", "https://placehold.co/600x400?text=Blue+Track", 55.00, 0.0, "Classic 3-stripe track pants.", menPantsPath, createSizes("XS", 15, "S", 20, "XL", 20, "2XL", 15));

        // --- WOMEN'S DRESSES ---
        List<String> womenDressesPath = Arrays.asList("Women", "Clothing", "Dresses");
        createProduct("Satin Slip Dress", "Zara", "Purple", "https://placehold.co/600x400?text=Purple+Dress", 49.90, 0.0, "Elegant satin midi dress.", womenDressesPath, createSizes("XS", 10, "S", 15, "XL", 10));
        createProduct("Boho Maxi Dress", "Free People", "Brown", "https://placehold.co/600x400?text=Brown+Maxi", 148.00, 0.0, "Flowy bohemian dress with prints.", womenDressesPath, createSizes("XS", 10, "S", 10, "XL", 10, "2XL", 5));
        createProduct("Linen Wrap Dress", "Reformation", "White", "https://placehold.co/600x400?text=White+Dress", 218.00, 0.0, "Sustainable linen wrap dress.", womenDressesPath, createSizes("XS", 5, "S", 10, "XL", 10));
        createProduct("Knitted Midi Dress", "Mango", "Beige", "https://placehold.co/600x400?text=Beige+Knit", 69.99, 15.0, "Cozy knitted dress for autumn.", womenDressesPath, createSizes("XS", 10, "S", 20, "XL", 15));
        createProduct("Denim Shirt Dress", "Levis", "Blue", "https://placehold.co/600x400?text=Blue+Denim+Dress", 89.50, 0.0, "Casual denim button-down dress.", womenDressesPath, createSizes("XS", 10, "S", 15, "XL", 15, "2XL", 10));
        createProduct("Velvet Mini Dress", "Topshop", "Green", "https://placehold.co/600x400?text=Green+Velvet", 55.00, 0.0, "Party ready velvet dress.", womenDressesPath, createSizes("XS", 10, "S", 10, "XL", 5));
        createProduct("Cotton Sundress", "Gap", "Purple", "https://placehold.co/600x400?text=Purple+Sundress", 59.95, 20.0, "Lightweight cotton dress.", womenDressesPath, createSizes("XS", 15, "S", 15, "XL", 15, "2XL", 10));
        createProduct("Tiered Ruffle Dress", "H&M", "White", "https://placehold.co/600x400?text=White+Ruffle", 39.99, 0.0, "Playful tiered dress.", womenDressesPath, createSizes("XS", 10, "S", 15, "XL", 10));

        // --- WOMEN'S TOPS ---
        womenTopsPath = Arrays.asList("Women", "Clothing", "Tops");
        createProduct("Cashmere Sweater", "Everlane", "Brown", "https://placehold.co/600x400?text=Brown+Sweater", 145.00, 0.0, "Soft Grade-A cashmere.", womenTopsPath, createSizes("XS", 10, "S", 15, "XL", 10));
        createProduct("Silk Cami", "Lilysilk", "Beige", "https://placehold.co/600x400?text=Beige+Cami", 65.00, 0.0, "Luxurious silk camisole.", womenTopsPath, createSizes("XS", 20, "S", 20, "XL", 10));
        createProduct("Oversized Poplin Shirt", "Zara", "Blue", "https://placehold.co/600x400?text=Blue+Poplin", 45.90, 0.0, "Crisp blue striped shirt.", womenTopsPath, createSizes("XS", 10, "S", 20, "XL", 20, "2XL", 15));
        createProduct("Crop Top", "Urban Outfitters", "Green", "https://placehold.co/600x400?text=Green+Crop", 25.00, 0.0, "Trendy rib-knit crop top.", womenTopsPath, createSizes("XS", 20, "S", 25, "XL", 10));
        createProduct("Graphic Tee", "Madewell", "White", "https://placehold.co/600x400?text=White+Graphic", 35.00, 10.0, "Vintage style graphic t-shirt.", womenTopsPath, createSizes("XS", 15, "S", 20, "XL", 15, "2XL", 10));
        createProduct("Turtleneck Bodysuit", "Skims", "Purple", "https://placehold.co/600x400?text=Purple+Body", 68.00, 0.0, "Form-fitting bodysuit.", womenTopsPath, createSizes("XS", 15, "S", 20, "XL", 15));

        // --- WOMEN'S BOTTOMS ---
        List<String> womenBottomsPath = Arrays.asList("Women", "Clothing", "Bottoms");
        createProduct("Wide Leg Trousers", "Uniqlo", "Beige", "https://placehold.co/600x400?text=Beige+Trousers", 49.90, 0.0, "Smart casual wide leg pants.", womenBottomsPath, createSizes("XS", 10, "S", 15, "XL", 15, "2XL", 10));
        createProduct("Pleated Skirt", "H&M", "Green", "https://placehold.co/600x400?text=Green+Skirt", 34.99, 0.0, "Midi length pleated skirt.", womenBottomsPath, createSizes("XS", 10, "S", 15, "XL", 10));
        createProduct("Leather Mini Skirt", "Mango", "Brown", "https://placehold.co/600x400?text=Brown+Skirt", 59.99, 0.0, "Faux leather mini skirt.", womenBottomsPath, createSizes("XS", 10, "S", 15, "XL", 10));
        createProduct("High Waisted Shorts", "Levis", "Blue", "https://placehold.co/600x400?text=Blue+Shorts", 69.50, 0.0, "Classic denim shorts.", womenBottomsPath, createSizes("XS", 15, "S", 20, "XL", 15, "2XL", 5));
        createProduct("Yoga Leggings", "Lululemon", "Purple", "https://placehold.co/600x400?text=Purple+Leggings", 98.00, 0.0, "Buttery soft yoga pants.", womenBottomsPath, createSizes("XS", 20, "S", 30, "XL", 20, "2XL", 10));
        createProduct("Linen Shorts", "Reformation", "White", "https://placehold.co/600x400?text=White+Shorts", 98.00, 0.0, "Breezy linen shorts.", womenBottomsPath, createSizes("XS", 10, "S", 15, "XL", 10));

        // --- OUTERWEAR (Unisex/Mixed) ---
        List<String> outerPath = Arrays.asList("Fashion", "Outerwear", "Coats");
        createProduct("Trench Coat", "Burberry", "Beige", "https://placehold.co/600x400?text=Trench+Coat", 1200.00, 0.0, "Iconic heritage trench coat.", outerPath, createSizes("S", 5, "XL", 5));
        createProduct("Puffer Jacket", "The North Face", "Purple", "https://placehold.co/600x400?text=Purple+Puffer", 280.00, 0.0, "Insulated winter jacket.", outerPath, createSizes("S", 10, "XL", 10, "2XL", 10));
        createProduct("Bomber Jacket", "Alpha Industries", "Green", "https://placehold.co/600x400?text=Green+Bomber", 160.00, 10.0, "Classic military style bomber.", outerPath, createSizes("S", 15, "XL", 15, "2XL", 10));
        createProduct("Denim Jacket", "Levis", "White", "https://placehold.co/600x400?text=White+Denim", 98.00, 0.0, "White denim trucker jacket.", outerPath, createSizes("S", 10, "XL", 10, "2XL", 5));
        createProduct("Wool Peacoat", "Schott", "Blue", "https://placehold.co/600x400?text=Blue+Peacoat", 300.00, 0.0, "Navy wool peacoat.", outerPath, createSizes("S", 10, "XL", 10, "2XL", 5));
        createProduct("Shearling Jacket", "Zara", "Brown", "https://placehold.co/600x400?text=Brown+Shearling", 129.00, 0.0, "Faux shearling aviator jacket.", outerPath, createSizes("S", 10, "XL", 10, "2XL", 5));

        // --- ACTIVEWEAR ---
        List<String> activePath = Arrays.asList("Sports", "Clothing", "Activewear");
        createProduct("Running Shorts", "Nike", "Blue", "https://placehold.co/600x400?text=Blue+Shorts", 35.00, 0.0, "Lightweight running shorts.", activePath, createSizes("S", 20, "XL", 20, "2XL", 10));
        createProduct("Sports Bra", "Under Armour", "Purple", "https://placehold.co/600x400?text=Purple+Bra", 30.00, 0.0, "High support sports bra.", activePath, createSizes("XS", 15, "S", 20, "XL", 15));
        createProduct("Track Jacket", "Adidas", "Green", "https://placehold.co/600x400?text=Green+Track", 70.00, 0.0, "Retro style track jacket.", activePath, createSizes("S", 15, "XL", 15, "2XL", 10));
        createProduct("Performance Socks", "Bombas", "White", "https://placehold.co/600x400?text=White+Socks", 12.00, 0.0, "Cushioned athletic socks.", activePath, createSizes("S", 50, "XL", 50));
        createProduct("Hiking Pants", "Columbia", "Beige", "https://placehold.co/600x400?text=Beige+Hiking", 60.00, 0.0, "Convertible hiking pants.", activePath, createSizes("S", 10, "XL", 15, "2XL", 10));
        createProduct("Thermal Base Layer", "Smartwool", "Brown", "https://placehold.co/600x400?text=Brown+Layer", 85.00, 0.0, "Merino wool base layer.", activePath, createSizes("S", 10, "XL", 10, "2XL", 5));
    }

    // Helper to create Product
    private void createProduct(String title, String brand, String color, String imageUrl,
                               Double price, Double discountPercent, String description,
                               List<String> categoryPath, Set<Size> sizes) {

        // 1. Handle Category Path
        Category category = categoryService.findOrCreateCategoryByPath(categoryPath);

        // 2. Calculate total quantity from sizes
        int totalQuantity = sizes.stream().mapToInt(Size::getQuantity).sum();

        // 3. Build Product
        Product product = Product.builder()
                .title(title)
                .brand(brand)
                .color(color)
                .imageUrl(imageUrl)
                .price(price)
                .discountPercent(discountPercent)
                .description(description)
                .category(category)
                .size(sizes)
                .quantity(totalQuantity)
                .build();

        // Note: @PrePersist in Product entity will automatically calculate 'discountedPrice'
        productRepository.save(product);
    }

    // Helper to create diverse Sizes
    private Set<Size> createSizes(Object... args) {
        Set<Size> sizes = new HashSet<>();
        for (int i = 0; i < args.length; i += 2) {
            String name = (String) args[i];
            Integer quantity = (Integer) args[i + 1];
            sizes.add(new Size(name, quantity));
        }
        return sizes;
    }
}