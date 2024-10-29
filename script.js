document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    
    addUser (username, email);
    
    // Clear the form
    this.reset();
});

let users = [];

function addUser (username, email) {
    const user = {
        id: Date.now(),
        username: username,
        email: email,
        locked: false
    };
    users.push(user);
    renderUsers();
}

function renderUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.className = 'user-item';
        li.innerHTML = `
            <span class="${user.locked ? 'locked' : ''}">${user.username} - ${user.email}</span>
            <button onclick="toggleLock(${user.id})">${user.locked ? 'Mở Khóa' : 'Khóa'}</button>
            <button onclick="editUser (${user.id})">Sửa</button>
        `;
        userList.appendChild(li);
    });
}

function toggleLock(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.locked = !user.locked;
        renderUsers();
    }
}

function editUser (userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        users = users.filter(u => u.id !== userId); // Remove user for re-adding
        renderUsers();
    }
}