import { iti } from './intTleInput';
import emailjs from '@emailjs/browser';
import './style.scss'
import { isValidForm } from './validation';

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

const form = document.getElementById('form') as HTMLFormElement

form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const formData = new FormData(form)
    const isValid = isValidForm(formData)

    const countryData = iti.getSelectedCountryData();
    const selectedCountry = countryData.dialCode;

    if (isValid) {
        let phoneInput = form.elements.namedItem('phone') as HTMLInputElement;
        phoneInput.value = selectedCountry + phoneInput.value
        const errorSpan = document.createElement('span');

        emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, form, PUBLIC_KEY)
            .then(() => {
                form.reset()
                errorSpan.classList.add('no-error-span');
                errorSpan.textContent = 'Форма відправлена!'
                form.appendChild(errorSpan)
                    , (error: any) => {
                        errorSpan.classList.add('error-span');
                        errorSpan.textContent = error
                        form.appendChild(errorSpan);
                    };
            })
    }
})
