
//------------------------------------------------ Credit Card Checker ----------------------------------------------------------//
//Codecademy project. 
//This was my attempt at the project. 


// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
//------------------------------- validate card number -----------------------------//

const validateCred = array => {
  let sum = 0;
  let count = 1;
  for (let i = array.length-1; i >= 0; i--) {
    if (count === 1) {
      sum += array[i];
      count++;
    } else if (count === 2) {
      let num = array[i] * 2;
        if (num > 9) {
          num -= 9;
        };
      sum += num;
      count--;
    };
  };
  return sum % 10 === 0;
};

// console.log(validateCred(valid1));
// console.log(validateCred(invalid1));

//----- check array of arrays for invalid card number using validator ------------------------//

const findInvalidCards = arrays => {
  const invalidCards = [];
    arrays.forEach(item => {
      if (!validateCred(item)) {
      invalidCards.push(item);
    };
  });
  return invalidCards;
};

// console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));
// console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); 

//---------------------- check companies that issued invalid cards ------------------------//

const idInvalidCardCompanies = arrays => {
  const invalidCompanyCards = [];
  arrays.forEach(item => {
    switch (item[0]) {
      case 3:
      if (!invalidCompanyCards.includes('Amex')) {
        invalidCompanyCards.push('Amex')};
        break;
      case 4:
      if (!invalidCompanyCards.includes('Visa')) {
        invalidCompanyCards.push('Visa')};
        break;
      case 5:
      if (!invalidCompanyCards.includes('Mastercard')) {
        invalidCompanyCards.push('Mastercard')};
        break;  
     case 6:
     if (!invalidCompanyCards.includes('Discover')) {
        invalidCompanyCards.push('Discover')};
        break; 
      default:
        console.log(`Item ${item}: Company not found.`);
        break;           
     }
  } )
  return invalidCompanyCards;
};

// console.log(idInvalidCardCompanies([invalid1]));
// console.log(idInvalidCardCompanies([invalid2]));
// console.log(idInvalidCardCompanies(batch));

//------------------------ Convert card string number to array ------------------------------//

const numberConvert = string => {
  const card = string.split('').map(Number);
  return card;
};

// numberConvert('4485807058598529')

//------------------------ Convert invalid numbers to valid ------------------------------//
//- Could have change first function at top, and reused code, but made its own for this -//

const cardConverter = number => {
  number.pop();
  let sum = 0;
  let count = 1;
  for (let i = number.length-1; i >= 0; i--) {
    if (count === 1) {
      let num = number[i] * 2;
        if (num > 9) {
          num -= 9;
          sum += num;
         } else {sum += num;}
         count++;
    } else if (count === 2) {
      sum += number[i];
      count--;
    }
  };
  const newCheckNum = 10 - (sum % 10);
  number.push(newCheckNum);
  return number;
};

// console.log(`Before cardConverter: ${validateCred(invalid1)}`);
// console.log( `After: ${validateCred(cardConverter(invalid1))}` );

// console.log(`Before cardConverter: ${validateCred(invalid2)}`);
// console.log( `After: ${validateCred(cardConverter(invalid2))}`);