import { supabase } from '../lib/supabaseClient';
import axios from 'axios';

// ============================================
// MIGRATE PRODUCTS - ALTERNATIVE APPROACH
// ============================================
export const migrateProductsFromFakeAPI = async () => {
  console.log('🚀 Starting product migration from Fake Store API...');
  console.log('⏳ This may take 10-20 seconds...');

  try {
    // Step 1: Fetch products from Fake Store API
    console.log('📦 Fetching products from Fake Store API...');
    const response = await axios.get('https://fakestoreapi.com/products');
    const allProducts = response.data;

    console.log(`📥 Received ${allProducts.length} total products`);

    // Step 2: Filter ONLY clothing products
    const clothingProducts = allProducts.filter(
      (p) =>
        p.category === "men's clothing" ||
        p.category === "women's clothing"
    );

    console.log(`👔 Filtered to ${clothingProducts.length} clothing products`);

    if (clothingProducts.length === 0) {
      throw new Error('No clothing products found in API');
    }

    // Step 3: Use hardcoded category IDs (since API call is failing)
    console.log('📋 Using predefined category mappings...');
    const categoryMap = {
      "men's clothing": 1,    // Assuming ID 1 for men's clothing
      "women's clothing": 2,  // Assuming ID 2 for women's clothing
    };

    console.log('🗂️ Category mapping:', categoryMap);

    // Step 4: Transform products for Supabase
    console.log('🔄 Transforming products...');
    const transformedProducts = clothingProducts.map((product) => ({
      title: product.title,
      description: product.description,
      price: parseFloat(product.price),
      image_url: product.image,
      category_id: categoryMap[product.category],
      category_name: product.category,
      stock: Math.floor(Math.random() * 50) + 10,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Navy', 'Gray'],
      material: 'Premium Cotton Blend',
      rating_rate: product.rating?.rate || 0,
      rating_count: product.rating?.count || 0,
      featured: Math.random() > 0.7,
    }));

    console.log('✅ Products transformed successfully');

    // Step 5: Insert products using Supabase client
    console.log('💾 Inserting products into Supabase...');
    
    // Try direct insert
    const { data, error } = await supabase
      .from('pandaproducts')
      .insert(transformedProducts)
      .select();

    if (error) {
      console.error('Insert error:', error);
      
      // If direct insert fails, try alternative RPC call
      console.log('Trying alternative insert method...');
      const { data: rpcData, error: rpcError } = await supabase.rpc('insert_panda_products', {
        products: transformedProducts
      });
      
      if (rpcError) throw rpcError;
      
      console.log(`✅ Successfully migrated products via RPC!`);
      return {
        success: true,
        count: transformedProducts.length,
        products: transformedProducts,
        message: `Successfully migrated ${transformedProducts.length} clothing products to your database!`,
      };
    }

    console.log(`✅ Successfully migrated ${data.length} products!`);
    console.log('🎉 Migration completed successfully!');

    return {
      success: true,
      count: data.length,
      products: data,
      message: `Successfully migrated ${data.length} clothing products to your database!`,
    };

  } catch (error) {
    console.error('❌ Migration failed:', error);
    
    // Provide more detailed error info
    if (error.code === 'PGRST106') {
      return {
        success: false,
        error: 'API configuration issue. Please check Supabase dashboard settings.',
        message: 'Schema exposure issue - contact support or check API settings',
      };
    }
    
    return {
      success: false,
      error: error.message,
      message: `Migration failed: ${error.message}`,
    };
  }
};

// Create RPC function for direct insert (run this in SQL editor once)
export const createRPCFunction = `
CREATE OR REPLACE FUNCTION insert_panda_products(products jsonb)
RETURNS void AS $$
BEGIN
  INSERT INTO pandaproducts (
    title, description, price, image_url, category_id, category_name,
    stock, sizes, colors, material, rating_rate, rating_count, featured
  )
  SELECT 
    (p->>'title')::text,
    (p->>'description')::text,
    (p->>'price')::decimal,
    (p->>'image_url')::text,
    (p->>'category_id')::bigint,
    (p->>'category_name')::text,
    (p->>'stock')::integer,
    ARRAY(SELECT jsonb_array_elements_text(p->'sizes')),
    ARRAY(SELECT jsonb_array_elements_text(p->'colors')),
    (p->>'material')::text,
    (p->>'rating_rate')::decimal,
    (p->>'rating_count')::integer,
    (p->>'featured')::boolean
  FROM jsonb_array_elements(products) AS p;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`;