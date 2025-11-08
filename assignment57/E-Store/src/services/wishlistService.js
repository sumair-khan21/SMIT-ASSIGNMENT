import { supabase } from '../lib/supabaseClient';

// Add item to wishlist
export const addToWishlist = async (product, userId) => {
  try {
    console.log('Adding to wishlist:', { product, userId });

    const { data, error } = await supabase
      .from('pandawishlist')
      .insert([{
        user_id: userId,
        product_id: product.id,
        product_title: product.title,
        product_price: parseFloat(product.price),
        product_image: product.image_url || product.image,
        product_category: product.category_name || product.category
      }])
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate error
      if (error.code === '23505') {
        return { 
          success: false, 
          error: 'Item already in wishlist',
          isDuplicate: true 
        };
      }
      throw error;
    }

    console.log('Added to wishlist:', data);

    return { 
      success: true, 
      data,
      message: 'Added to wishlist!' 
    };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

// Remove item from wishlist
export const removeFromWishlist = async (productId, userId) => {
  try {
    console.log('Removing from wishlist:', { productId, userId });

    const { error } = await supabase
      .from('pandawishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;

    console.log('Removed from wishlist');

    return { 
      success: true,
      message: 'Removed from wishlist' 
    };
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

// Get user's wishlist
export const getUserWishlist = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('pandawishlist')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { 
      success: true, 
      wishlist: data || [] 
    };
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return { 
      success: false, 
      error: error.message,
      wishlist: []
    };
  }
};

// Check if product is in wishlist
export const isInWishlist = async (productId, userId) => {
  try {
    const { data, error } = await supabase
      .from('pandawishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned

    return { 
      success: true, 
      isInWishlist: !!data 
    };
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return { 
      success: false, 
      isInWishlist: false 
    };
  }
};

// Clear entire wishlist
export const clearWishlist = async (userId) => {
  try {
    const { error } = await supabase
      .from('pandawishlist')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    return { 
      success: true,
      message: 'Wishlist cleared' 
    };
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

// Move wishlist item to cart (requires product details)
export const moveToCart = async (wishlistItemId, userId) => {
  try {
    // First get the wishlist item
    const { data: wishlistItem, error: fetchError } = await supabase
      .from('pandawishlist')
      .select('*')
      .eq('id', wishlistItemId)
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Remove from wishlist
    const removeResult = await removeFromWishlist(wishlistItem.product_id, userId);
    
    if (!removeResult.success) throw new Error(removeResult.error);

    return { 
      success: true,
      product: wishlistItem,
      message: 'Moved to cart' 
    };
  } catch (error) {
    console.error('Error moving to cart:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};