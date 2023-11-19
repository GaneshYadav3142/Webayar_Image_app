document.addEventListener('DOMContentLoaded', () => {
    const appDiv = document.getElementById('app');
    const loginNavItem = document.getElementById('loginNavItem');
    const signupNavItem = document.getElementById('signupNavItem');
    const uploadNavItem = document.getElementById('uploadNavItem');
    const allImagesNavItem = document.getElementById('allImagesNavItem');

    // Check if the user is logged in
    const token = localStorage.getItem('token');

    if (token) {
        showImagePage();
    } else {
        showLoginForm();
    }

    function showLoginForm() {
        appDiv.innerHTML = `
            <h2>Login</h2>
            <form id="loginForm">
                <label for="loginEmail">Email:</label>
                <input type="email" id="loginEmail" required>

                <label for="loginPassword">Password:</label>
                <input type="password" id="loginPassword" required>

                <button type="submit">Login</button>
            </form>

            <h2>Sign Up</h2>
            <form id="signupForm">
                <label for="signupName">Name:</label>
                <input type="text" id="signupName" required>

                <label for="signupEmail">Email:</label>
                <input type="email" id="signupEmail" required>

                <label for="signupPassword">Password:</label>
                <input type="password" id="signupPassword" required>

                <button type="submit">Sign Up</button>
            </form>
        `;

        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');

        loginForm.addEventListener('submit', loginUser);
        signupForm.addEventListener('submit', signupUser);

        // Toggle visibility based on navigation
        loginNavItem.style.display = 'none';
        signupNavItem.style.display = 'none';
        uploadNavItem.style.display = 'inline';
        allImagesNavItem.style.display = 'inline';
    }

    function showImagePage() {
        appDiv.innerHTML = `
            <h2>Image Upload</h2>
            <form id="uploadForm" enctype="multipart/form-data">
                <input type="file" id="imageInput" accept="image/*" required>
                <button type="submit">Upload Image</button>
            </form>

            <h2>All Images</h2>
            <div id="imageContainer"></div>
        `;

        const uploadForm = document.getElementById('uploadForm');
        const imageContainer = document.getElementById('imageContainer');

        uploadForm.addEventListener('submit', uploadImage);

        // Fetch and display all images
        fetchAllImages();

        // Toggle visibility based on navigation
        loginNavItem.style.display = 'inline';
        signupNavItem.style.display = 'inline';
        uploadNavItem.style.display = 'none';
        allImagesNavItem.style.display = 'none';
    }
    async function loginUser(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Implement your login API endpoint
        const response = await fetch('http://localhost:8080/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            showImagePage();
        } else {
            alert('Login failed. Check your credentials and try again.');
        }
    }

    async function signupUser(event) {
        event.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        // Implement your signup API endpoint
        const response = await fetch('http://localhost:8080/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            showImagePage();
        } else {
            alert('Signup failed. Check your information and try again.');
        }
    }

    async function uploadImage(event) {
        event.preventDefault();

        const imageInput = document.getElementById('imageInput');
        const file = imageInput.files[0];

        if (!file) {
            alert('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        // Implement your image upload API endpoint
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/images/upload', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            // Refresh the image list after successful upload
            fetchAllImages();
        } else {
            alert('Image upload failed. Please try again.');
        }
    }

    async function fetchAllImages() {
        // Implement your fetch all images API endpoint
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/images/all', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const images = await response.json();
            displayImages(images);
        } else {
            alert('Failed to fetch images. Please try again.');
        }
    }

    function displayImages(images) {
        const imageContainer = document.getElementById('imageContainer');
        imageContainer.innerHTML = '';

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `data:image/png;base64,${image.imageData.toString('base64')}`;
            imgElement.alt = 'User Uploaded Image';
            imageContainer.appendChild(imgElement);
        });
    }
});
