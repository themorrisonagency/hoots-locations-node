import Head from "next/head"
import styles from "../../styles/Home.module.css"
import { createUrqlClient } from "../../src/utils/createUrqlClient"
import { withUrqlClient } from "next-urql"
import { useLocationsQuery, useUpdateVisibilityMutation, useUpdateComingSoonMutation } from "../../src/generated/graphql"
import { useState} from "react"
import Link from 'next/link'
import { Button, useToast,
   Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Flex,
    useDisclosure, 
    Table,
    Thead,
    Tr,
    Td,
    Tbody} from "@chakra-ui/react"
    import {ArrowBackIcon, AddIcon, EditIcon} from '@chakra-ui/icons'
import axios from "axios"


const Locations = () => {
  const toast = useToast()
  // const router = useRouter()

  const [isVisible, setVisible] = useUpdateVisibilityMutation()
  const [comingSoon, setComingSoon] = useUpdateComingSoonMutation()
  const [{ data, fetching }, updateLocations] = useLocationsQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [deleteLocationId, setDeleteLocationId] = useState("")
  if (!fetching && data && data.locations) {
    data.locations.map((location) => {
      Object.keys(location).forEach((key) => {
        try {
          location[key] = JSON.parse(location[key])
        } catch {
          location[key] = location[key]
        }
      })
    })
  }
  async function toggleLocationVisible(id, visible) {
    setVisible({
      input: {
        visible: visible,
        yextId: id,
      },
    })
    data.locations.find((location) => location.yextId === id).visible = visible
  }

  async function toggleComingSoon(id, comingSoon) {
    setComingSoon({
      input: {
        comingSoon,
        yextId: id,
      },
    })
    data.locations.find((location) => location.yextId === id).comingSoon = comingSoon
  }
  async function deleteLocation() {
    const result = await axios.delete(`http://localhost:4000/hooks/yext/${deleteLocationId}`)
    toast({
      duration: null,
      position: 'top-right',
      title: `${result.data.message || 'Success'}`,
      status: (result.data.type == 'FATAL_ERROR') ? 'error' : 'success',
      isClosable: true,
    })
    updateLocations
  }

  function showDeleteModal(id){
    onOpen()
    setDeleteLocationId(id)
  }
  return (
    <div className={styles.container}>
      <Box bgColor={"white"} p={5}>
        <Flex justifyContent={"space-between"}>
        <Button leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='outline'>
          <Link href="/admin">All Locations</Link>
        </Button>
        <Button leftIcon={<AddIcon />} href="/admin/add" colorScheme='green'>
         Add Location
        </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this location?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={deleteLocation}>
              Yes
            </Button>
            <Button variant='ghost' onClick={onClose}>no</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>  
      <Flex alignItems={"center"} justifyContent="center">
      <main>
        <Table>
          <Thead>
            <Tr>
              <Td>Name</Td>
              <Td>Address</Td>
              <Td>Is Visible</Td>
              <Td>Is coming soon</Td>
              <Td>Delete</Td>
            </Tr>
          </Thead>
          <Tbody>
            {!fetching && data && data.locations
              ? data.locations.map((location) => (
                  <Tr key={location.id}>
                    <Td>
                      <Link href={`/admin/${location.c_locationSlug}`}><Button leftIcon={<EditIcon />} variant="green" >{location.c_locationName}</Button></Link>
                    </Td>
                    <Td>{location.address.line1} {location.address.city}, {location.address.region}</Td>
                    <Td>
                      <input type="checkbox" name="visible" checked={location.visible} onChange={() => toggleLocationVisible(location.yextId, !location.visible)} />
                    </Td>
                    <Td>
                    <input type="checkbox" name="comingSoon" checked={location.comingSoon} onChange={() => toggleComingSoon(location.yextId, !location.comingSoon)} />
                    </Td>
                    <Td>
                      <Button onClick={() => showDeleteModal(location.c_locationSlug)}>Delete</Button>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
      </main>
        </Flex>    
    </div>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: false })(Locations)
