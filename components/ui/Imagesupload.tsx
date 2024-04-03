import React, { useRef, useState } from 'react';
import { IoIosPhotos } from "react-icons/io";
interface ImageUploadProps {
  setFiles: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({setFiles}) => {

    const inputref = useRef<any>()
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const filesArray: File[] = Array.from(fileList);
    setFiles(filesArray);

    const previewsArray: string[] = [];
    filesArray.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          previewsArray.push(reader.result as string);
          setPreviews([...previewsArray]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} hidden ref={inputref}/>
      <div className='py-10 border rounded flex justify-center items-center cursor-pointer'>
      <IoIosPhotos size={30} color='white' onClick={()=> inputref.current.click()}/>      
        </div>
      <div className='flex'>
      {previews.map((preview, index) => (
        <img key={index} src={preview} alt={`Preview ${index}`} style={{ width: '200px', height: '200px', margin: '5px' }} />
      ))}
      </div>
    </div>
  );
};

export default ImageUpload;