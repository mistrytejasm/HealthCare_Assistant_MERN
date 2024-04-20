const upload_preset = import.meta.env.VITE_UPLOAD_PRESET
const cloud_name = import.meta.env.VITE_CLOUD_NAME

const uploadImageToCloudinary = async (file) => {
  // console.log('File:', file); // Verify the file object
  // console.log('Cloud Name:', cloud_name); // Verify the cloud name

  const uploadData = new FormData();
  uploadData.append('file', file);
  uploadData.append('upload_preset', upload_preset);
  uploadData.append('cloud_name', cloud_name)

  //console.log('Upload Data:', uploadData); // Verify the upload data

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: 'POST',
      body: uploadData,
    }
  );

  const data = await res.json();
  // console.log('Upload Response:', data); // Log the upload response for further inspection
  return data;
};


export default uploadImageToCloudinary;
