import 'alertifyjs/build/css/alertify.css';
export enum NotificationPosition  {
    topCenter='top-center',
    topRight='top-right',
    topLeft='top-left',
    bottomRight='bottom-right',
    bottomLeft='bottom-left',
    bottomCenter='bottom-center'
}
export const AlertifyLibrary ={

     AlertifyAlert:(title:string,message:string)=>{
        alertify.alert(title, message);
        },
        AlertifySuccess:(message:string,notificationPosition:NotificationPosition)=>{
        alertify.set('notifier','position', notificationPosition);
        alertify.notify(message, 'success', 5,notificationPosition);
        },
        AlertifyWarning:(message:string,notificationPosition:NotificationPosition)=>{
        alertify.set('notifier','position', notificationPosition);
        alertify.notify(message, 'error', 5);
        }
    }
