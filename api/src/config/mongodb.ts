import { MongoClient, ServerApiVersion } from 'mongodb'

export const mongodb = new MongoClient(
  'mongodb+srv://henrique998:sJd4H5S830CNr5wX@instant.8v0utiv.mongodb.net/?retryWrites=true&w=majority',
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  },
)
