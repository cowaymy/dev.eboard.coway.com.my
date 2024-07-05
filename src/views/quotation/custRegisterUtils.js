 function fn_lengthCheck(bankId, AccNo){

    var valid = true; //result
    var lengthOfAccNo = AccNo.length;

    //MAYBANK
    if(bankId == 21 || bankId == 30){
        if(lengthOfAccNo != 12){
            valid = false;
            return valid;
        }
    }
    //CIMB BANK
    if(bankId == 3 || bankId == 36){

        if(lengthOfAccNo != 14 && lengthOfAccNo != 10){
            valid = false;
            return valid;
        }
    }
    //PUBLIC BANK
    if(bankId == 6 || bankId == 32){
        if(lengthOfAccNo != 10){
            valid = false;
            return valid;
        }
    }
    //RHB BANK
    if(bankId == 7 || bankId == 33){
        if(lengthOfAccNo != 14){
            valid = false;
            return valid;
        }
    }
    //ALLIANCE BANK
    if(bankId == 2 || bankId == 35){
        if(lengthOfAccNo != 15 && lengthOfAccNo != 14){
            valid = false;
            return valid;
        }
    }
    //HONG LEONG BANK
    if(bankId == 5 || bankId == 29){
        if(lengthOfAccNo != 11){
            valid = false;
            return valid;
        }
    }
    //BANK SIMPANAN NASIONAL
    if(bankId == 9 || bankId ==26){
        if(lengthOfAccNo != 16){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - BANK RAKYAT
    if(bankId == 25){
        if(lengthOfAccNo < 10 || lengthOfAccNo > 12){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - BANK ISLAM
    if(bankId == 10){
        if(lengthOfAccNo != 14){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - HSBC
    if(bankId == 17){
        if(lengthOfAccNo != 12){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - OCBC
    if(bankId == 18){
        if(lengthOfAccNo != 10){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - STANDARD CHARTED
    if(bankId == 19 || bankId == 34){
        if(lengthOfAccNo < 5 || lengthOfAccNo > 17){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - CITIBANK
    if(bankId == 16){
        if(lengthOfAccNo < 9 || lengthOfAccNo > 16){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - DEUTCHE BANK
    if(bankId == 27){
        if(lengthOfAccNo < 10 || lengthOfAccNo > 14){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - BANK OF AMARICA
    if(bankId == 13){
        if(lengthOfAccNo != 12){
            valid = false;
            return valid;
        }
    }
    //MY CLEAR - J.P MORGAN
    if(bankId == 45){
        if(lengthOfAccNo != 10){
            valid = false;
            return valid;
        }
    }

    return valid;
}



function fn_availabilityCheck(bankId, AccNo){

    var isReject = false; //result

    //MAYBANK
    if(bankId == 21 || bankId == 30){
        if(AccNo.substr(0,1).trim() ==  '4'){
            isReject = true;
            return isReject;
        }
    }

    //CIMB BANK
    if(bankId == 3 || bankId == 36){
        if(AccNo.length == 14){
            console.log (AccNo.substr(11,1).trim());
            if(AccNo.substr(11,1).trim() == 9 || AccNo.substr(11,1).trim() == 2 || AccNo.substr(11,1).trim() == 1){
                isReject = true;
                return isReject;
            }
        }
    }

    //PUBLIC BANK
    if(bankId == 6 || bankId == 32){
        if(AccNo.substr(0,1).trim() == '2' || AccNo.substr(0,1).trim() == '8'){
            isReject = true;
            return isReject;
        }
    }

    //RHB BANK
    if(bankId == 7 || bankId == 33){
        if(AccNo.substr(0,1).trim() == '7'){
            isReject = true;
            return isReject;
        }
    }

    //HONG LEONG BANK
    if(bankId == 5 || bankId == 29){
        if(AccNo.substr(3,1).trim() == '8' || AccNo.substr(3,1).trim() == '9'){
             isReject = true;
             return isReject;
        }
    }
    return isReject;
}


export default {
    fn_availabilityCheck,fn_lengthCheck
}