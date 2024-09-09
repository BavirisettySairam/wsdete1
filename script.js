document.addEventListener('DOMContentLoaded', () => {
    const fetchButton = document.getElementById('fetch-image');
    const imageContainer = document.getElementById('image-container');

    // Fetching images
    fetchButton.addEventListener('click', fetchImages);

    function fetchImages() {
        imageContainer.innerHTML = ''; // Clear existing images before fetching new ones

        for (let i = 0; i < 12; i++) {
            fetch('https://dog.ceo/api/breeds/image/random')
                .then(response => response.json())
                .then(data => {
                    const imageUrl = data.message;
                    const image = document.createElement('img');
                    image.src = imageUrl;
                    image.alt = 'Random Dog Image';
                    image.style.margin = '5px'; // Add some margin between images
                    imageContainer.appendChild(image);
                })
                .catch(error => console.error('Error:', error));
        }
    }

    // Form validation
    const form = document.getElementById('form');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const phone = document.getElementById('phone');
    const breed = document.getElementById('breed');

    function validateField(field, condition, message) {
        if (condition) {
            field.style.border = '1px solid red';
            field.setCustomValidity(message);
        } else {
            field.style.border = '1px solid #ccc';
            field.setCustomValidity('');
        }
    }

    name.addEventListener('input', () => {
        validateField(name, name.value.trim().length < 3, 'Name must be at least 3 letters long.');
    });

    phone.addEventListener('input', () => {
        let phoneValue = phone.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (phoneValue.length > 11) {
            phoneValue = phoneValue.slice(0, 11); // Limit to 11 digits
        }
        phone.value = phoneValue;
        validateField(phone, phoneValue.length > 11, 'Phone number must not exceed 11 digits.');
    });

    password.addEventListener('input', () => {
        validateField(password, password.value.trim().length < 10, 'Password must be at least 10 characters long.');
    });

    email.addEventListener('input', () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(email, !emailPattern.test(email.value.trim()), 'Please enter a valid email address.');
    });

    function checkAllFieldsFilled() {
        return (
            name.value.trim() !== '' &&
            email.value.trim() !== '' &&
            password.value.trim() !== '' &&
            phone.value.trim() !== '' &&
            breed.value.trim() !== ''
        );
    }

    form.addEventListener('submit', (event) => {
        let valid = true;

        validateField(name, name.value.trim().length < 3, 'Name must be at least 3 letters long.');
        validateField(phone, phone.value.trim().length > 11, 'Phone number must not exceed 11 digits.');
        validateField(password, password.value.trim().length < 10, 'Password must be at least 10 characters long.');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(email, !emailPattern.test(email.value.trim()), 'Please enter a valid email address.');

        if (!checkAllFieldsFilled()) {
            alert('Please fill in all fields.');
            valid = false;
        }

        if (!valid || form.querySelectorAll(':invalid').length > 0) {
            event.preventDefault(); 
        } else {
            alert('Thank you for signing up!');
        }
    });
});
