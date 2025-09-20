// UTP+ Focus - JavaScript Corregido
// Sistema de gestión académica para estudiantes UTP

class UTPFocus {
  constructor() {
    this.metas = this.cargarDatos('metas') || [];
    this.recordatorios = this.cargarDatos('recordatorios') || [];
    this.estadisticas = this.cargarDatos('estadisticas') || {
      tareasCompletadas: 0,
      metasCompletadas: 0,
      tiempoEstudio: 0
    };
    
let timer = {
  minutos: parseInt(document.getElementById('inputMinutos').value),
  segundos: 0,
  activo: false,
  intervalo: null
};

function actualizarDisplay() {
  const minutos = timer.minutos.toString().padStart(2, '0');
  const segundos = timer.segundos.toString().padStart(2, '0');
  document.getElementById('inputMinutos').value = minutos;
  document.getElementById('segundosDisplay').textContent = segundos;
}

function iniciarTimer() {
  if (timer.activo) return;

  timer.activo = true;
  timer.intervalo = setInterval(() => {
    if (timer.segundos === 0) {
      if (timer.minutos === 0) {
        pausarTimer();
        alert("⏰ Tiempo terminado");
        return;
      }
      timer.minutos--;
      timer.segundos = 59;
    } else {
      timer.segundos--;
    }
    actualizarDisplay();
  }, 1000);
}

function pausarTimer() {
  timer.activo = false;
  clearInterval(timer.intervalo);
}

function reiniciarTimer() {
  pausarTimer();
  timer.minutos = parseInt(document.getElementById('inputMinutos').value);
  timer.segundos = 0;
  actualizarDisplay();
}

// Evitar que cambien los minutos mientras el timer corre
document.getElementById('inputMinutos').addEventListener('input', (e) => {
  if (!timer.activo) {
    timer.minutos = parseInt(e.target.value) || 0;
    actualizarDisplay();
  }
});


// Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
  tiempoRestante = parseInt(inputMinutos.value, 10) * 60;
  actualizarDisplay();
});


// Asignación de eventos a los botones
btnIniciar.addEventListener('click', iniciarTimer);
btnPausar.addEventListener('click', pausarTimer);
btnReiniciar.addEventListener('click', reiniciarTimer);

// Inicialización del temporizador con el valor por defecto
document.addEventListener('DOMContentLoaded', () => {
  tiempoRestante = parseInt(inputTiempoEnfoque.value, 10) * 60;
  actualizarDisplay();
});

    
    // Mensajes motivacionales
    this.mensajesMotivacion = [
      "¡Cada pequeño paso te acerca a tus metas! 💪",
      "El conocimiento es poder, ¡sigue adelante! 📚",
      "Hoy es un gran día para aprender algo nuevo ✨",
      "Tu esfuerzo de hoy será tu éxito de mañana 🚀",
      "¡Eres más fuerte de lo que piensas! 💡",
      "El éxito empieza con la decisión de intentarlo 🎯",
      "Cada día es una oportunidad de mejorar 🌟",
      "Tu dedicación marca la diferencia 🏆"
    ];
    
    // Respuestas del chatbot
    this.respuestasBot = {
      'organizar tiempo': [
        "Te recomiendo usar la técnica Pomodoro: 25 minutos de estudio, 5 de descanso. ¡Prueba el timer que tienes aquí! ⏰",
        "Haz una lista de tareas por prioridad. Empieza por lo más importante y divide las tareas grandes en partes pequeñas. 📝"
      ],
      'consejos estudio': [
        "1. Encuentra un lugar tranquilo y bien iluminado\n2. Elimina distracciones (celular, redes sociales)\n3. Haz resúmenes con tus propias palabras\n4. Enseña lo que aprendes a alguien más 📚",
        "Usa técnicas activas: mapas mentales, fichas de estudio, y practica con ejercicios. ¡La práctica hace al maestro! 🧠"
      ],
      'motivacion': [
        "¡Recuerda por qué empezaste! Cada obstáculo es una oportunidad de crecimiento. ¡Tú puedes! 💪",
        "Los grandes logros requieren tiempo y perseverancia. Celebra cada pequeño avance. ¡Vas por buen camino! 🌟"
      ],
      'default': [
        "¡Hola! Estoy aquí para ayudarte con tus estudios. Puedo darte consejos sobre organización del tiempo, técnicas de estudio y motivación. 😊",
        "¿En qué puedo ayudarte hoy? Tengo muchos consejos para mejorar tu rendimiento académico. 🎓"
      ]
    };
    
    // Bandera para evitar inicialización múltiple
    this.inicializado = false;
  }
  
  // Inicialización
  init() {
    if (this.inicializado) return; // Evitar doble inicialización
    
    this.inicializarMetasPredeterminadas();
    this.actualizarMensajeMotivador();
    this.actualizarEstadisticas();
    this.actualizarProgreso();
    this.actualizarTimer();
    this.actualizarContadorRecordatorios();
    this.cargarRecordatoriosGuardados();
    
    this.inicializado = true;
  }
  
  // NUEVO: Inicializar metas predeterminadas una sola vez
  inicializarMetasPredeterminadas() {
    // Solo inicializar si no hay metas guardadas
    if (this.metas.length === 0) {
      const metasPredeterminadas = [
        { id: 1, texto: "Revisar materiales", icono: "📚", completada: false },
        { id: 2, texto: "Completar tareas", icono: "📝", completada: false },
        { id: 3, texto: "Ver clases grabadas", icono: "🎥", completada: false },
        { id: 4, texto: "Participar en foros", icono: "💬", completada: false }
      ];
      
      this.metas = metasPredeterminadas.map(meta => ({
        ...meta,
        fechaCreacion: new Date().toISOString()
      }));
      
      this.guardarDatos('metas', this.metas);
    }
    
    // Sincronizar con el DOM existente
    this.sincronizarMetasConDOM();
  }
  
  // NUEVO: Sincronizar metas guardadas con elementos del DOM
  sincronizarMetasConDOM() {
    const metasExistentes = document.querySelectorAll('.goal-card[data-meta]');
    
    metasExistentes.forEach(metaElement => {
      const metaDataAttr = metaElement.getAttribute('data-meta');
      let metaId;
      
      // Convertir string IDs a números
      switch(metaDataAttr) {
        case 'revisar': metaId = 1; break;
        case 'tareas': metaId = 2; break;
        case 'videos': metaId = 3; break;
        case 'foros': metaId = 4; break;
        default: metaId = parseInt(metaDataAttr);
      }
      
      // Actualizar atributo con ID numérico
      metaElement.setAttribute('data-meta', metaId);
      
      // Buscar meta correspondiente
      const meta = this.metas.find(m => m.id === metaId);
      if (meta && meta.completada) {
        metaElement.classList.add('completed');
      }
    });
  }
  
  // Gestión de datos
  guardarDatos(clave, datos) {
    // Usar variables en memoria en lugar de localStorage
    if (typeof window !== 'undefined') {
      if (!window._utpData) window._utpData = {};
      window._utpData[clave] = JSON.parse(JSON.stringify(datos));
    }
  }
  
  cargarDatos(clave) {
    if (typeof window !== 'undefined' && window._utpData) {
      return window._utpData[clave] ? JSON.parse(JSON.stringify(window._utpData[clave])) : null;
    }
    return null;
  }
  
  // Mensajes motivacionales
  actualizarMensajeMotivador() {
    const elemento = document.getElementById('mensajeMotivador');
    if (elemento) {
      const mensaje = this.mensajesMotivacion[Math.floor(Math.random() * this.mensajesMotivacion.length)];
      elemento.textContent = mensaje;
    }
  }
  
  // Estadísticas
  actualizarEstadisticas() {
    const tareasElement = document.getElementById('tareasCompletadas');
    const progresoElement = document.getElementById('progresoSemana');
    
    if (tareasElement) {
      tareasElement.textContent = this.estadisticas.tareasCompletadas;
    }
    
    if (progresoElement) {
      const progreso = this.calcularProgresoSemanal();
      progresoElement.textContent = `${progreso}%`;
    }
  }
  
  calcularProgresoSemanal() {
    const metasCompletadas = this.metas.filter(meta => meta.completada).length;
    const totalMetas = this.metas.length;
    return totalMetas > 0 ? Math.round((metasCompletadas / totalMetas) * 100) : 0;
  }
  
  // Gestión de metas
  mostrarFormularioMeta() {
    const formulario = document.getElementById('formularioMeta');
    if (formulario) {
      formulario.classList.remove('hidden');
      document.getElementById('nuevaMetaTexto').focus();
    }
  }
  
  cancelarNuevaMeta() {
    const formulario = document.getElementById('formularioMeta');
    if (formulario) {
      formulario.classList.add('hidden');
      document.getElementById('nuevaMetaTexto').value = '';
    }
  }
  
  agregarNuevaMeta() {
    const textoInput = document.getElementById('nuevaMetaTexto');
    const iconoSelect = document.getElementById('nuevaMetaIcono');
    
    if (!textoInput || !iconoSelect) return;
    
    const texto = textoInput.value.trim();
    const icono = iconoSelect.value;
    
    if (texto) {
      const nuevaMeta = {
        id: Date.now(),
        texto: texto,
        icono: icono,
        completada: false,
        fechaCreacion: new Date().toISOString()
      };
      
      this.metas.push(nuevaMeta);
      this.guardarDatos('metas', this.metas);
      this.agregarMetaAlDOM(nuevaMeta);
      this.actualizarProgreso();
      this.cancelarNuevaMeta();
      this.mostrarToast('Meta agregada correctamente', 'success');
    }
  }
  
  agregarMetaAlDOM(meta) {
    const container = document.getElementById('metasContainer');
    if (!container) return;
    
    const metaElement = document.createElement('div');
    metaElement.className = `goal-card ${meta.completada ? 'completed' : ''}`;
    metaElement.setAttribute('data-meta', meta.id);
    metaElement.onclick = () => this.toggleMeta(metaElement);
    
    metaElement.innerHTML = `
      <div class="goal-icon">${meta.icono}</div>
      <div class="goal-text">${meta.texto}</div>
      <div class="goal-status"></div>
    `;
    
    container.appendChild(metaElement);
  }
  
  toggleMeta(elemento) {
    const metaId = parseInt(elemento.getAttribute('data-meta'));
    const meta = this.metas.find(m => m.id === metaId);
    
    if (meta) {
      meta.completada = !meta.completada;
      elemento.classList.toggle('completed');
      
      if (meta.completada) {
        this.estadisticas.tareasCompletadas++;
        this.mostrarToast('¡Meta completada! 🎉', 'success');
      } else {
        this.estadisticas.tareasCompletadas = Math.max(0, this.estadisticas.tareasCompletadas - 1);
      }
      
      this.guardarDatos('metas', this.metas);
      this.guardarDatos('estadisticas', this.estadisticas);
      this.actualizarEstadisticas();
      this.actualizarProgreso();
    }
  }
  
  // Barra de progreso
  actualizarProgreso() {
    const progreso = this.calcularProgresoSemanal();
    const barraProgreso = document.getElementById('barraProgreso');
    const porcentajeProgreso = document.getElementById('porcentajeProgreso');
    const mensajeProgreso = document.getElementById('mensajeProgreso');
    
    if (barraProgreso) {
      barraProgreso.style.width = `${progreso}%`;
    }
    
    if (porcentajeProgreso) {
      porcentajeProgreso.textContent = `${progreso}%`;
    }
    
    if (mensajeProgreso) {
      let mensaje = '';
      if (progreso === 0) {
        mensaje = '¡Empieza completando tu primera meta!';
      } else if (progreso < 25) {
        mensaje = '¡Buen comienzo! Sigue así 💪';
      } else if (progreso < 50) {
        mensaje = '¡Vas por buen camino! 🚀';
      } else if (progreso < 75) {
        mensaje = '¡Excelente progreso! 🌟';
      } else if (progreso < 100) {
        mensaje = '¡Casi lo logras! Un último esfuerzo 🏆';
      } else {
        mensaje = '¡Increíble! Has completado todas tus metas 🎉';
      }
      mensajeProgreso.textContent = mensaje;
    }
  }
  
  // Timer Pomodoro
  iniciarTimer() {
    if (!this.timer.activo) {
      this.timer.activo = true;
      this.timer.intervalo = setInterval(() => {
        this.actualizarTimer();
      }, 1000);
      
      const btnIniciar = document.getElementById('btnIniciar');
      const btnPausar = document.getElementById('btnPausar');
      
      if (btnIniciar) btnIniciar.style.display = 'none';
      if (btnPausar) btnPausar.style.display = 'inline-flex';
      
      this.mostrarToast('Timer iniciado', 'success');
    }
  }
  
  pausarTimer() {
    if (this.timer.activo) {
      this.timer.activo = false;
      clearInterval(this.timer.intervalo);
      
      const btnIniciar = document.getElementById('btnIniciar');
      const btnPausar = document.getElementById('btnPausar');
      
      if (btnIniciar) btnIniciar.style.display = 'inline-flex';
      if (btnPausar) btnPausar.style.display = 'none';
      
      this.mostrarToast('Timer pausado', 'warning');
    }
  }
  
  reiniciarTimer() {
    this.timer.activo = false;
    clearInterval(this.timer.intervalo);
    this.timer.minutos = this.timer.modo === 'enfoque' ? 25 : 5;
    this.timer.segundos = 0;
    
    const btnIniciar = document.getElementById('btnIniciar');
    const btnPausar = document.getElementById('btnPausar');
    
    if (btnIniciar) btnIniciar.style.display = 'inline-flex';
    if (btnPausar) btnPausar.style.display = 'none';
    
    this.actualizarDisplayTimer();
    this.mostrarToast('Timer reiniciado', 'warning');
  }
  
  actualizarTimer() {
    if (this.timer.activo) {
      if (this.timer.segundos === 0) {
        if (this.timer.minutos === 0) {
          this.completarSesionTimer();
          return;
        }
        this.timer.minutos--;
        this.timer.segundos = 59;
      } else {
        this.timer.segundos--;
      }
    }
    this.actualizarDisplayTimer();
  }
  
  actualizarDisplayTimer() {
    const display = document.getElementById('timerDisplay');
    const modo = document.getElementById('modoTimer');
    const sesion = document.getElementById('sesionActual');
    
    if (display) {
      const mins = this.timer.minutos.toString().padStart(2, '0');
      const secs = this.timer.segundos.toString().padStart(2, '0');
      display.textContent = `${mins}:${secs}`;
    }
    
    if (modo) {
      modo.textContent = this.timer.modo === 'enfoque' ? 'Modo Enfoque' : 'Descanso';
    }
    
    if (sesion) {
      sesion.textContent = `Sesión ${this.timer.sesion} de ${this.timer.maxSesiones}`;
    }
  }
  
  completarSesionTimer() {
    this.timer.activo = false;
    clearInterval(this.timer.intervalo);
    
    if (this.timer.modo === 'enfoque') {
      this.estadisticas.tiempoEstudio += 25;
      this.timer.modo = 'descanso';
      this.timer.minutos = this.timer.sesion % 4 === 0 ? 15 : 5;
      this.mostrarToast('¡Sesión de estudio completada! Hora de descansar 🎉', 'success');
    } else {
      this.timer.modo = 'enfoque';
      this.timer.minutos = 25;
      this.timer.sesion++;
      if (this.timer.sesion > this.timer.maxSesiones) {
        this.timer.sesion = 1;
      }
      this.mostrarToast('¡Descanso terminado! Hora de estudiar 📚', 'success');
    }
    
    this.timer.segundos = 0;
    const btnIniciar = document.getElementById('btnIniciar');
    const btnPausar = document.getElementById('btnPausar');
    
    if (btnIniciar) btnIniciar.style.display = 'inline-flex';
    if (btnPausar) btnPausar.style.display = 'none';
    
    this.actualizarDisplayTimer();
    this.guardarDatos('estadisticas', this.estadisticas);
  }
  
  // Recordatorios
  agregarRecordatorio() {
    const input = document.getElementById('nuevoRecordatorio');
    const select = document.getElementById('prioridadRecordatorio');
    
    if (!input || !select) return;
    
    const texto = input.value.trim();
    const prioridad = select.value;
    
    if (texto) {
      const recordatorio = {
        id: Date.now(),
        texto: texto,
        prioridad: prioridad,
        completado: false,
        fechaCreacion: new Date().toISOString()
      };
      
      this.recordatorios.push(recordatorio);
      this.guardarDatos('recordatorios', this.recordatorios);
      this.agregarRecordatorioAlDOM(recordatorio);
      this.actualizarContadorRecordatorios();
      
      input.value = '';
      this.mostrarToast('Recordatorio agregado', 'success');
    }
  }
  
  agregarRecordatorioAlDOM(recordatorio) {
    const lista = document.getElementById('listaRecordatorios');
    if (!lista) return;
    
    const elemento = document.createElement('div');
    elemento.className = `reminder-item ${recordatorio.prioridad}`;
    elemento.setAttribute('data-id', recordatorio.id);
    
    let iconoPrioridad = '📝';
    if (recordatorio.prioridad === 'importante') iconoPrioridad = '⚠️';
    if (recordatorio.prioridad === 'urgente') iconoPrioridad = '🚨';
    
    elemento.innerHTML = `
      <div class="reminder-content">
        <div class="reminder-text">${recordatorio.texto}</div>
        <div class="reminder-priority">${iconoPrioridad} ${recordatorio.prioridad.charAt(0).toUpperCase() + recordatorio.prioridad.slice(1)}</div>
      </div>
      <button class="btn-complete-reminder" onclick="appUTP.completarRecordatorio(${recordatorio.id})">
        ✓ Completar
      </button>
    `;
    
    lista.appendChild(elemento);
  }
  
  cargarRecordatoriosGuardados() {
    this.recordatorios.forEach(recordatorio => {
      if (!recordatorio.completado) {
        this.agregarRecordatorioAlDOM(recordatorio);
      }
    });
  }
  
  completarRecordatorio(id) {
    const recordatorio = this.recordatorios.find(r => r.id === id);
    if (recordatorio) {
      recordatorio.completado = true;
      this.guardarDatos('recordatorios', this.recordatorios);
      
      const elemento = document.querySelector(`[data-id="${id}"]`);
      if (elemento) {
        elemento.style.transform = 'translateX(100%)';
        elemento.style.opacity = '0';
        setTimeout(() => {
          elemento.remove();
          this.actualizarContadorRecordatorios();
        }, 300);
      }
      
      this.mostrarToast('Recordatorio completado', 'success');
    }
  }
  
  actualizarContadorRecordatorios() {
    const contador = document.getElementById('contadorRecordatorios');
    if (contador) {
      const activos = this.recordatorios.filter(r => !r.completado).length;
      contador.textContent = activos;
    }
  }
  
  // Chat
  toggleChat() {
    const container = document.getElementById('chatContainer');
    const notification = document.getElementById('chatNotification');
    
    if (container) {
      container.classList.toggle('hidden');
      if (notification) {
        notification.style.display = 'none';
      }
    }
  }
  
  enviarMensaje() {
    const input = document.getElementById('mensajeUsuario');
    if (!input) return;
    
    const mensaje = input.value.trim();
    if (mensaje) {
      this.agregarMensajeAlChat(mensaje, 'user');
      input.value = '';
      
      setTimeout(() => {
        const respuesta = this.generarRespuestaBot(mensaje);
        this.agregarMensajeAlChat(respuesta, 'bot');
      }, 1000);
    }
  }
  
  enviarSugerencia(sugerencia) {
    this.agregarMensajeAlChat(sugerencia, 'user');
    
    setTimeout(() => {
      const respuesta = this.generarRespuestaBot(sugerencia);
      this.agregarMensajeAlChat(respuesta, 'bot');
    }, 1000);
  }
  
  agregarMensajeAlChat(mensaje, tipo) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const elemento = document.createElement('div');
    elemento.className = `message ${tipo}-message`;
    
    const hora = new Date().toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    elemento.innerHTML = `
      <div class="message-avatar">${tipo === 'user' ? '👤' : '🤖'}</div>
      <div class="message-content">
        <div class="message-text">${mensaje}</div>
        <div class="message-time">${hora}</div>
      </div>
    `;
    
    container.appendChild(elemento);
    container.scrollTop = container.scrollHeight;
  }
  
  generarRespuestaBot(mensaje) {
    const mensajeLower = mensaje.toLowerCase();
    
    if (mensajeLower.includes('tiempo') || mensajeLower.includes('organiz')) {
      return this.respuestasBot['organizar tiempo'][Math.floor(Math.random() * this.respuestasBot['organizar tiempo'].length)];
    }
    
    if (mensajeLower.includes('estudio') || mensajeLower.includes('consejo')) {
      return this.respuestasBot['consejos estudio'][Math.floor(Math.random() * this.respuestasBot['consejos estudio'].length)];
    }
    
    if (mensajeLower.includes('motivac') || mensajeLower.includes('ánimo')) {
      return this.respuestasBot['motivacion'][Math.floor(Math.random() * this.respuestasBot['motivacion'].length)];
    }
    
    return this.respuestasBot['default'][Math.floor(Math.random() * this.respuestasBot['default'].length)];
  }
  
  // Notificaciones Toast
  mostrarToast(mensaje, tipo = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    
    let icono = '✅';
    if (tipo === 'warning') icono = '⚠️';
    if (tipo === 'error') icono = '❌';
    
    toast.innerHTML = `
      <span style="font-size: 1.2rem;">${icono}</span>
      <span>${mensaje}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

// Inicializar aplicación - UNA SOLA VEZ
let appUTP;

// Funciones globales para HTML
function mostrarFormularioMeta() {
  if (appUTP) appUTP.mostrarFormularioMeta();
}

function cancelarNuevaMeta() {
  if (appUTP) appUTP.cancelarNuevaMeta();
}

function agregarNuevaMeta() {
  if (appUTP) appUTP.agregarNuevaMeta();
}

function toggleMeta(elemento) {
  if (appUTP) appUTP.toggleMeta(elemento);
}

function iniciarTimer() {
  if (appUTP) appUTP.iniciarTimer();
}

function pausarTimer() {
  if (appUTP) appUTP.pausarTimer();
}

function reiniciarTimer() {
  if (appUTP) appUTP.reiniciarTimer();
}

function agregarRecordatorio() {
  if (appUTP) appUTP.agregarRecordatorio();
}

function toggleChat() {
  if (appUTP) appUTP.toggleChat();
}

function enviarMensaje() {
  if (appUTP) appUTP.enviarMensaje();
}

function enviarSugerencia(sugerencia) {
  if (appUTP) appUTP.enviarSugerencia(sugerencia);
}

// INICIALIZACIÓN ÚNICA Y CONTROLADA
document.addEventListener('DOMContentLoaded', function() {
  // Prevenir múltiples inicializaciones
  if (appUTP) return;
  
  // Crear instancia única
  appUTP = new UTPFocus();
  appUTP.init();
  
  // Event listeners
  const inputMensaje = document.getElementById('mensajeUsuario');
  if (inputMensaje) {
    inputMensaje.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        enviarMensaje();
      }
    });
  }
  
  const inputRecordatorio = document.getElementById('nuevoRecordatorio');
  if (inputRecordatorio) {
    inputRecordatorio.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        agregarRecordatorio();
      }
    });
  }
  
  const inputMeta = document.getElementById('nuevaMetaTexto');
  if (inputMeta) {
    inputMeta.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        agregarNuevaMeta();
      }
    });
  }
  
  // Mensaje motivador cada 5 minutos
  setInterval(() => {
    if (appUTP) appUTP.actualizarMensajeMotivador();
  }, 300000);
});