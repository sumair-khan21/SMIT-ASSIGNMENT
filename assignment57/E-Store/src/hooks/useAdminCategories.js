import { useState, useEffect } from 'react';
import { supabase, handleSupabaseError } from '../lib/supabaseClient';

// ============================================
// ADMIN HOOK: Fetch All Categories
// ============================================
export const useAdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.log(`✅ Admin: Fetched ${data?.length || 0} categories`);
    } catch (err) {
      setError(err.message);
      console.error('❌ Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, refetch: fetchCategories };
};

// ============================================
// ADMIN CATEGORY OPERATIONS
// ============================================
export const adminCategoryOperations = {
  // CREATE new category
  create: async (categoryData) => {
    try {
      // Generate slug from name
      const slug = categoryData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const { data, error } = await supabase
        .from('pandacategories')
        .insert([{
          ...categoryData,
          slug
        }])
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Category created:', data.name);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error creating category:', error);
      return handleSupabaseError(error);
    }
  },

  // UPDATE existing category
  update: async (id, categoryData) => {
    try {
      // Update slug if name changed
      const updateData = { ...categoryData };
      if (categoryData.name) {
        updateData.slug = categoryData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }

      const { data, error } = await supabase
        .from('pandacategories')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      console.log('✅ Category updated:', data.name);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error updating category:', error);
      return handleSupabaseError(error);
    }
  },

  // DELETE category
  delete: async (id) => {
    try {
      // First, check if any products use this category
      const { data: products, error: checkError } = await supabase
        .from('pandaproducts')
        .select('id')
        .eq('category_id', id)
        .limit(1);

      if (checkError) throw checkError;

      if (products && products.length > 0) {
        return { 
          success: false, 
          error: 'Cannot delete category with existing products. Please reassign products first.' 
        };
      }

      // Delete the category
      const { error } = await supabase
        .from('pandacategories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      console.log('✅ Category deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error deleting category:', error);
      return handleSupabaseError(error);
    }
  },

  // COUNT products in category
  getProductCount: async (categoryId) => {
    try {
      const { count, error } = await supabase
        .from('pandaproducts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryId);

      if (error) throw error;

      return { success: true, count };
    } catch (error) {
      console.error('❌ Error counting products:', error);
      return { success: false, count: 0 };
    }
  },
};