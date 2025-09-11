import { supabase } from '@/src/lib/supabaseClient';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-js';

// This function takes a file URI from the image picker, converts it to a format
// Supabase can handle, and uploads it to your 'review_photos' bucket.
export const storageRepo = {
  async uploadReviewImage(fileUri: string, userId: string): Promise<string | null> {
    try {
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: 'base64',
      });

      const fileExt = fileUri.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const contentType = `image/${fileExt}`;
      const fileName = `${userId}/${new Date().toISOString()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('review_photos')
        .upload(fileName, decode(base64), { contentType });

      if (error) {
        throw error;
      }

      // After uploading, we get the public URL for the image to save in our database.
      const { data: urlData } = supabase.storage
        .from('review_photos')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  },
};