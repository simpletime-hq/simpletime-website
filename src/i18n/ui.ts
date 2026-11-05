export const languages = {
  en: 'English',
  de: 'Deutsch',
  nl: 'Nederlands',
  sv: 'Svenska',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  pt: 'Português',
  ru: 'Русский',
  uk: 'Українська',
  el: 'Ελληνικά',
  tr: 'Türkçe',
  hy: 'Հայերեն',
  ar: 'العربية',
  he: 'עברית',
  hi: 'हिन्दी',
  zh: '简体中文',
  ja: '日本語',
} as const;

export const defaultLang = 'en' as const;

export type Lang = keyof typeof languages;

export const ui = {
  en: {
    'meta.title': 'SimpleTime – Time Tracker for iPhone, iPad and Mac',
    'meta.description':
      'One tap starts the clock. SimpleTime tracks where your time goes – no account, no ads, no selling of your data. Your hours stay on your device and in your iCloud.',

    'meta.contact.description':
      'Questions, feedback or a bug to report? Reach SimpleTime by email – every message is read and answered within a few working days.',
    'meta.privacy.description':
      'How SimpleTime handles your data: no account, no ads. Your entries stay on your devices and in your private iCloud.',
    'meta.imprint.description':
      'Legal notice for simple-time.app under § 5 DDG – operator, contact details and liability information for the SimpleTime app and website.',
    'meta.terms.description':
      'The terms of use for SimpleTime: a free app, SimpleTime Pro through the App Store, subscriptions and the free week, your data, liability and applicable law.',
    'meta.accessibility.description':
      'How accessible SimpleTime and this website are: VoiceOver, large text, 41 languages, automated checks – and what isn’t good yet.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, places, goals and more',
    'meta.pro.description':
      'SimpleTime stays free. Pro adds the Apple Watch app, reviews, places, goals, a focus filter and more – monthly, yearly or once for good.',
    'meta.faq.title': 'Questions and answers · SimpleTime',
    'meta.faq.description':
      'Answers to the most common questions about SimpleTime: tracking, widgets and Siri, iCloud sync and backups, privacy, and SimpleTime Pro.',

    'nav.features': 'Features',
    'nav.devices': 'Devices',
    'nav.privacy': 'Privacy',
    'nav.pro': 'Pro',
    'nav.appstore': 'View on App Store',
    'appstore.download': 'Download on the App Store',
    'nav.faq': 'FAQ',
    'nav.menu': 'Open menu',
    'nav.menu.close': 'Close menu',
    'nav.language': 'Language',
    'nav.theme': 'Dark Mode',
    'skip.content': 'Skip to content',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Client Project',
    'live.stop': 'Stop',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Today',

    'footer.tagline': 'One tap starts the clock.',
    'footer.legal': 'Legal',
    'footer.product': 'Product',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Contact',
    'footer.imprint': 'Imprint',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms of Use',
    'footer.accessibility': 'Accessibility',
    'footer.copyright': '© {year} Luca Efinger. All rights reserved.',

    'contact.title': 'Contact',
    'contact.subtitle': 'Questions, feedback or ideas? Get in touch.',
    'contact.email.label': 'Email',
    'contact.email.body':
      'Drop us a line at the address below – we read every message and reply as quickly as we can.',
    'contact.response':
      'We usually reply within a few working days. For bugs, please include your device model and iOS version.',
    'contact.faq': 'Maybe your question has already been answered.',
    'contact.faq.link': 'Go to the FAQ',

    'imprint.title': 'Imprint',
    'imprint.country': 'Germany',
    'imprint.according': 'Information according to § 5 DDG',
    'imprint.contact': 'Contact',
    'imprint.responsible': 'Responsible for content according to § 18 Abs. 2 MStV',
    'imprint.disclaimer.title': 'Disclaimer',
    'imprint.disclaimer.liability.title': 'Liability for content',
    'imprint.disclaimer.liability.body':
      'As a service provider we are responsible for our own content on these pages according to general law. According to Art. 8 DSA, however, we are not obliged to monitor transmitted or stored external information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. A corresponding liability is only possible from the point in time of knowledge of a specific infringement. Upon becoming aware of corresponding infringements, we will remove such content immediately.',
    'imprint.disclaimer.links.title': 'Liability for links',
    'imprint.disclaimer.links.body':
      'Our offer contains links to external websites of third parties whose content we cannot influence. Therefore we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. However, permanent monitoring of the content of the linked pages is not reasonable without concrete evidence of an infringement. Upon becoming aware of any infringements, we will remove such links immediately.',
    'imprint.disclaimer.copyright.title': 'Copyright',
    'imprint.disclaimer.copyright.body':
      'The content and works on these pages created by the site operator are subject to German copyright law. Duplication, processing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.',
  },
  de: {
    'meta.title': 'SimpleTime – Zeiterfassung für iPhone, iPad und Mac',
    'meta.description':
      'Ein Tipp startet die Uhr. SimpleTime erfasst deine Zeit – ohne Konto, ohne Werbung, ohne Verkauf deiner Daten. Deine Zeiten bleiben auf deinem Gerät und in deiner iCloud.',

    'meta.contact.description':
      'Fragen, Rückmeldungen oder ein Fehler? Schreib SimpleTime eine E-Mail – jede Nachricht wird gelesen und innerhalb weniger Werktage beantwortet.',
    'meta.privacy.description':
      'Wie SimpleTime mit deinen Daten umgeht: kein Konto, keine Werbung. Deine Einträge bleiben auf deinen Geräten und in deiner privaten iCloud.',
    'meta.imprint.description':
      'Impressum für simple-time.app nach § 5 DDG – Betreiber, Kontaktdaten und Haftungshinweise zur SimpleTime-App und zur Website.',
    'meta.terms.description':
      'Die Nutzungsbedingungen von SimpleTime: kostenlose App, SimpleTime Pro über den App Store, Abos und Testwoche, deine Daten, Haftung und anwendbares Recht.',
    'meta.accessibility.description':
      'Wie zugänglich SimpleTime und diese Website sind: VoiceOver, große Schrift, 41 Sprachen, automatische Prüfungen – und was noch nicht gut ist.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, Orte, Ziele und mehr',
    'meta.pro.description':
      'SimpleTime bleibt kostenlos. Pro bringt die Apple-Watch-App, Rückblicke, Orte, Ziele, den Fokusfilter und mehr – im Monat, im Jahr oder einmalig für immer.',
    'meta.faq.title': 'Häufige Fragen · SimpleTime',
    'meta.faq.description':
      'Antworten auf die häufigsten Fragen zu SimpleTime: Erfassen, Widgets und Siri, iCloud-Sync und Backups, Datenschutz und SimpleTime Pro.',

    'nav.features': 'Funktionen',
    'nav.devices': 'Geräte',
    'nav.privacy': 'Datenschutz',
    'nav.pro': 'Pro',
    'nav.appstore': 'Im App Store ansehen',
    'appstore.download': 'Im App Store laden',
    'nav.faq': 'FAQ',
    'nav.menu': 'Menü öffnen',
    'nav.menu.close': 'Menü schließen',
    'nav.language': 'Sprache',
    'nav.theme': 'Dunkelmodus',
    'skip.content': 'Zum Inhalt springen',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Kundenprojekt',
    'live.stop': 'Stoppen',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Heute',

    'footer.tagline': 'Ein Tipp startet die Uhr.',
    'footer.legal': 'Rechtliches',
    'footer.product': 'Produkt',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Kontakt',
    'footer.imprint': 'Impressum',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'Nutzungsbedingungen',
    'footer.accessibility': 'Barrierefreiheit',
    'footer.copyright': '© {year} Luca Efinger. Alle Rechte vorbehalten.',

    'contact.title': 'Kontakt',
    'contact.subtitle': 'Fragen, Feedback oder Ideen? Schreib uns.',
    'contact.email.label': 'E-Mail',
    'contact.email.body':
      'Schreib uns einfach an die untenstehende Adresse – wir lesen jede Nachricht und antworten so schnell wie möglich.',
    'contact.response':
      'In der Regel antworten wir innerhalb weniger Werktage. Bei Fehlern gib bitte dein Gerätemodell und die iOS-Version an.',
    'contact.faq': 'Vielleicht ist deine Frage schon beantwortet.',
    'contact.faq.link': 'Zu den häufigen Fragen',

    'imprint.title': 'Impressum',
    'imprint.country': 'Deutschland',
    'imprint.according': 'Angaben gemäß § 5 DDG',
    'imprint.contact': 'Kontakt',
    'imprint.responsible': 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
    'imprint.disclaimer.title': 'Haftungsausschluss',
    'imprint.disclaimer.liability.title': 'Haftung für Inhalte',
    'imprint.disclaimer.liability.body':
      'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach Art. 8 DSA sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.',
    'imprint.disclaimer.links.title': 'Haftung für Links',
    'imprint.disclaimer.links.body':
      'Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.',
    'imprint.disclaimer.copyright.title': 'Urheberrecht',
    'imprint.disclaimer.copyright.body':
      'Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.',
  },
  fr: {
    'meta.title': 'SimpleTime – Suivi du temps pour iPhone, iPad et Mac',
    'meta.description':
      'Un geste lance le chrono. SimpleTime enregistre où passe votre temps, sans compte, sans publicité ni vente de vos données. Vos heures restent sur votre appareil et dans votre iCloud.',
    'meta.contact.description':
      'Une question, un retour ou un bug à signaler ? Écrivez à SimpleTime par e-mail — chaque message est lu et reçoit une réponse sous quelques jours ouvrés.',
    'meta.privacy.description':
      'Comment SimpleTime traite vos données : aucun compte, aucune publicité. Vos entrées restent sur vos appareils et dans votre iCloud privé.',
    'meta.imprint.description':
      'Mentions légales de simple-time.app selon le § 5 DDG — éditeur, coordonnées et informations de responsabilité pour l’app et le site SimpleTime.',
    'meta.terms.description':
      'Les conditions d’utilisation de SimpleTime : une app gratuite, SimpleTime Pro via l’App Store, abonnements et semaine d’essai, vos données, responsabilité et droit applicable.',
    'meta.accessibility.description':
      'Le niveau d’accessibilité de SimpleTime et de ce site : VoiceOver, grands caractères, 41 langues, vérifications automatiques – et ce qui n’est pas encore au point.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, lieux, objectifs et plus encore',
    'meta.pro.description':
      'SimpleTime reste gratuit. Pro ajoute l’app Apple Watch, bilans, lieux, objectifs, filtre de concentration et plus encore – au mois, à l’année ou une fois pour toutes.',
    'meta.faq.title': 'Questions fréquentes · SimpleTime',
    'meta.faq.description':
      'Réponses aux questions les plus fréquentes sur SimpleTime : suivi du temps, widgets et Siri, synchronisation iCloud et sauvegardes, confidentialité et SimpleTime Pro.',

    'nav.features': 'Fonctionnalités',
    'nav.devices': 'Appareils',
    'nav.privacy': 'Confidentialité',
    'nav.pro': 'Pro',
    'nav.appstore': 'Voir sur l’App Store',
    'appstore.download': 'Télécharger sur l’App Store',
    'nav.faq': 'FAQ',
    'nav.menu': 'Ouvrir le menu',
    'nav.menu.close': 'Fermer le menu',
    'nav.language': 'Langue',
    'nav.theme': 'Mode sombre',
    'skip.content': 'Aller au contenu',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Projet client',
    'live.stop': 'Arrêter',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Aujourd’hui',

    'footer.tagline': 'Un geste lance le chrono.',
    'footer.legal': 'Informations légales',
    'footer.product': 'Produit',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Contact',
    'footer.imprint': 'Mentions légales',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'Conditions d’utilisation',
    'footer.accessibility': 'Accessibilité',
    'footer.copyright': '© {year} Luca Efinger. Tous droits réservés.',

    'contact.title': 'Contact',
    'contact.subtitle': 'Une question, un retour ou une idée ? Écrivez-nous.',
    'contact.email.label': 'E-mail',
    'contact.email.body':
      'Écrivez-nous à l’adresse ci-dessous — nous lisons chaque message et répondons aussi vite que possible.',
    'contact.response':
      'Nous répondons généralement sous quelques jours ouvrés. Pour un bug, merci d’indiquer votre modèle d’appareil et votre version d’iOS.',
    'contact.faq': 'Votre question a peut-être déjà une réponse.',
    'contact.faq.link': 'Voir les questions fréquentes',

    'imprint.title': 'Mentions légales',
    'imprint.country': 'Allemagne',
    'imprint.according': 'Informations selon le § 5 DDG',
    'imprint.contact': 'Contact',
    'imprint.responsible': 'Responsable du contenu selon le § 18, al. 2 MStV',
    'imprint.disclaimer.title': 'Avertissement',
    'imprint.disclaimer.liability.title': 'Responsabilité concernant le contenu',
    'imprint.disclaimer.liability.body':
      'En tant que prestataire de services, nous sommes responsables de nos propres contenus sur ces pages conformément au droit commun. Selon l’art. 8 DSA, nous ne sommes toutefois pas tenus de surveiller les informations de tiers transmises ou stockées, ni de rechercher les circonstances révélant une activité illicite. Les obligations de retrait ou de blocage de l’utilisation d’informations en vertu du droit commun demeurent inchangées. Une responsabilité à ce titre n’est cependant engagée qu’à compter de la connaissance d’une infraction concrète. Dès que nous aurons connaissance de telles infractions, nous retirerons ces contenus sans délai.',
    'imprint.disclaimer.links.title': 'Responsabilité concernant les liens',
    'imprint.disclaimer.links.body':
      'Notre offre contient des liens vers des sites externes de tiers, dont nous ne pouvons influencer le contenu. Nous ne pouvons donc assumer aucune responsabilité pour ces contenus externes. Le fournisseur ou l’exploitant des pages liées est toujours responsable de leur contenu. Les pages liées ont été vérifiées quant à d’éventuelles infractions au moment de la mise en lien. Aucun contenu illicite n’était alors décelable. Une surveillance permanente du contenu des pages liées n’est cependant pas raisonnablement exigible sans indice concret d’infraction. Dès que nous aurons connaissance d’infractions, nous retirerons ces liens sans délai.',
    'imprint.disclaimer.copyright.title': 'Droit d’auteur',
    'imprint.disclaimer.copyright.body':
      'Les contenus et œuvres créés par l’exploitant du site sur ces pages sont soumis au droit d’auteur allemand. La reproduction, la modification, la diffusion et toute forme d’exploitation en dehors des limites du droit d’auteur requièrent l’accord écrit de leur auteur ou créateur respectif. Les téléchargements et copies de ce site ne sont autorisés qu’à des fins privées et non commerciales.',
  },
  es: {
    'meta.title': 'SimpleTime – Control de horas para iPhone, iPad y Mac',
    'meta.description':
      'Un toque pone el reloj en marcha. SimpleTime registra en qué se va tu tiempo, sin cuenta, sin publicidad ni venta de tus datos. Tus horas quedan en tu dispositivo y en tu iCloud.',
    'meta.contact.description':
      '¿Tienes una pregunta, un comentario o un fallo que informar? Escribe a SimpleTime por correo: leemos cada mensaje y respondemos en pocos días laborables.',
    'meta.privacy.description':
      'Cómo trata SimpleTime tus datos: sin cuenta, sin publicidad. Tus entradas se quedan en tus dispositivos y en tu iCloud privado.',
    'meta.imprint.description':
      'Aviso legal de simple-time.app según el § 5 DDG: titular, datos de contacto e información sobre responsabilidad de la app y el sitio de SimpleTime.',
    'meta.terms.description':
      'Las condiciones de uso de SimpleTime: una app gratuita, SimpleTime Pro a través del App Store, suscripciones y semana de prueba, tus datos, responsabilidad y derecho aplicable.',
    'meta.accessibility.description':
      'Lo accesibles que son SimpleTime y esta web: VoiceOver, texto grande, 41 idiomas, comprobaciones automáticas y lo que aún no está bien.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, lugares, objetivos y más',
    'meta.pro.description':
      'SimpleTime sigue siendo gratis. Pro añade la app para Apple Watch, resúmenes, lugares, objetivos, el filtro de concentración y más – por mes, por año o de por vida.',
    'meta.faq.title': 'Preguntas frecuentes · SimpleTime',
    'meta.faq.description':
      'Respuestas a las preguntas más frecuentes sobre SimpleTime: registro, widgets y Siri, sincronización con iCloud y copias de seguridad, privacidad y SimpleTime Pro.',

    'nav.features': 'Funciones',
    'nav.devices': 'Dispositivos',
    'nav.privacy': 'Privacidad',
    'nav.pro': 'Pro',
    'nav.appstore': 'Ver en el App Store',
    'appstore.download': 'Descargar en el App Store',
    'nav.faq': 'Preguntas',
    'nav.menu': 'Abrir menú',
    'nav.menu.close': 'Cerrar menú',
    'nav.language': 'Idioma',
    'nav.theme': 'Modo oscuro',
    'skip.content': 'Ir al contenido',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Proyecto de cliente',
    'live.stop': 'Detener',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Hoy',

    'footer.tagline': 'Un toque pone el reloj en marcha.',
    'footer.legal': 'Legal',
    'footer.product': 'Producto',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Contacto',
    'footer.imprint': 'Aviso legal',
    'footer.privacy': 'Privacidad',
    'footer.terms': 'Condiciones de uso',
    'footer.accessibility': 'Accesibilidad',
    'footer.copyright': '© {year} Luca Efinger. Todos los derechos reservados.',

    'contact.title': 'Contacto',
    'contact.subtitle': '¿Preguntas, comentarios o ideas? Escríbenos.',
    'contact.email.label': 'Correo electrónico',
    'contact.email.body':
      'Escríbenos a la dirección de abajo: leemos cada mensaje y respondemos lo antes posible.',
    'contact.response':
      'Solemos responder en pocos días laborables. Si informas de un fallo, indica el modelo de tu dispositivo y la versión de iOS.',
    'contact.faq': 'Quizá tu pregunta ya tenga respuesta.',
    'contact.faq.link': 'Ir a las preguntas frecuentes',

    'imprint.title': 'Aviso legal',
    'imprint.country': 'Alemania',
    'imprint.according': 'Información según el § 5 DDG',
    'imprint.contact': 'Contacto',
    'imprint.responsible': 'Responsable del contenido según el § 18, apdo. 2 MStV',
    'imprint.disclaimer.title': 'Descargo de responsabilidad',
    'imprint.disclaimer.liability.title': 'Responsabilidad por el contenido',
    'imprint.disclaimer.liability.body':
      'Como prestador de servicios, somos responsables de nuestros propios contenidos en estas páginas conforme al derecho general. Según el art. 8 DSA, no estamos obligados a supervisar la información ajena transmitida o almacenada, ni a investigar circunstancias que indiquen una actividad ilícita. Las obligaciones de retirar o bloquear el uso de información conforme al derecho general permanecen inalteradas. Una responsabilidad al respecto solo existe a partir del momento en que se tiene conocimiento de una infracción concreta. En cuanto tengamos conocimiento de tales infracciones, retiraremos dichos contenidos de inmediato.',
    'imprint.disclaimer.links.title': 'Responsabilidad por los enlaces',
    'imprint.disclaimer.links.body':
      'Nuestra oferta contiene enlaces a sitios web externos de terceros, sobre cuyo contenido no tenemos influencia. Por ello no podemos asumir ninguna responsabilidad por esos contenidos externos. Del contenido de las páginas enlazadas siempre es responsable su respectivo proveedor u operador. Las páginas enlazadas fueron revisadas en busca de posibles infracciones legales en el momento de enlazarlas. En ese momento no se apreciaban contenidos ilícitos. Sin embargo, una supervisión permanente del contenido de las páginas enlazadas no es exigible sin indicios concretos de una infracción. En cuanto tengamos conocimiento de infracciones, retiraremos dichos enlaces de inmediato.',
    'imprint.disclaimer.copyright.title': 'Derechos de autor',
    'imprint.disclaimer.copyright.body':
      'Los contenidos y obras creados por el operador del sitio en estas páginas están sujetos a la legislación alemana sobre derechos de autor. La reproducción, edición, distribución y cualquier forma de explotación fuera de los límites de los derechos de autor requieren el consentimiento por escrito de su respectivo autor o creador. Las descargas y copias de este sitio solo están permitidas para uso privado y no comercial.',
  },
  it: {
    'meta.title': 'SimpleTime – Ore e attività per iPhone, iPad e Mac',
    'meta.description':
      'Un tocco avvia il cronometro. SimpleTime registra come passi il tempo, senza account, pubblicità né vendita dei tuoi dati. Le tue ore restano sul tuo dispositivo e nel tuo iCloud.',
    'meta.contact.description':
      'Hai una domanda, un suggerimento o un bug da segnalare? Scrivi a SimpleTime via e-mail: leggiamo ogni messaggio e rispondiamo in pochi giorni lavorativi.',
    'meta.privacy.description':
      'Come SimpleTime tratta i tuoi dati: nessun account, nessuna pubblicità. Le tue voci restano sui tuoi dispositivi e nel tuo iCloud privato.',
    'meta.imprint.description':
      'Note legali di simple-time.app ai sensi del § 5 DDG: titolare, contatti e informazioni sulla responsabilità per l’app e il sito SimpleTime.',
    'meta.terms.description':
      'Le condizioni d’uso di SimpleTime: un’app gratuita, SimpleTime Pro tramite l’App Store, abbonamenti e settimana di prova, i tuoi dati, responsabilità e legge applicabile.',
    'meta.accessibility.description':
      'Quanto sono accessibili SimpleTime e questo sito: VoiceOver, testo grande, 41 lingue, controlli automatici – e cosa non va ancora bene.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, luoghi, obiettivi e altro',
    'meta.pro.description':
      'SimpleTime resta gratuito. Pro aggiunge l’app per Apple Watch, riepiloghi, luoghi, obiettivi, filtro Full Immersion e altro – al mese, all’anno o una volta per sempre.',
    'meta.faq.title': 'Domande frequenti · SimpleTime',
    'meta.faq.description':
      'Le risposte alle domande più frequenti su SimpleTime: registrazione del tempo, widget e Siri, sincronizzazione iCloud e backup, privacy e SimpleTime Pro.',

    'nav.features': 'Funzioni',
    'nav.devices': 'Dispositivi',
    'nav.privacy': 'Privacy',
    'nav.pro': 'Pro',
    'nav.appstore': 'Guarda su App Store',
    'appstore.download': 'Scarica su App Store',
    'nav.faq': 'FAQ',
    'nav.menu': 'Apri il menu',
    'nav.menu.close': 'Chiudi il menu',
    'nav.language': 'Lingua',
    'nav.theme': 'Modalità scura',
    'skip.content': 'Vai al contenuto',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Progetto cliente',
    'live.stop': 'Interrompi',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Oggi',

    'footer.tagline': 'Un tocco avvia il cronometro.',
    'footer.legal': 'Informazioni legali',
    'footer.product': 'Prodotto',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Contatti',
    'footer.imprint': 'Note legali',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Condizioni d’uso',
    'footer.accessibility': 'Accessibilità',
    'footer.copyright': '© {year} Luca Efinger. Tutti i diritti riservati.',

    'contact.title': 'Contatti',
    'contact.subtitle': 'Domande, suggerimenti o idee? Scrivici.',
    'contact.email.label': 'E-mail',
    'contact.email.body':
      'Scrivici all’indirizzo qui sotto: leggiamo ogni messaggio e rispondiamo il prima possibile.',
    'contact.response':
      'Di solito rispondiamo entro pochi giorni lavorativi. Per un bug, indica il modello del dispositivo e la versione di iOS.',
    'contact.faq': 'Forse la tua domanda ha già una risposta.',
    'contact.faq.link': 'Vai alle domande frequenti',

    'imprint.title': 'Note legali',
    'imprint.country': 'Germania',
    'imprint.according': 'Informazioni ai sensi del § 5 DDG',
    'imprint.contact': 'Contatti',
    'imprint.responsible': 'Responsabile dei contenuti ai sensi del § 18, comma 2 MStV',
    'imprint.disclaimer.title': 'Esclusione di responsabilità',
    'imprint.disclaimer.liability.title': 'Responsabilità per i contenuti',
    'imprint.disclaimer.liability.body':
      'In qualità di fornitore di servizi siamo responsabili dei contenuti propri di queste pagine secondo le norme generali. Ai sensi dell’art. 8 DSA non siamo però tenuti a sorvegliare le informazioni altrui trasmesse o memorizzate, né a ricercare circostanze che indichino attività illecite. Restano impregiudicati gli obblighi di rimozione o blocco dell’uso di informazioni previsti dalle norme generali. Una responsabilità in tal senso sussiste soltanto dal momento in cui si viene a conoscenza di una violazione concreta. Non appena verremo a conoscenza di tali violazioni, rimuoveremo immediatamente i contenuti in questione.',
    'imprint.disclaimer.links.title': 'Responsabilità per i collegamenti',
    'imprint.disclaimer.links.body':
      'La nostra offerta contiene collegamenti a siti web esterni di terzi, sui cui contenuti non abbiamo alcuna influenza. Per questo motivo non possiamo assumerci alcuna responsabilità per tali contenuti esterni. Del contenuto delle pagine collegate è sempre responsabile il rispettivo fornitore o gestore. Al momento del collegamento le pagine sono state verificate per accertare eventuali violazioni di legge. In quel momento non erano riconoscibili contenuti illeciti. Un controllo permanente dei contenuti delle pagine collegate non è però esigibile senza indizi concreti di una violazione. Non appena verremo a conoscenza di violazioni, rimuoveremo immediatamente i collegamenti in questione.',
    'imprint.disclaimer.copyright.title': 'Diritto d’autore',
    'imprint.disclaimer.copyright.body':
      'I contenuti e le opere create dal gestore del sito su queste pagine sono soggetti al diritto d’autore tedesco. La riproduzione, l’elaborazione, la diffusione e qualsiasi forma di utilizzo al di fuori dei limiti del diritto d’autore richiedono il consenso scritto del rispettivo autore o creatore. I download e le copie di questo sito sono consentiti soltanto per uso privato e non commerciale.',
  },
  ru: {
    'meta.title': 'SimpleTime – учёт времени для iPhone, iPad и Mac',
    'meta.description':
      'Одно касание запускает часы. SimpleTime записывает, на что уходит ваше время, — без учётной записи, рекламы и продажи ваших данных. Ваши часы остаются на устройстве и в вашем iCloud.',
    'meta.contact.description':
      'Есть вопрос, отзыв или сообщение об ошибке? Напишите SimpleTime по электронной почте — мы читаем каждое сообщение и отвечаем в течение нескольких рабочих дней.',
    'meta.privacy.description':
      'Как SimpleTime обращается с вашими данными: без учётной записи, без рекламы. Ваши записи хранятся на ваших устройствах и в личном iCloud.',
    'meta.imprint.description':
      'Выходные данные simple-time.app согласно § 5 DDG: владелец, контактные данные и сведения об ответственности за приложение и сайт SimpleTime.',
    'meta.terms.description':
      'Условия использования SimpleTime: бесплатное приложение, SimpleTime Pro через App Store, подписки и пробная неделя, ваши данные, ответственность и применимое право.',
    'meta.accessibility.description':
      'Насколько доступны SimpleTime и этот сайт: VoiceOver, крупный текст, 41 язык, автоматические проверки — и что пока не так.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, места, цели и многое другое',
    'meta.pro.description':
      'SimpleTime остаётся бесплатным. Pro добавляет приложение для Apple Watch, итоги, места, цели, фильтр фокусирования и многое другое — на месяц, на год или навсегда.',
    'meta.faq.title': 'Вопросы и ответы · SimpleTime',
    'meta.faq.description':
      'Ответы на частые вопросы о SimpleTime: учёт времени, виджеты и Siri, синхронизация iCloud и резервные копии, конфиденциальность и SimpleTime Pro.',

    'nav.features': 'Возможности',
    'nav.devices': 'Устройства',
    'nav.privacy': 'Конфиденциальность',
    'nav.pro': 'Pro',
    'nav.appstore': 'Открыть в App Store',
    'appstore.download': 'Загрузить в App Store',
    'nav.faq': 'Вопросы',
    'nav.menu': 'Открыть меню',
    'nav.menu.close': 'Закрыть меню',
    'nav.language': 'Язык',
    'nav.theme': 'Тёмный режим',
    'skip.content': 'Перейти к содержимому',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Проект клиента',
    'live.stop': 'Остановить',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Сегодня',

    'footer.tagline': 'Одно касание запускает часы.',
    'footer.legal': 'Правовая информация',
    'footer.product': 'Продукт',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Контакты',
    'footer.imprint': 'Выходные данные',
    'footer.privacy': 'Конфиденциальность',
    'footer.terms': 'Условия использования',
    'footer.accessibility': 'Доступность',
    'footer.copyright': '© {year} Luca Efinger. Все права защищены.',

    'contact.title': 'Контакты',
    'contact.subtitle': 'Вопросы, отзывы или идеи? Напишите нам.',
    'contact.email.label': 'Электронная почта',
    'contact.email.body':
      'Напишите нам по адресу ниже — мы читаем каждое сообщение и отвечаем как можно быстрее.',
    'contact.response':
      'Обычно мы отвечаем в течение нескольких рабочих дней. Если сообщаете об ошибке, укажите модель устройства и версию iOS.',
    'contact.faq': 'Возможно, на ваш вопрос уже есть ответ.',
    'contact.faq.link': 'К частым вопросам',

    'imprint.title': 'Выходные данные',
    'imprint.country': 'Германия',
    'imprint.according': 'Сведения согласно § 5 DDG',
    'imprint.contact': 'Контакты',
    'imprint.responsible': 'Ответственный за содержание согласно § 18, абз. 2 MStV',
    'imprint.disclaimer.title': 'Отказ от ответственности',
    'imprint.disclaimer.liability.title': 'Ответственность за содержание',
    'imprint.disclaimer.liability.body':
      'Как поставщик услуг мы несём ответственность за собственные материалы на этих страницах в соответствии с общими нормами права. Однако согласно ст. 8 DSA мы не обязаны отслеживать переданную или сохранённую чужую информацию либо выяснять обстоятельства, указывающие на противоправную деятельность. Обязанности по удалению или блокированию использования информации в соответствии с общими нормами права остаются в силе. Ответственность в этой части возникает только с момента, когда нам становится известно о конкретном нарушении. При получении сведений о таких нарушениях мы незамедлительно удалим соответствующие материалы.',
    'imprint.disclaimer.links.title': 'Ответственность за ссылки',
    'imprint.disclaimer.links.body':
      'Наше предложение содержит ссылки на внешние сайты третьих лиц, на содержание которых мы не можем влиять. Поэтому мы не можем нести ответственность за эти внешние материалы. За содержание страниц, на которые ведут ссылки, всегда отвечает их поставщик или оператор. На момент размещения ссылок страницы были проверены на предмет возможных нарушений закона. Противоправного содержания тогда выявлено не было. Однако постоянный контроль содержания страниц, на которые ведут ссылки, без конкретных указаний на нарушение неосуществим. При получении сведений о нарушениях мы незамедлительно удалим соответствующие ссылки.',
    'imprint.disclaimer.copyright.title': 'Авторское право',
    'imprint.disclaimer.copyright.body':
      'Материалы и произведения, созданные оператором сайта на этих страницах, охраняются авторским правом Германии. Воспроизведение, переработка, распространение и любое использование за пределами, установленными авторским правом, требуют письменного согласия соответствующего автора или создателя. Загрузка и копирование этого сайта допускаются только для частного некоммерческого использования.',
  },
  hy: {
    'meta.title': 'SimpleTime – ժամանակի հաշվառում iPhone-ի, iPad-ի և Mac-ի համար',
    'meta.description':
      'Մեկ հպում՝ ժամանակը գնաց։ SimpleTime-ը գրանցում է, թե ուր է գնում ձեր ժամանակը՝ առանց հաշվի, գովազդի և ձեր տվյալների վաճառքի։ Ձեր ժամերը մնում են ձեր սարքում և ձեր iCloud-ում։',
    'meta.contact.description':
      'Հարց, կարծիք կամ սխալի մասին հաղորդում ունե՞ք։ Գրեք SimpleTime-ին էլ․ փոստով․ մենք կարդում ենք յուրաքանչյուր նամակ և պատասխանում ենք մի քանի աշխատանքային օրվա ընթացքում։',
    'meta.privacy.description':
      'Ինչպես է SimpleTime-ը վարվում ձեր տվյալների հետ՝ առանց հաշվի և գովազդի։ Ձեր գրառումները մնում են ձեր սարքերում և անձնական iCloud-ում։',
    'meta.imprint.description':
      'simple-time.app-ի իրավական տվյալները § 5 DDG-ի համաձայն․ տիրապետող, կապի տվյալներ և պատասխանատվության մասին տեղեկություններ SimpleTime հավելվածի և կայքի համար։',
    'meta.terms.description':
      'SimpleTime-ի օգտագործման պայմանները՝ անվճար հավելված, SimpleTime Pro App Store-ի միջոցով, բաժանորդագրություններ և փորձնական շաբաթ, ձեր տվյալները, պատասխանատվություն և կիրառելի իրավունք։',
    'meta.accessibility.description':
      'Որքանով են մատչելի SimpleTime-ը և այս կայքը՝ VoiceOver, խոշոր տեքստ, 41 լեզու, ավտոմատ ստուգումներ, և ինչը դեռ լավ չէ։',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, վայրեր, նպատակներ և ավելին',
    'meta.pro.description':
      'SimpleTime-ը մնում է անվճար։ Pro-ն ավելացնում է Apple Watch-ի հավելվածը, ամփոփումներ, վայրեր, նպատակներ, կենտրոնացման զտիչ և ավելին՝ ամսական, տարեկան կամ ցմահ։',
    'meta.faq.title': 'Հարցեր և պատասխաններ · SimpleTime',
    'meta.faq.description':
      'Պատասխաններ SimpleTime-ի մասին ամենահաճախ տրվող հարցերին՝ հաշվառում, վիջեթներ և Siri, iCloud-ի համաժամեցում և պահուստներ, գաղտնիություն և SimpleTime Pro։',

    'nav.features': 'Հնարավորություններ',
    'nav.devices': 'Սարքեր',
    'nav.privacy': 'Գաղտնիություն',
    'nav.pro': 'Pro',
    'nav.appstore': 'Դիտել App Store-ում',
    'appstore.download': 'Ներբեռնել App Store-ից',
    'nav.faq': 'Հարցեր',
    'nav.menu': 'Բացել ընտրացանկը',
    'nav.menu.close': 'Փակել ընտրացանկը',
    'nav.language': 'Լեզու',
    'nav.theme': 'Մուգ ռեժիմ',
    'skip.content': 'Անցնել բովանդակությանը',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Հաճախորդի նախագիծ',
    'live.stop': 'Կանգնեցնել',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Այսօր',

    'footer.tagline': 'Մեկ հպում՝ ժամանակը գնաց։',
    'footer.legal': 'Իրավական տեղեկություններ',
    'footer.product': 'Ապրանք',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Կապ',
    'footer.imprint': 'Իրավական տվյալներ',
    'footer.privacy': 'Գաղտնիություն',
    'footer.terms': 'Օգտագործման պայմաններ',
    'footer.accessibility': 'Մատչելիություն',
    'footer.copyright': '© {year} Luca Efinger։ Բոլոր իրավունքները պաշտպանված են։',

    'contact.title': 'Կապ',
    'contact.subtitle': 'Հարցե՞ր, կարծիքնե՞ր կամ գաղափարնե՞ր։ Գրեք մեզ։',
    'contact.email.label': 'Էլ․ փոստ',
    'contact.email.body':
      'Գրեք մեզ ստորև նշված հասցեով․ մենք կարդում ենք յուրաքանչյուր նամակ և պատասխանում ենք հնարավորինս արագ։',
    'contact.response':
      'Սովորաբար պատասխանում ենք մի քանի աշխատանքային օրվա ընթացքում։ Սխալի մասին հաղորդելիս նշեք ձեր սարքի մոդելը և iOS-ի տարբերակը։',
    'contact.faq': 'Գուցե ձեր հարցին արդեն պատասխան կա։',
    'contact.faq.link': 'Դիտել հաճախակի հարցերը',

    'imprint.title': 'Իրավական տվյալներ',
    'imprint.country': 'Գերմանիա',
    'imprint.according': 'Տեղեկություններ § 5 DDG-ի համաձայն',
    'imprint.contact': 'Կապ',
    'imprint.responsible': 'Բովանդակության համար պատասխանատու § 18, կետ 2 MStV-ի համաձայն',
    'imprint.disclaimer.title': 'Պատասխանատվության հրաժարում',
    'imprint.disclaimer.liability.title': 'Պատասխանատվություն բովանդակության համար',
    'imprint.disclaimer.liability.body':
      'Որպես ծառայություն մատուցող՝ մենք պատասխանատու ենք այս էջերի սեփական բովանդակության համար ընդհանուր իրավունքի նորմերի համաձայն։ Սակայն DSA-ի հոդված 8-ի համաձայն մենք պարտավոր չենք հսկել փոխանցված կամ պահպանված օտար տեղեկությունը կամ պարզել հանգամանքներ, որոնք վկայում են ապօրինի գործունեության մասին։ Ընդհանուր իրավունքի նորմերով նախատեսված՝ տեղեկության հեռացման կամ օգտագործման արգելափակման պարտավորությունները մնում են ուժի մեջ։ Այս մասով պատասխանատվությունը ծագում է միայն կոնկրետ խախտման մասին իմանալու պահից։ Նման խախտումների մասին տեղեկանալուն պես մենք անհապաղ կհեռացնենք համապատասխան բովանդակությունը։',
    'imprint.disclaimer.links.title': 'Պատասխանատվություն հղումների համար',
    'imprint.disclaimer.links.body':
      'Մեր առաջարկը պարունակում է հղումներ երրորդ անձանց արտաքին կայքերին, որոնց բովանդակության վրա մենք ազդեցություն չունենք։ Այդ պատճառով մենք չենք կարող պատասխանատվություն կրել այդ արտաքին բովանդակության համար։ Հղված էջերի բովանդակության համար միշտ պատասխանատու է դրանց համապատասխան մատակարարը կամ շահագործողը։ Հղումները տեղադրելու պահին էջերը ստուգվել են հնարավոր իրավախախտումների առումով։ Այդ պահին ապօրինի բովանդակություն չի հայտնաբերվել։ Սակայն հղված էջերի բովանդակության մշտական հսկողությունը առանց խախտման կոնկրետ ցուցումների իրատեսական չէ։ Խախտումների մասին տեղեկանալուն պես մենք անհապաղ կհեռացնենք համապատասխան հղումները։',
    'imprint.disclaimer.copyright.title': 'Հեղինակային իրավունք',
    'imprint.disclaimer.copyright.body':
      'Կայքի շահագործողի կողմից այս էջերում ստեղծված բովանդակությունը և ստեղծագործությունները պաշտպանված են Գերմանիայի հեղինակային իրավունքով։ Վերարտադրումը, մշակումը, տարածումը և հեղինակային իրավունքի սահմաններից դուրս ցանկացած օգտագործում պահանջում են համապատասխան հեղինակի կամ ստեղծողի գրավոր համաձայնությունը։ Այս կայքի ներբեռնումները և պատճենները թույլատրվում են միայն անձնական, ոչ առևտրային օգտագործման համար։',
  },
  pt: {
    'meta.title': 'SimpleTime – Registo de horas para iPhone, iPad e Mac',
    'meta.description':
      'Um toque inicia o relógio. O SimpleTime regista onde passa o seu tempo, sem conta, sem publicidade nem venda dos seus dados. As suas horas ficam no seu dispositivo e no seu iCloud.',
    'meta.contact.description':
      'Tem uma pergunta, uma sugestão ou um erro a comunicar? Escreva ao SimpleTime por e-mail: lemos todas as mensagens e respondemos em poucos dias úteis.',
    'meta.privacy.description':
      'Como o SimpleTime trata os seus dados: sem conta, sem publicidade. Os seus registos ficam nos seus dispositivos e no seu iCloud privado.',
    'meta.imprint.description':
      'Informação legal de simple-time.app nos termos do § 5 DDG: titular, contactos e informações de responsabilidade da aplicação e do site SimpleTime.',
    'meta.terms.description':
      'As condições de utilização do SimpleTime: uma app gratuita, o SimpleTime Pro através da App Store, subscrições e semana de experiência, os seus dados, responsabilidade e lei aplicável.',
    'meta.accessibility.description':
      'Quão acessíveis são o SimpleTime e este site: VoiceOver, texto grande, 41 idiomas, verificações automáticas – e o que ainda não está bem.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, locais, metas e mais',
    'meta.pro.description':
      'O SimpleTime continua gratuito. O Pro acrescenta a app para o Apple Watch, resumos, locais, metas, o filtro de concentração e mais – ao mês, ao ano ou para sempre.',
    'meta.faq.title': 'Perguntas frequentes · SimpleTime',
    'meta.faq.description':
      'Respostas às perguntas mais frequentes sobre o SimpleTime: registo, widgets e Siri, sincronização com o iCloud e cópias de segurança, privacidade e SimpleTime Pro.',

    'nav.features': 'Funcionalidades',
    'nav.devices': 'Dispositivos',
    'nav.privacy': 'Privacidade',
    'nav.pro': 'Pro',
    'nav.appstore': 'Ver na App Store',
    'appstore.download': 'Transferir na App Store',
    'nav.faq': 'Perguntas',
    'nav.menu': 'Abrir o menu',
    'nav.menu.close': 'Fechar o menu',
    'nav.language': 'Idioma',
    'nav.theme': 'Modo escuro',
    'skip.content': 'Ir para o conteúdo',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Projeto de cliente',
    'live.stop': 'Parar',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Hoje',

    'footer.tagline': 'Um toque inicia o relógio.',
    'footer.legal': 'Informação legal',
    'footer.product': 'Produto',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Contacto',
    'footer.imprint': 'Ficha legal',
    'footer.privacy': 'Privacidade',
    'footer.terms': 'Condições de utilização',
    'footer.accessibility': 'Acessibilidade',
    'footer.copyright': '© {year} Luca Efinger. Todos os direitos reservados.',

    'contact.title': 'Contacto',
    'contact.subtitle': 'Perguntas, sugestões ou ideias? Escreva-nos.',
    'contact.email.label': 'E-mail',
    'contact.email.body':
      'Escreva-nos para o endereço abaixo: lemos todas as mensagens e respondemos o mais depressa possível.',
    'contact.response':
      'Normalmente respondemos em poucos dias úteis. Se comunicar um erro, indique o modelo do dispositivo e a versão do iOS.',
    'contact.faq': 'Talvez a sua pergunta já tenha resposta.',
    'contact.faq.link': 'Ir para as perguntas frequentes',

    'imprint.title': 'Ficha legal',
    'imprint.country': 'Alemanha',
    'imprint.according': 'Informações nos termos do § 5 DDG',
    'imprint.contact': 'Contacto',
    'imprint.responsible': 'Responsável pelo conteúdo nos termos do § 18, n.º 2 MStV',
    'imprint.disclaimer.title': 'Exclusão de responsabilidade',
    'imprint.disclaimer.liability.title': 'Responsabilidade pelo conteúdo',
    'imprint.disclaimer.liability.body':
      'Enquanto prestador de serviços, somos responsáveis pelos conteúdos próprios destas páginas nos termos das normas gerais. Nos termos do art. 8.º do DSA, não estamos, contudo, obrigados a vigiar informação alheia transmitida ou armazenada, nem a investigar circunstâncias que indiciem atividade ilícita. Mantêm-se inalteradas as obrigações de remoção ou bloqueio da utilização de informação previstas nas normas gerais. A responsabilidade a este título só existe a partir do momento em que se tem conhecimento de uma infração concreta. Logo que tenhamos conhecimento de tais infrações, removeremos de imediato os conteúdos em causa.',
    'imprint.disclaimer.links.title': 'Responsabilidade pelas ligações',
    'imprint.disclaimer.links.body':
      'A nossa oferta contém ligações para sites externos de terceiros, sobre cujo conteúdo não temos influência. Por isso, não podemos assumir qualquer responsabilidade por esses conteúdos externos. Pelo conteúdo das páginas ligadas é sempre responsável o respetivo fornecedor ou operador. As páginas ligadas foram verificadas quanto a eventuais infrações legais no momento em que a ligação foi criada. Nessa altura, não eram reconhecíveis conteúdos ilícitos. Contudo, uma vigilância permanente do conteúdo das páginas ligadas não é exigível sem indícios concretos de uma infração. Logo que tenhamos conhecimento de infrações, removeremos de imediato as ligações em causa.',
    'imprint.disclaimer.copyright.title': 'Direitos de autor',
    'imprint.disclaimer.copyright.body':
      'Os conteúdos e as obras criados pelo operador do site nestas páginas estão sujeitos ao direito de autor alemão. A reprodução, a alteração, a distribuição e qualquer forma de exploração fora dos limites do direito de autor carecem do consentimento escrito do respetivo autor ou criador. As transferências e as cópias deste site são permitidas apenas para uso privado e não comercial.',
  },
  tr: {
    'meta.title': 'SimpleTime – iPhone, iPad ve Mac için zaman takibi',
    'meta.description':
      'Tek dokunuş saati başlatır. SimpleTime zamanının nereye gittiğini kaydeder – hesap yok, reklam yok, verilerin satılmaz. Saatlerin cihazında ve kendi iCloud\'unda kalır.',
    'meta.contact.description':
      'Sorun, önerin ya da bildirmek istediğin bir hata mı var? SimpleTime’a e-posta yaz: her mesajı okuyor ve birkaç iş günü içinde yanıtlıyoruz.',
    'meta.privacy.description':
      'SimpleTime verilerini nasıl işler: hesap yok, reklam yok. Kayıtların cihazlarında ve sana özel iCloud alanında kalır.',
    'meta.imprint.description':
      'simple-time.app için § 5 DDG uyarınca yasal bilgiler: sahibi, iletişim bilgileri ve SimpleTime uygulaması ile sitesine ilişkin sorumluluk bilgileri.',
    'meta.terms.description':
      'SimpleTime kullanım koşulları: ücretsiz bir uygulama, App Store üzerinden SimpleTime Pro, abonelikler ve deneme haftası, verilerin, sorumluluk ve uygulanacak hukuk.',
    'meta.accessibility.description':
      'SimpleTime ve bu web sitesi ne kadar erişilebilir: VoiceOver, büyük metin, 41 dil, otomatik denetimler – ve henüz iyi olmayanlar.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, yerler, hedefler ve dahası',
    'meta.pro.description':
      'SimpleTime ücretsiz kalır. Pro; Apple Watch uygulamasını, özetleri, yerleri, hedefleri, odak filtresini ve dahasını ekler – aylık, yıllık ya da tek seferde sonsuza dek.',
    'meta.faq.title': 'Sorular ve yanıtlar · SimpleTime',
    'meta.faq.description':
      'SimpleTime hakkında en sık sorulan soruların yanıtları: kayıt, widget\'lar ve Siri, iCloud eşitlemesi ve yedekler, gizlilik ve SimpleTime Pro.',

    'nav.features': 'Özellikler',
    'nav.devices': 'Cihazlar',
    'nav.privacy': 'Gizlilik',
    'nav.pro': 'Pro',
    'nav.appstore': 'App Store’da görüntüle',
    'appstore.download': 'App Store’dan indir',
    'nav.faq': 'Sorular',
    'nav.menu': 'Menüyü aç',
    'nav.menu.close': 'Menüyü kapat',
    'nav.language': 'Dil',
    'nav.theme': 'Koyu Mod',
    'skip.content': 'İçeriğe geç',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Müşteri projesi',
    'live.stop': 'Durdur',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Bugün',

    'footer.tagline': 'Tek dokunuş saati başlatır.',
    'footer.legal': 'Yasal bilgiler',
    'footer.product': 'Ürün',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'İletişim',
    'footer.imprint': 'Künye',
    'footer.privacy': 'Gizlilik',
    'footer.terms': 'Kullanım koşulları',
    'footer.accessibility': 'Erişilebilirlik',
    'footer.copyright': '© {year} Luca Efinger. Tüm hakları saklıdır.',

    'contact.title': 'İletişim',
    'contact.subtitle': 'Soru, geri bildirim ya da fikir mi var? Bize yaz.',
    'contact.email.label': 'E-posta',
    'contact.email.body':
      'Aşağıdaki adrese yaz: her mesajı okuyor ve olabildiğince hızlı yanıtlıyoruz.',
    'contact.response':
      'Genellikle birkaç iş günü içinde yanıtlıyoruz. Bir hata bildirirken cihaz modelini ve iOS sürümünü belirt.',
    'contact.faq': 'Belki sorduğun soru zaten yanıtlanmıştır.',
    'contact.faq.link': 'Sık sorulan sorulara git',

    'imprint.title': 'Künye',
    'imprint.country': 'Almanya',
    'imprint.according': '§ 5 DDG uyarınca bilgiler',
    'imprint.contact': 'İletişim',
    'imprint.responsible': '§ 18, fıkra 2 MStV uyarınca içerikten sorumlu',
    'imprint.disclaimer.title': 'Sorumluluk reddi',
    'imprint.disclaimer.liability.title': 'İçerik sorumluluğu',
    'imprint.disclaimer.liability.body':
      'Hizmet sağlayıcı olarak bu sayfalardaki kendi içeriklerimizden genel hükümler uyarınca sorumluyuz. Ancak DSA’nın 8. maddesi uyarınca, iletilen veya saklanan üçüncü kişi bilgilerini denetlemek ya da hukuka aykırı bir faaliyete işaret eden koşulları araştırmakla yükümlü değiliz. Genel hükümler uyarınca bilgilerin kaldırılmasına veya kullanımının engellenmesine ilişkin yükümlülükler saklıdır. Bu yöndeki sorumluluk ancak somut bir ihlalin öğrenildiği andan itibaren doğar. Bu tür ihlalleri öğrendiğimiz anda ilgili içerikleri gecikmeksizin kaldırırız.',
    'imprint.disclaimer.links.title': 'Bağlantı sorumluluğu',
    'imprint.disclaimer.links.body':
      'Sunumumuz, içeriğine etki edemeyeceğimiz üçüncü kişilere ait dış web sitelerine bağlantılar içerir. Bu nedenle bu dış içerikler için hiçbir sorumluluk üstlenemeyiz. Bağlantı verilen sayfaların içeriğinden her zaman ilgili sağlayıcı veya işletmeci sorumludur. Bağlantı verildiği sırada sayfalar olası hukuka aykırılıklar bakımından incelenmiştir. O anda hukuka aykırı içerik tespit edilmemiştir. Ancak somut bir ihlal belirtisi olmadan bağlantı verilen sayfaların içeriğinin sürekli denetlenmesi beklenemez. İhlalleri öğrendiğimiz anda ilgili bağlantıları gecikmeksizin kaldırırız.',
    'imprint.disclaimer.copyright.title': 'Telif hakkı',
    'imprint.disclaimer.copyright.body':
      'Site işletmecisi tarafından bu sayfalarda oluşturulan içerik ve eserler Alman telif hakkı mevzuatına tabidir. Çoğaltma, işleme, yayma ve telif hakkının sınırları dışındaki her türlü değerlendirme, ilgili yazarın veya eser sahibinin yazılı iznini gerektirir. Bu sitenin indirilmesine ve kopyalanmasına yalnızca özel, ticari olmayan kullanım için izin verilir.',
  },
  ar: {
    'meta.title': 'SimpleTime – تتبّع الوقت على iPhone و iPad و Mac',
    'meta.description':
      'لمسة واحدة تُشغّل الساعة. يسجّل SimpleTime أين يذهب وقتك – بلا حساب، بلا إعلانات، بلا بيع لبياناتك. تبقى ساعاتك على جهازك وفي iCloud الخاص بك.',
    'meta.contact.description':
      'لديك سؤال أو ملاحظة أو خلل تريد الإبلاغ عنه؟ راسل SimpleTime بالبريد الإلكتروني: نقرأ كل رسالة ونردّ خلال أيام عمل قليلة.',
    'meta.privacy.description':
      'كيف يتعامل SimpleTime مع بياناتك: بلا حساب، بلا إعلانات. تبقى إدخالاتك على أجهزتك وفي iCloud الخاص بك.',
    'meta.imprint.description':
      'البيانات القانونية لموقع simple-time.app وفقًا للمادة 5 من قانون DDG: المالك وبيانات الاتصال ومعلومات المسؤولية عن تطبيق SimpleTime وموقعه.',
    'meta.terms.description':
      'شروط استخدام SimpleTime: تطبيق مجاني، وSimpleTime Pro عبر App Store، والاشتراكات وأسبوع التجربة، وبياناتك، والمسؤولية، والقانون الواجب التطبيق.',
    'meta.accessibility.description':
      'مدى إمكانية الوصول إلى SimpleTime وهذا الموقع: VoiceOver، والنص الكبير، و41 لغة، والفحوص التلقائية – وما ليس جيدًا بعد.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch والأماكن والأهداف والمزيد',
    'meta.pro.description':
      'يبقى SimpleTime مجانيًا. ويضيف Pro تطبيق Apple Watch والملخّصات والأماكن والأهداف ومُرشِّح التركيز والمزيد – شهريًا أو سنويًا أو مرة واحدة إلى الأبد.',
    'meta.faq.title': 'أسئلة وأجوبة · SimpleTime',
    'meta.faq.description':
      'إجابات عن أكثر الأسئلة شيوعًا حول SimpleTime: التسجيل، والأدوات و Siri، ومزامنة iCloud والنسخ الاحتياطية، والخصوصية، و SimpleTime Pro.',

    'nav.features': 'الميزات',
    'nav.devices': 'الأجهزة',
    'nav.privacy': 'الخصوصية',
    'nav.pro': 'Pro',
    'nav.appstore': 'عرض في App Store',
    'appstore.download': 'التنزيل من App Store',
    'nav.faq': 'الأسئلة',
    'nav.menu': 'فتح القائمة',
    'nav.menu.close': 'إغلاق القائمة',
    'nav.language': 'اللغة',
    'nav.theme': 'النمط الداكن',
    'skip.content': 'الانتقال إلى المحتوى',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'مشروع العميل',
    'live.stop': 'إيقاف',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'اليوم',

    'footer.tagline': 'لمسة واحدة تُشغّل الساعة.',
    'footer.legal': 'معلومات قانونية',
    'footer.product': 'المنتج',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'اتصل بنا',
    'footer.imprint': 'البيانات القانونية',
    'footer.privacy': 'الخصوصية',
    'footer.terms': 'شروط الاستخدام',
    'footer.accessibility': 'إمكانية الوصول',
    'footer.copyright': '© {year} Luca Efinger. جميع الحقوق محفوظة.',

    'contact.title': 'اتصل بنا',
    'contact.subtitle': 'أسئلة أو ملاحظات أو أفكار؟ راسلنا.',
    'contact.email.label': 'البريد الإلكتروني',
    'contact.email.body':
      'راسلنا على العنوان أدناه: نقرأ كل رسالة ونردّ في أسرع وقت ممكن.',
    'contact.response':
      'نردّ عادةً خلال أيام عمل قليلة. عند الإبلاغ عن خلل، اذكر طراز جهازك وإصدار iOS.',
    'contact.faq': 'ربما أُجيب عن سؤالك من قبل.',
    'contact.faq.link': 'إلى الأسئلة الشائعة',

    'imprint.title': 'البيانات القانونية',
    'imprint.country': 'ألمانيا',
    'imprint.according': 'معلومات وفقًا للمادة 5 من قانون DDG',
    'imprint.contact': 'اتصل بنا',
    'imprint.responsible': 'المسؤول عن المحتوى وفقًا للمادة 18، الفقرة 2 من MStV',
    'imprint.disclaimer.title': 'إخلاء المسؤولية',
    'imprint.disclaimer.liability.title': 'المسؤولية عن المحتوى',
    'imprint.disclaimer.liability.body':
      'بصفتنا مقدّم خدمة، نتحمّل المسؤولية عن محتوانا الخاص على هذه الصفحات وفقًا للقواعد العامة. غير أننا، وفقًا للمادة 8 من DSA، غير ملزمين بمراقبة المعلومات الأجنبية المنقولة أو المخزّنة، ولا بالبحث عن ظروف تشير إلى نشاط غير مشروع. تبقى الالتزامات بإزالة المعلومات أو حجب استخدامها وفقًا للقواعد العامة قائمة. ولا تنشأ المسؤولية في هذا الشأن إلا من لحظة العلم بمخالفة محدّدة. وبمجرد علمنا بمثل هذه المخالفات، سنزيل المحتوى المعني فورًا.',
    'imprint.disclaimer.links.title': 'المسؤولية عن الروابط',
    'imprint.disclaimer.links.body':
      'يحتوي عرضنا على روابط لمواقع خارجية تابعة لأطراف أخرى لا نملك تأثيرًا على محتواها. لذلك لا يمكننا تحمّل أي مسؤولية عن هذه المحتويات الخارجية. ويظل مقدّم الصفحات المرتبطة أو مشغّلها هو المسؤول دائمًا عن محتواها. وقد جرى فحص الصفحات المرتبطة بحثًا عن مخالفات قانونية محتملة وقت إنشاء الروابط، ولم يكن هناك محتوى غير مشروع ظاهر آنذاك. غير أن المراقبة الدائمة لمحتوى الصفحات المرتبطة غير معقولة دون دلائل ملموسة على مخالفة. وبمجرد علمنا بمخالفات، سنزيل الروابط المعنية فورًا.',
    'imprint.disclaimer.copyright.title': 'حقوق النشر',
    'imprint.disclaimer.copyright.body':
      'تخضع المحتويات والأعمال التي أنشأها مشغّل الموقع على هذه الصفحات لقانون حقوق النشر الألماني. ويتطلّب النسخ والتعديل والتوزيع وأي شكل من أشكال الاستغلال خارج حدود حقوق النشر موافقة خطية من المؤلف أو المنشئ المعني. ولا يُسمح بتنزيل هذا الموقع ونسخه إلا للاستخدام الخاص غير التجاري.',
  },
  ja: {
    'meta.title': 'SimpleTime – iPhone、iPad、Mac のための時間記録アプリ',
    'meta.description':
      'ワンタップで計測開始。SimpleTime は、時間の使い道を記録します — アカウントなし、広告なし、データの販売なし。記録は端末とご自分の iCloud に残ります。',
    'meta.contact.description':
      'ご質問、ご意見、不具合のご報告はありませんか。SimpleTime までメールでお知らせください。すべてのメッセージに目を通し、数営業日以内にお返事します。',
    'meta.privacy.description':
      'SimpleTime のデータの扱い方：アカウントなし、広告なし。記録はお使いの端末と、ご自分のプライベートな iCloud に残ります。',
    'meta.imprint.description':
      'simple-time.app の運営者情報（ドイツ DDG 第5条）。運営者、連絡先、SimpleTime アプリおよびサイトに関する責任事項。',
    'meta.terms.description':
      'SimpleTime の利用規約：無料のアプリ、App Store で購入する SimpleTime Pro、サブスクリプションと無料期間、データ、責任、準拠法。',
    'meta.accessibility.description':
      'SimpleTime とこのウェブサイトのアクセシビリティ：VoiceOver、大きな文字、41 言語、自動チェック — そして、まだ十分でない点。',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch、場所、目標など',
    'meta.pro.description':
      'SimpleTime は無料のままです。Pro では Apple Watch アプリ、振り返り、場所、目標、集中モードフィルタなどが加わります — 月額・年額・買い切りから選べます。',
    'meta.faq.title': 'よくある質問 · SimpleTime',
    'meta.faq.description':
      'SimpleTime についてよくある質問と回答：記録、ウィジェットと Siri、iCloud 同期とバックアップ、プライバシー、SimpleTime Pro。',

    'nav.features': '機能',
    'nav.devices': 'デバイス',
    'nav.privacy': 'プライバシー',
    'nav.pro': 'Pro',
    'nav.appstore': 'App Store で見る',
    'appstore.download': 'App Store からダウンロード',
    'nav.faq': 'よくある質問',
    'nav.menu': 'メニューを開く',
    'nav.menu.close': 'メニューを閉じる',
    'nav.language': '言語',
    'nav.theme': 'ダークモード',
    'skip.content': '本文へ移動',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'クライアント案件',
    'live.stop': '停止',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': '今日',

    'footer.tagline': 'ワンタップで計測開始。',
    'footer.legal': '法的情報',
    'footer.product': '製品',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'お問い合わせ',
    'footer.imprint': '運営者情報',
    'footer.privacy': 'プライバシー',
    'footer.terms': '利用規約',
    'footer.accessibility': 'アクセシビリティ',
    'footer.copyright': '© {year} Luca Efinger. All rights reserved.',

    'contact.title': 'お問い合わせ',
    'contact.subtitle': 'ご質問、ご意見、アイデアがありましたらお知らせください。',
    'contact.email.label': 'メール',
    'contact.email.body':
      '下記のアドレスまでご連絡ください。すべてのメッセージに目を通し、できるだけ早くお返事します。',
    'contact.response':
      '通常は数営業日以内にお返事します。不具合のご報告の際は、端末の機種と iOS のバージョンをお知らせください。',
    'contact.faq': 'そのご質問には、すでにお答えしているかもしれません。',
    'contact.faq.link': 'よくある質問を見る',

    'imprint.title': '運営者情報',
    'imprint.country': 'ドイツ',
    'imprint.according': 'ドイツ DDG 第5条に基づく表示',
    'imprint.contact': 'お問い合わせ',
    'imprint.responsible': 'MStV 第18条第2項に基づく内容責任者',
    'imprint.disclaimer.title': '免責事項',
    'imprint.disclaimer.liability.title': '内容についての責任',
    'imprint.disclaimer.liability.body':
      'サービス提供者として、当方は本サイト上の自らのコンテンツについて一般法の規定に従い責任を負います。ただし DSA 第8条により、送信または保存された第三者の情報を監視する義務、および違法行為を示す状況を調査する義務は負いません。一般法の規定に基づく情報の削除または利用停止の義務はこれにより影響を受けません。この点についての責任は、具体的な権利侵害を認識した時点から生じます。当該の侵害を認識した場合、当方は直ちに該当するコンテンツを削除します。',
    'imprint.disclaimer.links.title': 'リンクについての責任',
    'imprint.disclaimer.links.body':
      '当方の提供内容には、その内容に影響を及ぼすことのできない第三者の外部サイトへのリンクが含まれます。そのため、これらの外部コンテンツについて当方は一切の責任を負いません。リンク先ページの内容については、常に当該提供者または運営者が責任を負います。リンク設定の時点でリンク先ページに法的な問題がないか確認しており、その時点で違法なコンテンツは認められませんでした。ただし、具体的な侵害の兆候がないかぎり、リンク先の内容を継続的に監視することは合理的に期待できません。権利侵害を認識した場合、当方は直ちに該当するリンクを削除します。',
    'imprint.disclaimer.copyright.title': '著作権',
    'imprint.disclaimer.copyright.body':
      '本サイト上でサイト運営者が作成したコンテンツおよび著作物は、ドイツ著作権法の保護を受けます。著作権法の定める範囲を超える複製、改変、頒布およびあらゆる形態の利用には、それぞれの著作者または制作者の書面による同意が必要です。本サイトのダウンロードおよび複製は、私的かつ非商業的な利用に限り認められます。',
  },
  zh: {
    'meta.title': 'SimpleTime – 适用于 iPhone、iPad 和 Mac 的时间记录 App',
    'meta.description':
      '轻点一下，计时开始。SimpleTime 记录你的时间去了哪里 — 无需账号，没有广告，不出售你的数据。你的时间留在设备和你自己的 iCloud 里。',
    'meta.contact.description':
      '有问题、建议或想反馈错误？请发邮件给 SimpleTime，我们会阅读每一封来信，并在几个工作日内回复。',
    'meta.privacy.description':
      'SimpleTime 如何处理你的数据：无需账号，没有广告。你的记录保存在你的设备和你的私人 iCloud 中。',
    'meta.imprint.description':
      'simple-time.app 依据德国 DDG 第 5 条的法律声明：运营者、联系方式，以及 SimpleTime 应用与网站的责任说明。',
    'meta.terms.description':
      'SimpleTime 使用条款：免费 App、通过 App Store 购买的 SimpleTime Pro、订阅和试用周、你的数据、责任和适用法律。',
    'meta.accessibility.description':
      'SimpleTime 和本网站的无障碍程度：旁白、大字体、41 种语言、自动检查 — 以及尚不完善之处。',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch、地点、目标及更多',
    'meta.pro.description':
      'SimpleTime 保持免费。Pro 另外提供 Apple Watch App、回顾、地点、目标、专注过滤器等功能 — 可按月、按年或一次买断。',
    'meta.faq.title': '常见问题 · SimpleTime',
    'meta.faq.description':
      '关于 SimpleTime 最常见问题的解答：记录、小组件与 Siri、iCloud 同步与备份、隐私，以及 SimpleTime Pro。',

    'nav.features': '功能',
    'nav.devices': '设备',
    'nav.privacy': '隐私',
    'nav.pro': 'Pro',
    'nav.appstore': '在 App Store 查看',
    'appstore.download': '在 App Store 下载',
    'nav.faq': '常见问题',
    'nav.menu': '打开菜单',
    'nav.menu.close': '关闭菜单',
    'nav.language': '语言',
    'nav.theme': '深色模式',
    'skip.content': '跳到主要内容',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': '客户项目',
    'live.stop': '停止',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': '今天',

    'footer.tagline': '轻点一下，计时开始。',
    'footer.legal': '法律信息',
    'footer.product': '产品',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': '联系我们',
    'footer.imprint': '法律声明',
    'footer.privacy': '隐私',
    'footer.terms': '使用条款',
    'footer.accessibility': '辅助功能',
    'footer.copyright': '© {year} Luca Efinger. 保留所有权利。',

    'contact.title': '联系我们',
    'contact.subtitle': '有问题、建议或想法？欢迎来信。',
    'contact.email.label': '电子邮件',
    'contact.email.body':
      '请写信到下面的地址，我们会阅读每一封来信，并尽快回复。',
    'contact.response':
      '我们通常在几个工作日内回复。反馈错误时，请附上设备型号和 iOS 版本。',
    'contact.faq': '也许你的问题已经有了答案。',
    'contact.faq.link': '查看常见问题',

    'imprint.title': '法律声明',
    'imprint.country': '德国',
    'imprint.according': '依据德国 DDG 第 5 条的信息',
    'imprint.contact': '联系我们',
    'imprint.responsible': '依据 MStV 第 18 条第 2 款的内容负责人',
    'imprint.disclaimer.title': '免责声明',
    'imprint.disclaimer.liability.title': '内容责任',
    'imprint.disclaimer.liability.body':
      '作为服务提供者，我们依据一般法律规定对本网站上的自有内容负责。但依据 DSA 第 8 条，我们没有义务监控所传输或存储的第三方信息，也没有义务调查显示存在违法行为的情形。依据一般法律规定删除信息或阻止其使用的义务不受影响。相关责任仅自得知具体侵权行为之时起产生。一经得知此类侵权，我们将立即删除相关内容。',
    'imprint.disclaimer.links.title': '链接责任',
    'imprint.disclaimer.links.body':
      '我们的网站包含指向第三方外部网站的链接，我们无法影响其内容。因此我们对这些外部内容不承担任何责任。所链接页面的内容始终由其各自的提供者或运营者负责。设置链接时，我们已就可能的违法情形对相关页面进行了检查，当时未发现违法内容。但在没有具体侵权迹象的情况下，持续监控所链接页面的内容并不合理。一经得知侵权行为，我们将立即删除相关链接。',
    'imprint.disclaimer.copyright.title': '著作权',
    'imprint.disclaimer.copyright.body':
      '网站运营者在本网站上创作的内容和作品受德国著作权法保护。超出著作权法允许范围的复制、修改、传播和任何形式的利用，均须取得相应作者或创作者的书面同意。本网站的下载与复制仅限于私人非商业用途。',
  },
  hi: {
    'meta.title': 'SimpleTime – iPhone, iPad और Mac के लिए समय ट्रैकर',
    'meta.description':
      'एक टैप और घड़ी चालू। SimpleTime दर्ज करता है कि आपका समय कहाँ जाता है – न खाता, न विज्ञापन, न आपके डेटा की बिक्री। आपके घंटे आपके डिवाइस और आपके अपने iCloud में रहते हैं।',
    'meta.contact.description':
      'कोई सवाल, सुझाव या कोई गड़बड़ी बतानी है? SimpleTime को ईमेल लिखें — हम हर संदेश पढ़ते हैं और कुछ कार्यदिवसों में जवाब देते हैं।',
    'meta.privacy.description':
      'SimpleTime आपके डेटा को कैसे संभालता है: कोई खाता नहीं, कोई विज्ञापन नहीं। आपकी प्रविष्टियाँ आपके डिवाइस पर और आपके निजी iCloud में रहती हैं।',
    'meta.imprint.description':
      'simple-time.app की कानूनी जानकारी, जर्मन DDG की धारा 5 के अनुसार: संचालक, संपर्क विवरण और SimpleTime ऐप व वेबसाइट से जुड़ी उत्तरदायित्व जानकारी।',
    'meta.terms.description':
      'SimpleTime की उपयोग की शर्तें: मुफ़्त ऐप, App Store के ज़रिए SimpleTime Pro, सदस्यताएँ और ट्रायल हफ़्ता, आपका डेटा, दायित्व और लागू कानून।',
    'meta.accessibility.description':
      'SimpleTime और यह वेबसाइट कितने सुलभ हैं: VoiceOver, बड़ा टेक्स्ट, 41 भाषाएँ, स्वचालित जाँच – और जो अभी ठीक नहीं है।',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, जगहें, लक्ष्य और बहुत कुछ',
    'meta.pro.description':
      'SimpleTime मुफ़्त रहता है। Pro जोड़ता है: Apple Watch ऐप, समीक्षाएँ, जगहें, लक्ष्य, फ़ोकस फ़िल्टर और बहुत कुछ – मासिक, वार्षिक या एक बार हमेशा के लिए।',
    'meta.faq.title': 'सवाल और जवाब · SimpleTime',
    'meta.faq.description':
      'SimpleTime के बारे में सबसे आम सवालों के जवाब: ट्रैकिंग, विजेट और Siri, iCloud सिंक और बैकअप, निजता और SimpleTime Pro।',

    'nav.features': 'विशेषताएँ',
    'nav.devices': 'डिवाइस',
    'nav.privacy': 'गोपनीयता',
    'nav.pro': 'Pro',
    'nav.appstore': 'App Store पर देखें',
    'appstore.download': 'App Store से डाउनलोड करें',
    'nav.faq': 'सवाल',
    'nav.menu': 'मेन्यू खोलें',
    'nav.menu.close': 'मेन्यू बंद करें',
    'nav.language': 'भाषा',
    'nav.theme': 'डार्क मोड',
    'skip.content': 'सामग्री पर जाएँ',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'क्लाइंट प्रोजेक्ट',
    'live.stop': 'रोकें',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'आज',

    'footer.tagline': 'एक टैप और घड़ी चालू।',
    'footer.legal': 'कानूनी जानकारी',
    'footer.product': 'उत्पाद',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'संपर्क',
    'footer.imprint': 'कानूनी सूचना',
    'footer.privacy': 'निजता',
    'footer.terms': 'उपयोग की शर्तें',
    'footer.accessibility': 'सुलभता',
    'footer.copyright': '© {year} Luca Efinger. सर्वाधिकार सुरक्षित।',

    'contact.title': 'संपर्क',
    'contact.subtitle': 'सवाल, सुझाव या विचार? हमें लिखें।',
    'contact.email.label': 'ईमेल',
    'contact.email.body':
      'नीचे दिए पते पर हमें लिखें — हम हर संदेश पढ़ते हैं और जितनी जल्दी हो सके जवाब देते हैं।',
    'contact.response':
      'आम तौर पर हम कुछ कार्यदिवसों में जवाब देते हैं। गड़बड़ी बताते समय अपने डिवाइस का मॉडल और iOS संस्करण ज़रूर लिखें।',
    'contact.faq': 'हो सकता है, आपके सवाल का जवाब पहले से मौजूद हो।',
    'contact.faq.link': 'अक्सर पूछे जाने वाले सवाल देखें',

    'imprint.title': 'कानूनी सूचना',
    'imprint.country': 'जर्मनी',
    'imprint.according': 'जर्मन DDG की धारा 5 के अनुसार जानकारी',
    'imprint.contact': 'संपर्क',
    'imprint.responsible': 'MStV की धारा 18, उपधारा 2 के अनुसार सामग्री के लिए उत्तरदायी',
    'imprint.disclaimer.title': 'अस्वीकरण',
    'imprint.disclaimer.liability.title': 'सामग्री के लिए उत्तरदायित्व',
    'imprint.disclaimer.liability.body':
      'सेवा प्रदाता के रूप में हम इन पृष्ठों पर अपनी सामग्री के लिए सामान्य कानून के अनुसार उत्तरदायी हैं। हालाँकि DSA के अनुच्छेद 8 के अनुसार हम प्रेषित या संग्रहीत पराई जानकारी की निगरानी करने, या अवैध गतिविधि की ओर संकेत करने वाली परिस्थितियों की जाँच करने के लिए बाध्य नहीं हैं। सामान्य कानून के अनुसार जानकारी हटाने या उसके उपयोग को रोकने के दायित्व इससे अप्रभावित रहते हैं। इस संबंध में उत्तरदायित्व किसी ठोस उल्लंघन की जानकारी होने के क्षण से ही उत्पन्न होता है। ऐसे उल्लंघनों की जानकारी मिलते ही हम संबंधित सामग्री तुरंत हटा देंगे।',
    'imprint.disclaimer.links.title': 'लिंक के लिए उत्तरदायित्व',
    'imprint.disclaimer.links.body':
      'हमारी पेशकश में तीसरे पक्ष की बाहरी वेबसाइटों के लिंक शामिल हैं, जिनकी सामग्री पर हमारा कोई प्रभाव नहीं है। इसलिए हम इन बाहरी सामग्रियों के लिए कोई उत्तरदायित्व नहीं ले सकते। लिंक किए गए पृष्ठों की सामग्री के लिए हमेशा उनका संबंधित प्रदाता या संचालक उत्तरदायी होता है। लिंक जोड़ते समय संबंधित पृष्ठों की संभावित कानूनी उल्लंघनों के लिए जाँच की गई थी और उस समय कोई अवैध सामग्री नहीं दिखी थी। फिर भी, उल्लंघन के ठोस संकेत के बिना लिंक किए गए पृष्ठों की सामग्री की लगातार निगरानी करना उचित रूप से अपेक्षित नहीं है। उल्लंघनों की जानकारी मिलते ही हम संबंधित लिंक तुरंत हटा देंगे।',
    'imprint.disclaimer.copyright.title': 'कॉपीराइट',
    'imprint.disclaimer.copyright.body':
      'इन पृष्ठों पर साइट संचालक द्वारा बनाई गई सामग्री और कृतियाँ जर्मन कॉपीराइट कानून के अधीन हैं। कॉपीराइट की सीमाओं से बाहर प्रतिलिपि, संशोधन, वितरण और किसी भी प्रकार के उपयोग के लिए संबंधित लेखक या रचनाकार की लिखित सहमति आवश्यक है। इस साइट के डाउनलोड और प्रतिलिपियाँ केवल निजी, गैर-व्यावसायिक उपयोग के लिए अनुमत हैं।',
  },
  nl: {
    'meta.title': 'SimpleTime – Tijdregistratie voor iPhone, iPad en Mac',
    'meta.description':
      'Eén tik start de klok. SimpleTime registreert waar je tijd naartoe gaat – geen account, geen advertenties, geen verkoop van je gegevens. Je uren blijven op je apparaat en in je iCloud.',
    'meta.contact.description':
      'Een vraag, suggestie of bug om te melden? Mail SimpleTime — we lezen elk bericht en antwoorden binnen enkele werkdagen.',
    'meta.privacy.description':
      'Hoe SimpleTime met je gegevens omgaat: geen account, geen advertenties. Je registraties blijven op je apparaten en in je persoonlijke iCloud.',
    'meta.imprint.description':
      'Colofon van simple-time.app volgens § 5 DDG — exploitant, contactgegevens en aansprakelijkheidsinformatie voor de SimpleTime-app en de site.',
    'meta.terms.description':
      'De gebruiksvoorwaarden van SimpleTime: een gratis app, SimpleTime Pro via de App Store, abonnementen en proefweek, je gegevens, aansprakelijkheid en toepasselijk recht.',
    'meta.accessibility.description':
      'Hoe toegankelijk SimpleTime en deze website zijn: VoiceOver, grote tekst, 41 talen, automatische controles – en wat nog niet goed is.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, locaties, doelen en meer',
    'meta.pro.description':
      'SimpleTime blijft gratis. Met Pro krijg je de app voor Apple Watch, terugblikken, locaties, doelen, een focusfilter en meer – per maand, per jaar of eenmalig.',
    'meta.faq.title': 'Veelgestelde vragen · SimpleTime',
    'meta.faq.description':
      'Antwoorden op de meest gestelde vragen over SimpleTime: registreren, widgets en Siri, iCloud-synchronisatie en back-ups, privacy en SimpleTime Pro.',

    'nav.features': 'Functies',
    'nav.devices': 'Apparaten',
    'nav.privacy': 'Privacy',
    'nav.pro': 'Pro',
    'nav.appstore': 'Bekijk in de App Store',
    'appstore.download': 'Download in de App Store',
    'nav.faq': 'Vragen',
    'nav.menu': 'Menu openen',
    'nav.menu.close': 'Menu sluiten',
    'nav.language': 'Taal',
    'nav.theme': 'Donkere modus',
    'skip.content': 'Naar de inhoud',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Klantproject',
    'live.stop': 'Stop',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Vandaag',

    'footer.tagline': 'Eén tik start de klok.',
    'footer.legal': 'Juridische informatie',
    'footer.product': 'Product',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Contact',
    'footer.imprint': 'Colofon',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Gebruiksvoorwaarden',
    'footer.accessibility': 'Toegankelijkheid',
    'footer.copyright': '© {year} Luca Efinger. Alle rechten voorbehouden.',

    'contact.title': 'Contact',
    'contact.subtitle': 'Vragen, suggesties of ideeën? Laat het ons weten.',
    'contact.email.label': 'E-mail',
    'contact.email.body':
      'Schrijf ons op onderstaand adres — we lezen elk bericht en antwoorden zo snel mogelijk.',
    'contact.response':
      'Meestal antwoorden we binnen enkele werkdagen. Vermeld bij een bug je apparaatmodel en je iOS-versie.',
    'contact.faq': 'Misschien is je vraag al beantwoord.',
    'contact.faq.link': 'Naar de veelgestelde vragen',

    'imprint.title': 'Colofon',
    'imprint.country': 'Duitsland',
    'imprint.according': 'Gegevens volgens § 5 DDG',
    'imprint.contact': 'Contact',
    'imprint.responsible': 'Verantwoordelijk voor de inhoud volgens § 18, lid 2 MStV',
    'imprint.disclaimer.title': 'Disclaimer',
    'imprint.disclaimer.liability.title': 'Aansprakelijkheid voor de inhoud',
    'imprint.disclaimer.liability.body':
      'Als dienstverlener zijn wij volgens de algemene wetgeving verantwoordelijk voor onze eigen inhoud op deze pagina’s. Volgens art. 8 DSA zijn wij echter niet verplicht doorgegeven of opgeslagen informatie van derden te controleren of onderzoek te doen naar omstandigheden die op een onrechtmatige activiteit wijzen. Verplichtingen tot verwijdering of blokkering van het gebruik van informatie volgens de algemene wetgeving blijven onverlet. Aansprakelijkheid op dit punt ontstaat pas vanaf het moment waarop wij kennis krijgen van een concrete inbreuk. Zodra wij van dergelijke inbreuken op de hoogte zijn, verwijderen wij de betreffende inhoud onmiddellijk.',
    'imprint.disclaimer.links.title': 'Aansprakelijkheid voor links',
    'imprint.disclaimer.links.body':
      'Ons aanbod bevat links naar externe websites van derden, op de inhoud waarvan wij geen invloed hebben. Daarom kunnen wij voor die externe inhoud geen aansprakelijkheid aanvaarden. Voor de inhoud van de gelinkte pagina’s is steeds de betreffende aanbieder of beheerder verantwoordelijk. De gelinkte pagina’s zijn op het moment van linken gecontroleerd op mogelijke wetsovertredingen; onrechtmatige inhoud was toen niet zichtbaar. Permanente controle van de inhoud van gelinkte pagina’s is echter zonder concrete aanwijzingen van een inbreuk niet redelijk. Zodra wij van inbreuken op de hoogte zijn, verwijderen wij de betreffende links onmiddellijk.',
    'imprint.disclaimer.copyright.title': 'Auteursrecht',
    'imprint.disclaimer.copyright.body':
      'De door de sitebeheerder op deze pagina’s gemaakte inhoud en werken vallen onder het Duitse auteursrecht. Verveelvoudiging, bewerking, verspreiding en elke vorm van exploitatie buiten de grenzen van het auteursrecht vereisen de schriftelijke toestemming van de betreffende auteur of maker. Downloads en kopieën van deze site zijn uitsluitend toegestaan voor privé, niet-commercieel gebruik.',
  },
  sv: {
    'meta.title': 'SimpleTime – Tidrapportering för iPhone, iPad och Mac',
    'meta.description':
      'En tryckning startar tiden. SimpleTime registrerar vad din tid går till – inget konto, inga annonser, ingen försäljning av dina data. Dina timmar stannar på din enhet och i ditt iCloud.',
    'meta.contact.description':
      'Har du en fråga, en synpunkt eller ett fel att rapportera? Mejla SimpleTime – vi läser varje meddelande och svarar inom några arbetsdagar.',
    'meta.privacy.description':
      'Så hanterar SimpleTime dina data: inget konto, ingen reklam. Dina tidposter stannar på dina enheter och i din privata iCloud.',
    'meta.imprint.description':
      'Ansvarig utgivare för simple-time.app enligt § 5 DDG – innehavare, kontaktuppgifter och ansvarsinformation för appen och webbplatsen SimpleTime.',
    'meta.terms.description':
      'Användarvillkoren för SimpleTime: en gratis app, SimpleTime Pro via App Store, prenumerationer och provvecka, dina data, ansvar och tillämplig lag.',
    'meta.accessibility.description':
      'Hur tillgängliga SimpleTime och den här webbplatsen är: VoiceOver, stor text, 41 språk, automatiska kontroller – och det som inte är bra än.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, platser, mål och mer',
    'meta.pro.description':
      'SimpleTime förblir gratis. Pro lägger till appen för Apple Watch, tillbakablickar, platser, mål, ett fokusfilter och mer – per månad, per år eller en gång för alltid.',
    'meta.faq.title': 'Vanliga frågor · SimpleTime',
    'meta.faq.description':
      'Svar på de vanligaste frågorna om SimpleTime: registrering, widgetar och Siri, iCloud-synk och säkerhetskopior, integritet och SimpleTime Pro.',

    'nav.features': 'Funktioner',
    'nav.devices': 'Enheter',
    'nav.privacy': 'Integritet',
    'nav.pro': 'Pro',
    'nav.appstore': 'Visa i App Store',
    'appstore.download': 'Hämta i App Store',
    'nav.faq': 'Frågor',
    'nav.menu': 'Öppna menyn',
    'nav.menu.close': 'Stäng menyn',
    'nav.language': 'Språk',
    'nav.theme': 'Mörkt läge',
    'skip.content': 'Hoppa till innehållet',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Kundprojekt',
    'live.stop': 'Stoppa',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'I dag',

    'footer.tagline': 'Ett tryck startar klockan.',
    'footer.legal': 'Juridisk information',
    'footer.product': 'Produkt',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Kontakt',
    'footer.imprint': 'Ansvarig utgivare',
    'footer.privacy': 'Integritet',
    'footer.terms': 'Användarvillkor',
    'footer.accessibility': 'Tillgänglighet',
    'footer.copyright': '© {year} Luca Efinger. Med ensamrätt.',

    'contact.title': 'Kontakt',
    'contact.subtitle': 'Frågor, synpunkter eller idéer? Hör av dig.',
    'contact.email.label': 'E-post',
    'contact.email.body':
      'Skriv till adressen nedan – vi läser varje meddelande och svarar så snart vi kan.',
    'contact.response':
      'Vi svarar oftast inom några arbetsdagar. Vid felrapporter, ange gärna enhetsmodell och iOS-version.',
    'contact.faq': 'Din fråga kanske redan har besvarats.',
    'contact.faq.link': 'Till vanliga frågor',

    'imprint.title': 'Ansvarig utgivare',
    'imprint.country': 'Tyskland',
    'imprint.according': 'Uppgifter enligt § 5 DDG',
    'imprint.contact': 'Kontakt',
    'imprint.responsible': 'Ansvarig för innehållet enligt § 18 st. 2 MStV',
    'imprint.disclaimer.title': 'Ansvarsfriskrivning',
    'imprint.disclaimer.liability.title': 'Ansvar för innehållet',
    'imprint.disclaimer.liability.body':
      'Som tjänsteleverantör ansvarar vi för vårt eget innehåll på dessa sidor enligt allmänna bestämmelser. Enligt artikel 8 i DSA är vi dock inte skyldiga att övervaka överförd eller lagrad information från tredje part, eller att undersöka omständigheter som tyder på olaglig verksamhet. Skyldigheter att avlägsna eller blockera användning av information enligt allmänna bestämmelser påverkas inte av detta. Ansvar i detta avseende uppstår först från den tidpunkt då vi får kännedom om en konkret överträdelse. Så snart vi får kännedom om sådana överträdelser tar vi omedelbart bort innehållet i fråga.',
    'imprint.disclaimer.links.title': 'Ansvar för länkar',
    'imprint.disclaimer.links.body':
      'Vårt erbjudande innehåller länkar till externa webbplatser som tillhör tredje part och vars innehåll vi inte kan påverka. Vi kan därför inte ta något ansvar för detta externa innehåll. För innehållet på de länkade sidorna ansvarar alltid respektive leverantör eller operatör. De länkade sidorna kontrollerades vid länkningstillfället med avseende på eventuella lagöverträdelser; något olagligt innehåll kunde då inte konstateras. En fortlöpande kontroll av innehållet på de länkade sidorna är dock inte rimlig utan konkreta indikationer på en överträdelse. Så snart vi får kännedom om överträdelser tar vi omedelbart bort länkarna i fråga.',
    'imprint.disclaimer.copyright.title': 'Upphovsrätt',
    'imprint.disclaimer.copyright.body':
      'Det innehåll och de verk som webbplatsens operatör skapat på dessa sidor omfattas av tysk upphovsrätt. Mångfaldigande, bearbetning, spridning och varje form av utnyttjande utanför upphovsrättens gränser kräver skriftligt medgivande från respektive upphovsman eller skapare. Nedladdningar och kopior av denna webbplats är endast tillåtna för privat, icke-kommersiellt bruk.',
  },
  uk: {
    'meta.title': 'SimpleTime – облік часу для iPhone, iPad і Mac',
    'meta.description':
      'Один дотик запускає годинник. SimpleTime записує, на що йде ваш час, — без облікового запису, реклами й продажу ваших даних. Ваші години лишаються на пристрої та у вашому iCloud.',
    'meta.contact.description':
      'Маєте запитання, відгук або повідомлення про помилку? Напишіть SimpleTime на електронну пошту — ми читаємо кожен лист і відповідаємо протягом кількох робочих днів.',
    'meta.privacy.description':
      'Як SimpleTime поводиться з вашими даними: без облікового запису, без реклами. Ваші записи зберігаються на ваших пристроях і в особистому iCloud.',
    'meta.imprint.description':
      'Вихідні дані simple-time.app згідно з § 5 DDG: власник, контактні дані та відомості про відповідальність щодо застосунку й сайту SimpleTime.',
    'meta.terms.description':
      'Умови використання SimpleTime: безкоштовний застосунок, SimpleTime Pro через App Store, підписки й пробний тиждень, ваші дані, відповідальність і застосовне право.',
    'meta.accessibility.description':
      'Наскільки доступні SimpleTime і цей сайт: VoiceOver, великий текст, 41 мова, автоматичні перевірки — і що поки не так.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, місця, цілі та багато іншого',
    'meta.pro.description':
      'SimpleTime лишається безкоштовним. Pro додає застосунок для Apple Watch, підсумки, місця, цілі, фокус-фільтр та багато іншого — на місяць, на рік або назавжди.',
    'meta.faq.title': 'Запитання й відповіді · SimpleTime',
    'meta.faq.description':
      'Відповіді на поширені запитання про SimpleTime: запис часу, віджети й Siri, синхронізація з iCloud і резервні копії, конфіденційність і SimpleTime Pro.',

    'nav.features': 'Можливості',
    'nav.devices': 'Пристрої',
    'nav.privacy': 'Конфіденційність',
    'nav.pro': 'Pro',
    'nav.appstore': 'Переглянути в App Store',
    'appstore.download': 'Завантажити в App Store',
    'nav.faq': 'Запитання',
    'nav.menu': 'Відкрити меню',
    'nav.menu.close': 'Закрити меню',
    'nav.language': 'Мова',
    'nav.theme': 'Темний режим',
    'skip.content': 'Перейти до вмісту',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Проєкт клієнта',
    'live.stop': 'Зупинити',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Сьогодні',

    'footer.tagline': 'Один дотик запускає годинник.',
    'footer.legal': 'Правова інформація',
    'footer.product': 'Продукт',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Контакти',
    'footer.imprint': 'Вихідні дані',
    'footer.privacy': 'Конфіденційність',
    'footer.terms': 'Умови використання',
    'footer.accessibility': 'Доступність',
    'footer.copyright': '© {year} Luca Efinger. Усі права захищено.',

    'contact.title': 'Контакти',
    'contact.subtitle': 'Запитання, відгуки чи ідеї? Напишіть нам.',
    'contact.email.label': 'Електронна пошта',
    'contact.email.body':
      'Напишіть нам на адресу нижче — ми читаємо кожен лист і відповідаємо якомога швидше.',
    'contact.response':
      'Зазвичай ми відповідаємо протягом кількох робочих днів. Повідомляючи про помилку, вкажіть модель пристрою та версію iOS.',
    'contact.faq': 'Можливо, на ваше запитання вже є відповідь.',
    'contact.faq.link': 'До поширених запитань',

    'imprint.title': 'Вихідні дані',
    'imprint.country': 'Німеччина',
    'imprint.according': 'Відомості згідно з § 5 DDG',
    'imprint.contact': 'Контакти',
    'imprint.responsible': 'Відповідальний за зміст згідно з § 18, абз. 2 MStV',
    'imprint.disclaimer.title': 'Відмова від відповідальності',
    'imprint.disclaimer.liability.title': 'Відповідальність за зміст',
    'imprint.disclaimer.liability.body':
      'Як постачальник послуг ми відповідаємо за власні матеріали на цих сторінках відповідно до загальних норм права. Проте згідно зі ст. 8 DSA ми не зобовʼязані відстежувати передану або збережену чужу інформацію чи зʼясовувати обставини, що вказують на протиправну діяльність. Обовʼязки щодо видалення або блокування використання інформації відповідно до загальних норм права залишаються чинними. Відповідальність у цій частині виникає лише з моменту, коли нам стає відомо про конкретне порушення. Дізнавшись про такі порушення, ми негайно видалимо відповідні матеріали.',
    'imprint.disclaimer.links.title': 'Відповідальність за посилання',
    'imprint.disclaimer.links.body':
      'Наша пропозиція містить посилання на зовнішні сайти третіх осіб, на зміст яких ми не маємо впливу. Тому ми не можемо нести відповідальність за ці зовнішні матеріали. За зміст сторінок, на які ведуть посилання, завжди відповідає їхній постачальник або оператор. На момент розміщення посилань сторінки було перевірено на можливі порушення закону; протиправного змісту тоді не виявлено. Однак постійний контроль змісту сторінок, на які ведуть посилання, без конкретних ознак порушення не є доцільним. Дізнавшись про порушення, ми негайно видалимо відповідні посилання.',
    'imprint.disclaimer.copyright.title': 'Авторське право',
    'imprint.disclaimer.copyright.body':
      'Матеріали та твори, створені оператором сайту на цих сторінках, охороняються авторським правом Німеччини. Відтворення, перероблення, поширення та будь-яке використання поза межами, встановленими авторським правом, потребують письмової згоди відповідного автора або створювача. Завантаження та копіювання цього сайту дозволені лише для приватного некомерційного використання.',
  },
  el: {
    'meta.title': 'SimpleTime – Καταγραφή ώρας για iPhone, iPad και Mac',
    'meta.description':
      'Το SimpleTime καταγράφει πού πάει ο χρόνος σου – χωρίς λογαριασμό, διαφημίσεις ή πώληση των δεδομένων σου. Οι ώρες σου μένουν στη συσκευή και στο iCloud σου.',
    'meta.contact.description':
      'Έχετε μια ερώτηση, μια πρόταση ή ένα σφάλμα να αναφέρετε; Γράψτε στο SimpleTime με e-mail — διαβάζουμε κάθε μήνυμα και απαντάμε μέσα σε λίγες εργάσιμες ημέρες.',
    'meta.privacy.description':
      'Πώς χειρίζεται το SimpleTime τα δεδομένα σου: χωρίς λογαριασμό και διαφημίσεις. Οι εγγραφές σου μένουν στις συσκευές και στο iCloud σου.',
    'meta.imprint.description':
      'Νομικά στοιχεία του simple-time.app σύμφωνα με το § 5 DDG: κάτοχος, στοιχεία επικοινωνίας και πληροφορίες ευθύνης για την εφαρμογή και τον ιστότοπο SimpleTime.',
    'meta.terms.description':
      'Οι όροι χρήσης του SimpleTime: μια δωρεάν εφαρμογή, το SimpleTime Pro μέσω του App Store, συνδρομές και δοκιμαστική εβδομάδα, τα δεδομένα σου, ευθύνη και εφαρμοστέο δίκαιο.',
    'meta.accessibility.description':
      'Πόσο προσβάσιμα είναι το SimpleTime και αυτός ο ιστότοπος: VoiceOver, μεγάλο κείμενο, 41 γλώσσες, αυτόματοι έλεγχοι – και τι δεν είναι ακόμη καλό.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, μέρη, στόχοι και άλλα',
    'meta.pro.description':
      'Το SimpleTime μένει δωρεάν. Το Pro προσθέτει την εφαρμογή Apple Watch, ανασκοπήσεις, μέρη, στόχους, φίλτρο συγκέντρωσης κ.ά. – μηνιαία, ετήσια ή μία φορά για πάντα.',
    'meta.faq.title': 'Ερωτήσεις και απαντήσεις · SimpleTime',
    'meta.faq.description':
      'Απαντήσεις στις πιο συχνές ερωτήσεις για το SimpleTime: καταγραφή, widget και Siri, συγχρονισμός iCloud και αντίγραφα ασφαλείας, απόρρητο και SimpleTime Pro.',

    'nav.features': 'Δυνατότητες',
    'nav.devices': 'Συσκευές',
    'nav.privacy': 'Απόρρητο',
    'nav.pro': 'Pro',
    'nav.appstore': 'Δείτε στο App Store',
    'appstore.download': 'Λήψη από το App Store',
    'nav.faq': 'Ερωτήσεις',
    'nav.menu': 'Άνοιγμα μενού',
    'nav.menu.close': 'Κλείσιμο μενού',
    'nav.language': 'Γλώσσα',
    'nav.theme': 'Σκούρα εμφάνιση',
    'skip.content': 'Μετάβαση στο περιεχόμενο',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'Έργο πελάτη',
    'live.stop': 'Διακοπή',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'Σήμερα',

    'footer.tagline': 'Ένα άγγιγμα ξεκινά το ρολόι.',
    'footer.legal': 'Νομικές πληροφορίες',
    'footer.product': 'Προϊόν',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'Επικοινωνία',
    'footer.imprint': 'Νομικά στοιχεία',
    'footer.privacy': 'Απόρρητο',
    'footer.terms': 'Όροι χρήσης',
    'footer.accessibility': 'Προσβασιμότητα',
    'footer.copyright': '© {year} Luca Efinger. Με επιφύλαξη παντός δικαιώματος.',

    'contact.title': 'Επικοινωνία',
    'contact.subtitle': 'Ερωτήσεις, σχόλια ή ιδέες; Γράψτε μας.',
    'contact.email.label': 'E-mail',
    'contact.email.body':
      'Γράψτε μας στη διεύθυνση παρακάτω — διαβάζουμε κάθε μήνυμα και απαντάμε όσο πιο γρήγορα μπορούμε.',
    'contact.response':
      'Συνήθως απαντάμε μέσα σε λίγες εργάσιμες ημέρες. Για αναφορά σφάλματος, αναφέρετε το μοντέλο της συσκευής και την έκδοση iOS.',
    'contact.faq': 'Ίσως η ερώτησή σου έχει ήδη απαντηθεί.',
    'contact.faq.link': 'Δες τις συχνές ερωτήσεις',

    'imprint.title': 'Νομικά στοιχεία',
    'imprint.country': 'Γερμανία',
    'imprint.according': 'Στοιχεία σύμφωνα με το § 5 DDG',
    'imprint.contact': 'Επικοινωνία',
    'imprint.responsible': 'Υπεύθυνος για το περιεχόμενο σύμφωνα με το § 18, παρ. 2 MStV',
    'imprint.disclaimer.title': 'Αποποίηση ευθύνης',
    'imprint.disclaimer.liability.title': 'Ευθύνη για το περιεχόμενο',
    'imprint.disclaimer.liability.body':
      'Ως πάροχος υπηρεσιών ευθυνόμαστε για το δικό μας περιεχόμενο σε αυτές τις σελίδες σύμφωνα με τις γενικές διατάξεις. Ωστόσο, σύμφωνα με το άρθρο 8 DSA δεν υποχρεούμαστε να παρακολουθούμε πληροφορίες τρίτων που μεταδίδονται ή αποθηκεύονται, ούτε να ερευνούμε περιστάσεις που υποδεικνύουν παράνομη δραστηριότητα. Οι υποχρεώσεις αφαίρεσης ή φραγής της χρήσης πληροφοριών βάσει των γενικών διατάξεων παραμένουν ανεπηρέαστες. Ευθύνη ως προς αυτό προκύπτει μόνο από τη στιγμή που λαμβάνουμε γνώση συγκεκριμένης παράβασης. Μόλις λάβουμε γνώση τέτοιων παραβάσεων, αφαιρούμε αμέσως το σχετικό περιεχόμενο.',
    'imprint.disclaimer.links.title': 'Ευθύνη για τους συνδέσμους',
    'imprint.disclaimer.links.body':
      'Η προσφορά μας περιέχει συνδέσμους προς εξωτερικούς ιστότοπους τρίτων, στο περιεχόμενο των οποίων δεν έχουμε επιρροή. Για τον λόγο αυτό δεν μπορούμε να αναλάβουμε καμία ευθύνη για αυτά τα εξωτερικά περιεχόμενα. Για το περιεχόμενο των συνδεδεμένων σελίδων ευθύνεται πάντοτε ο εκάστοτε πάροχος ή διαχειριστής τους. Οι συνδεδεμένες σελίδες ελέγχθηκαν κατά τη στιγμή της σύνδεσης για πιθανές παραβάσεις· παράνομο περιεχόμενο δεν ήταν τότε αναγνωρίσιμο. Ωστόσο, μόνιμος έλεγχος του περιεχομένου των συνδεδεμένων σελίδων δεν είναι εύλογος χωρίς συγκεκριμένες ενδείξεις παράβασης. Μόλις λάβουμε γνώση παραβάσεων, αφαιρούμε αμέσως τους σχετικούς συνδέσμους.',
    'imprint.disclaimer.copyright.title': 'Πνευματικά δικαιώματα',
    'imprint.disclaimer.copyright.body':
      'Τα περιεχόμενα και τα έργα που δημιουργήθηκαν από τον διαχειριστή του ιστότοπου σε αυτές τις σελίδες υπόκεινται στο γερμανικό δίκαιο πνευματικής ιδιοκτησίας. Η αναπαραγωγή, επεξεργασία, διανομή και κάθε είδους εκμετάλλευση πέρα από τα όρια του δικαίου πνευματικής ιδιοκτησίας απαιτούν τη γραπτή συγκατάθεση του εκάστοτε δημιουργού. Οι λήψεις και τα αντίγραφα αυτού του ιστότοπου επιτρέπονται μόνο για ιδιωτική, μη εμπορική χρήση.',
  },
  he: {
    'meta.title': 'SimpleTime – מעקב זמן ל‑iPhone, ל‑iPad ול‑Mac',
    'meta.description':
      'הקשה אחת מפעילה את השעון. SimpleTime מתעד לאן הולך הזמן שלך – בלי חשבון, בלי פרסומות, בלי מכירת הנתונים שלך. השעות שלך נשארות במכשיר שלך וב‑iCloud שלך.',
    'meta.contact.description':
      'יש לכם שאלה, הצעה או באג לדווח עליו? כתבו ל‑SimpleTime במייל — אנחנו קוראים כל הודעה ומשיבים בתוך כמה ימי עסקים.',
    'meta.privacy.description':
      'איך SimpleTime מטפל בנתונים שלך: בלי חשבון, בלי פרסומות. הרשומות שלך נשארות במכשירים שלך וב‑iCloud הפרטי שלך.',
    'meta.imprint.description':
      'פרטים משפטיים של simple-time.app לפי § 5 DDG: בעלים, פרטי התקשרות ומידע על אחריות עבור אפליקציית SimpleTime והאתר.',
    'meta.terms.description':
      'תנאי השימוש של SimpleTime: אפליקציה בחינם, SimpleTime Pro דרך ה‑App Store, מינויים ושבוע ניסיון, הנתונים שלך, אחריות והדין החל.',
    'meta.accessibility.description':
      'עד כמה SimpleTime והאתר הזה נגישים: VoiceOver, טקסט גדול, 41 שפות, בדיקות אוטומטיות – ומה שעוד לא טוב.',
    'meta.pro.title': 'SimpleTime Pro – Apple Watch, מקומות, יעדים ועוד',
    'meta.pro.description':
      'SimpleTime נשאר חינם. Pro מוסיף את אפליקציית ה‑Apple Watch, סיכומים, מקומות, יעדים, מסנן מיקוד ועוד – לחודש, לשנה או פעם אחת לתמיד.',
    'meta.faq.title': 'שאלות ותשובות · SimpleTime',
    'meta.faq.description':
      'תשובות לשאלות הנפוצות ביותר על SimpleTime: מדידה, ווידג׳טים ו‑Siri, סנכרון iCloud וגיבויים, פרטיות ו‑SimpleTime Pro.',

    'nav.features': 'תכונות',
    'nav.devices': 'מכשירים',
    'nav.privacy': 'פרטיות',
    'nav.pro': 'Pro',
    'nav.appstore': 'הצגה ב‑App Store',
    'appstore.download': 'הורדה מ‑App Store',
    'nav.faq': 'שאלות נפוצות',
    'nav.menu': 'פתיחת תפריט',
    'nav.menu.close': 'סגירת תפריט',
    'nav.language': 'שפה',
    'nav.theme': 'תצוגה כהה',
    'skip.content': 'דילוג לתוכן',

    // The Live Activity in the hero – the app's own strings and sample task.
    'live.task': 'פרויקט לקוח',
    'live.stop': 'עצירה',

    // Over the day in the hero and inside the ring at the end – the app's word.
    'day.today': 'היום',

    'footer.tagline': 'הקשה אחת מפעילה את השעון.',
    'footer.legal': 'מידע משפטי',
    'footer.product': 'מוצר',
    'footer.pro': 'SimpleTime Pro',
    'footer.appstore': 'App Store',
    'footer.contact': 'צור קשר',
    'footer.imprint': 'פרטים משפטיים',
    'footer.privacy': 'פרטיות',
    'footer.terms': 'תנאי שימוש',
    'footer.accessibility': 'נגישות',
    'footer.copyright': '© {year} Luca Efinger. כל הזכויות שמורות.',

    'contact.title': 'צור קשר',
    'contact.subtitle': 'שאלות, משוב או רעיונות? כתבו לנו.',
    'contact.email.label': 'דוא״ל',
    'contact.email.body':
      'כתבו לנו לכתובת שלמטה — אנחנו קוראים כל הודעה ומשיבים במהירות האפשרית.',
    'contact.response':
      'בדרך כלל אנחנו משיבים בתוך כמה ימי עסקים. אם אתם מדווחים על באג, ציינו את דגם המכשיר ואת גרסת iOS.',
    'contact.faq': 'אולי כבר יש תשובה לשאלה שלך.',
    'contact.faq.link': 'לשאלות הנפוצות',

    'imprint.title': 'פרטים משפטיים',
    'imprint.country': 'גרמניה',
    'imprint.according': 'פרטים לפי § 5 DDG',
    'imprint.contact': 'צור קשר',
    'imprint.responsible': 'אחראי לתוכן לפי § 18 סעיף 2 MStV',
    'imprint.disclaimer.title': 'הצהרת אחריות',
    'imprint.disclaimer.liability.title': 'אחריות לתוכן',
    'imprint.disclaimer.liability.body':
      'כספק שירות אנו אחראים לתוכן שלנו בעמודים אלה לפי ההוראות הכלליות. עם זאת, לפי סעיף 8 ל‑DSA איננו מחויבים לפקח על מידע של צדדים שלישיים המועבר או מאוחסן אצלנו, או לחקור נסיבות המצביעות על פעילות בלתי חוקית. חובות להסרת מידע או לחסימת השימוש בו לפי ההוראות הכלליות נותרות בעינן. אחריות בעניין זה קמה רק ממועד היוודע הפרה קונקרטית. עם היוודע הפרות כאלה נסיר את התוכן הרלוונטי לאלתר.',
    'imprint.disclaimer.links.title': 'אחריות לקישורים',
    'imprint.disclaimer.links.body':
      'ההיצע שלנו כולל קישורים לאתרים חיצוניים של צדדים שלישיים, שעל תוכנם אין לנו כל השפעה. לכן איננו יכולים לקבל על עצמנו אחריות לתכנים חיצוניים אלה. לתוכן העמודים המקושרים אחראי תמיד הספק או המפעיל של אותם עמודים. העמודים המקושרים נבדקו במועד הקישור לאיתור הפרות אפשריות; תוכן בלתי חוקי לא היה ניתן לזיהוי באותה עת. עם זאת, פיקוח מתמיד על תוכן העמודים המקושרים אינו סביר ללא אינדיקציה קונקרטית להפרה. עם היוודע הפרות נסיר את הקישורים הרלוונטיים לאלתר.',
    'imprint.disclaimer.copyright.title': 'זכויות יוצרים',
    'imprint.disclaimer.copyright.body':
      'התכנים והיצירות שנוצרו על ידי מפעיל האתר בעמודים אלה כפופים לדיני זכויות היוצרים הגרמניים. שכפול, עיבוד, הפצה וכל צורת ניצול מעבר לגבולות דיני זכויות היוצרים מחייבים הסכמה בכתב של היוצר הרלוונטי. הורדות והעתקים של אתר זה מותרים לשימוש פרטי ולא מסחרי בלבד.',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];
