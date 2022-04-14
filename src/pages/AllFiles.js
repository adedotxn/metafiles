import React from 'react';
import { Box } from "@chakra-ui/react"
import FileCard from '../components/FileCard';

export default function AllFiles({files}) {
  
  // const files = [
  //   { 
  //     file_type: "Public",
  //     description: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     file_type: "Shared",
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     file_type: "Public",
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     file_type: "Shared",
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     file_type: "Private",
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  //   { 
  //     file_type: "Public",
  //     title: "A sample text", 
  //     uploaded_at: "12:00 am", 
  //     uploaded_by: "Anonymous"
  //   },
  // ]
  

  
  // useEffect(() => {
  //   console.log("loading")
  //   getAllFiles();
  // }, [])
  
  return (
    <Box d="flex" flexWrap="wrap" px={{base:5 , md:10, lg:12 }} mt={5} mx="auto" justifyContent="space-around">       
        {
        files.map((file, index) => {
          return <FileCard 
                      key={index}
                      title={file.name}
                      fileType={file.fileType} 
                      uploadedAt={file.time}
                      uploadedBy={file.author}
                  />
        })
      }

    </Box>
  )
}
