const express = require("express");
const router =  express.Router();
const config = require("../config");
const userUtil = require("../utils/userUtil.util");
const winston = require("winston")
const upload = config.ConfigMulter().upload;
const uploadMulti = config.ConfigMulterMultiImages().upload;

async function  RegisterUser(req,res) {

    let saveUserData;
    
    try {
        const validateUserResult = await  userUtil.ValidateUser(req.body);
        if (validateUserResult.success) {
            saveUserData = await userUtil.RegisterUser(validateUserResult.User, req);
           
            if (saveUserData.success) 
            {
                res.status(200).json({
                    UserObject: saveUserData.UserSaved,
                    message: saveUserData.message,
                    success: saveUserData.success
                })
            } else {
                res.status(401).json({
                    UserObject: saveUserData.UserSaved,
                    message: saveUserData.message,
                    success: saveUserData.success
                })
            }
        }
    } catch (error) {
     
        res.status(500).json({
            message: saveUserData.message,
            success: saveUserData.success
        })
    }
}
async function FetchAllUsers(req, res) {

    try {

        const FetchedUsers = await userUtil.GetAllUsers();
        if (FetchedUsers.success) {
            res.status(200).json({
                Users: FetchedUsers.Users,
                message: FetchedUsers.message,
                success: FetchedUsers.success
            })
        }  
    } catch (error) {
            res.status(400).json({
                message: FetchedUsers.message,
                success: FetchedUsers.success
            })
    }
}
async function LoginToSystem(req, res) {

    
    try {
        const validateUserInput = await userUtil.ValidateUserInput(req.body);
        const Login = await userUtil.LoginValidate(validateUserInput.User);
        
       
        res.status(200).json({
            UserObject: Login.User,
            id: Login.id,
            token: Login.token,
            message: Login.message,
            success: Login.success
        })
    } catch (error) {
        res.status(500).json({
            message: Login.message,
            success: Login.success
        })
    }
}
async function UpdateLoggedUser(req, res) 
{


    try {
   
        const UpdateUser = await userUtil.UpdateUserLogStatus(req.params.id, req.body.action);
        
        if (UpdateUser.success) 
        {
         
            res.status(200).json({
                message: UpdateUser.message,
                success: UpdateUser.success
            })
        } else {
            res.status(403).json({
                message: UpdateUser.message,
                success: UpdateUser.success
            })
        }
    } catch (error) {
        res.status(500).json({
            message: UpdateUser.message,
            success: UpdateUser.success
        })
    }
 

}
async function GetLoggedInUser(req,res) {

    let User;
    try {
  
         User = await userUtil.GetConnectedUser(req.params.id);
        
        if(User.success) {
            res.status(200).json({
                UserObject: User.UserData,
                message: User.message,
                success: User.success
            });
        } else {
            res.status(401).json({
                message: User.message,
                success: User.success
            })
        }
    } catch (error) {
        res.status(500).json({
            message: User.message,
            success: User.success
        })
    }
   

}
async function UpdateUser(req,res) {

    let updateUser;
    try {
        
        const validateBeforeUpdate = await userUtil.ValidateUser(req.body);
        updateUser = await userUtil.UpdateUser(validateBeforeUpdate.User, req.params.id, req);
       
        res.status(200).json({
            UserObject: updateUser.updatedUser,
            message: updateUser.message
        })
    } catch (error) {

        res.status(500).json({
            UserObject: req.body,
            message: updateUser.message
        })
    }

    
}

async function UpdateUserImages(req,res) {

  
        try {
        let UpdateImagesForUser = await userUtil.UpdateImages(req, req.params.id);
        
        res.status(200).json({
            Images: UpdateImagesForUser.Images,
            message: UpdateImagesForUser.message,
            success: UpdateImagesForUser.success
        })
    } catch (error) {
        res.status(500).json({
            message: UpdateImagesForUser.message,
            success: UpdateImagesForUser.success
        })
       
    }

    
}
router.post('/login', LoginToSystem);
router.post('/register', upload, RegisterUser);
router.post('/:id',upload, UpdateUser )
router.post('/images/:id', uploadMulti, UpdateUserImages);
router.get('', FetchAllUsers);
router.get('/:id', GetLoggedInUser);
router.put('/:id', UpdateLoggedUser);

module.exports = router;

