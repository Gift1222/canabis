import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const BUCKET_NAME = 'make-838179d5-documents';

export async function initializeStorage() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 10485760, // 10MB limit
      });
      
      if (error) {
        console.error('Error creating storage bucket:', error);
      } else {
        console.log('Storage bucket created successfully:', BUCKET_NAME);
      }
    } else {
      console.log('Storage bucket already exists:', BUCKET_NAME);
    }
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
}

export async function uploadDocument(
  applicationId: string,
  fileName: string,
  fileData: Uint8Array,
  contentType: string
) {
  try {
    const timestamp = Date.now();
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${applicationId}/${timestamp}_${safeFileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileData, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error('Error uploading document to storage:', error);
      throw error;
    }

    return {
      path: data.path,
      fullPath: filePath,
    };
  } catch (error) {
    console.error('Error in uploadDocument:', error);
    throw error;
  }
}

export async function getSignedUrl(filePath: string, expiresIn = 3600) {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Error creating signed URL:', error);
      throw error;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error in getSignedUrl:', error);
    throw error;
  }
}

export async function deleteDocument(filePath: string) {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error('Error deleting document:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteDocument:', error);
    throw error;
  }
}

export async function listDocuments(applicationId: string) {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(applicationId);

    if (error) {
      console.error('Error listing documents:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in listDocuments:', error);
    throw error;
  }
}
