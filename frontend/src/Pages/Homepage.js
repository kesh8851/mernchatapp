import { Container,Box ,Text} from '@chakra-ui/react'
import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'

const Homepage = () => {


  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxlW="xl" centerContent>
      <Box
      display='flex'
      justifyContent='center'
      
      p={3}
      bg={'white'}
      w={"100%"}
      m={"40px 0 15px 0"}
      borderRadius={'lg'}
      borderWidth={"1px"}
      >
      <Text fontSize='4xl'
      fontFamily={"work-sans"}
      color={'black'}>
      Talk-A-Tive
      </Text>


      </Box>
    <Box w='100%' p='1px' borderRadius='lg' borderWidth='1px' bg='white' h='auto'>
    <Tabs variant='soft-rounded' >
  <TabList mb='1em'>
    <Tab width ='50%'>Login</Tab>
    <Tab width ='50%'>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     { <Login/>}
    </TabPanel>
    <TabPanel>
      {<Signup/>}
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
  )
}

export default Homepage