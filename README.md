# Kleiderspenden-Registrierung – Web-Portal

**live-Demo:** [Hier klicken, um zur Webseite zu kommen](https://deine-webseiten-url.de)

**Projekt:** Öffentliches Portal zur Registrierung von Kleiderspenden  
**Technologien:** HTML5, CSS3, Bootstrap 5, Vanilla JavaScript  
**Zweck:** Fallstudie im Rahmen des Moduls "Programmierung von Webanwendungsoberflächen"

## 1. Zielsetzung
Dieses Web-Portal ermöglicht es Spendenden, ihre Kleiderspende digital zu registrieren. Dabei kann transparent ausgewählt werden, für welche aktuelle Krisenregion die Spende bestimmt ist. Die Anwendung unterscheidet dynamisch zwischen einer persönlichen Übergabe in der Geschäftsstelle (Leipzig) und der Abholung durch ein Sammelfahrzeug.

## 2. Technische Highlights & Features
- **Responsive Design:** Vollständige mobile Optimierung durch den "Mobile-First"-Ansatz von Bootstrap 5.
- **State Management (Vanilla JS):** Dynamisches Ein- und Ausblenden von Formularfeldern basierend auf der gewählten Übergabeart.
- **Clientseitige Validierung:** Das Sammelfahrzeug kann nur im Einzugsgebiet der Geschäftsstelle (PLZ-Region 04xxx) angefordert werden.
- **XSS-Prävention:** Alle Formulareingaben werden bei der Ausgabe auf der Bestätigungsseite konsequent über `textContent` verarbeitet, um DOM-basiertes Cross-Site Scripting auszuschließen.
- **Internationalisierung (Barrierefreiheit):** Das Portal verfügt über einen dynamischen LTR/RTL-Umschalter (Left-to-Right / Right-to-Left), der die Leserichtung des Layouts via JavaScript anpasst.

## 3. Dateistruktur
- `index.html` – Semantische HTML-Struktur und Formular-Layout
- `styles.css` – Custom CSS für das Branding und Farbschema
- `app.js` – Clientseitige Logik (Validierung, Event-Listener, DOM-Manipulation)
- `impressum.html` & `datenschutz.html` – Rechtliche Unterseiten

## 4. Nutzungshinweis
Da es sich um eine Frontend-Fallstudie handelt, werden die Spendenregistrierungen nicht in einer Datenbank gespeichert. Die Daten werden temporär im DOM validiert und nach erfolgreicher Prüfung auf einer dynamisch generierten Erfolgsseite ausgegeben. Um das Projekt zu testen, reicht es aus, die Datei index.html direkt im Webbrowser zu öffnen.
