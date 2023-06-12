import { iti } from "./intTleInput";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const form = document.getElementById('form') as HTMLFormElement

export const isValidForm = (data: FormData) => {
    const noErrorSpan = form.querySelector('.no-error-span');
    noErrorSpan?.remove()

    const name = data.get('name')
    const phone = data.get('phone')
    const email = data.get('email')

    if (!name || !phone || !email) {
        let errorSpan = form.querySelector('.error-span');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-span');
            form.appendChild(errorSpan);
        }
        errorSpan.textContent = 'Будь ласка, заповніть всі поля';
        return false;
    }

    if (!iti.isValidNumber()) {
        let errorSpan = form.querySelector('.error-span');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-span');
            form.appendChild(errorSpan);
        }
        errorSpan.textContent = 'Будь ласка, введіть правильний номер телефону';
        return;
    }

    if (!emailRegex.test(email as string)) {
        let errorSpan = form.querySelector('.error-span');
        if (!errorSpan) {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-span');
            form.appendChild(errorSpan);
        }
        errorSpan.textContent = 'Будь ласка, введіть правильну адресу електронної пошти';
        return false;
    }

    let errorSpan = form.querySelector('.error-span');
    errorSpan?.remove();
    return true
}