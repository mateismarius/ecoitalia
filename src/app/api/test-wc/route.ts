import { NextResponse } from 'next/server';
import { productService } from '@/lib/woocommerce/products';
import { categoryService } from '@/lib/woocommerce/categories';

export async function GET() {
    try {
        // Test 1: Get products
        const products = await productService.getProducts({ per_page: 5 });

        // Test 2: Get categories
        const categories = await categoryService.getCategories();

        return NextResponse.json({
            success: true,
            data: {
                products: products.products.length,
                categories: categories.length,
                sampleProduct: products.products[0]?.name,
            },
        });
    } catch (error: any) {
        return NextResponse.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}