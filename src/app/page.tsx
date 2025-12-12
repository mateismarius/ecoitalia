import { productService } from '@/lib/woocommerce/products';
import ProductSection from '@/components/ProductSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import BrandShowcase from '@/components/home/BrandShowcase';
import Benefits from '@/components/home/Benefits';
import LocationCTA from '@/components/home/LocationCTA';
import { WCProduct } from "@/lib/woocommerce/types";

// ISR - Revalidare la 60 minute
export const revalidate = 3600;

export default async function Home() {
    // Fetch produse din WooCommerce
    let featuredProducts: WCProduct[] = [];
    let saleProducts: WCProduct[] = [];
    let freeBubblesProducts: WCProduct[] = [];

    try {
        [featuredProducts, saleProducts] = await Promise.all([
            productService.getFeaturedProducts(8),
            productService.getSaleProducts(8),
        ]);

        // FreeBubbles products
        try {
            const freeBubblesResult = await productService.getProductsByBrand('freebubbles', { per_page: 8 });
            freeBubblesProducts = freeBubblesResult.products;
        } catch (error) {
            console.error('FreeBubbles fetch error:', error);
            // Fallback la categorie dacă brand attribute nu există
            try {
                const categoryResult = await productService.getProductsByCategory('freebubbles', { per_page: 8 });
                freeBubblesProducts = categoryResult.products;
            } catch (catError) {
                console.error('FreeBubbles category error:', catError);
            }
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }

    return (
        <div className="min-h-screen bg-[#F8F7F4]">
            <Header />

            <main>
                {/* Hero Section */}
                <Hero />

                {/* Brand Showcase */}
                <BrandShowcase />

                {/* Benefits Section */}
                <Benefits />

                {/* Product Sections */}
                {saleProducts.length > 0 && (
                    <div className="bg-gradient-to-br from-[#C19A6B]/5 to-white">
                        <ProductSection
                            title="Oferte Speciale"
                            subtitle="Reduceri la produsele tale preferate"
                            products={saleProducts}
                            viewAllLink="/oferte"
                            priority={true}
                        />
                    </div>
                )}

                {freeBubblesProducts.length > 0 && (
                    <div className="bg-white">
                        <ProductSection
                            title="FreeBubbles - Made in Italy"
                            subtitle="Distribuitor oficial pentru Brasov si Focsani"
                            products={freeBubblesProducts}
                            viewAllLink="/marci/freebubbles"
                        />
                    </div>
                )}

                {featuredProducts.length > 0 && (
                    <div className="bg-[#F8F7F4]">
                        <ProductSection
                            title="Produse Recomandate"
                            subtitle="Cele mai apreciate produse de clientii nostri"
                            products={featuredProducts}
                            viewAllLink="/produse"
                        />
                    </div>
                )}

                {/* Location CTA */}
                <LocationCTA />
            </main>

            <Footer />
        </div>
    );
}