import { supabase } from '@/src/lib/supabaseClient'; // This line is the fix
import { Business } from '@/types';

export const businessesRepo = {
  async getBusinessById(id: string): Promise<Business | null> {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching business by ID:', error);
      return null;
    }
    return data as any;
  },

  async searchBusinesses(query: string): Promise<Business[]> {
    const searchTerm = `%${query}%`;
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .ilike('name', searchTerm);

    if (error) {
      console.error('Error searching businesses:', error);
      return [];
    }
    return (data as any) || [];
  },

  async getAllBusinesses(): Promise<Business[]> {
    const { data, error } = await supabase.from('businesses').select('*');
    if (error) {
      console.error('Error fetching all businesses:', error);
      return [];
    }
    return (data as any) || [];
  },
};