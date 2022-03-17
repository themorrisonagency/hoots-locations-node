import { Box, Button, Flex, Heading, Input, useToast, Text,    Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
    useDisclosure} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { withUrqlClient } from "next-urql"
import { useRouter } from "next/router"
import { useState } from "react"
import HoursInput from "../../src/components/HoursInput"
import { useLocationQuery } from "../../src/generated/graphql"
import { createUrqlClient } from "../../src/utils/createUrqlClient"
import UpdateLocation from '../../src/utils/UpdateLocation'
import styles from "../../styles/Home.module.css"
import {ArrowBackIcon, DeleteIcon} from '@chakra-ui/icons'
import Link from 'next/link'
const Location = () => {
  const [deleteLocationId, setDeleteLocationId] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

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
  const router = useRouter()
  const toast = useToast()
  const intId = typeof router.query.id === "string" ? router.query.id : -1
  const [{ data, error, fetching }] = useLocationQuery({
    pause: intId === -1, // If we don't have an id, then stop the query.
    variables: {
      yextId: router.query.id,
    },
  })
  const [location, setLocation] = useState("")

  const {
    address,
    description,
    hours,
    name,
    c_cateringURL,
    c_infoBanner,
    c_locationHighlights,
    c_locationName,
    c_locationShortName,
    c_locationSlug,
    c_mapTile,
    c_mapUrl,
    c_oloID,
    c_promoUrl,
    c_shortDescription,
    geocodedCoordinate,
    mainPhone,
    visible,
    c_comingSoonText,
    comingSoon,
    c_masthead,
    c_promoGraphic,
    orderUrl,
  } = location

  if (!fetching && data && location == "") {
    data.location.formatted = false
    Object.keys(data.location).forEach((key) => {
      try {
        data.location[key] = JSON.parse(data.location[key])
      } catch {
        data.location[key] = data.location[key]
      }
    })
    setLocation(data.location)
  }
  

  return (
    <Box bgColor="white">

      <Box bgColor={"white"} p={5}>
        <Flex justifyContent={"space-between"}>
        <Button leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='outline'>
          <Link href="/admin">All Locations</Link>
        </Button>
        <Button leftIcon={<DeleteIcon />} onClick={() => showDeleteModal(location.c_locationSlug)} colorScheme='red'>
         Delete {location.c_locationName}
        </Button>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete location?</ModalHeader>
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
      <main className={styles.main}>
        {!fetching && location ? (
          <Formik enableReinitialize
            initialValues={{
              c_locationName,
              c_locationShortName,
              line1: address.line1 || "",
              city: address.city || "",
              region: address.region || "",
              postalCode: address.postalCode || "",
              description,
              name,
              c_cateringURL,
              c_infoBanner,
              c_locationName,
              c_locationShortName,
              c_locationSlug,
              c_mapTile,
              c_mapUrl,
              c_oloID: (c_oloID !=  null) ? c_oloID.toString() : "",
              c_promoUrl,
              c_shortDescription,
              geocodedCoordinate,
              mainPhone,
              orderUrl: (orderUrl) ? orderUrl.url : "",
              visible,
              c_comingSoonText,
              c_locationHighlights,
              mondayOpen: hours.monday.openIntervals ? hours.monday.openIntervals[0].start : "",
              mondayClose: hours.monday.openIntervals ? hours.monday.openIntervals[0].end : "",
              tuesdayOpen: hours.tuesday.openIntervals ? hours.tuesday.openIntervals[0].start : "",
              tuesdayClose: hours.tuesday.openIntervals ? hours.tuesday.openIntervals[0].end : "",
              wednesdayOpen: hours.wednesday.openIntervals ? hours.wednesday.openIntervals[0].start : "",
              wednesdayClose: hours.wednesday.openIntervals ? hours.wednesday.openIntervals[0].end : "",
              thursdayOpen: hours.thursday.openIntervals ? hours.thursday.openIntervals[0].start : "",
              thursdayClose: hours.thursday.openIntervals ? hours.thursday.openIntervals[0].end : "",
              fridayOpen: hours.friday.openIntervals ? hours.friday.openIntervals[0].start : "",
              fridayClose: hours.friday.openIntervals ? hours.friday.openIntervals[0].end : "",
              saturdayOpen: hours.saturday.openIntervals ? hours.saturday.openIntervals[0].start : "",
              saturdayClose: hours.saturday.openIntervals ? hours.saturday.openIntervals[0].end : "",
              sundayOpen: hours.sunday.openIntervals ? hours.sunday.openIntervals[0].start : "",
              sundayClose: hours.sunday.openIntervals ? hours.sunday.openIntervals[0].end : "",
            }}
            onSubmit={async (values) => {
              const result = await UpdateLocation(intId, values)
              toast({
                duration: null,
                position: 'top-right',
                title: `${result.data.message || 'Success'}`,
                status: (result.data.type == 'FATAL_ERROR') ? 'error' : 'success',
                isClosable: true,
              })
              setLocation(result.data.location)
              if (result.data.type != 'FATAL_ERROR') {
                // router.reload()
              }
            }}>
              {( {isSubmitting}) => (
                            <Form>
                            <Box>
                              <h1>basic info</h1>
                              <Flex justifyContent={"space-between"}>
                                <span>
                                  <label htmlFor="c_locationName">Name</label>
                                  <Input as={Field} id="c_locationName" name="c_locationName" placeholder="Hoots Wings" />
                                </span>
              
                                <span>
                                  <label htmlFor="c_locationShortName">Abbreviated name</label>
                                  <Input as={Field} id="c_locationShortName" name="c_locationShortName" placeholder="Hoots" />
                                </span>
                              </Flex>
                            </Box>
              
                            <div className="formGroup">
                              <span>
                                <label htmlFor="c_comingSoonText">Coming Soon Text</label>
                                <Input as={Field} id="c_comingSoonText" name="c_comingSoonText" placeholder="Opening in April" />
                                <label htmlFor="c_shortDescription">Tagline</label>
                                <Input as={Field} id="c_shortDescription" name="c_shortDescription" placeholder="tagline" />
                              </span>
                            </div>
              
                            <div className="formGroup">
                              <Flex flexWrap={"wrap"} justifyContent="space-between">
                                <span>
                                  <label htmlFor="line1">Street</label>
                                  <Input as={Field} id="line1" name="line1" placeholder="Street Address" />
                                </span>
                                <span>
                                  <label htmlFor="city">City</label>
                                  <Input as={Field} id="city" name="city" placeholder="City" />
                                </span>
                                <span>
                                  <label htmlFor="postalCode">Zip</label>
                                  <Input as={Field} id="postalCode" type="number" name="postalCode" placeholder="00000" />
                                </span>
              
                                <span>
                                  <label htmlFor="region">state</label>
                                  <Input as={Field} id="region" name="region" placeholder="state" />
                                </span>
              
                                <span>
                                  <label htmlFor="mainPhone">Phone</label>
                                  <Input as={Field} id="mainPhone" type="text" name="mainPhone" placeholder="000-000-0000" />
                                </span>
                                <span>
                                  <label htmlFor="c_oloID">OLO ID</label>
                                  <Input as={Field} id="c_oloID" name="c_oloID" type="text" placeholder="" />
                                </span>
                              </Flex>
                            </div>
              
                            <h1>Links</h1>
                            <div className="formGroup">
                              <span>
                                <label htmlFor="orderUrl">Order URL</label>
                                <Input as={Field} id="orderUrl" name="orderUrl" placeholder="" />
              
                                <label htmlFor="c_cateringURL">Catering URL</label>
                                <Input as={Field} id="c_cateringURL" name="c_cateringURL" placeholder="" />
                              </span>
                            </div>
              
                            <div className="formGroup">
                              <label htmlFor="c_mapUrl">Google Maps URL</label>
                              <Input as={Field} id="c_mapUrl" name="c_mapUrl" placeholder="tagline" />
                            </div>
              
                            <div className="formGroup storeHours">
                              <h1>store hours</h1>
                              <HoursInput hours={location.hours} />
                            </div>
              
                            <div className="formGroup">
                              <p>Description</p>
                              <Field id="description" name="description" placeholder="description" as="textarea" />
              
                              <div role="group" aria-labelledby="checkbox-group">
                                <label>
                                  <Field type="checkbox" name="c_locationHighlights" value="BEER_AND_WINE" />
                                  Beer & Wine
                                </label>
                                <label>
                                  <Field type="checkbox" name="c_locationHighlights" value="DELIVERY" />
                                  Delivery
                                </label>
                                <label>
                                  <Field type="checkbox" name="c_locationHighlights" value="CARRYOUT" />
                                  Carryout
                                </label>
              
                                <label>
                                  <Field type="checkbox" name="c_locationHighlights" value="PATIO_SEATING" />
                                  Patio Seating
                                </label>
              
                                <label>
                                  <Field type="checkbox" name="c_locationHighlights" value="PET_FRIENDLY" />
                                  Pet Friendly
                                </label>
                              </div>
                            </div>
                            <Button type="submit" isLoading={isSubmitting}>Submit</Button>
                          </Form>
              )}
          </Formik>
        ) : (
          <h1>Loading</h1>
        )}
      </main>

      <footer className={styles.footer}></footer>
      </Box>
  )
}
export default withUrqlClient(createUrqlClient, { ssr: false })(Location)
