const API_URL = 'http://localhost:4000/api';
let token = '';

async function registrar() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
    });
    const data = await res.json();
    alert('Usuario registrado ✅');
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        token = data.token;
        document.getElementById('servicios').style.display = 'block';
        listarServicios();
        alert('Inicio de sesión exitoso ✅');
    } else {
        alert('Error en login');
    }
}

async function listarServicios() {
    const res = await fetch(`${API_URL}/servicios`);
    const servicios = await res.json();
    const lista = document.getElementById('listaServicios');
    lista.innerHTML = '';
    servicios.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.nombre} - $${s.precio}`;
        lista.appendChild(li);
    });
}

async function crearServicio() {
    const nombre = document.getElementById('servicioNombre').value;
    const precio = document.getElementById('servicioPrecio').value;

    const res = await fetch(`${API_URL}/servicios`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nombre, precio })
    });
    if (res.ok) {
        alert('Servicio creado');
        listarServicios();
    } else {
        alert('Error al crear servicio');
    }
}
