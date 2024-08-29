import baseFetch from "../utils/baseFetch";

export const signIn = async (model: LoginRequest) : Promise<Acknowledgement<TokenModel>> => {
    var response =  await baseFetch('/api/auth/getToken', 'POST', model);
    if(response.data.isSuccess){
        localStorage.setItem("token",response.data)
    }
      return response;  
};