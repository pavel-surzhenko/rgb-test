import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

const phoneInput = document.querySelector('#phone') as HTMLInputElement;

export const iti = intlTelInput(phoneInput, {
    separateDialCode: true,
    allowDropdown: true,
    initialCountry: 'auto',
    geoIpLookup: callback => {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("ua"));
    },
    preferredCountries: ['ua', 'us', 'gb'],
    utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js'
});
