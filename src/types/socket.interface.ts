import { AlertInterface } from "../modules/Alert/alert.interface"

export enum SOCKET_EMIT_KEYS {
   "NEW:ALERT:ADD" = "NEW:USER:ADD",
   "GET:ALERT" = "GET:ALERT",
}

export enum SOCKET_ON_KEYS {
   "NEW:ALERT:ADD" = "NEW:USER:ADD",
   "GET:ALERT" = "GET:ALERT",
}

export interface ServerToClientEvents {
   "NEW:ALERT:ADD": (alert: AlertInterface) => void
   "GET:ALERT": (alert: AlertInterface) => void
  'CONNECT:DEPARTMENT': (departmentId: AlertInterface['departmentId']) => void;

}

export interface ClientToServerEvents {
   "NEW:ALERT:ADD": (alert: AlertInterface) => void
   "GET:ALERT": (alert: AlertInterface) => void
  'CONNECT:DEPARTMENT': (departmentId: AlertInterface['departmentId']) => void;

}
