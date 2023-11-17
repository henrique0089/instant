import { app } from './app'
import './websockets/chat'

app.listen(3333, () => console.log('Server is running!'))
