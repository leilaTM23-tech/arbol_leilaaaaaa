// ❤️ FECHA DE INICIO (ajústala si necesitas)
const inicio = new Date("2024-05-23T16:00:00");

function actualizarTiempo() {
    const ahora = new Date();
    let diff = ahora - inicio;

    let segundos = Math.floor(diff / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    horas %= 24;
    minutos %= 60;
    segundos %= 60;

    const tiempoEl = document.getElementById("tiempo");
    if (tiempoEl) {
        tiempoEl.innerText = `${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
    }
}

setInterval(actualizarTiempo, 1000);
actualizarTiempo();

// 💖 GENERAR CORAZONES flotantes de fondo
const contenedor = document.querySelector(".corazones");

if (contenedor) {
    function crearCorazonFondo() {
        const corazon = document.createElement("span");
        corazon.innerHTML = "❤️";
        corazon.className = "corazon-fondo"; // mejor usar clase para CSS

        // Usar tamaño real del contenedor
        const ancho = contenedor.offsetWidth;
        const alto = contenedor.offsetHeight;

        corazon.style.left = Math.random() * ancho + "px";
        corazon.style.top = Math.random() * alto + "px";
        corazon.style.fontSize = (Math.random() * 28 + 18) + "px";
        corazon.style.animationDelay = Math.random() * 5 + "s";

        contenedor.appendChild(corazon);

        // Eliminar después de ~10-15 segundos para no saturar el DOM
        setTimeout(() => corazon.remove(), 1500);
    }

    // Crear algunos al inicio y luego cada cierto tiempo
    for (let i = 0; i < 80; i++) {
        crearCorazonFondo();
    }
    setInterval(crearCorazonFondo, 180);
}

// 🌿 CORAZONES QUE NACEN DESDE LAS RAMAS
const ramas = document.querySelectorAll(".rama");

function crearCorazonDesdeRama(rama) {
    if (!contenedor) return;

    const corazon = document.createElement("span");
    corazon.innerHTML = Math.random() > 0.5 ? "❤️" : "💗";  // variación de tonos
    corazon.className = "corazon-nace";

    const rectRama = rama.getBoundingClientRect();
    const rectCont = contenedor.getBoundingClientRect();

    const x = rectRama.left - rectCont.left + rectRama.width * (0.8 + Math.random() * 0.4); // más hacia las puntas
    const y = rectRama.top - rectCont.top + rectRama.height / 8;

    corazon.style.left = x + "px";
    corazon.style.top = y + "px";
    corazon.style.fontSize = (Math.random() * 24 + 18) + "px"; // tamaños variados

    // Dirección suave hacia arriba con algo de deriva lateral
    const movX = (Math.random() - 0.5) * 100;
    corazon.style.setProperty("--movX", movX + "px");

    // Color aleatorio suave
    const colores = ["#ff6b81", "#ff85a2", "#ff4757", "#ffb6c1", "#ff79ac"];
    corazon.style.color = colores[Math.floor(Math.random() * colores.length)];

    contenedor.appendChild(corazon);

    // Latido + desaparición más lenta y natural
    setTimeout(() => corazon.remove(), 7000); // dura más para que se vea bonito
}

// Aumenta la frecuencia para más densidad (como en la imagen)
ramas.forEach(rama => {
    setInterval(() => {
        if (Math.random() > 0.25) { // ~75% de probabilidad cada intervalo
            crearCorazonDesdeRama(rama);
        }
    }, Math.random() * 1000 + 600); // cada ~0.6 a 1.6 segundos por rama
});

// 💖 CORAZÓN INTERACTIVO CON MENSAJES
const heart = document.getElementById("heart");
const messageArea = document.getElementById("messageArea");
const notification = document.getElementById("notification");

let messages = [
    "Me encanta tu sonrisa 💕",
    "Eres mi lugar seguro 🌷",
    "Gracias por existir ✨",
    "Contigo todo es más bonito 💖",
    "Amo la forma en que me miras 😍",
    "Eres mi persona favorita 💌",
    "Tu abrazo es mi paz 🤍",
    "Siempre quiero caminar a tu lado 🌹",
    "Eres mi sueño hecho realidad 💫",
    "Mi corazón siempre te elige ❤️",
    "Estoy muy enamorada de ti",
    "Contigo soy más feliz",
    "Quédate conmigo siempre",
    "Me Encantas😍",
    "Amo cada parte de ti",
    "Contigo todo cambió💫",
    "Bésame en esta y mil vidas +",
    "Seamos un equipo❤️",
    "Seamos el mejor equipo❤️",
    "Tú eres como esas estrellas que iluminan la noche💫",
    "Tú iluminas mi vida💫",
    "Te amaré en días buenos💖",
    "Te amare en días malos🌹",
    "Veo el atardecer y pienso en ti🌇",
    "Escucho música y pienso en tí🎧",
    "Brilla el sol y pienso en tí☀️",
    "Te amaré hasta en los días que sientas que no puedes más🥹",
    "Eres mi refugio❤️‍🩹",
    "Contigo me siento en completa paz❤️‍🩹",
    "Cada vez que me miras, curas hasta lo que no esta roto❤️‍🩹",
    "Disfruto siempre de tu compañia🥰",
    "Con cada mirada desnudas mi alma🤍",
    "Con cada beso me elevas a las nubes☁️",
    "Cada vez que hacemos el amor me haces tocar el cielo☁️",
    "Eres mi vida❤️",
    "Vamos a comernos❤️‍🔥",
    "Cuidaré tu corazón como lo más preciado que tenga en la vida❤️‍🔥",
    "Te has echo más importante en mi vida💖",
    "Quiero cuidar del niño dulce, tierno, amable y mugroso que está dentro de ti💖",
    "Mi mugroso😚",
    "Eres mi motivación de todos los días❤️",
    "No importa que sientas que todo se viene abajo, yo estaré contigo para levantarte❤️",
    "La cosa aquí es que cada que te beso, me hace falta un beso más❤️",
    "Entre todos los lugares preciosos del mundo, tus brazos es mi lugar favorito",
    "No necesito a todo el mundo, te necesito a ti💖",
    "Necesito un USB, Unos Sabrosos Besos tuyos.😍",
    "No necesito ninguna excusa, eres tu y quiero que siempre seas tu❤️‍🩹",
    "Cuando estamos juntos no existe nada más❤️",
    "Quiero que sepas que desde que llegaste a mi vida, soy más feliz❤️‍🩹",
    "siempre pienso en ti, te volviste lo más importante en mi vida y mi corazón❤️‍🔥",
    "Eres el amor que no sabia que iba a necesitar tanto",
    "Tú eres mi razón por la cual creo en el amor y creo en un amor verdadero💖",
    "Te amo hoy, mañana y todos los días que vengan💖",
    "Eres mi mejor compañía, incluso en silencio disfruto nuestro tiempo juntos💖",
    "Gracias por ser mi hogar en cualquier lugar💖",
    "Gracias por ser mi mayor confidente, quien me escucha y entiende💖",
    "Te amo en cada versión de ti💖",
    "Te amo sin condiciones y sin fechas límite, te amo para siempre❤️‍🩹",
    "Eres el latido que me recuerda que estoy viva",
    "Contigo todo es posible, incluso ser mejor versión de mí.",
    "Eres el capítulo que quiero releer mil veces.",
    "Contigo el miedo se hace pequeño.",
    "Gracias por ser mi constante en un mundo que cambia.❤️",
    "Eres mi hogar, mi paz y mi mayor aventura.💖",
    "Con solo un abrazo tuyo calmas todo desastre que exista en mi❤️‍🩹",
    "Promete que siempre pero siempre vamos a resolver todo juntoos👩🏼‍🤝‍👨🏽",
    "Con nadie soy tan (yo), como lo soy contigo🥺",
    "Amar es admirar y yo te admiro más de lo que te imaginas ✨",
    "Si tuviera que empezar de nuevo, volvería a escogerte sin pensarlo ✨",
    "No te elegí para un momento, te elegí para toda mi vida ✨",
    "No quiero una promesa de amor eterno y hueco, quiero un amor real, puro y sincero y eso es lo que tengo contigo💖",
    "Gracias por existir justo cuando más necesitaba de tu amor💖",
    "Eres el abrazo que sana absoltamente todo❤️‍🩹🥺",
    "Eres la respuesta más bonita que me dió la vida🥺",
    "Te voy a cuidar mucho por que quiero que me dures toda la vida🥺💖",
    "Recuerda que eres el niño que amo con todo mi corazón💖",
    "No importa el lugar ni la hora, mientras sea estando contigo todo es bonito💖",
    "Eres y siempre serás el mejor novio del mundo💖",
    "Llegaste a mi vida y ya no quise nada ni a nadie más, me das todo y más de lo que mi corazoncito alguna vez esperó💖",
    "Si lees esto me debes un abrazo de al menos 2 minutos💖",
    "Ser amada por ti me hace sentir la mujer más afortunada del mundo, te amo💖",
    "Amas es bonito y amarte a ti es de lo mejooor💖",
    "Mientras yo exista siempre habrá alguien que ame cada parte de ti💖",
    "Eres la prueba de que el amor bonito si existe💖",
    "Te admiro por todo lo que haces, te amo por todo lo que demuestras y te cuido por todo lo que te amo💖",
    "Besar reduce el estrés, hay que besarnos🫢❤️",
    "Te amo ojitos bonitos😍",
    "No nos ententemos todo el tiempo, pero nos elegimos todos los días",
    "Me encanta tenerte en mi vida😍",
    "Me niego a que seamos solo una etapa bonita, hagamos esto duradero😍",
    "Tardamos un poco en encontrarnos pero llegamos justo a tiempo para amarnos y entregarnos sinceramente",
    "Contigo aprendí que el amor también es a mordidas",
    "Contigo supe lo que es ser amada sin tener que pedirlo",
    "Contigo entendí que no hay que forzar nada, lo mejor viene sin planearse😍",
    "Contigo encontré mi verdadera y sana manera de amar❤️‍🩹",
    "Si lees esto me debes unos tacos",
    "Te necesito en mi vida, eres mi motivación❤️‍🩹",
    "Yo solo sé que mil viajes y mil experiencias juntos, nos esperan🛩️❤️",
    "Te amo, te respeto, te cuido, te sueño, te pienso, te extraño, te necesito, te deseo, te adoro, te admiro, te apoyo, te TODO",
    "Siento tantas cosas por ti que en este programa no caben todas las frases de amor❤️"


    // ... agrega aquí los que faltan hasta 100
];
let originalMessages = [...messages]; // guardamos la lista original

messages = messages.sort(() => Math.random() - 0.5); // revolver al inicio

let remaining = messages.length;
let isFinished = false;

if (notification) {
    notification.textContent = remaining;
}

if (heart) {
    heart.addEventListener("click", () => {
        // Si ya se terminaron los mensajes
        if (isFinished) {
            // Reiniciar todo
            messages = [...originalMessages].sort(() => Math.random() - 0.5);
            remaining = messages.length;
            isFinished = false;

            // Limpiar el área de mensajes
            messageArea.innerHTML = "";

            // Actualizar contador
            notification.textContent = remaining;

            // Mensaje opcional de reinicio
            const restartBubble = document.createElement("div");
            restartBubble.className = "bubble";
            restartBubble.textContent = "¡Volvemos a empezar! 💞";
            messageArea.appendChild(restartBubble);
            setTimeout(() => restartBubble.remove(), 4000);

            return;
        }

        // Mensaje normal
        remaining--;
        notification.textContent = remaining;

        const mensaje = messages[remaining];

        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = mensaje;
        messageArea.appendChild(bubble);
        setTimeout(() => bubble.remove(), 5000);

        // Partículas
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            particle.style.setProperty("--x", x + "px");
            particle.style.setProperty("--y", y + "px");
            heart.appendChild(particle);
            setTimeout(() => particle.remove(), 1200);
        }

        // Cuando llegue al último mensaje
        if (remaining === 0) {
            isFinished = true;

            // Mensaje especial
            const finalBubble = document.createElement("div");
            finalBubble.className = "bubble";
            finalBubble.style.background = "#fff0f5";
            finalBubble.style.color = "#c2185b";
            finalBubble.style.fontWeight = "bold";
            finalBubble.textContent = "Estas solo son 100 frases de amor, porque si pongo todas las que me haces pensar los clicks se harían eternos 💞";
            messageArea.appendChild(finalBubble);

            // Botón para reiniciar
            const restartBtn = document.createElement("button");
            restartBtn.textContent = "Volver a empezar 💕";
            restartBtn.style.marginTop = "15px";
            restartBtn.style.padding = "10px 20px";
            restartBtn.style.background = "#ff3366";
            restartBtn.style.color = "white";
            restartBtn.style.border = "none";
            restartBtn.style.borderRadius = "30px";
            restartBtn.style.fontSize = "1rem";
            restartBtn.style.cursor = "pointer";
            restartBtn.style.boxShadow = "0 4px 12px rgba(255,51,102,0.4)";
            restartBtn.onclick = () => heart.click(); // simula un click para reiniciar
            finalBubble.appendChild(restartBtn);
        }
    });
}