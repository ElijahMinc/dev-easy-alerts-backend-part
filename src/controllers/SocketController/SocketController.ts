
import http from 'http';
import { Server } from 'socket.io';
import { Express } from 'express'
import { AlertInterface } from '../../modules/Alert/alert.interface';
import DepartmentCacheService from '../../services/DepartmentCacheService';
 
let departments = [];
 export class SocketController {
   public server: ReturnType<typeof http.createServer> = null;
   private io: InstanceType<typeof Server> = null;

   constructor(expressApp: Express) {
     this.server = http.createServer(expressApp);
     this.io = new Server(this.server);

     this.init();
   }
 

   private departmentJoin (departmentId: any, socket: any, clientId: any){
    socket.join(departmentId);

    // if(!DepartmentCacheService.has(departmentId)){
    //   DepartmentCacheService.set(clientId, departmentId)
    // }

    // this.io.to(departmentId).emit('ROOM:JOINED', allMessagesByRoomId)
   }

   private addNewAlert(alertData: AlertInterface) {
     console.log('alertData', alertData);
     this.io.to(alertData.departmentId as any).emit('GET:ALERT', alertData);
   }
 
   private disconnect() {
      this.io.emit('DISCONNECT')
   }
 
   public init() {
     this.io.on('connection', (socket) => {
      const clientId = socket.id
      // console.log('conntecion', socket)

      // console.log('socket', socket.rooms.forEach(room => room.))

      socket.on('DEPARTMENT:JOIN', (departmentId: any) => this.departmentJoin(departmentId, socket, clientId))
      socket.on('ADD:NEW:ALERT', (alertData: AlertInterface) => this.addNewAlert(alertData));
      socket.on('disconnect', this.disconnect.bind(this));
     });
   }
 }
 
 export default SocketController;
 