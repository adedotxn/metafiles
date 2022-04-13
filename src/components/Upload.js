import React, {useRef, useState} from 'react';
import { ethers } from "ethers";
import {
  useDisclosure,
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  HStack,
  ModalFooter,
} from '@chakra-ui/react';
import {Buffer} from 'buffer'
import {create} from 'ipfs-http-client'

import abi from '../contracts/abi.json'

const client = create('https://ipfs.infura.io:5001/api/v0')

const contractAddress = '0x60Cf639967407503958fd3d5205fa93dd1f6522D'

const Upload = () => {
  const {isOpen, onOpen, onClose} = useDisclosure ();
  const initialRef = useRef ();
  const finalRef = useRef ();
  const [fileName, setFileName] = useState('')
  const [type, setType] = useState('')
  const [file, setFile] = useState(null)
  const [fileDetails, setFileDetails] = useState('')
  const [cid, setCid] = useState('')

  const captureFile = (e) => {
    const data = e.target.files[0]
    setFileDetails(data)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result))
    }
  }

  const fileUpload = async () => {
    try {
        const {ethereum} = window
        if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const fileUploadContract = new ethers.Contract(contractAddress, abi.abi, signer)
            const fileUploadTxn = await fileUploadContract.fileUpload(cid, fileName, type)
            await fileUploadTxn.wait()
            console.log(fileUploadTxn)

        }else{
            console.log('ethereum object does not exist!')
        }
    } catch (error) {
        console.log(error)
    }
}








  const submitUpload = async (e) => {
      e.preventDefault()
      console.log('submitted')
      try {
        const created = await client.add(file)
       setCid(created.cid.toString())
       fileUpload()
      } catch (error) {
        console.log(error)
      }


  }
  return (
    <div>
      <Button onClick={onOpen} bg="purple" color="white" ml={5}>

        Upload file
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Upload your file here
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form action="" onSubmit={submitUpload}>
              <FormLabel>Name of file</FormLabel>
              <Input
                type="text"
                placeholder="Enter name of file"
                required
                mb={4}
                onChange={e => setFileName(e.target.value)}
              />
              <Input type="file" required mb={4} onChange={captureFile}/>
              <FormLabel as="view">View type</FormLabel>
              <RadioGroup defaultValue="0" mb={4} >
                <HStack spacing="24px">
                  <Radio value="0" onChange={e => setType(e.target.value)}>Public</Radio>
                  <Radio value="1" onChange={e => setType(e.target.value)}>Private</Radio>
                </HStack>
              </RadioGroup>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type='submit'>
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

    </div>
  );
};

export default Upload;
