import { useState, useEffect } from 'react';
import { 
  getUserWishlist, 
  addToWishlist as addToWishlistService,
  removeFromWishlist as removeFromWishlistService,
  isInWishlist as checkIsInWishlist,
  clearWishlist as clearWishlistService
} from '../services/wishlistService';
import { useAuth } from '../Context/AuthContext';

// Hook to manage user's wishlist
export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist
  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const result = await getUserWishlist(user.id);
      
      if (result.success) {
        setWishlist(result.wishlist || []);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  // Add to wishlist
  const addToWishlist = async (product) => {
    if (!user) {
      return { success: false, error: 'Please login to add to wishlist' };
    }

    const result = await addToWishlistService(product, user.id);
    
    if (result.success) {
      fetchWishlist(); // Refresh wishlist
    }
    
    return result;
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    const result = await removeFromWishlistService(productId, user.id);
    
    if (result.success) {
      fetchWishlist(); // Refresh wishlist
    }
    
    return result;
  };

  // Clear wishlist
  const clearWishlist = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };

    const result = await clearWishlistService(user.id);
    
    if (result.success) {
      setWishlist([]);
    }
    
    return result;
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.product_id === productId);
  };

  return { 
    wishlist, 
    loading, 
    error, 
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    refetch: fetchWishlist,
    wishlistCount: wishlist.length
  };
};

// Hook to check if a single product is in wishlist
export const useIsInWishlist = (productId) => {
  const { user } = useAuth();
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || !productId) {
        setInWishlist(false);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const result = await checkIsInWishlist(productId, user.id);
        setInWishlist(result.isInWishlist);
      } catch (err) {
        console.error('Error checking wishlist:', err);
        setInWishlist(false);
      } finally {
        setLoading(false);
      }
    };

    checkWishlist();
  }, [productId, user]);

  return { inWishlist, loading };
};