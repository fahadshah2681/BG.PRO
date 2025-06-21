interface RemoveBgResponse {
  success: boolean;
  data?: string;
  error?: string;
}

export const removeBackground = async (imageFile: File): Promise<RemoveBgResponse> => {
  try {
    const apiKey = import.meta.env.VITE_REMOVEBG_API_KEY;
    
    if (!apiKey) {
      throw new Error('Remove.bg API key not found');
    }

    const formData = new FormData();
    formData.append('image_file', imageFile);
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.errors?.[0]?.title || `API Error: ${response.status}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    return {
      success: true,
      data: imageUrl,
    };
  } catch (error) {
    console.error('Background removal error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove background',
    };
  }
};

export const downloadProcessedImage = (imageUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = `${filename.split('.')[0]}_no_bg.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the blob URL
  URL.revokeObjectURL(imageUrl);
};