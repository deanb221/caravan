// API Route for uploading images to Cloudinary
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    // If Cloudinary is configured, use it
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      // Convert base64 to buffer if needed
      const base64Data = image.includes('data:image') 
        ? image.split(',')[1] 
        : image;

      // Upload to Cloudinary
      // Create form data for Cloudinary
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('file', `data:image/jpeg;base64,${base64Data}`);
      cloudinaryFormData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET || 'caravan_uploads');
      cloudinaryFormData.append('folder', 'caravan-hire');

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: cloudinaryFormData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error('Cloudinary upload failed');
      }

      const cloudinaryData = await cloudinaryResponse.json();
      
      return res.status(200).json({
        success: true,
        url: cloudinaryData.secure_url,
        publicId: cloudinaryData.public_id,
      });
    }

    // Fallback: Return the image as base64 data URL (for testing without Cloudinary)
    // Note: This is not recommended for production
    return res.status(200).json({
      success: true,
      url: image,
      message: 'Cloudinary not configured. Using base64 image. Please configure Cloudinary for production.',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error uploading image. Please try again.' 
    });
  }
}

