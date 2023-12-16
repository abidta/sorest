import ImageKit from 'imagekit'

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
})

export const uploadToCdn = async (file, userId) => {
  console.log(file)
  let result = await imageKit.upload({
    file: file.buffer,
    fileName: `${file.fieldname}_${userId}.jpg`,
    folder: `/profile/${userId}`,
  })
  console.log(result)
  return result
}
