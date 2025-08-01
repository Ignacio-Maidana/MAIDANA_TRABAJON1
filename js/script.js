// ===== FUNCIONALIDADES PRINCIPALES =====

// Variables globales
let isDarkMode = false;
const userName = 'Visitante'; // Puedes cambiar esto o hacer que sea dinámico

// ===== SALUDO AUTOMÁTICO =====
function showWelcomeMessage() {
    // Crear el elemento del saludo
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = `
        <div class="welcome-content">
            <span class="welcome-icon">👋</span>
            <span class="welcome-text">¡Bienvenido a mi perfil, ${userName}!</span>
            <button class="close-welcome" onclick="closeWelcome()">×</button>
        </div>
    `;
    
    // Insertar al inicio del body
    document.body.insertBefore(welcomeDiv, document.body.firstChild);
    
    // Mostrar con animación
    setTimeout(() => {
        welcomeDiv.classList.add('show');
    }, 500);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        closeWelcome();
    }, 5000);
}

// Función para cerrar el mensaje de bienvenida
function closeWelcome() {
    const welcomeMessage = document.querySelector('.welcome-message');
    if (welcomeMessage) {
        welcomeMessage.classList.add('hide');
        setTimeout(() => {
            welcomeMessage.remove();
        }, 300);
    }
}

// ===== MODO OSCURO/CLARO =====
function createThemeToggle() {
    // Crear el botón de cambio de tema
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <span class="theme-icon">🌙</span>
        <span class="theme-text">Modo Oscuro</span>
    `;
    themeToggle.onclick = toggleTheme;
    
    // Agregar al container principal
    const container = document.querySelector('.container');
    if (container) {
        container.appendChild(themeToggle);
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (isDarkMode) {
        // Activar modo oscuro
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Modo Claro';
        localStorage.setItem('darkMode', 'true');
    } else {
        // Activar modo claro
        body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Modo Oscuro';
        localStorage.setItem('darkMode', 'false');
    }
    
    // Animación del botón
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
        themeToggle.style.transform = 'scale(1)';
    }, 150);
}

// Cargar preferencia de tema guardada
function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
        isDarkMode = false; // Lo ponemos en false para que toggleTheme() lo cambie a true
        toggleTheme();
    }
}

// ===== FUNCIONALIDADES ADICIONALES =====

// Función para obtener saludo según la hora
function getTimeBasedGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return '¡Buenos días';
    } else if (hour < 18) {
        return '¡Buenas tardes';
    } else {
        return '¡Buenas noches';
    }
}

// Función para personalizar el saludo con la hora
function showPersonalizedWelcome() {
    const greeting = getTimeBasedGreeting();
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    welcomeDiv.innerHTML = `
        <div class="welcome-content">
            <span class="welcome-icon">👋</span>
            <span class="welcome-text">${greeting}, ${userName}! Bienvenido a mi perfil</span>
            <button class="close-welcome" onclick="closeWelcome()">×</button>
        </div>
    `;
    
    document.body.insertBefore(welcomeDiv, document.body.firstChild);
    
    setTimeout(() => {
        welcomeDiv.classList.add('show');
    }, 500);
    
    setTimeout(() => {
        closeWelcome();
    }, 6000);
}

// ===== FUNCIONALIDADES PARA FORMULARIO (contacto.html) =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Agregar validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(e.target);
    const data = {
        nombre: formData.get('nombre'),
        email: formData.get('email'),
        asunto: formData.get('asunto'),
        mensaje: formData.get('mensaje')
    };
    
    // Validar formulario
    if (validateForm(data)) {
        // Simular envío exitoso
        showSuccessMessage();
        e.target.reset();
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Validar nombre
    if (!data.nombre || data.nombre.trim().length < 2) {
        showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres');
        isValid = false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Ingresa un email válido');
        isValid = false;
    }
    
    // Validar asunto
    if (!data.asunto) {
        showFieldError('asunto', 'Selecciona un asunto');
        isValid = false;
    }
    
    // Validar mensaje
    if (!data.mensaje || data.mensaje.trim().length < 10) {
        showFieldError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    switch (field.name) {
        case 'nombre':
            if (value.length < 2) {
                showFieldError('nombre', 'El nombre debe tener al menos 2 caracteres');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError('email', 'Ingresa un email válido');
            }
            break;
        case 'mensaje':
            if (value.length > 0 && value.length < 10) {
                showFieldError('mensaje', 'El mensaje debe tener al menos 10 caracteres');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const existingError = field.parentNode.querySelector('.field-error');
    
    if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    field.classList.add('error');
}

function clearFieldError(e) {
    const field = e.target;
    const errorDiv = field.parentNode.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.remove();
    }
    
    field.classList.remove('error');
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✅</span>
            <span class="success-text">¡Mensaje enviado correctamente! Te responderé pronto.</span>
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        successDiv.classList.add('hide');
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Cargar preferencia de tema
    loadThemePreference();
    
    // Crear botón de cambio de tema
    createThemeToggle();
    
    // Mostrar saludo personalizado
    showPersonalizedWelcome();
    
    // Inicializar formulario si estamos en contacto.html
    initContactForm();
    
    // Agregar efectos adicionales
    addScrollEffects();
});

// ===== EFECTOS ADICIONALES =====
function addScrollEffects() {
    // Efecto parallax suave en el fondo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        document.body.style.backgroundPosition = `center ${rate}px`;
    });
    
    // Animación de elementos al hacer scroll (si hay más contenido)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animateElements = document.querySelectorAll('.goal-item, .form-group, .contact-method');
    animateElements.forEach(el => observer.observe(el));
}

// ===== FUNCIONES UTILITARIAS =====

// Función para detectar si es móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Función para mostrar notificaciones toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Exportar funciones para uso global
window.closeWelcome = closeWelcome;
window.toggleTheme = toggleTheme;