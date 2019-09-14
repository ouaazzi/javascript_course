export const proxy = ''; // https://cors-anywhere.herokuapp.com/  if Access-Control-Allow-Origin is error
export const key = '11e0fd5df169ec583ec0d0e154028006';
//Never store key on client side, always in your server

/* Count # of API request*/
export const APICounter = () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    const counterAPIDate = parseInt(localStorage.getItem('counterAPIDate'));
    const counterAPIMonth = parseInt(localStorage.getItem('counterAPIMonth'));
    const counterAPIYear = parseInt(localStorage.getItem('counterAPIYear'));
    let counterAPI = parseInt(localStorage.getItem('counterAPI'));

    const restCounterAPI = () => {
        localStorage.setItem('counterAPI', '1');
        localStorage.setItem('counterAPIDate', `${currentDay}`);
        localStorage.setItem('counterAPIMonth', `${currentMonth}`);
        localStorage.setItem('counterAPIYear', `${currentYear}`);
    };

    if (parseInt(localStorage.getItem('counterAPI')) < 1) {
        restCounterAPI();
        console.log(`First API Call 😋`)
    } else if (currentYear == counterAPIYear && currentMonth == counterAPIMonth && currentDay == counterAPIDate) {
        counterAPI += 1;
        localStorage.setItem('counterAPI', `${counterAPI}`);
        alert(`API Counter: ${counterAPI}`);
    } else {
        restCounterAPI();
        alert(`First API Call of the day 😎`);
    }
};