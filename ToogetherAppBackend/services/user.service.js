const validateUtil = require('../utils/validateUtil.util');
const userUtil = require("../utils/userUtil.util");

async function create(userData, req) {
    const validateInput = await validateUtil.validateRegisterInput(userData);
    const createdUser = await userUtil.registerUser(validateInput.userData, req);
    return  {userData: createdUser.userData, success: createdUser.success};
}
async function get() {
    const fetchedUsers = await userUtil.fetchAllUsers();
    return {users: fetchedUsers.users,success: fetchedUsers.success}
} 
async function update(userData, id, req) {
    const validateInput = await validateUtil.validateUpdateInput(userData);
    const resultUpdateUser = await userUtil.updateUser(validateInput.userData, id, req);
    return {userData: resultUpdateUser.userData, success: resultUpdateUser.success};
} 
async function login(userData) {

    const validateInput = await validateUtil.validateLoginInput(userData);
    const resultOfLogin = await userUtil.login(validateInput.userData);
    return {userData: resultOfLogin.userData};
}
async function changeStatus(id, action) {
    const status = {loggedin: action}
    const updateStatus = await userUtil.updateStatus(status, id);
    return {success: updateStatus.success};
}

module.exports = {
    create,
    get,
    update,
    login,
    changeStatus
}