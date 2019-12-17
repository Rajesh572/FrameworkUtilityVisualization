import { Injectable, ErrorHandler } from "@angular/core";

import { ErrorHandlerService } from "./Services/errorHandler/error-handler.service";

@Injectable()
export class CustomHandler implements ErrorHandler {
  constructor(public errorhandler?: ErrorHandlerService) {
    console.log('myhandler');
  }
  handleError(error: Error) {
   if (Error) {
     this.errorhandler.sendErrorMessage(error.message).subscribe( (res) => {
      console.log('Handled res', res);
     },
     (err) => {
      console.log('Handled err', err);
     });
    console.log('Custom handled', error);
   } else {
     console.log();
   }
  }
}