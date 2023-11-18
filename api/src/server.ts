import { server } from './app'
import './websockets/chat'

server.listen(3333, () => console.log('Server is running!'))
