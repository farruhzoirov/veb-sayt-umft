require('dotenv').config();
const PORT = process.env.PORT || 3000
const express = require('express')
const mongoose = require('mongoose')
const swagger = require('./swagger')
const cors = require('cors')
const app = express()
const routerList = require('./routers.js')
const upload = require("./helpers/uploads/upload-models.helper");

class Server {
    constructor(){
        this.init()
        this.useMiddleWares()
        this.addRoutes()
        this.listenServer().then()
    }
    init(){

    }
    useMiddleWares(){
        app.use('/files', express.static('files'))
        app.use('/images',express.static('images'))
        app.use(cors({
            origin: 'http://localhost:63342',
            methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            allowedHeaders: 'Content-Type, Authorization'
        }));

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    }
    addRoutes() {
        app.use(routerList);
        app.use((err, req, res, next) => {  // Error-handling middleware
            const { statusCode = 500, message  } = err;
            res.status(statusCode).json({
                status: "error",
                statusCode,
                message
            });
        });
        swagger(app);
    }
    async listenServer(){
        const server = async () => {
            try {
                await mongoose.connect(process.env.MONGO_URI)
                console.log('Database Connected');
                app.listen(8000)
                const shutdown = () => {
                    console.log('Shutting down gracefully...');
                    server.close(() => {
                        console.log('Server closed. Exiting...');
                        process.exit(0);
                    });
                };
                process.on('SIGINT', shutdown);
                process.on('SIGTERM', shutdown);
                console.log(`Server ${PORT} is running. MongoDB is good`);
            } catch (e) {
                console.log(e)
            }
        }
        await server();
    }
}

new Server();

