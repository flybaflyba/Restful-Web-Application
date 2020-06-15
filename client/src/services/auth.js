import axios from 'axios';

const API_URL = "http://localhost:3000/api/auth";

class AuthService {
    static signup(user) {   
        //console.log(user.email);
        return new Promise((resolve, reject) => {
            //console.log(user.email);
            axios
              .post(API_URL + "/signup", {
                  user_name: user.user_name,
                  email: user.email,
                  password: user.password,
                  last_name: user.last_name,
                  first_name: user.first_name,
                
              })
              .then((res) => {
                console.log("Service return success");
                //resolve(res.data.user);
                resolve(res.data.user);
                  
                //console.log(user.email);
                //console.log(user.password);
              })
              .catch((err) => {
                console.log("Service return failure");
                reject(err);

                //user.email = "heyauth"
                //console.log(user.email);
                //console.log(user.password);
              });
        });
    }
}
 
export default AuthService;