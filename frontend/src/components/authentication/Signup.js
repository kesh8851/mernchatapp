import { VStack,Input, InputGroup, InputRightElement, InputRightAddon, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import axios from 'axios';

const Signup = () => {
    const [show, setshow] = useState(false)
    const [name, setName] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [confirmpassword, setconfirmpassword] = useState()
    const [pic, setpic] = useState()
    const [loading, setloading] = useState(false)
    const toast = useToast()
    const history=useHistory();

    const handleClick=()=>setshow(!show);
    const submitHandler=async()=>{
        setloading(true);
        if(!name|| !email||!password || !confirmpassword){
            toast({
                title:"Please Fill all the Fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setloading(false);
            return;
        }
        if(password!==confirmpassword){
            toast({
                title:"Password do not match ",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setloading(false);
            return;
        }

        try {
            const config={
                headers:{
                    "Content-type":"application/json",
                },
            };
            const {data}=await axios.post("http://localhost:5000/user/register",{name,email,password},config);
            toast({
                title:"Registration is successful",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });

            localStorage.setItem('userInfo',JSON.stringify(data));
            setloading(false);
            history.push('/chats')
        } catch (error) {
            toast({
                title:"Error occured! ",
                description:error.response.data.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom",
            });
            setloading(false);
        }

    };
    const postDetails=(pics)=>{
        setloading(true);

        if(pics===undefined){
            toast({
                title:"Please Select an Image!",
                status:"warning",
                duartion:5000,
                isClosable:true,
                position:"bottom",
            });

            return;
        }

        if(pics.type==="image/jpeg" || pics.type==="image/png"){
            const data =new FormData();
            data.append("file",pics);
            data.append("upload_present","chat-app");
            data.append("cloud_name","dcqky5cqf");
            fetch("https://api.cloudinary.com/v1_1/dcqky5cqf/image/upload",{
                method:"post",
                body:data,
            }).then((res)=>res.json())
            .then((data)=>{
                setpic(data.url.toString());
                setloading(false);
            })
            .catch((err)=>{
                console.log(err);
                setloading(false);
            }); 
        } else {
             toast({
                title:"Please Select an Image!",
                status:"warning",
                duartion:5000,
                isClosable:true,
                position:"bottom",
            });
            setloading(false);
            return;
        }


    }
  return (
    <VStack spacing ='5px' color='black'>
        <FormControl id ='first-name' isRequired>
        <FormLabel>Name
        </FormLabel>
        <Input
        placeholder='Enter Your Name'
        onChange={(e)=>
            setName(e.target.value)
        }/>
        </FormControl>
         <FormControl id ='email' isRequired>
        <FormLabel>Email
        </FormLabel>
        <Input
        placeholder='Enter Your Email'
        onChange={(e)=>
            setemail(e.target.value)
        }/>
        
        </FormControl>
         <FormControl id ='password' isRequired>
        <FormLabel>Password
        </FormLabel>
        <InputGroup>
        <Input
        type={show?'text':'password'}
        placeholder='Enter Your Password'
        onChange={(e)=>
            setpassword(e.target.value)
        }/>
        <InputRightElement width ='4.5em'>
            <Button h='1.75em' size='sm' onClick={handleClick}>
            {show? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        
        </InputGroup>
        
        </FormControl>
        <FormControl id ='confirmpassword' isRequired>
        <FormLabel>ConfirmPassword
        </FormLabel>
        <InputGroup>
        <Input
        type={show?'text':'password'}
        placeholder='Confirm Your Password'
        onChange={(e)=>
            setconfirmpassword(e.target.value)
        }/>
        <InputRightElement width ='4.5em'>
            <Button h='1.75em' size='sm' onClick={handleClick}>
            {show? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        
        </InputGroup>
        
        </FormControl>
        <FormControl id='pic'>
        <FormLabel>Upload Your picture</FormLabel>
        <Input
        type='file'
        p={3}
        accept='image/*'
       
        onChange={(e)=>
            postDetails(e.target.files[0])
        }/>
        </FormControl>
        <Button colorScheme='blue'
        width='100%'
        style={{marginTop:15}}
        onClick={submitHandler}
        color="white"
        isLoading={loading}
        >
            Sign Up
        </Button>

        
        

    </VStack>
  )
}

export default Signup