import { FC, useEffect, useState } from 'react'
import {
  Box,
  Container,
  Image as CImage,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import LazyLoad from 'react-lazyload'

import { CustomModal } from './components/CustomModal'
import { Image } from './types'

const App: FC = () => {
  const [images, setImages] = useState<Image[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      const imgs: AxiosResponse = await axios.get(
        'https://picsum.photos/v2/list?page=2&limit=100'
      )
      setImages(imgs.data)
    }

    fetchData()
  }, [])

  const selectImage = (image: Image) => {
    setSelectedImage(image)
    onOpen()
  }

  return (
    <Container className="App" maxW="container.xl" style={{ padding: '24px' }}>
      <CustomModal
        image={selectedImage}
        isOpen={isOpen}
        onClose={onClose}
        setImages={setImages}
      />

      <SimpleGrid minChildWidth="220px" spacing={10}>
        {images.map((item: Image, key: number) => {
          return (
            <LazyLoad height={200} once>
              <Box
                key={key}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={() => selectImage(item)}
                maxW="sm"
                borderRadius="lg"
                overflow="hidden"
              >
                <CImage
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }}
                  src={item.download_url}
                />
              </Box>
            </LazyLoad>
          )
        })}
      </SimpleGrid>
    </Container>
  )
}

export default App
