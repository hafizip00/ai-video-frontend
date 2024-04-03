'use client'
import React, {useEffect , useState } from 'react'
import { IoIosPhotos, IoIosCalendar } from "react-icons/io";
import Link from 'next/link';
import ImageUpload from '@/components/ui/Imagesupload';
import AWS from 'aws-sdk';
import axios from 'axios';
import Loading from '@/components/utils/loading';

// export const metadata = {
//   title: 'Prompt',
//   description: 'Prompt to create your story',
// }


const Prompt = () => {

const languageOptions = ['Arabic', 'Arabic (Gulf)', 'Catalan', 'Chinese (Cantonese)', 'Chinese (Mandarin)', 'Danish', 'Dutch (Belgian)', 'Dutch', 'English (Australian)', 'English (British)', 'English (Indian)', 'English (New Zealand)', 'English (South African)', 'English (US)', 'English (Welsh)', 'Finnish', 'Hindi', 'French', 'French (Belgian)', 'French (Canadian)', 'German', 'German (Austrian)', 'Icelandic', 'Italian', 'Japanese', 'Korean', 'Norwegian', 'Polish', 'Portuguese (Brazilian)', 'Portuguese (European)', 'Romanian', 'Russian', 'Spanish (European)', 'Spanish (Mexican)', 'Spanish (US)', 'Swedish', 'Turkish', 'Welsh']

  let jwt;
  let user:any;
  let storiesArray
  let dataArray:any
  if(typeof window !== 'undefined'){
    // now access your localStorage
    user = localStorage.getItem("user")
    jwt = localStorage.getItem("jwt")
  }

  // useEffect(() => {
  //   user = localStorage.getItem("user")
  //   jwt = localStorage.getItem("jwt")
  // }, [])

  const [files, setFiles] = useState([])
  const [title, setTitle] = useState<string>()
  const [pic , setPic] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)
  if (jwt == "" || user == "") {
    alert("Login to Try it out")
    document.location.href = "/signin";
  }

  const handleImageUpload = (files: File[]) => {
    // Handle image upload logic here, e.g., send to server
    // console.log('Uploaded images:', files);

    if (files.length > 0) {
      const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      });

      files.forEach((file) => {
        const params = {
          Bucket: "story21/" + user + "/raw_images",
          Key: file.name,
          Body: file,
          ACL: 'public-read', // Adjust the ACL as needed
        };
        s3.upload(params, (err: any, data: any) => {
          if (err) {
            console.error('Error uploading file:', err);
          } else {
            setPic(true)
            alert("Images Uploaded Successfully")
            console.log('File uploaded successfully:', data.Location);
            // You can perform additional actions after successful upload
          }
        });
      });
    }

  };


  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    setSelectedLanguage(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const generateStory = async ()=>{
    setLoading(true)
    const  response  = await axios.post("http://localhost:8000/api/prompt" , {
      loc : user,
      title,
      lang : selectedLanguage,
      pic,

    })
    setLoading(false)
    // Retrieving existing data from local storage if any
    const existingData = localStorage.getItem('stories');

    // Parsing existing data or initializing an empty array if no data is present
    const dataArray = existingData ? JSON.parse(existingData) : [];

    // Adding the server response to the array
    dataArray.push(response.data);

    // Saving the updated array back to local storage
    localStorage.setItem('stories', JSON.stringify(dataArray));

    // Retrieving the data from local storage
    const retrievedData = JSON.parse(localStorage.getItem('stories') || "null");
  }

  return (
    <div className='bg-gray-900 h-screen pt-8'>
      {loading && <Loading></Loading>}
      <section className='flex w-full justify-center pt-12 h-full'>
        <div className='text-white rounded-md border'>
          <h1 className='text-center font-bold text-xl'>Generated Stories</h1>
          {/* Single Story */}
          <Link href={'/prompt/stories'}>
            <p className='rounded-xl border-2 p-2'>See Your Stories</p>
            {/* <div className='rounded-lg p-2 border m-2 max-w-[400px]'>
              <h1 className='my-2'>The Story of People</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste qui perferendis eaque maiores provident tempora veritatis, ducimus non recusandae in porro fuga fugit, adipisci...<span className='text-blue-900 hover:text-white'>Read more</span></p>
              <span><IoIosCalendar size={22} className='inline-block mr-2' /></span>
              <span className='my-2 font-bold'>21/02/2024</span>
            </div> */}

          </Link>
        </div>
        <main className='ml-4 flex flex-col justify-end flex-grow border rounded-md'>
          {/* <form className='my-2 px-2'> */}
          <ImageUpload setFiles={setFiles} />
          <select id="language" value={selectedLanguage} onChange={handleChange} required>
            <option value="">Select...</option>
            {languageOptions.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
          <input type='text'
            placeholder='A guy with hammer with ability to thunder...'
            className="my-2 form-input w-full appearance-none bg-gray-800 border border-gray-700 focus:border-gray-600 rounded-sm px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-white placeholder-gray-500" 
            onChange={handleTitleChange}
            required
            value={title}
            />
          <button type='submit' className='my-2 btn text-white bg-blue-600 hover:bg-blue-700 shadow' onClick={() => handleImageUpload(files)}>Upload</button>
          <button type='submit' className='my-2 btn text-white bg-blue-600 hover:bg-blue-700 shadow' onClick={generateStory}>Generate</button>
          {/* </form> */}
        </main>
      </section>
    </div>
  )
}

export default Prompt