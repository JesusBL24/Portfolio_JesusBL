/**
 * Función que maneja el cambio de idioma de la página.
 * * Itera sobre todos los elementos HTML que contienen el atributo 'data-i18n'
 * y actualiza su contenido de texto con la traducción correspondiente
 * almacenada en el objeto 'translations' para el idioma seleccionado.
 * * También guarda la preferencia de idioma en el almacenamiento local del navegador (localStorage).
 * * @param {string} lang - El código del idioma al que se debe cambiar la página (e.g., 'es', 'en').
 */




// FUNCIÓN PRINCIPAL PARA CAMBIAR EL IDIOMA
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const dictionary = translations[lang];

    if (!dictionary) return;

    // Iterar sobre todos los elementos marcados para traducción
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');

        if (dictionary[key]) {
            // CLAVE: CAMBIAR AQUÍ DE textContent A innerHTML
            element.innerHTML = dictionary[key];
        }
    });

    localStorage.setItem('websiteLang', lang);

    // CLAVE: Aquí es donde llamamos y pasamos el idioma como argumento
    updateLanguageButtons(lang);// <--- 'lang' se pasa como argumento 'activeLangCode'
}


/**
 * Añade la clase 'active-lang' al botón de idioma seleccionado y la elimina de los demás.
 * @param {string} activeLangCode - El código del idioma activo (e.g., 'es' o 'en').
 */
function updateLanguageButtons(activeLangCode) {
    // Esto selecciona todos los enlaces, incluidos los del menú (Top, About me, etc.)
    const allLinks = document.querySelectorAll('#nav ul.container li a');

    allLinks.forEach(button => {
        // 1. Obtener el valor del atributo onclick. Puede ser una cadena o null.
        const onclickAttr = button.getAttribute('onclick');

        // 2. CLAVE: Comprobar si el atributo existe (es decir, no es null) Y
        //    si contiene la función 'setLanguage' (para asegurarnos de que es un botón de idioma)
        if (onclickAttr && onclickAttr.includes('setLanguage')) {

            // 3. Si llega aquí, es un botón de idioma. Comprobamos si es el activo.
            const isButtonActive = onclickAttr.includes(`'${activeLangCode}'`);

            if (isButtonActive) {
                button.classList.add('active-lang');
            } else {
                button.classList.remove('active-lang');
            }
        }
        // Si no tiene el atributo onclick o no es un botón de idioma, simplemente se salta.
    });
}

// FUNCIÓN PARA CARGAR EL IDIOMA AL INICIAR LA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('websiteLang') || 'en';
    setLanguage(savedLang);
});

// OBJETO DE TRADUCCIONES (DICTIONARY)
const translations = {
    // ---- ESPAÑOL (ES) ----
    'es': {

        //NAV
        'nav_top': 'Inicio',
        'nav_about': 'Sobre mí',
        'nav_skills': 'Habilidades',
        'nav_experience': 'Experiencia',
        'nav_design_process': 'Proceso de Diseño',
        'nav_contact': 'Contacto',

        //HOME
        "home_roles": 'Game Designer, Programador, Productor',
        "home_description": 'Soy un diseñador de niveles y sistemas, desarrollador, artista y narrador con gran pasión y ambición por crear juegos innovadores.',
        "home_eslogan": '\'Diseñar experiencias bucle a bucle\'',

        //ABOUT ME
        'aboutMe_title': 'Sobre mí',
        'aboutMe_p1': 'Nacido en 2003, mi interés por los videojuegos comenzó a la edad de tres años, lo que me permitió desarrollar internamente una comprensión intuitiva del porqué funcionan las diferentes mecánicas y los objetivos detrás de las decisiones de diseño enfocadas en la experiencia del jugador. De niño, también pasaba largas tardes jugando con LEGO, imaginando historias y mundos que más tarde me inspiraron a empezar a escribir, programar y cultivar un fuerte interés por la narrativa y el arte.',
        'aboutMe_p2': 'Recientemente obtuve mi <strong>título de Grado en Diseño y Desarrollo de Videojuegos</strong> por la Universidad Rey Juan Carlos en Madrid. Durante estos años, estudié <strong>diseño de juegos</strong>, <strong>el pipeline de producción de videojuegos</strong>, y programación en <strong>C#</strong>, <strong>C++</strong>, <strong>javascript</strong> y <strong>Unity Engine</strong>. Además, mi deseo de superación me llevó a estudiar diseño de forma independiente y a participar con compañeros en varias game jams como diseñador y guionista (*storyteller*) (e incluso una vez como director de arte). Esta experiencia ha fortalecido significativamente mis habilidades de <strong>comunicación</strong>, <strong>trabajo en equipo</strong>, <strong>análisis</strong> y <strong>resolución de problemas</strong>.',
        'aboutMe_p3': 'Este año se lanzó mi primer proyecto multiplataforma, <strong>\'El Coco\'</strong>, donde colaboré con el equipo de Recotechnology S.L. como Diseñador de Juegos y Productor. Mis responsabilidades incluyeron diseñar <strong>sistemas de dificultad y progresión</strong>, <strong>estructurar la narrativa</strong>, <strong>implementar niveles y enemigos</strong>, <strong>liderar el equipo</strong> en mi rol de productor, y preparar las páginas del juego para todas las plataformas de lanzamiento.',
        'aboutMe_p4':'Esto es solo el comienzo; mi pasión por los videojuegos y mi deseo continuo de aprender me impulsan a buscar nuevos horizontes y a seguir desarrollando mis habilidades profesionales.',

        'aboutMe_subjects':'Asignaturas universitarias relevantes',
        'aboutMe_subject1':'Principios de diseño de juegos',
        'aboutMe_subject2':'Diseño narrativo y guion',
        'aboutMe_subject3':'Programación Orientada a Objetos (POO)',
        'aboutMe_subject4':'Patrones de programación',
        'aboutMe_subject5':'Principios de diseño de niveles',
        'aboutMe_subject6':'Realidad Virtual (RV)',
        'aboutMe_subject7':'Diseño iterativo',
        'aboutMe_subject8':'Pipeline de desarrollo',
        'aboutMe_subject9':'Inteligencia Artificial (IA)',
        'aboutMe_subject10':'Diseño visual',

        //SKILLS
        'skills_title':'Habilidades',
        'skills_description':'A lo largo de mi trayectoria, he trabajado con diversas herramientas y he desarrollado mis habilidades para ser el mejor profesional posible.',
        'skills_some_experience':'Poca experiencia',

        'skills_programmer':'Programación',
        'skills_unity':'Unity Engine / C#',
        'skills_c++':'C++',
        'skills_unreal':'Unreal Engine 5',
        'skills_html':'HTML / CSS',
        'skills_js':'JavaScript',
        'skills_maths':'Mathematics',

        'skills_gameDesign':'Game Design',
        'skills_systems':'Sistemas',
        'skills_designPatterns':'Patrones',
        'skills_enemy':'Enemigos',
        'skills_iterative':'Iterativo',
        'skills_documentation':'Documentación',
        'skills_excel':'Excel',
        'skills_prototype':'Prototipado',
        'skills_playtest':'Playtesting',
        'skills_narrative':'Narrativo',
        'skills_level':'Nivel',
        'skills_visual':'Diseño visual',
        'skills_blender':'Blender',

        'skills_producing':'Producción',
        'skills_communication':'Comunicación',
        'skills_agile':'Agile',
        'skills_leadership':'Liderazgo',
        'skills_endToEnd':'Principio a fin',
        'skills_jira':'Jira',
        'skills_functional':'Multifuncional',

        //EXPERIENCE
        'experience_title':'Experiencia y proyectos',
        'experience_description':'Estos son mis proyectos profesionales y personales destacados que ponen muestran mis habilidades en el desarrollo de videojuegos.',
        'experience_professional':'Proyectos profesionales',


        'contact_title': 'Contáctame',
        'experience_section_title': 'Experiencia Laboral',
        // Añade aquí todas las claves de tu web...
    },

    // ---- INGLÉS (EN) ----
    'en': {
        'nav_top': 'Top',
        'nav_about': 'About me',
        'nav_skills': 'Skills',
        'nav_experience': 'Experience',
        'nav_design_process': 'Design Process',
        'nav_contact': 'Contact me',

        //HOME
        "home_roles": 'Game Designer, Programmer, Producer',
        "home_description": 'I am a level and systems designer, developer, artist and storyteller with great passion and ambition for creating innovative games.',
        "home_eslogan": '\'Handcraft experiences loop by loop\'',

        //ABOUT ME
        'aboutMe_title': 'About me',
        'aboutMe_p1': 'Born in 2003, my interest in video games started at the age of three, allowing me to internally develop an intuitive understanding of <strong>why different mechanics work</strong>and the objectives behind design decisions focused on the <strong>player experience</strong> .As a child, I also spent long evenings playing with LEGO, imagining stories and worlds that later inspired me to begin writing, programming, and cultivating a strong interest in storytelling and art.',
        'aboutMe_p2': 'I recently received my Bachelor\'s degree in Game Design and Development from Rey Juan Carlos University in Madrid. During these years, I  studied <strong>game design</strong>,<strong>the video game production pipeline</strong>, and programming in <strong>C#</strong>, <strong>C++</strong>, <strong>javascript</strong> and <strong>Unity Engine</strong> Furthermore, my desire for improvement led me to independently studying design and participating with colleagues in several game jams as a designer and storyteller (and even once as an art director). This experience has significantly strengthened my <strong>communication</strong>, <strong>team working</strong>, <strong>analysis</strong>, and <strong>problem-solving skills</strong>',
        'aboutMe_p3': 'This year, my first multiplatform project, <strong>\'El Coco\'</strong>, was released, where I collaborated with the Recotechnology S.L. team as a Game Designer and Producer. My responsibilities included designing <strong>difficulty and progression systems</strong>, <strong>structuring the narrative</strong>, <strong>implementing levels and enemies</strong>, <strong>leading the team</strong> in my production role, and preparing the game pages for all launch platforms.',
        'aboutMe_p4': 'This is just the beginning; my passion for games and continuous desire to learn drive me to seek new horizons and further develop my professional skills.',

        'aboutMe_subjects':'Relevant university subjects',
        'aboutMe_subject1':'Game design principles',
        'aboutMe_subject2':'Narrative design and script writing',
        'aboutMe_subject3':'Object-oriented programming (OOP)',
        'aboutMe_subject4':'Programming patterns',
        'aboutMe_subject5':'Level design principles',
        'aboutMe_subject6':'Virtual Reality (VR)',
        'aboutMe_subject7':'Iterative design',
        'aboutMe_subject8':'Development pipeline',
        'aboutMe_subject9':'Artificial Intelligence (AI)',
        'aboutMe_subject10':'Visual design',

        //SKILLS
        'skills_title':'Skills',
        'skills_description':'Along my journey, I have worked with several tools and developed my skills to be the best possible professional.',
        'skills_some_experience':'Some experience',

        'skills_programmer':'Programming',
        'skills_unity':'Unity Engine / C#',
        'skills_c++':'C++',
        'skills_unreal':'Unreal Engine 5',
        'skills_html':'HTML / CSS',
        'skills_js':'JavaScript',
        'skills_maths':'Matemáticas',

        'skills_gameDesign':'Game Design',
        'skills_systems':'Systems Design',
        'skills_designPatterns':'Design Patterns',
        'skills_enemy':'Enemy Design',
        'skills_iterative':'Iterative Design',
        'skills_documentation':'Documentation',
        'skills_excel':'Excel',
        'skills_prototype':'Prototipying',
        'skills_playtest':'Playtesting',
        'skills_narrative':'Narrative Design',
        'skills_level':'Level Design',
        'skills_visual':'Visual Design',
        'skills_blender':'Blender',

        'skills_producing':'Producing',
        'skills_communication':'Communication',
        'skills_agile':'Agile',
        'skills_leadership':'Leadership',
        'skills_endToEnd':'End-to-end',
        'skills_jira':'Jira',
        'skills_functional':'Cross-functional',

        //EXPERIENCE
        'experience_title':'Experience and projects',
        'experience_description':'These are my featured professional and personal projects that highlight my skills on game development.',
        'experience_professional':'Professional projects',

        'contact_title': 'Contact me', // Mantener igual si ya está en inglés
        'experience_section_title': 'Work Experience',
        // Asegúrate de que todas las claves 'es' tengan su versión 'en'
    }
};