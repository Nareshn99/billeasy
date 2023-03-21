const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const nameRegex = /^[a-z A-Z]*$/



const isValidName = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && nameRegex.test(data.trim())) return true
    return false
}


const isValidEmail = (data) => {
    if (typeof data == "string" && data.trim().length !== 0 && emailRegex.test(data.trim())) return true
    return false
}


const isEmpty = (data) => {
    if (typeof data == "string" && data.trim().length !== 0) return true
    return false;
};

const isValidBody = function (data) {
    return Object.keys(data).length > 0;
};


module.exports={
    isValidName,
    isValidEmail,
    isValidBody
}