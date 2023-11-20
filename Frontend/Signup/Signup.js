// signup.js

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name= document.getElementById('name').value
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match. Please enter matching passwords.');
                return;
            }
             console.log(1)
            try {
                const response = await fetch('http://localhost:8080/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name,email, password }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    alert('Signup successful. Redirecting to  Sign up page.');
                    window.location.href = '../Login/Login.html'; // Redirect to your main page
                } else {
                    alert('Signup failed. Check your information and try again.');
                }
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An error occurred during signup. Please try again.');
            }
        });
    }
});
