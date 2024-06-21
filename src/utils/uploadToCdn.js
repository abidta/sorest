import ImageKit from 'imagekit'

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
})
/**
 *
 * @param {(Object|Object[])} file - contains a single file or multiple files in a array.
 * @param {string} userId - a unique user id created by mongodb objectId.
 * @returns {(Object|Object[])}
 */
export const uploadToCdn = async (file, userId) => {
  let fileBuffers
  let options
  let result
  /**
   * create imagekit upload custom option for multiple files(post pictures) and single files(profile pic).
   * @param {Number} i- index
   * @returns {Object} Imagekit upload option.
   */
  try {
    const createOptions = (i) => {
      const options = {
        file: fileBuffers ? fileBuffers[i] : file.buffer,
        useUniqueFileName: !!fileBuffers && true,
        fileName: fileBuffers
          ? `${Date.now()}_${userId}_${i}.jpg`
          : `${file.fieldname}_${userId}.jpg`,
        folder: fileBuffers ? `/posts/${userId}` : `/profile/${userId}`,
      }
      console.log(options)
      return options
    }
    if (Array.isArray(file)) {
      fileBuffers = file.reduce((fileBuffer, value) => {
        if (!Buffer.isBuffer(value.buffer)) {
          value.buffer = Buffer.from(value.buffer.data)
        }
        return [...fileBuffer, value.buffer]
      }, [])
    }
    if (fileBuffers) {
      result = []
      for (let i = 0; i < fileBuffers.length; i++) {
        options = createOptions(i)
        result.push(await imageKit.upload(options))
      }
      console.log(result)
      return result
    }
    options = createOptions()
    result = await imageKit.upload(options)
    console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

export const deleteFile = async (media) => {
  const deletePromises = media.map((file) => imageKit.deleteFile(file.fileId))
  await Promise.all(deletePromises)
}
