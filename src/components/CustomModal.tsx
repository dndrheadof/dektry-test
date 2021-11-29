import { FC } from 'react'
import {
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image as CImage,
  Box,
  FormControl,
  Button,
  Input,
} from '@chakra-ui/react'
import axios from 'axios'
import { Field, FieldProps, Form, Formik } from 'formik'
import { Image } from '../types'

type ModalProps = {
  image: Image
  isOpen: boolean
  onClose: () => void
  setImages: any
}

export const CustomModal: FC<ModalProps> = ({
  image,
  isOpen,
  onClose,
  setImages,
}) => {
  const removeImage = (id: string) => {
    setImages((images: Image[]) => images.filter((img) => img.id !== id))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{image?.author}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Box
              m="6"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <CImage src={image?.download_url} />
              <Box p="6">
                <Formik
                  initialValues={{ text: '' }}
                  onSubmit={async (values, actions) => {
                    await axios.post(
                      'https://jsonplaceholder.typicode.com/posts',
                      { text: values.text }
                    )
                    removeImage(image?.id)
                    actions.setSubmitting(false)
                    onClose()
                  }}
                >
                  {(props) => (
                    <Form>
                      <Field name="text">
                        {({ field }: FieldProps) => (
                          <FormControl>
                            <Input {...field} placeholder="Текст" id="text" />
                          </FormControl>
                        )}
                      </Field>
                      <Button
                        type="submit"
                        mt={4}
                        colorScheme="teal"
                        isLoading={props.isSubmitting}
                      >
                        Отправить
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
