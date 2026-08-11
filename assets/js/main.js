(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        navToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        navToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        navToggle.focus();
      }
    });
  }

  document.querySelectorAll("[data-screenshot]").forEach(function (media) {
    const image = media.querySelector("img");
    if (!image) return;

    function showImage() {
      media.classList.add("has-image");
    }

    function showPlaceholder() {
      media.classList.remove("has-image");
    }

    image.addEventListener("load", showImage);
    image.addEventListener("error", showPlaceholder);
    if (image.complete && image.naturalWidth > 0) showImage();
  });

  const translations = {
    es: {
      "common.skip": "Saltar al contenido",
      "common.brandHomeAria": "Creator Finder — Inicio",
      "common.openMenu": "Abrir menú",
      "common.mainNavigation": "Navegación principal",
      "common.nav.home": "Inicio",
      "common.nav.privacy": "Privacidad",
      "common.nav.terms": "Términos",
      "common.nav.api": "Información API",
      "common.nav.contact": "Contacto",
      "common.documentLanguage": "Idioma del documento",
      "common.footer.description": "Herramienta privada para descubrimiento y gestión de outreach de creadores de videojuegos.",
      "common.footerLinks": "Enlaces del pie",
      "common.footer.privacy": "Política de Privacidad",
      "common.footer.terms": "Términos",
      "common.footer.api": "Información API",
      "common.footer.contact": "Contacto",
      "common.disclaimer": "Creator Finder no está afiliado, respaldado ni patrocinado por YouTube o Google.",

      "index.head.title": "Creator Finder — Descubrimiento de creadores para videojuegos",
      "index.head.description": "Sitio oficial de Creator Finder, una herramienta privada de XOTOX STUDIO para descubrir y gestionar outreach de creadores de videojuegos.",
      "index.head.ogTitle": "Creator Finder — XOTOX STUDIO",
      "index.head.ogDescription": "Herramienta interna para descubrimiento y gestión de outreach de creadores de videojuegos.",
      "index.hero.eyebrow": "Herramienta privada · Uso interno",
      "index.hero.lead": "Herramienta interna para descubrimiento y gestión de outreach de creadores. Organiza datos públicos directos de canales y vídeos para revisión manual en campañas de videojuegos de XOTOX STUDIO.",
      "index.hero.how": "Cómo funciona",
      "index.hero.reviewers": "Información para revisores",
      "index.hero.note": "Creator Finder es actualmente una herramienta privada de uso interno y no está disponible para acceso público.",
      "index.panel.aria": "Representación conceptual del flujo de Creator Finder",
      "index.panel.title": "DESCUBRIMIENTO_CAMPAÑA / CONCEPTO",
      "index.youtube.aria": "Atribución de YouTube Data API",
      "index.youtube.open": "Abrir YouTube",
      "index.youtube.uses": "Creator Finder utiliza los servicios de YouTube Data API.",
      "index.youtube.terms": "Términos de YouTube",
      "index.youtube.apiTerms": "Términos de YouTube API Services",
      "index.panel.source": "FUENTE",
      "index.panel.access": "ACCESO",
      "index.panel.status": "ESTADO",
      "index.panel.private": "PRIVADO",
      "index.panel.discovery": "DESCUBRIMIENTO",
      "index.panel.filter": "FILTRO",
      "index.panel.review": "REVISIÓN",
      "index.panel.outreach": "CONTACTO",
      "index.status.heading": "Estado de la aplicación",
      "index.status.application": "Estado de la aplicación",
      "index.status.private": "Privada / Uso interno",
      "index.status.client": "Cliente API",
      "index.status.developer": "Desarrollador",
      "index.status.public": "Acceso público",
      "index.status.unavailable": "No disponible actualmente",
      "index.capabilities.kicker": "01 / Capacidades",
      "index.capabilities.title": "Del descubrimiento a una campaña revisada.",
      "index.capabilities.lead": "Creator Finder reúne un flujo de trabajo local para explorar creadores, reducir trabajo repetido y preparar contactos de forma controlada.",
      "index.capabilities.cards": `<article class="feature-card"><span class="card-index">01</span><h3>Descubrimiento</h3><p>Localiza canales y vídeos públicos relacionados con temas de campaña.</p></article>
            <article class="feature-card"><span class="card-index">02</span><h3>Revisión de candidatos</h3><p>Aplica filtros directos configurados por el usuario y mantiene la decisión final bajo revisión humana.</p></article>
            <article class="feature-card"><span class="card-index">03</span><h3>Deduplicación</h3><p>Evita procesar repetidamente los mismos candidatos o contactos.</p></article>
            <article class="feature-card"><span class="card-index">04</span><h3>Caché y cuota</h3><p>Reutiliza información y aplica presupuestos para reducir consultas redundantes.</p></article>
            <article class="feature-card"><span class="card-index">05</span><h3>Campañas</h3><p>Agrupa búsquedas, candidatos, decisiones y estados por lanzamiento.</p></article>
            <article class="feature-card"><span class="card-index">06</span><h3>Contactos</h3><p>Registra vías de contacto profesionales publicadas de forma pública.</p></article>
            <article class="feature-card"><span class="card-index">07</span><h3>Outreach revisado</h3><p>Prepara comunicaciones que requieren aprobación explícita antes de enviarse.</p></article>
            <article class="feature-card"><span class="card-index">08</span><h3>Seguimiento</h3><p>Gestiona estados y, con permiso, consulta respuestas relacionadas en Gmail.</p></article>`,
      "index.workflow.kicker": "02 / Cómo funciona",
      "index.workflow.title": "Cómo funciona",
      "index.workflow.lead": "Un proceso secuencial, asistido por datos públicos y con revisión humana antes de cualquier comunicación.",
      "index.workflow.aria": "Flujo de trabajo de Creator Finder",
      "index.workflow.steps": `<div class="workflow-step"><span>01</span><strong>YouTube Data API</strong></div>
            <div class="workflow-step"><span>02</span><strong>Descubrimiento</strong></div>
            <div class="workflow-step"><span>03</span><strong>Filtrado</strong></div>
            <div class="workflow-step"><span>04</span><strong>Análisis</strong></div>
            <div class="workflow-step"><span>05</span><strong>Candidatos</strong></div>
            <div class="workflow-step"><span>06</span><strong>Contactos públicos apropiados</strong></div>
            <div class="workflow-step"><span>07</span><strong>Revisión</strong></div>
            <div class="workflow-step"><span>08</span><strong>Outreach</strong></div>`,
      "index.workflow.notes": `<div class="check-note"><span aria-hidden="true">✓</span><div><strong>Acción explícita.</strong> El envío de comunicaciones requiere la aprobación del usuario; conectar Gmail no autoriza envíos automáticos indiscriminados.</div></div>
            <div class="check-note"><span aria-hidden="true">✓</span><div><strong>Controles de contacto.</strong> La deduplicación y los estados de “no contactar” ayudan a evitar repeticiones y a respetar decisiones previas.</div></div>`,
      "index.api.kicker": "03 / Uso de API",
      "index.api.title": "Uso de YouTube Data API",
      "index.api.lead": "Creator Finder utiliza YouTube Data API v3 para consultar información pública necesaria para descubrir y revisar manualmente canales y vídeos relacionados con campañas de videojuegos. Los datos se refrescan o invalidan/eliminan como máximo a los 30 días; las métricas avanzadas derivadas permanecen desactivadas mientras esperan la aprobación aplicable.",
      "index.api.optimization": "Medidas de optimización",
      "index.api.cache": "CACHÉ",
      "index.api.deduplication": "DEDUPLICACIÓN",
      "index.api.batching": "AGRUPACIÓN",
      "index.api.budgets": "PRESUPUESTOS DE CUOTA",
      "index.api.reuse": "REUTILIZACIÓN DE DATOS",
      "index.api.youtubeTerms": "Términos del Servicio de YouTube ↗",
      "index.api.googlePrivacy": "Política de Privacidad de Google ↗",
      "index.api.servicesTerms": "Términos del Servicio de YouTube API Services ↗",
      "index.api.principles": `<div class="principle"><span>01</span><div><strong>No venta de datos</strong><p>Creator Finder no vende datos obtenidos mediante YouTube API.</p></div></div>
              <div class="principle"><span>02</span><div><strong>Sin acceso para terceros</strong><p>No proporciona a terceros acceso a YouTube API Data ni a sus credenciales.</p></div></div>
              <div class="principle"><span>03</span><div><strong>Respeto a la cuota</strong><p>No intenta evitar ni eludir las cuotas establecidas por YouTube API.</p></div></div>
              <div class="principle"><span>04</span><div><strong>Sin afiliación</strong><p>Creator Finder no es un producto oficial de YouTube ni de Google.</p></div></div>`,
      "index.screenshots.kicker": "04 / Aplicación local",
      "index.screenshots.title": "Capturas de la aplicación",
      "index.screenshots.lead": "Capturas completas y sin editar de la compilación local preparada para auditoría, revisadas el 11 de agosto de 2026.",
      "index.screenshots.dashboardAria": "Abrir captura completa del panel principal de Creator Finder",
      "index.screenshots.dashboardAlt": "Panel principal de la compilación de Creator Finder preparada para auditoría",
      "index.screenshots.dashboardLabel": "Panel principal",
      "index.screenshots.dashboardPlaceholder": "<span>IMAGEN NO DISPONIBLE</span>Panel principal",
      "index.screenshots.discoveryAria": "Abrir captura completa del descubrimiento de creadores",
      "index.screenshots.discoveryAlt": "Descubrimiento de creadores con atribución de YouTube",
      "index.screenshots.discoveryLabel": "Descubrimiento de creadores",
      "index.screenshots.discoveryPlaceholder": "<span>IMAGEN NO DISPONIBLE</span>Descubrimiento de creadores",
      "index.screenshots.campaignsAria": "Abrir captura completa de la gestión de campañas",
      "index.screenshots.campaignsAlt": "Gestión de campañas de Creator Finder",
      "index.screenshots.campaignsLabel": "Gestión de campañas",
      "index.screenshots.campaignsPlaceholder": "<span>IMAGEN NO DISPONIBLE</span>Gestión de campañas",
      "index.screenshots.quotaAria": "Abrir captura completa de configuración, automatización y cuota de YouTube",
      "index.screenshots.quotaAlt": "Configuración, automatización y cuota de YouTube de Creator Finder",
      "index.screenshots.quotaLabel": "Gestión de cuota",
      "index.screenshots.quotaPlaceholder": "<span>IMAGEN NO DISPONIBLE</span>Gestión de cuota",
      "index.cta.kicker": "Transparencia",
      "index.cta.title": "Información preparada para una revisión técnica clara.",
      "index.cta.lead": "Consulta el propósito, el acceso, el uso de cuota y el flujo de campaña del cliente API.",
      "index.cta.button": "Ver información API",

      "privacy.head.title": "Política de Privacidad — Creator Finder",
      "privacy.head.description": "Política de privacidad de Creator Finder: uso de YouTube Data API, Gmail OAuth, almacenamiento local y control de datos.",
      "privacy.head.ogTitle": "Política de Privacidad — Creator Finder",
      "privacy.head.ogDescription": "Información sobre el acceso, uso, almacenamiento y control de datos en Creator Finder.",
      "privacy.hero.kicker": "Legal / Privacidad",
      "privacy.hero.title": `Política de Privacidad de <span class="gradient-text">Creator Finder</span>`,
      "privacy.hero.lead": "Cómo una aplicación privada y local de XOTOX STUDIO accede, utiliza, almacena y protege la información necesaria para su funcionamiento.",
      "privacy.hero.updated": "ÚLTIMA ACTUALIZACIÓN · 11 AGOSTO 2026",
      "privacy.hero.private": "APLICACIÓN PRIVADA",
      "privacy.hero.storage": "ALMACENAMIENTO LOCAL",

      "terms.head.title": "Términos de Uso — Creator Finder",
      "terms.head.description": "Términos de uso de Creator Finder, una herramienta privada de XOTOX STUDIO para campañas de videojuegos.",
      "terms.head.ogTitle": "Términos de Uso — Creator Finder",
      "terms.head.ogDescription": "Condiciones aplicables al uso privado e interno de Creator Finder.",
      "terms.hero.kicker": "Legal / Términos",
      "terms.hero.title": `Términos de Uso de <span class="gradient-text">Creator Finder</span>`,
      "terms.hero.lead": "Condiciones sencillas y transparentes para una herramienta que actualmente es privada, local y de uso interno.",
      "terms.hero.updated": "ÚLTIMA ACTUALIZACIÓN · 11 AGOSTO 2026",
      "terms.hero.access": "ACCESO PRIVADO",

      "contact.head.title": "Contacto — Creator Finder",
      "contact.head.description": "Información de contacto de Creator Finder y XOTOX STUDIO.",
      "contact.head.ogTitle": "Contacto — Creator Finder",
      "contact.head.ogDescription": "Contacto oficial para Creator Finder, desarrollado por XOTOX STUDIO.",
      "contact.hero.kicker": "Contacto",
      "contact.hero.title": `Hablemos de <span class="gradient-text">Creator Finder</span>`,
      "contact.hero.lead": "Canal de contacto para consultas sobre la aplicación, privacidad, datos, solicitudes de no contactar o información de revisión API.",
      "contact.hero.developer": "DESARROLLADOR INDEPENDIENTE",
      "contact.card.kicker": "Contacto oficial",
      "contact.card.lead": "Para consultas sobre privacidad, eliminación de datos locales, funcionamiento del cliente API o solicitudes relacionadas con outreach:",
      "contact.project.label": "PROYECTO DEL DESARROLLADOR",
      "contact.project.description": `NOXEN es un videojuego de XOTOX STUDIO. Se muestra únicamente como proyecto público del desarrollador y <strong>no es el cliente de YouTube API</strong>. El cliente API descrito en esta web es Creator Finder.`,
      "contact.project.button": "Ver NOXEN en Steam",

      "audit.head.title": "Creator Finder — Información del Cliente API",
      "audit.head.description": "Información técnica y operativa sobre Creator Finder, un cliente privado de YouTube Data API v3 desarrollado por XOTOX STUDIO.",
      "audit.head.ogTitle": "Creator Finder — Información del Cliente API",
      "audit.head.ogDescription": "Propósito, modelo de acceso, controles de cuota y flujo de campaña del cliente API Creator Finder.",
      "audit.hero.kicker": "Para revisores de API",
      "audit.hero.title": `Creator Finder — <span class="gradient-text">Información del Cliente API</span>`,
      "audit.hero.lead": "Una descripción transparente del propósito, el modelo de acceso, las fuentes de datos, los controles de cuota y el flujo con revisión humana de la aplicación de escritorio Creator Finder.",
      "audit.hero.review": "INFORMACIÓN DE REVISIÓN",
      "audit.hero.access": "ACCESO PRIVADO / INTERNO",
      "audit.hero.updated": "ÚLTIMA ACTUALIZACIÓN · 11 AGOSTO 2026",
      "audit.nav.aria": "Secciones de información API",
      "audit.nav.onPage": "En esta página",
      "audit.nav.identity": "Identidad del cliente",
      "audit.nav.purpose": "Propósito",
      "audit.nav.workflow": "Flujo de trabajo",
      "audit.nav.quota": "Solicitud de cuota",
      "audit.nav.controls": "Controles",
      "audit.nav.verification": "Notas de verificación",
      "audit.section.identity": `<h2>1. Identidad del cliente API</h2>
            <div class="audit-facts">
              <div class="audit-fact"><span>Aplicación</span><strong>Creator Finder</strong></div>
              <div class="audit-fact"><span>Desarrollador</span><strong>XOTOX STUDIO</strong></div>
              <div class="audit-fact"><span>Acceso</span><strong>Privado / Interno</strong></div>
              <div class="audit-fact"><span>Servicio API</span><strong>YouTube Data API v3</strong></div>
              <div class="audit-fact"><span>Despliegue</span><strong>Aplicación de escritorio local</strong></div>
              <div class="audit-fact"><span>Cuentas públicas</span><strong>No disponibles</strong></div>
            </div>
            <p>Creator Finder es una aplicación local utilizada por su desarrollador independiente. No es un producto SaaS público, no ofrece inicio de sesión ni registro públicos y no expone YouTube API Data ni credenciales de API a terceros.</p>`,
      "audit.section.purpose": `<h2>2. Propósito</h2>
            <p>Creator Finder se utiliza para descubrir y evaluar creadores de videojuegos con información disponible públicamente para posibles contactos relacionados con las campañas de los propios videojuegos de XOTOX STUDIO.</p>
            <p>La aplicación ayuda al desarrollador a organizar información pública de canales y vídeos, revisar candidatos manualmente, gestionar vías públicas de contacto profesional, preparar comunicaciones y hacer seguimiento del estado de las campañas. Las métricas avanzadas de idoneidad basadas en YouTube API Data permanecen desactivadas salvo y hasta que se conceda la aprobación aplicable de YouTube para métricas derivadas.</p>`,
      "audit.section.youtube": `<h2>3. Por qué se utiliza YouTube Data API v3</h2>
            <p>La API proporciona la información pública de canales y vídeos necesaria para realizar de forma coherente el descubrimiento temático y la revisión de candidatos. La revisión del código fuente de la compilación actual confirmó este inventario de recursos y métodos:</p>
            <ul>
              <li><code>search.list</code> con <code>part=snippet</code>, una consulta de campaña, <code>type=video</code> o <code>type=channel</code>, <code>order=relevance</code>, límites de resultados y paginación; se puede proporcionar un idioma de relevancia;</li>
              <li><code>channels.list</code> con <code>part=snippet,statistics,contentDetails</code> para IDs de canal, agrupados cuando es posible;</li>
              <li><code>playlistItems.list</code> con <code>part=contentDetails</code> para la lista de subidas de un canal;</li>
              <li><code>videos.list</code> con <code>part=snippet,statistics</code> para IDs de vídeo, agrupados cuando es posible.</li>
            </ul>
            <p>El acceso a YouTube utiliza una clave API de desarrollador. La compilación revisada no solicita ningún scope OAuth de YouTube ni accede a datos privados de la cuenta de YouTube de un revisor.</p>
            <p>Creator Finder no vende ni redistribuye YouTube API Data, no proporciona a terceros acceso a esos datos ni intenta eludir las restricciones de cuota. Obtiene YouTube API Data únicamente mediante los métodos documentados de la API indicados anteriormente; no hace scraping de páginas de YouTube o Google.</p>
            <p>La procedencia identifica los registros derivados de YouTube por separado del estado local de campaña. YouTube API Data no autorizado se actualiza mediante el endpoint documentado correspondiente o se invalida/elimina en un plazo máximo de 30 días. Los datos caducados no se muestran ni se utilizan como actuales, incluso cuando la cuota impide actualizarlos. Se conservan el historial independiente de campaña, las notas, las aprobaciones y las decisiones de no contactar.</p>`,
      "audit.section.gmail": `<h2>4. Scopes OAuth de Gmail y funciones</h2>
            <p>Gmail es opcional y utiliza autorización incremental y contextual. La compilación actual solicita exactamente:</p>
            <ul>
              <li><code>https://www.googleapis.com/auth/gmail.compose</code>: enumerar borradores para localizar un mensaje de campaña por su Message-ID RFC 822, recuperar metadatos mínimos del borrador, crear un borrador y enviar un borrador o mensaje aprobado por el usuario;</li>
              <li><code>https://www.googleapis.com/auth/gmail.readonly</code>: recuperar un hilo ya identificado mediante un ID de hilo de campaña almacenado localmente e inspeccionarlo para detectar una respuesta.</li>
            </ul>
            <p><code>gmail.compose</code> se solicita cuando el usuario conecta la funcionalidad de borrador/envío. <code>gmail.readonly</code> se solicita por separado solo después de que el usuario active el seguimiento de respuestas. Sin autorización de solo lectura, la creación de borradores y el envío explícito siguen funcionando mientras el seguimiento de respuestas permanece desactivado. La función de respuestas inspecciona únicamente IDs de hilos de campaña identificados localmente y no busca en la bandeja de entrada general, no marca correos como leídos, no mueve mensajes ni modifica etiquetas.</p>`,
      "audit.section.workflow": `<h2>5. Flujo de campaña</h2>
            <div class="audit-flow" aria-label="Flujo de campaña de Creator Finder">
              <div><span>01</span><strong>Definir una campaña de videojuego y temas de descubrimiento relevantes</strong></div>
              <div><span>02</span><strong>Ejecutar un descubrimiento temático controlado mediante YouTube Data API</strong></div>
              <div><span>03</span><strong>Filtrar y deduplicar canales, vídeos y candidatos existentes</strong></div>
              <div><span>04</span><strong>Revisar manualmente información pública directa y la idoneidad del candidato</strong></div>
              <div><span>05</span><strong>Identificar una vía pública adecuada de contacto profesional</strong></div>
              <div><span>06</span><strong>Revisar el candidato y la comunicación propuesta</strong></div>
              <div><span>07</span><strong>Enviar únicamente después de una acción explícita de aprobación del usuario</strong></div>
              <div><span>08</span><strong>Hacer seguimiento del estado de campaña y, si se autoriza, de las respuestas relacionadas en Gmail</strong></div>
            </div>
            <p>Las acciones de Gmail se limitan a los scopes y las funciones indicados anteriormente. El envío requiere destinatarios de campaña seleccionados, aprobación, modo de envío, una casilla de confirmación y el texto de confirmación explícita exigido por la aplicación. Conectar una cuenta de Google o seleccionar candidatos nunca envía correos. La comprobación de respuestas es opcional y se limita a hilos de campaña conocidos.</p>`,
      "audit.section.quota": `<h2>6. Por qué se solicita cuota adicional</h2>
            <p>Creator Finder necesita descubrir varios canales potencialmente relevantes mediante búsquedas temáticas. Las operaciones de búsqueda son necesarias porque el desarrollador no parte de una lista fija de IDs de canal conocidos y las distintas campañas de videojuegos requieren diferentes temas, idiomas y nichos de creadores.</p>
            <p>La aplicación ya implementa medidas destinadas a reducir el consumo:</p>
            <ul>
              <li><strong>caché:</strong> reutilizar información recuperada previamente en lugar de repetir solicitudes equivalentes;</li>
              <li><strong>deduplicación:</strong> evitar procesar repetidamente el mismo canal, vídeo, candidato o contacto;</li>
              <li><strong>agrupación:</strong> agrupar consultas compatibles cuando la API y el flujo de trabajo lo permiten;</li>
              <li><strong>selección adaptativa de consultas:</strong> priorizar consultas útiles y detener exploraciones de poco valor;</li>
              <li><strong>presupuesto de cuota:</strong> limitar la actividad de campaña conforme a un presupuesto de cuota explícito;</li>
              <li><strong>reutilización de datos almacenados:</strong> reutilizar datos locales conformes mientras sigan siendo válidos.</li>
            </ul>
            <p>La cuota adicional permitiría al desarrollador completar campañas legítimas de descubrimiento sin intentar evitar ni eludir los límites establecidos por YouTube. Esta página no indica intencionadamente ninguna cantidad de cuota solicitada porque el briefing del sitio web no incluía ninguna.</p>`,
      "audit.section.controls": `<h2>7. Controles de datos y outreach</h2>
            <ul>
              <li>Los datos de la aplicación se conservan principalmente en una base de datos local en el dispositivo del desarrollador.</li>
              <li>La caché y la deduplicación reducen las solicitudes API redundantes.</li>
              <li>Los presupuestos de cuota de campaña limitan la actividad de descubrimiento.</li>
              <li>Los correos requieren revisión y aprobación explícitas antes de enviarse.</li>
              <li>Los estados de contacto duplicado y de no contactar ayudan a evitar outreach repetido o inapropiado.</li>
              <li>Solo se pretende utilizar vías públicas de contacto profesional asociadas al creador o a su representante.</li>
              <li>Los contactos no se extraen de descripciones de YouTube API, comentarios, chat ni páginas de YouTube/Google obtenidas mediante scraping; los sitios públicos externos enlazados por el creador y las entradas manuales son las fuentes de referencia permitidas.</li>
              <li>YouTube API Data no autorizado se actualiza o se invalida/elimina en un plazo máximo de 30 días y no puede utilizarse como actual después de caducar.</li>
              <li>Los datos de usuario de Google Workspace se utilizan únicamente para las funciones de Gmail orientadas al usuario que se describen en la <a href="privacy.html">Política de Privacidad</a>.</li>
              <li>El panel de privacidad de configuración puede revocar el token de Gmail mediante el endpoint oficial de Google, eliminar el token local y los datos locales derivados de Gmail, y borrar los datos locales de un creador mediante su ID interno.</li>
            </ul>
            <div class="callout"><strong>Revisión humana antes del outreach.</strong>El descubrimiento, los filtros, la selección, la revisión del contacto, la preparación del correo, la aprobación, el modo de envío y la confirmación final son pasos separados. El piloto automático no envía mensajes.</div>`,
      "audit.section.verification": `<h2>8. Métricas derivadas y notas previas al envío</h2>
            <h3>MÉTRICAS DERIVADAS</h3>
            <p><strong>Las métricas avanzadas de idoneidad de Creator Finder basadas en YouTube API Data permanecen desactivadas salvo y hasta que se conceda la aprobación aplicable de YouTube para métricas derivadas.</strong></p>
            <p>XOTOX STUDIO tiene previsto solicitar la autorización aplicable de Analytics &amp; Reporting / Additional Derived Metrics para futuras categorías de Game Match Score, videojuegos de terror, videojuegos, indie, demo/tipo de contenido, gameplay y actividad/relevancia. Esta página no afirma que esa autorización se haya concedido.</p>
            <p>El inventario de métodos, los controles de conservación, las restricciones de descubrimiento de contactos, los scopes de Gmail y los controles de eliminación orientados al usuario indicados anteriormente se comprobaron con el código fuente revisado el 11 de agosto de 2026. Quedan los siguientes elementos externos o específicos del envío:</p>
            <ol>
              <li>solicitar y obtener la aprobación de YouTube antes de activar cualquier métrica derivada avanzada;</li>
              <li>completar cualquier verificación OAuth o evaluación de seguridad que Google requiera para los scopes restringidos de Gmail;</li>
              <li>insertar la cantidad de cuota configurada y las URL públicas finales en el formulario oficial;</li>
              <li>sustituir las capturas que no muestren la misma compilación con controles de cumplimiento y atribución presentada para revisión.</li>
            </ol>
            <div class="callout"><strong>Sin afirmación de aprobación.</strong>Esta página no afirma ni implica que Creator Finder esté aprobado, verificado, certificado, respaldado o patrocinado por Google o YouTube, ni afiliado a ellos.</div>`,
      "audit.section.policies": `<h2>9. Políticas oficiales</h2>
            <ul>
              <li><a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">Términos del Servicio de YouTube</a></li>
              <li><a href="https://developers.google.com/youtube/terms/api-services-terms-of-service" target="_blank" rel="noopener noreferrer">Términos del Servicio de YouTube API Services</a></li>
              <li><a href="https://developers.google.com/youtube/terms/developer-policies" target="_blank" rel="noopener noreferrer">Políticas para Desarrolladores de YouTube API Services</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Política de Privacidad de Google</a></li>
              <li><a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Política de Datos de Usuario de Google API Services</a></li>
              <li><a href="https://developers.google.com/workspace/workspace-api-user-data-developer-policy" target="_blank" rel="noopener noreferrer">Política de Datos de Usuario y Desarrolladores de Google Workspace API</a></li>
            </ul>`
    },
    en: {
      "common.skip": "Skip to content",
      "common.brandHomeAria": "Creator Finder — Home",
      "common.openMenu": "Open menu",
      "common.mainNavigation": "Main navigation",
      "common.nav.home": "Home",
      "common.nav.privacy": "Privacy",
      "common.nav.terms": "Terms",
      "common.nav.api": "API Information",
      "common.nav.contact": "Contact",
      "common.documentLanguage": "Document language",
      "common.footer.description": "Private creator discovery and outreach management tool for videogame campaigns.",
      "common.footerLinks": "Footer links",
      "common.footer.privacy": "Privacy Policy",
      "common.footer.terms": "Terms",
      "common.footer.api": "API Information",
      "common.footer.contact": "Contact",
      "common.disclaimer": "Creator Finder is not affiliated with, endorsed by, or sponsored by YouTube or Google.",

      "index.head.title": "Creator Finder — Creator discovery for videogames",
      "index.head.description": "Official Creator Finder website, a private XOTOX STUDIO tool for discovering creators and managing videogame creator outreach.",
      "index.head.ogTitle": "Creator Finder — XOTOX STUDIO",
      "index.head.ogDescription": "Internal tool for videogame creator discovery and outreach management.",
      "index.hero.eyebrow": "Private tool · Internal use",
      "index.hero.lead": "Internal tool for creator discovery and outreach management. It organizes direct public channel and video data for manual review in XOTOX STUDIO videogame campaigns.",
      "index.hero.how": "How it works",
      "index.hero.reviewers": "Information for reviewers",
      "index.hero.note": "Creator Finder is currently a private tool for internal use and is not available for public access.",
      "index.panel.aria": "Conceptual representation of the Creator Finder workflow",
      "index.panel.title": "CAMPAIGN_DISCOVERY / CONCEPT",
      "index.youtube.aria": "YouTube Data API attribution",
      "index.youtube.open": "Open YouTube",
      "index.youtube.uses": "Creator Finder uses YouTube Data API Services.",
      "index.youtube.terms": "YouTube Terms",
      "index.youtube.apiTerms": "YouTube API Services Terms",
      "index.panel.source": "SOURCE",
      "index.panel.access": "ACCESS",
      "index.panel.status": "STATUS",
      "index.panel.private": "PRIVATE",
      "index.panel.discovery": "DISCOVERY",
      "index.panel.filter": "FILTER",
      "index.panel.review": "REVIEW",
      "index.panel.outreach": "OUTREACH",
      "index.status.heading": "Application status",
      "index.status.application": "Application status",
      "index.status.private": "Private / Internal Use",
      "index.status.client": "API Client",
      "index.status.developer": "Developer",
      "index.status.public": "Public access",
      "index.status.unavailable": "Not currently available",
      "index.capabilities.kicker": "01 / Capabilities",
      "index.capabilities.title": "From discovery to a reviewed campaign.",
      "index.capabilities.lead": "Creator Finder brings together a local workflow to explore creators, reduce repeated work, and prepare contacts in a controlled way.",
      "index.capabilities.cards": `<article class="feature-card"><span class="card-index">01</span><h3>Discovery</h3><p>Finds public channels and videos related to campaign topics.</p></article>
            <article class="feature-card"><span class="card-index">02</span><h3>Candidate review</h3><p>Applies direct user-configured filters and keeps the final decision under human review.</p></article>
            <article class="feature-card"><span class="card-index">03</span><h3>Deduplication</h3><p>Avoids repeatedly processing the same candidates or contacts.</p></article>
            <article class="feature-card"><span class="card-index">04</span><h3>Cache and quota</h3><p>Reuses information and applies budgets to reduce redundant requests.</p></article>
            <article class="feature-card"><span class="card-index">05</span><h3>Campaigns</h3><p>Groups searches, candidates, decisions, and statuses by release.</p></article>
            <article class="feature-card"><span class="card-index">06</span><h3>Contacts</h3><p>Records publicly published professional contact routes.</p></article>
            <article class="feature-card"><span class="card-index">07</span><h3>Reviewed outreach</h3><p>Prepares communications that require explicit approval before they are sent.</p></article>
            <article class="feature-card"><span class="card-index">08</span><h3>Tracking</h3><p>Manages statuses and, with permission, checks related replies in Gmail.</p></article>`,
      "index.workflow.kicker": "02 / How it works",
      "index.workflow.title": "How it works",
      "index.workflow.lead": "A sequential process assisted by public data, with human review before any communication.",
      "index.workflow.aria": "Creator Finder workflow",
      "index.workflow.steps": `<div class="workflow-step"><span>01</span><strong>YouTube Data API</strong></div>
            <div class="workflow-step"><span>02</span><strong>Discovery</strong></div>
            <div class="workflow-step"><span>03</span><strong>Filtering</strong></div>
            <div class="workflow-step"><span>04</span><strong>Analysis</strong></div>
            <div class="workflow-step"><span>05</span><strong>Candidates</strong></div>
            <div class="workflow-step"><span>06</span><strong>Appropriate public contacts</strong></div>
            <div class="workflow-step"><span>07</span><strong>Review</strong></div>
            <div class="workflow-step"><span>08</span><strong>Outreach</strong></div>`,
      "index.workflow.notes": `<div class="check-note"><span aria-hidden="true">✓</span><div><strong>Explicit action.</strong> Sending communications requires user approval; connecting Gmail does not authorize indiscriminate automated sending.</div></div>
            <div class="check-note"><span aria-hidden="true">✓</span><div><strong>Contact controls.</strong> Deduplication and do-not-contact statuses help prevent repetition and respect previous decisions.</div></div>`,
      "index.api.kicker": "03 / API use",
      "index.api.title": "YouTube Data API use",
      "index.api.lead": "Creator Finder uses YouTube Data API v3 to retrieve the public information needed to discover and manually review channels and videos related to videogame campaigns. Data is refreshed or invalidated/deleted no later than 30 days; advanced derived metrics remain disabled while awaiting the applicable approval.",
      "index.api.optimization": "Optimization measures",
      "index.api.cache": "CACHING",
      "index.api.deduplication": "DEDUPLICATION",
      "index.api.batching": "BATCHING",
      "index.api.budgets": "QUOTA BUDGETS",
      "index.api.reuse": "DATA REUSE",
      "index.api.youtubeTerms": "YouTube Terms of Service ↗",
      "index.api.googlePrivacy": "Google Privacy Policy ↗",
      "index.api.servicesTerms": "YouTube API Services Terms of Service ↗",
      "index.api.principles": `<div class="principle"><span>01</span><div><strong>No data sales</strong><p>Creator Finder does not sell data obtained through YouTube API.</p></div></div>
              <div class="principle"><span>02</span><div><strong>No third-party access</strong><p>It does not provide third parties with access to YouTube API Data or its credentials.</p></div></div>
              <div class="principle"><span>03</span><div><strong>Quota compliance</strong><p>It does not attempt to avoid or circumvent quotas established by YouTube API.</p></div></div>
              <div class="principle"><span>04</span><div><strong>No affiliation</strong><p>Creator Finder is not an official YouTube or Google product.</p></div></div>`,
      "index.screenshots.kicker": "04 / Local application",
      "index.screenshots.title": "Application screenshots",
      "index.screenshots.lead": "Complete, unedited screenshots of the local build prepared for audit, reviewed on 11 August 2026.",
      "index.screenshots.dashboardAria": "Open the full Creator Finder dashboard screenshot",
      "index.screenshots.dashboardAlt": "Dashboard of the Creator Finder build prepared for audit",
      "index.screenshots.dashboardLabel": "Dashboard",
      "index.screenshots.dashboardPlaceholder": "<span>IMAGE UNAVAILABLE</span>Dashboard",
      "index.screenshots.discoveryAria": "Open the full creator discovery screenshot",
      "index.screenshots.discoveryAlt": "Creator discovery with YouTube attribution",
      "index.screenshots.discoveryLabel": "Creator Discovery",
      "index.screenshots.discoveryPlaceholder": "<span>IMAGE UNAVAILABLE</span>Creator Discovery",
      "index.screenshots.campaignsAria": "Open the full campaign management screenshot",
      "index.screenshots.campaignsAlt": "Creator Finder campaign management",
      "index.screenshots.campaignsLabel": "Campaign Management",
      "index.screenshots.campaignsPlaceholder": "<span>IMAGE UNAVAILABLE</span>Campaign Management",
      "index.screenshots.quotaAria": "Open the full YouTube settings, automation, and quota screenshot",
      "index.screenshots.quotaAlt": "Creator Finder YouTube settings, automation, and quota",
      "index.screenshots.quotaLabel": "Quota Management",
      "index.screenshots.quotaPlaceholder": "<span>IMAGE UNAVAILABLE</span>Quota Management",
      "index.cta.kicker": "Transparency",
      "index.cta.title": "Information prepared for a clear technical review.",
      "index.cta.lead": "Review the API client's purpose, access, quota use, and campaign workflow.",
      "index.cta.button": "View API information",

      "privacy.head.title": "Privacy Policy — Creator Finder",
      "privacy.head.description": "Creator Finder Privacy Policy: YouTube Data API use, Gmail OAuth, local storage, and data controls.",
      "privacy.head.ogTitle": "Privacy Policy — Creator Finder",
      "privacy.head.ogDescription": "Information about data access, use, storage, and controls in Creator Finder.",
      "privacy.hero.kicker": "Legal / Privacy",
      "privacy.hero.title": `Creator Finder <span class="gradient-text">Privacy Policy</span>`,
      "privacy.hero.lead": "How a private, local XOTOX STUDIO application accesses, uses, stores, and protects the information needed for its operation.",
      "privacy.hero.updated": "LAST UPDATED · 11 AUGUST 2026",
      "privacy.hero.private": "PRIVATE APPLICATION",
      "privacy.hero.storage": "LOCAL STORAGE",

      "terms.head.title": "Terms of Use — Creator Finder",
      "terms.head.description": "Terms of use for Creator Finder, a private XOTOX STUDIO tool for videogame campaigns.",
      "terms.head.ogTitle": "Terms of Use — Creator Finder",
      "terms.head.ogDescription": "Terms that apply to the private, internal use of Creator Finder.",
      "terms.hero.kicker": "Legal / Terms",
      "terms.hero.title": `Creator Finder <span class="gradient-text">Terms of Use</span>`,
      "terms.hero.lead": "Simple, transparent terms for a tool that is currently private, local, and for internal use.",
      "terms.hero.updated": "LAST UPDATED · 11 AUGUST 2026",
      "terms.hero.access": "PRIVATE ACCESS",

      "contact.head.title": "Contact — Creator Finder",
      "contact.head.description": "Contact information for Creator Finder and XOTOX STUDIO.",
      "contact.head.ogTitle": "Contact — Creator Finder",
      "contact.head.ogDescription": "Official contact for Creator Finder, developed by XOTOX STUDIO.",
      "contact.hero.kicker": "Contact",
      "contact.hero.title": `Let's talk about <span class="gradient-text">Creator Finder</span>`,
      "contact.hero.lead": "Contact channel for questions about the application, privacy, data, do-not-contact requests, or API review information.",
      "contact.hero.developer": "INDEPENDENT DEVELOPER",
      "contact.card.kicker": "Official contact",
      "contact.card.lead": "For questions about privacy, deletion of local data, API client operation, or outreach-related requests:",
      "contact.project.label": "DEVELOPER PROJECT",
      "contact.project.description": `NOXEN is a videogame by XOTOX STUDIO. It is shown only as a public project by the developer and <strong>is not the YouTube API client</strong>. The API client described on this website is Creator Finder.`,
      "contact.project.button": "View NOXEN on Steam",

      "audit.head.title": "Creator Finder — API Client Information",
      "audit.head.description": "Technical and operational information about Creator Finder, a private YouTube Data API v3 client developed by XOTOX STUDIO.",
      "audit.head.ogTitle": "Creator Finder — API Client Information",
      "audit.head.ogDescription": "Purpose, access model, quota controls, and campaign workflow for the Creator Finder API client.",
      "audit.hero.kicker": "For API reviewers",
      "audit.hero.title": `Creator Finder — <span class="gradient-text">API Client Information</span>`,
      "audit.hero.lead": "A transparent overview of the purpose, access model, data sources, quota controls, and human-reviewed workflow of the Creator Finder desktop application.",
      "audit.hero.review": "REVIEW INFORMATION",
      "audit.hero.access": "PRIVATE / INTERNAL ACCESS",
      "audit.hero.updated": "LAST UPDATED · 11 AUGUST 2026",
      "audit.nav.aria": "API information sections",
      "audit.nav.onPage": "On this page",
      "audit.nav.identity": "Client identity",
      "audit.nav.purpose": "Purpose",
      "audit.nav.workflow": "Workflow",
      "audit.nav.quota": "Quota request",
      "audit.nav.controls": "Controls",
      "audit.nav.verification": "Verification notes",
      "audit.section.identity": `<h2>1. API client identity</h2>
            <div class="audit-facts">
              <div class="audit-fact"><span>Application</span><strong>Creator Finder</strong></div>
              <div class="audit-fact"><span>Developer</span><strong>XOTOX STUDIO</strong></div>
              <div class="audit-fact"><span>Access</span><strong>Private / Internal</strong></div>
              <div class="audit-fact"><span>API service</span><strong>YouTube Data API v3</strong></div>
              <div class="audit-fact"><span>Deployment</span><strong>Local desktop application</strong></div>
              <div class="audit-fact"><span>Public accounts</span><strong>Not available</strong></div>
            </div>
            <p>Creator Finder is a local application used by its independent developer. It is not a public SaaS product, does not provide public login or registration, and does not expose YouTube API Data or API credentials to third parties.</p>`,
      "audit.section.purpose": `<h2>2. Purpose</h2>
            <p>Creator Finder is used to discover and evaluate publicly available gaming creators for potential outreach relating to XOTOX STUDIO's own videogame campaigns.</p>
            <p>The application helps the developer organize public channel and video information, manually review candidates, manage public professional contact routes, prepare communications, and track campaign status. Advanced suitability metrics based on YouTube API Data remain disabled unless and until the applicable YouTube derived-metrics approval is granted.</p>`,
      "audit.section.youtube": `<h2>3. Why YouTube Data API v3 is used</h2>
            <p>The API provides the public channel and video information needed to perform thematic discovery and candidate review in a consistent way. Source-code review of the current build confirmed this resource and method inventory:</p>
            <ul>
              <li><code>search.list</code> with <code>part=snippet</code>, a campaign query, <code>type=video</code> or <code>type=channel</code>, <code>order=relevance</code>, result limits and pagination; a relevance language may be supplied;</li>
              <li><code>channels.list</code> with <code>part=snippet,statistics,contentDetails</code> for channel IDs, batched where possible;</li>
              <li><code>playlistItems.list</code> with <code>part=contentDetails</code> for a channel's uploads playlist;</li>
              <li><code>videos.list</code> with <code>part=snippet,statistics</code> for video IDs, batched where possible.</li>
            </ul>
            <p>YouTube access uses a developer API key. The reviewed build does not request a YouTube OAuth scope or access a reviewer's private YouTube account data.</p>
            <p>Creator Finder does not sell or redistribute YouTube API Data, provide third-party access to it, or attempt to bypass quota restrictions. It obtains YouTube API Data only through the documented API methods above; it does not scrape YouTube or Google pages.</p>
            <p>Provenance identifies YouTube-derived records separately from local campaign state. Non-authorized YouTube API Data is refreshed through the appropriate documented endpoint or invalidated/deleted no later than 30 days. Expired data is not displayed or used as current, including when quota prevents refresh. Independent campaign history, notes, approvals, and do-not-contact decisions are preserved.</p>`,
      "audit.section.gmail": `<h2>4. Gmail OAuth scopes and functions</h2>
            <p>Gmail is optional and uses incremental, contextual authorization. The current build requests exactly:</p>
            <ul>
              <li><code>https://www.googleapis.com/auth/gmail.compose</code>: list drafts to locate a campaign message by its RFC 822 Message-ID, retrieve minimal draft metadata, create a draft, and send a user-approved draft or message;</li>
              <li><code>https://www.googleapis.com/auth/gmail.readonly</code>: retrieve a thread already identified by a locally stored campaign thread ID and inspect it for a reply.</li>
            </ul>
            <p><code>gmail.compose</code> is requested when the user connects draft/send functionality. <code>gmail.readonly</code> is requested separately only after the user activates reply tracking. Without read-only authorization, draft creation and explicit sending continue to work while reply tracking stays disabled. The reply feature inspects only locally identified campaign thread IDs and does not search the general inbox, mark mail read, move messages, or modify labels.</p>`,
      "audit.section.workflow": `<h2>5. Campaign workflow</h2>
            <div class="audit-flow" aria-label="Creator Finder campaign workflow">
              <div><span>01</span><strong>Define a videogame campaign and relevant discovery themes</strong></div>
              <div><span>02</span><strong>Run controlled thematic discovery through YouTube Data API</strong></div>
              <div><span>03</span><strong>Filter and deduplicate channels, videos, and existing candidates</strong></div>
              <div><span>04</span><strong>Manually review direct public information and candidate fit</strong></div>
              <div><span>05</span><strong>Identify an appropriate public professional contact route</strong></div>
              <div><span>06</span><strong>Review the candidate and proposed communication</strong></div>
              <div><span>07</span><strong>Send only after an explicit user approval action</strong></div>
              <div><span>08</span><strong>Track campaign status and, if authorized, related Gmail replies</strong></div>
            </div>
            <p>Gmail actions are limited to the scopes and functions listed above. Sending requires selected campaign recipients, approval, send mode, a confirmation checkbox, and the explicit confirmation text required by the application. Connecting a Google account or selecting candidates never sends mail. Reply checking is optional and limited to known campaign threads.</p>`,
      "audit.section.quota": `<h2>6. Why additional quota is requested</h2>
            <p>Creator Finder needs to discover multiple potentially relevant channels through thematic searches. Search operations are required because the developer does not begin with a fixed list of known channel IDs, and different videogame campaigns require different topics, languages, and creator niches.</p>
            <p>The application already implements measures intended to reduce consumption:</p>
            <ul>
              <li><strong>cache:</strong> reuse previously retrieved information instead of repeating equivalent requests;</li>
              <li><strong>deduplication:</strong> avoid processing the same channel, video, candidate, or contact repeatedly;</li>
              <li><strong>batching:</strong> group compatible lookups when the API and workflow allow it;</li>
              <li><strong>adaptive query selection:</strong> prioritize useful queries and stop low-value exploration;</li>
              <li><strong>quota budgeting:</strong> limit campaign activity according to an explicit quota budget;</li>
              <li><strong>stored data reuse:</strong> reuse compliant local data while it remains valid.</li>
            </ul>
            <p>Additional quota would allow the developer to complete legitimate discovery campaigns without attempting to avoid or circumvent YouTube's established limits. This page intentionally states no requested quota amount because no amount was available in the website brief.</p>`,
      "audit.section.controls": `<h2>7. Data and outreach controls</h2>
            <ul>
              <li>Application data is held primarily in a local database on the developer's device.</li>
              <li>Caching and deduplication reduce redundant API requests.</li>
              <li>Campaign quota budgets constrain discovery activity.</li>
              <li>Emails require explicit review and approval before sending.</li>
              <li>Duplicate-contact and do-not-contact states help prevent repeated or inappropriate outreach.</li>
              <li>Only public professional contact routes associated with the creator or their representative are intended for use.</li>
              <li>Contacts are not extracted from YouTube API descriptions, comments, chat, or scraped YouTube/Google pages; creator-linked external public sites and manual entries are the permitted baseline sources.</li>
              <li>Non-authorized YouTube API Data is refreshed or invalidated/deleted no later than 30 days and cannot be used as current after expiry.</li>
              <li>Google Workspace user data is used only for the user-facing Gmail features described in the <a href="privacy.html">Privacy Policy</a>.</li>
              <li>The settings privacy panel can revoke the Gmail token through Google's official endpoint, remove the local token and Gmail-derived local data, and erase a creator's local data by internal ID.</li>
            </ul>
            <div class="callout"><strong>Human review before outreach.</strong>Discovery, filters, selection, contact review, email preparation, approval, send mode, and final confirmation are separate steps. Autopilot does not send messages.</div>`,
      "audit.section.verification": `<h2>8. Derived metrics and pre-submission notes</h2>
            <h3>DERIVED METRICS</h3>
            <p><strong>Advanced Creator Finder suitability metrics based on YouTube API Data remain disabled unless/until the applicable YouTube approval for derived metrics is granted.</strong></p>
            <p>XOTOX STUDIO intends to request the applicable Analytics &amp; Reporting / Additional Derived Metrics authorization for future Game Match Score, horror gaming, gaming, indie, demo/content-type, gameplay, and activity/relevance categories. This page does not claim that authorization has been granted.</p>
            <p>The method inventory, retention controls, contact-discovery restrictions, Gmail scopes, and user-facing deletion controls above were checked against the source code reviewed on 11 August 2026. The following external or submission-specific items remain:</p>
            <ol>
              <li>request and obtain YouTube approval before enabling any advanced derived metric;</li>
              <li>complete any OAuth verification/security assessment Google requires for restricted Gmail scopes;</li>
              <li>insert the configured quota amount and final public URLs in the official form;</li>
              <li>replace screenshots that do not show the same compliance-gated, attributed build submitted for review.</li>
            </ol>
            <div class="callout"><strong>No approval claim.</strong>This page does not state or imply that Creator Finder is approved, verified, certified, endorsed, sponsored by, or affiliated with Google or YouTube.</div>`,
      "audit.section.policies": `<h2>9. Official policies</h2>
            <ul>
              <li><a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube Terms of Service</a></li>
              <li><a href="https://developers.google.com/youtube/terms/api-services-terms-of-service" target="_blank" rel="noopener noreferrer">YouTube API Services Terms of Service</a></li>
              <li><a href="https://developers.google.com/youtube/terms/developer-policies" target="_blank" rel="noopener noreferrer">YouTube API Services Developer Policies</a></li>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              <li><a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a></li>
              <li><a href="https://developers.google.com/workspace/workspace-api-user-data-developer-policy" target="_blank" rel="noopener noreferrer">Google Workspace API User Data and Developer Policy</a></li>
            </ul>`
    }
  };

  const languageButtons = document.querySelectorAll("[data-language-option]");
  const languageSections = document.querySelectorAll("[data-language-content]");

  function getTranslation(language, key) {
    return translations[language] && translations[language][key];
  }

  function translatePage(language) {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const value = getTranslation(language, element.dataset.i18n);
      if (typeof value === "string") element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (element) {
      const value = getTranslation(language, element.dataset.i18nHtml);
      if (typeof value === "string") element.innerHTML = value;
    });

    [
      ["i18nAriaLabel", "aria-label"],
      ["i18nAlt", "alt"],
      ["i18nContent", "content"]
    ].forEach(function (mapping) {
      document.querySelectorAll(`[data-${mapping[0].replace(/[A-Z]/g, function (letter) { return "-" + letter.toLowerCase(); })}]`).forEach(function (element) {
        const value = getTranslation(language, element.dataset[mapping[0]]);
        if (typeof value === "string") element.setAttribute(mapping[1], value);
      });
    });
  }

  function setLanguage(language) {
    const selectedLanguage = translations[language] ? language : "es";

    languageButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.languageOption === selectedLanguage)
      );
    });

    languageSections.forEach(function (section) {
      section.hidden = section.dataset.languageContent !== selectedLanguage;
    });

    translatePage(selectedLanguage);
    document.documentElement.lang = selectedLanguage;
    try {
      sessionStorage.setItem("creator-finder-legal-language", selectedLanguage);
    } catch (_error) {
      // The language switch still works if browser storage is unavailable.
    }
  }

  let initialLanguage = "es";
  try {
    initialLanguage = sessionStorage.getItem("creator-finder-legal-language") || "es";
  } catch (_error) {
    initialLanguage = "es";
  }

  setLanguage(initialLanguage);
  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.languageOption);
    });
  });
})();
