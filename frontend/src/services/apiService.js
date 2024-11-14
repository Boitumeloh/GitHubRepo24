export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      const data = await response.json();
      console.log("uploadFile response data:", data);
      return data; // Ensure it returns { summary, recommendations }
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // Throw an error so it can be caught in handleNext
    }
  };