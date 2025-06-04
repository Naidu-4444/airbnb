const UploadtoBlob = async (file) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/v1/upload?filename=${file.name}`,
    {
      method: "POST",
      body: file,
    }
  ).then((res) => res.json());
};

export default UploadtoBlob;
