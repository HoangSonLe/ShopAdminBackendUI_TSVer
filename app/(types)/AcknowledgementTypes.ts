// Example of a generic class definition
class Acknowledgement<T> {
  isSuccess: boolean;
  errorMessageList: string[];
  successMessageList: string[];
  data?: T;

  constructor(isSuccess = false, errorMessageList: string[] = [], successMessageList: string[] = [], data?: T) {
    this.isSuccess = isSuccess;
    this.errorMessageList = errorMessageList;
    this.successMessageList = successMessageList;
    this.data = data;
  }
}