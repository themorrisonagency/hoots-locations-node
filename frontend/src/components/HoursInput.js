import React from "react"
import { Formik, Field, Form, FormikHelpers } from "formik"
import { Table, Thead, Tr, Th, Td, Tbody, Input } from "@chakra-ui/react"

function HoursInput(obj) {
  const { hours } = obj

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Day</Th>
          <Th>Opening</Th>
          <Th>Closing</Th>
          <Th>Closed</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.keys(hours).map((day) => (
          <Tr key={day}>
            <Td>{day.split('')[0].toUpperCase() + day.split('').slice(1).join('')}</Td>
            <Td>
              <Input as={Field} id={`${day}Open`} type="text" name={`${day}Open`} />
            </Td>
            <Td>
              <Input as={Field} id={`${day}Close`} type="text" name={`${day}Close`} />
            </Td>
            <Td>
              <Field type="checkbox" name="isClosed"/>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default HoursInput
