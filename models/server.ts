import express, { Application } from 'express';
import userRoutes from '../routes/users';
import cors from 'cors';
import db from '../db/connection';

class Server {
  private app: Application;
  private port: string | number;
  private apiPaths = {
    users: '/api/users'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.dbConnection();
    this.middlewares();

    //routes
    this.routes();
  }

  async dbConnection() { 
    try {
      await db.authenticate();
      console.log('Database online');
    } catch (error) {
      console.log(error);
    }
  }

  middlewares() { 
    //cors
    this.app.use(cors());
    //read and parse body
    this.app.use(express.json());
    // public directory
    this.app.use(express.static('public'));
  }

  routes() { 
    this.app.use(this.apiPaths.users, userRoutes);
  }

    
  listen() { 
    this.app.listen(this.port, () => {
      console.log('Server running on port' + this.port);
    });
  }
}

export default Server;