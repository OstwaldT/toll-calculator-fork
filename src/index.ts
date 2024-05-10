import Express from 'express'
import 'joi-extract-type'
import { routes } from './routes'

const app = Express()
const PORT = process.env.PORT || 3000

app.use(Express.json())
app.use('/', routes)

const server = app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`)
})

process.on('SIGINT', () => {
    console.log('Stopping server gracefully...')
    server.close(() => {
        console.log('Server stopped.')
        process.exit(0)
    })
})
