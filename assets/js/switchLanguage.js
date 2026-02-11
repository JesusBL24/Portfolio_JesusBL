/**
 * Main function to handle the website's language switching.
 * It updates text content, video sources, active UI states, and persists the choice.
 * * @param {string} lang - The language code to apply (e.g., 'en', 'es').
 */
function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    const dictionary = translations[lang];

    if (!dictionary) return;

    // Update the document's language attribute for SEO and accessibility
    document.documentElement.lang = lang;

    // Iterate through all elements marked for translation
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');

        if (dictionary[key]) {
            // Using innerHTML to allow formatted text (bold, links, etc.)
            element.innerHTML = dictionary[key];
        }
    });

    // Handle Video Internationalization (iframes)
    if (dictionary.videos) {
        for (const id in dictionary.videos) {
            const iframe = document.getElementById(id);
            if (iframe) {
                iframe.src = dictionary.videos[id];
            }
        }
    }

    // Reset and update visual state of language buttons
    document.querySelectorAll('.lang-button').forEach(btn => {
        btn.classList.remove('active-lang');
    });

    // Persist user preference in local storage
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) {
        activeBtn.classList.add('active-lang');
    }

    localStorage.setItem('websiteLang', lang);

    // Sync other UI components with the current language
    updateLanguageButtons(lang);
}


/**
 * Synchronizes the active state of language buttons by parsing their onclick attributes.
 * @param {string} activeLangCode - The current active language code.
 */
function updateLanguageButtons(activeLangCode) {

    const allLinks = document.querySelectorAll('#nav ul.container li a');

    allLinks.forEach(button => {

        const onclickAttr = button.getAttribute('onclick');

        // Check if the link is specifically a language switcher button
        if (onclickAttr && onclickAttr.includes('setLanguage')) {

            const isButtonActive = onclickAttr.includes(`'${activeLangCode}'`);

            if (isButtonActive) {
                button.classList.add('active-lang');
            } else {
                button.classList.remove('active-lang');
            }
        }
    });
}

/**
 * Initialization on page load. Fetches saved language or defaults to English.
 */
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('websiteLang') || 'en';
    setLanguage(savedLang);
});

/**
 * Bridge function to open the gallery with localized project images.
 * @param {string} projectKey - The key representing the project in the translations object.
 */
function handleGalleryOpen(projectKey) {

    const lang = localStorage.getItem('websiteLang') || 'en';

    if (translations[lang] && translations[lang][projectKey]) {
        const images = translations[lang][projectKey];
        openGallery(images);
    } else {
        console.error(`No se encontraron imágenes para: ${lang} -> ${projectKey}`);
    }
}

// Lang dictionaries
const translations = {
    // ---- ESPAÑOL (ES) ----
    'es': {

        //NAV
        'nav_top': 'Inicio',
        'nav_about': 'Sobre mí',
        'nav_skills': 'Habilidades',
        'nav_experience': 'Experiencia',
        'nav_design_process': 'Diseño',
        'nav_contact': 'Contacto',

        //HOME
        "home_roles": 'Game Designer, Programador, Productor',
        "home_description": 'Soy un diseñador y desarrollador de gameplay y sistemas, productor y narrador con gran pasión y ambición por crear juegos innovadores.',
        "home_eslogan": '\'Forjando experiencias, ciclo a ciclo.\'',

        //ABOUT ME
        'aboutMe_title': 'Sobre mí',
        'aboutMe_p1': 'Nacido en 2003, mi interés por los videojuegos comenzó a la edad de tres años, lo que me permitió desarrollar internamente una comprensión intuitiva del <strong>porqué funcionan las diferentes mecánicas y los objetivos detrás de las decisiones de diseño enfocadas en la experiencia del jugador</strong>. De niño, también pasaba largas tardes jugando con LEGO, imaginando historias y mundos que más tarde me inspiraron a empezar a escribir, programar y cultivar un fuerte interés por la narrativa y el arte.',
        'aboutMe_p2': 'Reciéntemente obtuve mi <strong>título de Grado en Diseño y Desarrollo de Videojuegos</strong> por la Universidad Rey Juan Carlos en Madrid. Durante estos años, estudié <strong>diseño de juegos</strong>, <strong>el pipeline de producción de videojuegos</strong>, dirección de equipos usando <strong>Scrum (Certificado)</strong> y programación en <strong>C#</strong>, <strong>C++</strong>, <strong>javascript</strong> y <strong>Unity Engine</strong>. Además, mi deseo de superación me llevó a estudiar diseño de forma independiente y a participar con compañeros en varias game jams como <strong>diseñador y storyteller</strong> (e incluso una vez como director de arte). Esta experiencia ha fortalecido significativamente mis habilidades de <strong>comunicación</strong>, <strong>trabajo en equipo</strong>, <strong>análisis</strong> y <strong>resolución de problemas</strong>.',
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
        'aboutMe_subject11':'Estadística',
        'aboutMe_subject12':'Certificado de Scrum Master',


        //SKILLS
        'skills_title':'Habilidades',
        'skills_description':'A lo largo de mi trayectoria, he trabajado con diversas herramientas y he desarrollado mis habilidades para ser el mejor profesional posible.',
        'skills_some_experience':' = Poca experiencia',

        'skills_programmer':'Programación',
        'skills_unity':'Unity Engine / C#',
        'skills_c++':'C++ y Python',
        'skills_unreal':'Unreal Engine 5',
        'skills_html':'HTML / CSS',
        'skills_js':'JavaScript',
        'skills_visualSc':'Programación visual',

        'skills_gameDesign':'Game Design',
        'skills_systems':'Sistemas',
        'skills_designPatterns':'Patrones',
        'skills_enemy':'Enemigos',
        'skills_iterative':'Iterativo',
        'skills_documentation':'Documentación',
        'skills_excel':'Excel',
        'skills_prototype':'Prototipado',
        'skills_playtest':'Playtesting',
        'skills_narrative':'Narrativa',
        'skills_level':'Diseño de nivel',
        'skills_visual':'Diseño visual',
        'skills_blender':'Blender',

        'skills_producing':'Producción',
        'skills_communication':'Comunicación',
        'skills_agile':'Met. Ágiles',
        'skills_leadership':'Liderazgo',
        'skills_endToEnd':'Principio a fin',
        'skills_jira':'Jira',
        'skills_functional':'Multifuncional',

        //EXPERIENCE
        'experience_title':'Experiencia y proyectos',
        'experience_description':'Estos son mis proyectos profesionales y personales destacados que muestran mis habilidades en el desarrollo de videojuegos.',
        'experience_professional':'Proyectos profesionales',
        'project_available_on': '<strong>Disponible en:<strong>',
        'knowMore': 'Mira mi trabajo',

        'el_coco_description':'EL COCO es un juego roguelike de acción que te sumerge en un mundo de sueños, recuerdos rotos y pesadillas encarnadas. Desciende a Lo Incierto, un lugar tan extraño como peligroso, y lucha por recuperar lo que perdiste… si es que puedes confiar en quien te guía.',
        'el_coco_role': '<strong>Game Designer y Productor.</strong>',
        'el_coco_lead':'Lideré el equipo como diseñador principal y productor, supervisando la visión y la ejecución usando Kanban, estableciendo cronogramas y eliminando bloqueadores.',
        'el_coco_systems': 'Diseñé los sistemas de niveles, progresión y narrativa para conseguir escalabilidad de retos, power-ups y enemigos a la vez que el jugador progresa con un correcto pathing.',
        'el_coco_enemies': 'Diseñé e implementé diversos tipos de enemigos, jefes y encuentros usando árboles de comportamiento adaptados a los niveles y las habilidades del jugador.',
        'el_coco_platforms': 'Plataformas: Disponible en PS5, PS4, Xbox One, Xbox Series X|S, Nintendo Switch y Steam.',

        'bratz_description':'¡Domina la pasarela y súbete al escenario con el Bratz Pack! Personaliza estilos rompedores, baila al ritmo de canciones del Universo Bratz como \'So Good\' y viaja a ciudades icónicas. Supera a la malvada Burdine Maxwell y a las gemelas Tweevil en épicas batallas de moda, ya sea en solitario o con amigos.',
        'project_bratz_role': '<strong>Productor</strong>',
        'project_bratz_info1':'Lideré las reuniones y la comunicación con stakeholders.',
        'project_bratz_info2':'Administré las tareas del equipo y eliminé bloqueadores.',
        'project_bratz_updates': 'Gestión de actualizaciones post-lanzamiento.',
        'project_bratz_info': 'Los demás detalles del proyecto están sujetos a un acuerdo de confidencialidad (NDA).',

        'experience_personal': 'Proyectos personales',

        'magefall_description':'A lo largo de este proyecto, estudié y desarrollé los elementos esenciales para las etapas de conceptualización de un videojuego. Profundicé mis conocimientos en diseño de juegos mediante la investigación de expertos del sector y logré formalizar un concepto de juego siguiendo un enfoque iterativo y orientado a la resolución de problemas.',
        'magefall_title':'Magefall: Un estudio sobre el diseño iterativo y las etapas de conceptualización de videojuegos (TFG, 2025)',
        'project_magefall_1': '<strong>Investigador y Diseñador de Sistemas.</strong>',
        'project_magefall_2': 'Realicé una investigación profunda sobre diseño iterativo y diseño de juego avanzado.',
        'project_magefall_3': 'Apliqué los conocimientos para desarrollar un concepto de juego mediante un ciclo iterativo.',
        'project_magefall_4': 'Diseñé y perfeccioné los sistemas de combate y progresión, asegurando su profundidad.',
        'project_magefall_5': 'Prototipé y simplifiqué mecánicas complejas utilizando técnicas de prototipado en papel.',
        'project_magefall_6': 'Llevé a cabo sesiones de playtesting para identificar y evaluar problemas y fortalezas.',
        'project_magefall_7': 'Redacté documentación clara y versátil, incluyendo un GDD, briefs de proyecto y one-pagers.',

        'SCR3D_description':'Un nuevo hero shooter de naves espaciales en el que eliges a tu personaje, personalizas tus armas y luchas contra tus rivales para dominar la Arena. Cada partida es un encuentro al mejor de tres, donde subes de nivel tu nave para desbloquear potentes mejoras y habilidades especiales.',
        'SCR3D_1':'<strong>Director de Juego y diseñador narrativo</strong>',
        'SCR3D_2':'Diseñé el sistema de combate competitivo online y su interacción con otros sistemas.',
        'SCR3D_3':'Diseñé y prototipé las funcionalidades y el conjunto de habilidades de múltiples personajes.',
        'SCR3D_4':'Equilibré todos los personajes, habilidades y mejoras.',
        'SCR3D_5':'Realicé sesiones de playtesting para validar mecánicas y pulir el balance',
        'SCR3D_6':'Programé diversas funcionalidades online utilizando .NET y WebGL.',
        'SCR3D_7':'Desarrollé un trasfondo escalable de mundo  y las historias de origen de todos los personajes.',

        'RAC_description':'Jóvenes promesas de un futuro brillante tienen algo que contarte. Habla con ellos lo máximo posible para conocer su historia y desvelar todos sus secretos.',
        'RAC_1':'<strong>Artista Principal</strong>',
        'RAC_2':'Definí la identidad visual y el estilo artístico general del proyecto.',
        'RAC_3':'Diseñé e ilustré recursos gráficos y el arte de los escenarios.',
        'RAC_4':'Creé y pulí las animaciones del personaje principal.',
        'RAC_5':'Premiado y seleccionado para su exhibición en el <strong>Barcelona Indie Dev Day</strong>.',

        'project_inner_description':'Sumérgete en un mundo futurista de misterio donde todo parece un juego. Sin embargo, tus decisiones acabarán revelando la verdad sobre quién eres realmente.',
        'project_inner_1': '<strong>Director de Juego y Diseñador Narrativo.</strong>',
        'project_inner_2': 'Lideré al equipo para crear una experiencia inmersiva y enigmática.',
        'project_inner_3': 'Diseñé la arquitectura narrativa y los sistemas de progresión.',
        'project_inner_4': 'Redacté todos los diálogos y guiones del juego.',
        'project_inner_5': 'Diseñé y programé minijuegos en 2D.',
        'project_inner_6': 'Diseñé el nivel central (HUB), integrando narrativa ambiental y triggers narrativos.',
        'project_inner_7': 'Premiado y seleccionado para su exhibición en el <strong>Guerrilla Game Festival</strong>.',

        'experience_other': 'Otros proyectos',
        'mini_p1_title':'Space Commander Simulator',
        'mini_p1_desc':'Diseñé y programé un prototipo de estrategia de naves espaciales en <strong>VR con reconocimiento de gestos</strong>.',

        'mini_p2_desc':'Redacté todos los <strong>diálogos</strong> y <strong>guiones narrativos</strong> para nuestro propio juego spin-off.',

        'mini_p3_desc':'Diseñé y desarrollé un prototipo de plataformas en 3D usando <strong>patrones de diseño software</strong> y <strong>blockouts</strong>.',

        'mini_p4_title':'Colonia alien',
        'mini_p4_desc':'Implementé una colonia de NPCs con sistemas de percepción e interacción utilizando <strong>state machines propios</strong>.',

        'design_process_title': 'Proceso de Diseño',
        'design_process_description': 'Mi filosofía de diseño se basa en un riguroso marco iterativo de 4 etapas, garantizando que cada mecánica sea validada, equilibrada y esté perfectamente alineada con la experiencia central del jugador.',

        'design_process_stage1_title': 'Etapa 1: Definir el problema',
        'design_process_stage1_description1': 'Ya sea para definir la experiencia principal del jugador, crear nuevas mecánicas y sistemas, o ajustar los existentes, el primer paso es <br> <strong>identificar el problema</strong> que necesitamos resolver en la iteración actual.',
        'design_process_stage1_description2': 'Durante las etapas iniciales de conceptualización, el objetivo principal es <strong>definir la experiencia principal</strong>. Esto implica identificar las mecánicas y sistemas que se alineen con una <strong>visión de diseño</strong>: una frase concisa que encapsule la experiencia que se desea transmitir al jugador. Una vez que el desarrollo ha comenzado, los objetivos de iteración evolucionan hacia la creación de contenido y el refinamiento de los sistemas mediante el ajuste y equilibrio de las funciones ya existentes.',

        'design_process_stage2_title':'Etapa 2: Hallar la solución',
        'design_process_stage2_description1':'Cada problema tiene múltiples soluciones, pero identificar la más efectiva requiere un <strong>análisis profundo</strong>, la <strong>exploración</strong> de diversos conceptos y mantener una <strong>visión global</strong> que equilibre las necesidades del juego con las limitaciones del desarrollo.',
        'design_process_stage2_description2':'Esta etapa se centra en la <strong>lluvia de ideas</strong> y el <strong>análisis</strong> mediante la <strong>identificación de riesgos</strong> y los <strong>5 Pilares del Diseño de Juegos</strong> (Claridad, Satisfacción, Respuesta, Motivación y Fantasía). Esto asegura que cada función mejore la experiencia del jugador y sea técnicamente viable. Al desarrollar nuevos sistemas, aprovecho los <strong>patrones de diseño</strong> establecidos, adaptándolos e innovando sobre ellos para satisfacer las necesidades específicas del proyecto.',
        'design_process_stage2_description3':'Una vez exploradas las opciones, selecciono una solución única o un híbrido de varias, analizándola de nuevo para validar el concepto final o cambiar hacia una alternativa que se ajuste mejor al estado actual del juego.',

        'design_process_stage3_title':'Etapa 3: Probar la solución',
        'design_process_stage3_description1':'La implementación de nuevas funciones y mecánicas comienza con la creación de un <strong>prototipo rápido</strong> para <strong>identificar fortalezas</strong> y <strong>debilidades</strong> lo antes posible.',
        'design_process_stage3_description2':'Para mantener una documentación sólida, primero redacto un <strong>one-pager</strong> que resume los objetivos y las especificaciones clave de la solución propuesta. Posteriormente, se crea un prototipo rápido utilizando prototipos de papel, Machinations o motores de juego con recursos básicos y scripts sencillos, de modo que puedan <strong>probarse</strong> y <strong>ajustarse fácilmente</strong>.',
        'design_process_stage3_description3':'Una vez que el prototipo está listo, se somete a <strong>playtesting</strong> con las personas adecuadas. Ya sea con el equipo interno o con testers externos, siempre se tiene en cuenta al <strong>público objetivo</strong> y se preparan de antemano estrategias de recopilación de datos para obtener conclusiones.',

        'design_process_stage4_title':'Etapa 4: Evaluación',
        'design_process_stage4_description1':'Tras recopilar todo el <strong>feedback necesario</strong>, se <strong>analiza la información</strong> para determinar si la solución debe integrarse en el juego, perfeccionarse mediante nuevas iteraciones o descartarse por completo. Independientemente del resultado, la evaluación se <strong>documenta meticulosamente</strong> y se utiliza para definir nuevos objetivos en los siguientes ciclos de desarrollo. Esto garantiza que <strong>cada prueba contribuya al crecimiento</strong>.',

        'design_process_stage5_title':'Repetir',
        'design_process_stage5_description1':'Al finalizar la iteración, las ideas habrán sido validadas y las funciones implementadas. Es el momento de reunir al equipo para perfeccionar el proceso de desarrollo, identificar nuevas necesidades y planificar estratégicamente las futuras funciones y las próximas iteraciones.',


        'contact_title': 'Contáctame',

        'copy_success':'Copiado',
        'copy_error': 'Error al copiar',

        //VIDEOS
        'videos':{
            'video_Coco':'https://www.youtube.com/embed/-PS4w2wODa0?si=vrvYJoYqCKpjT4C5',
            'video_Bratz':'https://www.youtube.com/embed/QC1Otakvbps?si=ydC9rhXK7vRLCETI'
        },

        'Coco_One_Pagers': [
            'images/Coco/es_Intro.jpg',
            'images/Coco/es_Combat System.jpg',
            'images/Coco/es_Level System.jpg',
            'images/Coco/es_Progression System.jpg',
            'images/Coco/es_Narrative System.jpg'
        ],

        'SCR_One_Pagers': [
            'images/SCR/es_Intro.jpg',
            'images/SCR/es_combat.jpg',
            'images/SCR/es_characters.jpg'
        ]

    },

    // ---- INGLÉS (EN) ----
    'en': {
        'nav_top': 'Top',
        'nav_about': 'About me',
        'nav_skills': 'Skills',
        'nav_experience': 'Experience',
        'nav_design_process': 'Design',
        'nav_contact': 'Contact me',

        //HOME
        "home_roles": 'Game Designer, Programmer, Producer',
        "home_description": 'I am a gameplay and systems designer and developer, producer and storyteller with great passion and ambition for creating innovative games.',
        "home_eslogan": '\'Handcrafted Experiences, Loop by Loop\'',

        //ABOUT ME
        'aboutMe_title': 'About me',
        'aboutMe_p1': 'Born in 2003, my interest in video games started at the age of three, allowing me to internally develop an intuitive understanding of <strong>why different mechanics work and the objectives behind design decisions focused on the player experience</strong>. As a child, I also spent long evenings playing with LEGO, imagining stories and worlds that later inspired me to begin writing, programming, and cultivating a strong interest in storytelling and art.',
        'aboutMe_p2': 'I recently received my <strong>Bachelor\'s degree in Game Design and Development</strong> from Rey Juan Carlos University in Madrid. During these years, I  studied <strong>game design</strong>, <strong>the video game production pipeline</strong>, team management using <strong>Scrum (Certificate)</strong> and programming in <strong>C#</strong>, <strong>C++</strong>, <strong>javascript</strong> and <strong>Unity Engine</strong>. Furthermore, my desire for improvement led me to independently studying design and participating with colleagues in several game jams as a <strong>designer</strong> and <strong>storyteller</strong> (and even once as an art director). This experience has significantly strengthened my <strong>communication</strong>, <strong>team working</strong>, <strong>analysis</strong>, and <strong>problem-solving skills</strong>',
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
        'aboutMe_subject11':'Statistics',
        'aboutMe_subject12':'Scrum Master certificate',

        //SKILLS
        'skills_title':'Skills',
        'skills_description':'Along my journey, I have worked with several tools and developed my skills to be the best possible professional.',
        'skills_some_experience':' = Some experience',

        'skills_programmer':'Programming',
        'skills_unity':'Unity Engine / C#',
        'skills_c++':'C++ & Python',
        'skills_unreal':'Unreal Engine 5',
        'skills_html':'HTML / CSS',
        'skills_js':'JavaScript',
        'skills_visualSc':'Visual scripting',

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
        'project_available_on': '<strong>Available on:</strong>',
        'knowMore': 'See my work',


        'el_coco_description': 'EL COCO is an action roguelike that plunges you into a world of dreams, broken memories, and living nightmares. Descend into The Uncertain, a place as strange as it is dangerous, and fight to recover what you’ve lost—if you can trust your guide.',
        'el_coco_role': '<strong>Game Designer & Producer.</strong>',
        'el_coco_lead':'Led the team as Lead Designer and Producer, overseeing the project\'s vision and execution using Kanban, setting schedules and clearing impediments.',
        'el_coco_systems': 'Designed scalable level, progression, and narrative systems based on challenges, power-ups and enemies, providing players with a rewarding pathing experience.',
        'el_coco_enemies': 'Designed and implemented diverse enemy types, bosses and combat encounters using Behavior Trees adapted to rogue-like levels and player varied ability kits.',
        'el_coco_levels': 'Designed levels using modules.',
        'el_coco_platforms': 'Platforms: Available on PS5, PS4, Xbox One, Xbox Series X|S, Nintendo Switch, and Steam.',

        'bratz_description':'Rule the runway and take the stage with the Bratz Pack! Customize fierce fashions, groove to songs from the Bratz Universe like ‘So Good’, and jet off to iconic cities. <br>Outshine mean Burdine and the Tweevil Twins in epic fashion battles—solo or with friends.',
        'project_bratz_role': '<strong>Producer.</strong>',
        'project_bratz_info1':'Led meetings and communication with stakeholders.',
        'project_bratz_info2':'Managed team objetives and removed blockers.',
        'project_bratz_updates':'Managed post-launch updates.',
        'project_bratz_info': 'Further details are subject to a Non-Disclosure Agreement (NDA).',

        'experience_personal': 'Personal projects',

        'magefall_description': 'Throughout this project, I studied and developed the essential elements for the conceptualization stages of a video game. I deepened my knowledge of game design by researching industry experts and successfully formalized a game concept by following an iterative, problem-oriented approach.',
        'magefall_title':'Magefall: A study of iterative design and video game conceptualization stages (Bachelor\'s Thesis, 2025)',
        'project_magefall_1':'<strong>Researcher & Systems Designer</strong>',
        'project_magefall_2':'Carried out an in-depth investigation into iterative design and advanced game design.',
        'project_magefall_3':'Applied newly acquired knowledge to develop a game concept through an iterative cycle.',
        'project_magefall_4':'Designed and refined combat and progression systems, ensuring mechanical depth.',
        'project_magefall_5':'Prototyped and simplified complex mechanics using paper prototyping techniques.',
        'project_magefall_6':'Conducted playtesting sessions to identify issues and strengths, followed by their evaluation.',
        'project_magefall_7':'Authored clear and versatile documentation, including a GDD, project briefs, and one-pagers.',

        'SCR3D_description':'A brand-new spaceship hero shooter where you choose your character, customize your weapons, and fight your rivals to dominate the Arena. Each game is a \'best-of-three\' match where you level up your ship to unlock powerful boosters and signature abilities.',
        'SCR3D_1':'<strong>Game Director & Narrative Designer.</strong',
        'SCR3D_2':'Designed the core online competitive combat system and progression mechanics.',
        'SCR3D_3':'Conceptualized and prototyped diverse character kits and unique gameplay functionalities.',
        'SCR3D_4':'Balanced all characters, abilities, and upgrade paths to ensure competitive integrity.',
        'SCR3D_5':'Conducted playtesting sessions to validate mechanics, refine balance, and improve player feel.',
        'SCR3D_6':'Programmed several online features and systems using .NET and WebGL.',
        'SCR3D_7':'Developed a scalable world setting and backstories for the entire character roster.',

        'RAC_description':'Bright young stars with a future to build have a story to tell. Engage with them as much as possible to uncover their pasts and unveil all their secrets.',
        'RAC_1':'<strong>Lead Artist</strong>',
        'RAC_2':'Defined the overall visual identity and art style of the project.',
        'RAC_3':'Designed and illustrated graphical assets and environment art.',
        'RAC_4':'Created and polished the animations for the main character.',
        'RAC_5': 'Recognized with an award and selected for exhibition at <strong>Barcelona Indie Dev Day</strong>.',

        'project_inner_description':'Delve into a futuristic world of mystery where everything feels like a game. However, your decisions will ultimately reveal the truth about who you really are.',
        'project_inner_1': '<strong>Game Director and narrative designer.</strong>',
        'project_inner_2': 'Led the team in creating an immersive and enigmatic player experience.',
        'project_inner_3': 'Designed the core narrative architecture and progression systems.',
        'project_inner_4': 'Authored all in-game dialogue and narrative scripts.',
        'project_inner_5': 'Designed and programmed 2D minigames to complement the core gameplay.',
        'project_inner_6': 'Architected the central HUB level, focusing on environmental storytelling and narrative triggers.',
        'project_inner_7': 'Recognized with an award and selected for exhibition at the <strong>Guerrilla Game Festival</strong>.',

        'experience_other': 'Other projects',

        'mini_p1_title':'Space Commander Simulator',
        'mini_p1_desc':'Designed and programmed a <strong>VR</strong> starship strategy prototype featuring a <strong>gesture recognition system</strong>.',

        'mini_p2_desc':'Authored all <strong>in-game dialogue</strong> and <strong>narrative scripts</strong> for our fan-made <br> spin-off.',

        'mini_p3_desc':'Designed and developed a 3D platformer using <strong>software design patterns</strong> and <strong>blockouts</strong>.',

        'mini_p4_title':'Alien Colony',
        'mini_p4_desc':'Engineered a NPC colony featuring <strong>state machines</strong>, perception systems, and complex interaction.',

        'design_process_title': 'Design Process',
        'design_process_description': 'My design philosophy is built on a rigorous 4-stage iterative framework, ensuring that every mechanic is validated, balanced, and perfectly aligned with the core player experience.',

        'design_process_stage1_title': 'Stage 1: Define the problem',
        'design_process_stage1_description1': 'Whether it is defining the core player experience, creating new mechanics and systems, or tuning existing ones, the first step is <strong>identifying the problem</strong> we need to solve in the current iteration.',
        'design_process_stage1_description2': 'In the first stages of conceptualization, the objective should be <strong>defining the core experience</strong>. In this case, the problem could be stated as finding the right main mechanics and systems that match a <strong>single statement</strong>: a phrase that conveys the desired experience that the game should provide. Once development has started, iteration objectives range from creating new content and systems for the game to tuning and balancing various existing features.',

        'design_process_stage2_title':'Stage 2: Find the Solution',
        'design_process_stage2_description1':'Every problem has multiple solutions, but identifying the most effective one requires <strong>deep analysis</strong>, <strong>exploring</strong> diverse concepts, and maintaining a <strong>big-picture</strong> perspective of both the game’s vision and development constraints.',
        'design_process_stage2_description2':'This stage focuses on <strong>brainstorming</strong> and <strong>vetting</strong> ideas through <strong>risk identification</strong> and the <strong>5 Pillars of Game Design</strong> (Clarity, Satisfaction, Response, Motivation, and Fantasy). This ensures that every feature enhances the player experience and is technically feasible. When designing new systems, I leverage established <strong>design patterns</strong>—adapting and innovating upon them to meet the project\'s specific needs.',
        'design_process_stage2_description3':'Once a range of options has been explored, I select a single solution or a hybrid of several, re-analyzing it to validate the final concept or look for a more effective alternative that aligns with the current build.',

        'design_process_stage3_title':'Stage 3: Test the Solution',
        'design_process_stage3_description1':'Implementing new features and mechanics begins with <strong>rapid prototyping</strong> to identify <strong>strengths</strong> and <strong>weaknesses</strong> as early as possible.',
        'design_process_stage3_description2':'To ensure robust documentation, I first draft a <strong>one-pager</strong> summarizing the solution\'s objectives and key specifications. Subsequently, a prototype is created—using paper prototypes, Machinations, or game engines with placeholder assets and scripts—allowing for <strong>quick testing</strong> and <strong>iteration</strong>.',
        'design_process_stage3_description3':'Once the prototype is functional, it undergoes <strong>playtesting</strong> with the appropriate audience. Whether testing with the internal team or external participants, the <strong>target audience</strong> remains the priority, and data collection strategies are prepared in advance to extract insights.',

        'design_process_stage4_title':'Stage 4: Evaluation',
        'design_process_stage4_description1':'Once the <strong>necessary feedback</strong> is collected, the data is <strong>analyzed</strong> to determine if the solution should be integrated into the game, refined through further iterations, or discarded entirely. Regardless of the outcome, the evaluation is <strong>meticulously documented</strong> and used to define new objectives for future development cycles. This ensures that every test contributes to the <strong>project’s growth</strong>.',

        'design_process_stage5_title':'Repeat',
        'design_process_stage5_description1':'By the end of the iteration, ideas have been validated and features implemented. Now is the time to gather the team to refine the development process, identify emerging needs, and plan future features and upcoming iterations',

        'contact_title': 'Contact me', // Mantener igual si ya está en inglés

        //COPIA
        'copy_success':'Copied',
        'copy_error': 'Copy error',

        //VIDEOS
        'videos':{
            'video_Coco':'https://www.youtube.com/embed/w1VXgXGJoMo?si=kQGGENqdgGSA5-C-',
            'video_Bratz':'https://www.youtube.com/embed/FJ5CNNaP4vQ?si=z_2PNQoDxg_0qs07'
        },

        'Coco_One_Pagers': [
            'images/Coco/en_Intro.jpg',
            'images/Coco/en_Combat System.jpg',
            'images/Coco/en_Level System.jpg',
            'images/Coco/en_Progression System.jpg',
            'images/Coco/en_Narrative System.jpg'
        ],

        'SCR_One_Pagers': [
            'images/SCR/en_Intro.jpg',
            'images/SCR/en_combat.jpg',
            'images/SCR/en_characters.jpg'
        ]

    }
};