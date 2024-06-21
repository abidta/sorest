import Bull from 'bull'
import Redis from 'ioredis'

const redisClient = new Redis()

export const uploadQueue = new Bull('image-upload-queue', {
  redis: redisClient,
})
uploadQueue.on('completed', (job,result) => {
  console.log(result,'result');
  job.remove()
})

uploadQueue.on('failed', (job, err) => {
  job.remove()
  console.log(err)
})
