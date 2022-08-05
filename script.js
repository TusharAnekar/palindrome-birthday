function reverseString (str) {
    var charList = str.split ("");
    var reverseList = charList.reverse();
    var reverseStr = reverseList.join("");
    return reverseStr;
}

function isPalindrome (str) {
    //var reverseStr = str.split("").reverse().join("");
    var reverseStr = reverseString (str);

    if (str === reverseStr) {
        return true;
    } else {
        return false;
    }

}

function convertDateToStr (date) {
    
    var dateStr = { day: "", month: "", year: ""};
    
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
}

function getAllDateFormats (date) {
    var dateStr = convertDateToStr (date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats (date) {
    var listAllDateFormats = getAllDateFormats(date);

    var flag = false;
    for (let i=0; i<listAllDateFormats.length; i++) {
        if ( isPalindrome (listAllDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear (year) {
    if (year % 400 === 0) {
        return true;
    }
    else if (year % 4 === 0) {
        return true;
    }
    else if (year % 100 === 0) {
        return false;
    }
    else {
        return false;
    }
}

function getNextDate (date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear (year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return { day: day , month: month, year: year};
}

function getNextPalindromeDate (date) {
    var counter = 0;
    var nextDate = getNextDate(date);

    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats (nextDate);

        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [counter, nextDate];
}

const birthdayInput = document.querySelector ("#bday-input");
const showButton = document.querySelector ("#show-button");
const output = document.querySelector ("#result");

showButton.addEventListener ("click" , () => {
    
    var birtdayString = birthdayInput.value;
    if (birtdayString != "") {
        var listOfDate = birtdayString.split("-");
        
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }

        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if (isPalindrome) {
        output.innerText = 'You have a palindrome birthday.';
        }
        else {
            var [counter, nextDate] = getNextPalindromeDate (date);
            output.innerText = "You don't have a palindrome birthday. Your missed by "+counter+"days. The next palindrome birthday is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+".";
        } 
    }
    else {
        output.innerText = "Please enter values in date field."
    }
         
});