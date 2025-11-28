import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const SimpleFooter = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-5">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Shop */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Shop</h3>
                        <ul className="space-y-2 text-sm font-light">
                            <li><a href="/men" className="hover:text-white">Men</a></li>
                            <li><a href="/women" className="hover:text-white">Women</a></li>
                            <li><a href="/electronics" className="hover:text-white">Electronics</a></li>
                            <li><a href="/deals" className="hover:text-white">Deals</a></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Help</h3>
                        <ul className="space-y-2 text-sm font-light">
                            <li><a href="/shipping" className="hover:text-white">Shipping</a></li>
                            <li><a href="/returns" className="hover:text-white">Returns</a></li>
                            <li><a href="/sizing" className="hover:text-white">Sizing</a></li>
                            <li><a href="/contact" className="hover:text-white">Contact</a></li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">About</h3>
                        <ul className="space-y-2 text-sm font-light">
                            <li><a href="/about" className="hover:text-white">Our Story</a></li>
                            <li><a href="/careers" className="hover:text-white">Careers</a></li>
                            <li><a href="/sustainability" className="hover:text-white">Sustainability</a></li>
                            <li><a href="/press" className="hover:text-white">Press</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" className="hover:text-white transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="https://twitter.com" className="hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="https://instagram.com" className="hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="https://youtube.com" className="hover:text-white transition-colors">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <Separator className="bg-gray-700 mb-6" />

                <div className="text-center text-sm font-light">
                    <p>© 2024 YourStore. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default SimpleFooter