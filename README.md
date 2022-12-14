# node-live-project-backend-sq012
# clone the repo 
#  run yarn 

requirement to create user:
POST - localhost:7000/api/user/signup
        {
            "email":"jon1fye@gmail.com",
            "userName":"johjffnqee",
            "password":"/^[a-zA-Z0-9]{3,30}$/",
            "date_birth":"03/3/1995",
            "gender":"male"
        }
RESPONSE - POST localhost:7000/api/user/signup 
    201 -{
       "message": "User created successfully, check your email to activate you account",
       "token": "12345678OIUYRE*())(*&^%$#@#$" 
    }
    400 -{
        "Error": "User already exist"
    }
    500 -{
        "Error": "Internal server error"
    }



if you want to access the userSchema you have import  from src/model
if you want to access the inteface you have import  from src/interface


