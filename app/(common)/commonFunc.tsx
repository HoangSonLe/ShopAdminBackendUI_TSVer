import toast from "react-hot-toast";
export const toastSuccessCustom = (successMessageList : string[]) : void =>{
    successMessageList.forEach(message => {
        toast.error(message);
    });
}
export const toastErrorCustom = (errorMessageList : string[]) : void =>{
    errorMessageList.forEach(message => {
        toast.error(message);
    });
}