const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;


function PasswordValid(string){
    if(string.length < 8){
        return false;
    }
    if(!regex.test(string)){
        return false;
    }
    return true;
}

export default PasswordValid;