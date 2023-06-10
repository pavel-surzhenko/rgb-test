import './style.scss'
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

const form = document.getElementById('form') as HTMLFormElement
const nameInput = document.querySelector('input[type="text"][placeholder="Ваше имя и фамилия"]') as HTMLInputElement;
const emailInput = document.querySelector('input[type="text"][placeholder="Ваш email"]') as HTMLInputElement;
const phoneInput = document.querySelector('#phone') as HTMLInputElement;

intlTelInput(phoneInput, {
    separateDialCode: true,
    allowDropdown: true,
    initialCountry: 'auto',
    geoIpLookup: callback => {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("us"));
    },
    preferredCountries: ['us', 'ua', 'gb'],
    utilsScript: 'intl-tel-input/build/js/utils.js',
});

// Оновлення вибраної країни при зміні
phoneInput.addEventListener('countrychange', function () {
    const countryData = window.intlTelInputGlobals.getCountryData();
});

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    if (!nameInput.value || !phoneInput.value || !emailInput.value) {
        alert('Будь ласка, заповніть всі поля');
        return;
    }

    // Перевірка правильності заповнення пошти
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(emailInput.value)) {
        alert('Будь ласка, введіть правильну адресу електронної пошти');
        return;
    }

    // Перевірка правильності заповнення номеру телефону
    const phoneRegex = /^\+?[0-9]{9,}$/;
    if (!phoneRegex.test(phoneInput.value)) {
        alert('Будь ласка, введіть правильний номер телефону');
        return;
    }

})
