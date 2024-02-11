const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function emailValid(string){
    if(!regex.test(string)){
        return false;
    }
    return true;
}

export default emailValid;
