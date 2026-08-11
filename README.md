# Creator Finder — sitio público

Sitio estático oficial de Creator Finder, preparado para publicarse en GitHub Pages. Solo contiene documentación pública: no necesita backend, base de datos, credenciales ni login.

## Antes de publicar

1. Confirma que `xotoxoficial@gmail.com` sigue siendo una dirección real, supervisada y apropiada para solicitudes de privacidad y no contactar.
2. Revisa la [Política de Privacidad](privacy.html), especialmente:
   - si `XOTOX STUDIO` es un nombre comercial, añade la identidad legal y los datos de responsable exigidos en tu jurisdicción;
   - los datos realmente consultados por la versión actual;
   - los permisos OAuth de Gmail realmente solicitados;
   - la conservación y eliminación de información local;
   - el refresco o borrado de YouTube API Data conforme a las políticas vigentes;
   - que el disclosure de Google Workspace siga siendo el exigido al publicar.
3. [API Client Information](audit.html) se contrastó con el código local revisado el 11 de agosto de 2026. Antes de enviar otra compilación, vuelve a confirmar:
   - que los métodos/recursos y parámetros de YouTube Data API no hayan cambiado;
   - que los scopes OAuth sigan siendo exactamente `gmail.compose` y `gmail.readonly`, solicitados de forma incremental;
   - que la retención máxima de 30 días y la invalidación cuando no hay cuota sigan pasando tests;
   - que los scores/categorías derivados permanezcan desactivados hasta obtener aprobación expresa;
   - que la extracción de emails desde YouTube y el scraping de YouTube/Google sigan desactivados;
   - que la revocación y eliminación local de datos de Gmail siga disponible y probada;
   - el presupuesto de cuota y la cantidad solicitada.
4. Confirma que las cuatro capturas revisadas siguen correspondiendo a la build enviada y no muestran API keys, tokens, emails, contactos, datos privados, rutas locales o información no destinada a publicación.
5. Revisa todos los textos en español e inglés y actualiza la fecha legal si realizas cambios sustanciales.

Puedes buscar marcadores legales accidentales desde esta carpeta con:

```powershell
rg -n "\[PON AQUÍ TU EMAIL\]|example\.com|TODO" *.html
```

La declaración de Google API incluida se contrastó el 11 de agosto de 2026 con la política oficial de Google Workspace, por lo que no queda pendiente su redacción. Aun así, comprueba de nuevo la política justo antes de una solicitud formal, porque Google puede modificarla.

## Capturas de la compilación sometida a auditoría

La build revisada usa imágenes reales en `assets/screenshots/` con estos nombres exactos:

- `dashboard.png`
- `discovery.png`
- `campaigns.png`
- `quota.png`

La página detecta las imágenes automáticamente. Si un archivo no existe, muestra un marcador visual y nunca una imagen rota. Las cuatro capturas fueron sustituidas el 11 de agosto de 2026 por originales sin editar de la build sometida a auditoría; muestran la atribución de YouTube, el bloqueo visible de métricas derivadas y la configuración vigente. Su estado se registra en `assets/screenshots/audit_status.json`.

Recomendación: exporta todas las capturas con una relación de aspecto similar, al menos 1400 × 900 px, y comprueba cada una antes de publicarla.

La tarjeta social generada está en `assets/images/social-card.png`. Cuando conozcas el dominio final, puedes añadir en cada `<head>` una etiqueta `og:image` con la URL pública absoluta de ese archivo; no se ha fijado ahora para evitar publicar una URL ficticia.

## Abrir la web localmente

La forma más rápida es abrir `index.html` con el navegador. Para reproducir mejor el comportamiento de GitHub Pages, desde la carpeta que contiene `website/` ejecuta:

```powershell
py -m http.server 8000 --directory website
```

Después abre:

```text
http://localhost:8000/
```

Detén el servidor con `Ctrl+C`.

## Crear un repositorio público separado

No publiques el repositorio ni el código de la aplicación Creator Finder. Crea un repositorio nuevo que contenga **solo el contenido de esta carpeta `website/`**.

1. En GitHub, selecciona **New repository**.
2. Usa `creator-finder` como nombre.
3. Selecciona **Public** si utilizas GitHub Free y necesitas GitHub Pages sin coste.
4. No añadas archivos de la aplicación, bases de datos, logs ni credenciales.
5. Copia el contenido de `website/` a la raíz del repositorio nuevo. En la raíz remota deben verse `index.html`, `privacy.html`, `terms.html`, `audit.html`, `contact.html` y `assets/`.
6. Confirma que `.gitignore` y `.nojekyll` están incluidos.
7. Revisa la lista completa de archivos antes del primer push.

Una secuencia posible en una copia independiente de `website/` es:

```powershell
git init
git branch -M main
git add .
git status
git commit -m "Add Creator Finder public website"
git remote add origin https://github.com/USUARIO/creator-finder.git
git push -u origin main
```

Antes de ejecutar `git commit`, revisa cuidadosamente la salida de `git status`. No uses estos comandos desde el repositorio de la aplicación.

## Activar GitHub Pages

1. Abre el repositorio `creator-finder` en GitHub.
2. Entra en **Settings**.
3. En la barra lateral, abre **Pages**, dentro de **Code and automation**.
4. En **Build and deployment**, elige **Deploy from a branch**.
5. Selecciona la rama `main`.
6. Selecciona la carpeta `/(root)`.
7. Pulsa **Save**.
8. Espera a que GitHub muestre el enlace publicado y comprueba las cinco páginas.

Para el usuario `USUARIO`, las URLs esperadas serán:

- Principal: `https://USUARIO.github.io/creator-finder/`
- Privacy Policy: `https://USUARIO.github.io/creator-finder/privacy.html`
- Terms of Service: `https://USUARIO.github.io/creator-finder/terms.html`
- API Information: `https://USUARIO.github.io/creator-finder/audit.html`
- Contacto: `https://USUARIO.github.io/creator-finder/contact.html`

Usa en la configuración del cliente API:

- **Application home page / URL principal del cliente API:** `https://USUARIO.github.io/creator-finder/`
- **Privacy Policy URL:** `https://USUARIO.github.io/creator-finder/privacy.html`
- **Terms of Service URL:** `https://USUARIO.github.io/creator-finder/terms.html`

## Advertencia sobre verificación de dominio de Google

Google indica actualmente que, para determinados procesos de verificación OAuth, la página principal y las páginas legales deben estar en un dominio que controles y hayas verificado. Una URL gratuita bajo `github.io` puede no permitirte demostrar el control del dominio registrable `github.io`.

Si Google Cloud no acepta la URL predeterminada de GitHub Pages como dominio autorizado/verificado, configura en GitHub Pages un **dominio personalizado de tu propiedad**, verifícalo en Google Search Console y utiliza las URLs de ese dominio en la pantalla de consentimiento OAuth. Esto no cambia los archivos del sitio.

## Archivos que nunca deben publicarse

La web no necesita ninguno de estos elementos:

- `.env` o variantes;
- `YOUTUBE_API_KEY` o cualquier otra clave;
- `credentials.json`, `client_secret*.json` o credenciales OAuth;
- `token.json` o tokens de acceso/actualización;
- bases de datos SQLite (`.db`, `.sqlite`, `.sqlite3`);
- emails, contactos, exports, logs o datos privados;
- código fuente o compilaciones de la aplicación de escritorio.

Los patrones más habituales están bloqueados por `.gitignore`, pero esa protección no sustituye la revisión manual de `git status`.

## Estructura

```text
website/
├── index.html
├── privacy.html
├── terms.html
├── audit.html
├── contact.html
├── README.md
├── .gitignore
├── .nojekyll
└── assets/
    ├── css/styles.css
    ├── images/social-card.png
    ├── js/main.js
    └── screenshots/
```

## Nota legal y de políticas

Este contenido describe el funcionamiento facilitado para Creator Finder y no constituye asesoramiento jurídico. Antes de publicar o enviar una revisión, comprueba que el texto coincide con la compilación actual y con las políticas vigentes de Google, Google Workspace y YouTube API Services.
