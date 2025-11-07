import { useState, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabaseClient';

// ============================================
// HOOK: Fetch All Products
// ============================================
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('pandaproducts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProducts(data || []);
      console.log(` Fetched ${data?.length || 0} products from Supabase`);
    } catch (err) {
      setError(err.message);
      console.error(' Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

// ============================================
// HOOK: Fetch Single Product by ID
// ============================================
export const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('pandaproducts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setProduct(data);
        console.log(' Fetched product:', data?.title);
      } catch (err) {
        setError(err.message);
        console.error(' Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

// ============================================
// HOOK: Fetch All Categories
// ============================================
export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('pandacategories')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;

        setCategories(data || []);
        console.log(` Fetched ${data?.length || 0} categories`);
      } catch (err) {
        setError(err.message);
        console.error(' Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// ============================================
// CRUD OPERATIONS (For Admin Panel)
// ============================================
export const productOperations = {
  // CREATE new product
  create: async (productData) => {
    try {
      const { data, error } = await supabase
        .from('pandaproducts')
        .insert([productData])
        .select()
        .single();

      if (error) throw error;

      console.log(' Product created:', data.title);
      return { success: true, data };
    } catch (error) {
      console.error(' Error creating product:', error);
      return handleSupabaseError(error);
    }
  },

  // UPDATE existing product
  update: async (id, productData) => {
    try {
      const { data, error } = await supabase
        .from('pandaproducts')
        .update(productData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log(' Product updated:', data.title);
      return { success: true, data };
    } catch (error) {
      console.error(' Error updating product:', error);
      return handleSupabaseError(error);
    }
  },

  // DELETE product
  delete: async (id) => {
    try {
      const { error } = await supabase
        .from('pandaproducts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Product deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error deleting product:', error);
      return handleSupabaseError(error);
    }
  },
};