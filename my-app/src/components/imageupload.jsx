import UploadtoBlob from "@/utils/uploadtoBlob";

const Imageupload = ({ value, returnUrl }) => {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    const { url } = await UploadtoBlob(file);
    returnUrl(url);
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
    </div>
  );
};
export default Imageupload;
