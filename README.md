# Projektdokumentation - [Projekttitel]

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage
Studierende und junge Berufstätige reagieren im Alltag häufig emotional auf belastende Situationen wie Stress, Zeitdruck oder zwischenmenschliche Konflikte. Diese Reaktionen werden jedoch selten festgehalten und können im Nachhinein kaum eingeordnet oder reflektiert werden. Bestehende digitale Lösungen sind in solchen Momenten oft zu komplex und zeitintensiv, weshalb sie im Alltag kaum konsequent genutzt werden.

- **Problem:** Es fehlt eine einfache und schnelle Möglichkeit, emotionale Trigger im Moment festzuhalten, sodass wiederkehrende Muster sichtbar werden und die Selbstreflexion unterstützt wird. Beispiel: Jemand wird in einer Prüfungswoche wiederholt von Versagensangst überwältigt, bemerkt dieses Muster aber nicht, weil die Momente nicht festgehalten wurden.
- **Ziele:**
  - Emotionale Reaktionen schnell und ohne Aufwand erfassen
  - Eigene Gefühle und Auslöser (Trigger) besser verstehen
  - Wiederkehrende Muster im emotionalen Erleben sichtbar machen
  - Selbstreflexion auch bei Zeitdruck zugänglich gestalten
- **Primäre Zielgruppe:** Studierende sowie junge Berufstätige im Alter von ca. 18–35 Jahren, die unter hohem Leistungs- und Zeitdruck stehen und ihre emotionalen Reaktionen besser verstehen möchten.  


## 2. Lösungsidee
MoodAJour ist eine mobile App zur schnellen Erfassung und Reflexion von emotionalen Situationen im Alltag. Die App ist in drei Hauptbereiche gegliedert: **Home**, **Übersicht** und **Tipps**. Diese Struktur entstand in der Crazy-8-Übung und wurde durch Peer-Feedback bestätigt.

- **Home:** Direkter Einstieg zur Erfassung eines neuen Moodeintrags. Die Eingabe ist bewusst einfach und reduziert gestaltet, ergänzt durch die Anzeige der zuletzt erfassten Einträge.
- **Übersicht:** Strukturierte Darstellung aller Einträge mit Funktionen zum Filtern, Bearbeiten und Löschen sowie einer Detailansicht je Eintrag.
- **Tipps:** Reflexionsimpulse, ein kurzer Disclaimer sowie ein Hinweis zur Soforthilfe bei belastenden Situationen.

Die Navigation erfolgt über eine Top Navigation Bar, die jederzeit erreichbar ist. Auf Unterseiten (z.B. Detailansicht eines Eintrags) kommen prozessbezogene Schritte zum Einsatz, um die Nutzenden strukturiert durch den jeweiligen Ablauf zu führen.

**Kernfunktionalität (Workflows):**
1. **Neuer Moodeintrag & Warnhinweis:** Erfassung eines Eintrags mit Stimmungsskala (1-10), Emojis und weiteren Angaben; bei belastenden Werten wird ein Warnhinweis angezeigt.
2. **Mood-Einträge verwalten (Übersicht & Detail):** Alle Einträge auf einen Blick, filterbar nach Kategorie; Öffnen der Detailansicht, Bearbeiten und Löschen einzelner Einträge.
3. **Navigation zwischen Home, Übersicht und Tipps:** Schneller Wechsel zwischen den drei Hauptbereichen über die Top Navigation Bar.

- **Annahmen:** Eine reduzierte, mobile Eingabe erhöht die Wahrscheinlichkeit, dass Einträge direkt nach einer Situation erfasst werden. Die Sichtbarkeit von Mustern über die Übersicht fördert die Selbstreflexion der Nutzenden.
- **Abgrenzung:** Die App ist bewusst als mobile Anwendung konzipiert. Eine Desktop-Version ist nicht Teil des Umfangs. Komplexe Analyse- oder Auswertungsfunktionen (z.B. Diagramme, Statistiken) sind ebenfalls nicht enthalten.

## 3. Vorgehen & Artefakte
Die Durchführung erfolgt phasenbasiert; dokumentieren Sie die wichtigsten Ergebnisse je Phase.

### 3.1 Understand & Define
- **Zielgruppenverständnis:** Die Zielgruppe umfasst Studierende sowie junge Berufstätige im Alter von ca. 18 bis 35 Jahren, die unter hohem Leistungs- und Zeitdruck stehen. Die Problemraumanalyse zeigte, dass emotionale Reaktionen auf belastende Situationen wie Stress, Zeitdruck oder Konflikte im Alltag zwar häufig auftreten, aber selten systematisch festgehalten werden. Bestehende Apps wurden als zu komplex und zeitaufwendig bewertet, sodass sie im Alltag kaum konsequent genutzt werden.
- **Wesentliche Erkenntnisse:**
  - Emotionale Momente werden schnell vergessen oder verzerrt erinnert, wenn sie nicht direkt festgehalten werden
  - Die Nutzung erfolgt spontan im Alltag, oft unterwegs oder zwischen Terminen, mit wenig Zeit und Aufmerksamkeit
  - Viele bestehende Mood-Tracking-Apps sind funktionsreich, aber dadurch komplex und im Alltag schwer nutzbar
  - Es besteht Potenzial für eine reduzierte Lösung mit Fokus auf schnelle Erfassung und klare Übersicht
  - Wiederkehrende Muster in emotionalen Triggern sind für die Zielgruppe nur schwer erkennbar, weil eine strukturierte Übersicht fehlt

### 3.2 Sketch
- **Variantenüberblick:** Im Rahmen der Crazy-8-Übung wurden verschiedene Ansätze für die Struktur und den Aufbau der Mood-Tracking-App skizziert. Der Fokus lag dabei auf einer einfachen mobilen Bedienung, einer klaren Navigation sowie einer übersichtlichen Darstellung der Mood-Einträge. Die Varianten unterschieden sich insbesondere in der Strukturierung der Inhalte, der Navigation sowie der Darstellung der Einträge und Zusatzfunktionen. Feedback aus der Übung wurde direkt in die Weiterentwicklung der Skizzen integriert.
- **Skizzen:**
  - **Variante A (Zentrale Eingabeseite):** Fokus auf eine schnelle Mood-Erfassung direkt auf der Startseite. Enthalten waren Eingabefelder für Titel, Beschreibung, Stimmungsskala und Kategorien. Zusätzlich wurden erste Ideen für die Anzeige letzter Einträge integriert. Vorteil dieser Variante war der schnelle Zugriff auf die Kernfunktion der App. Nachteil war die fehlende Trennung zwischen Eingabe und Verwaltung der Einträge.
  - **Variante B (Übersichtsseite mit Verwaltung):** Diese Skizze konzentrierte sich auf eine strukturierte Übersicht aller Mood-Einträge. Ergänzt wurden Funktionen zum Filtern, Bearbeiten und Löschen der Einträge. Zudem wurden Kategorien, Emojis und eine Stimmungsskala von 1–10 ergänzt, um die Einträge verständlicher darzustellen. Feedback zur Übersichtlichkeit und Struktur wurde hier besonders berücksichtigt.
  - **Variante C (Tipps- und Reflexionsbereich):** In dieser Variante wurde eine separate Tipps-Seite integriert. Die Seite enthielt erste Ideen für Reflexionsimpulse, kurze Übungen sowie Hinweise für belastende Situationen. Ziel war es, die App nicht nur als Erfassungstool, sondern zusätzlich als unterstützende Anwendung zur Selbstreflexion zu gestalten.
  **Finale Skizze:** Die finale Lösung kombiniert die drei Hauptbereiche „Home“, „Übersicht“ und „Tipps“ in einer klar getrennten Struktur. Die Home-Seite ermöglicht die schnelle Erfassung neuer Mood-Einträge, während die Übersichtsseite gezielt für Verwaltung, Filterung und Bearbeitung genutzt wird. Ergänzend bietet die Tipps-Seite Reflexionshilfen und Soforthilfe-Hinweise. Das Feedback aus der Crazy-8-Übung führte insbesondere zu einer klareren Navigation, einer einheitlichen Inhaltsstruktur sowie einer besseren Übersichtlichkeit der Einträge.

### 3.3 Decide
- **Gewählte Variante & Begründung:** Gewählt wurde die Variante mit den drei Hauptbereichen „Home“, „Übersicht“ und „Tipps“. Die Struktur ermöglicht eine klare Trennung der Funktionen und eine einfache Navigation innerhalb der App. Die Home-Seite fokussiert die schnelle Erfassung neuer Mood-Einträge, während die Übersichtsseite alle Einträge strukturiert darstellt und Funktionen wie Filtern, Bearbeiten und Löschen ermöglicht. Ergänzend bietet die Tipps-Seite kurze Reflexionsimpulse und Unterstützung für belastende Situationen. Das Feedback aus der Crazy-8-Übung bestätigte insbesondere die klare Aufteilung der Inhalte sowie die Ergänzung von Kategorien und Stimmungsskalen zur besseren Übersichtlichkeit.
- **End-to-End-Ablauf:**
  1. Nutzer:innen öffnen die App und gelangen auf die Home-Seite
  2. Über „Neuer Moodeintrag“ wird die aktuelle Stimmung erfasst (Skala 1–10, Emoji, Kategorie, optionale Notiz)
  3. Bei tiefen Stimmungswerten erscheint ein kurzer Warnhinweis mit einem Soforthilfe-Hinweis
  4. Der Eintrag wird gespeichert und erscheint bei den letzten Einträgen auf der Home-Seite
  5. Über die Navigation gelangen Nutzer:innen zur Übersicht, wo Einträge gefiltert, geöffnet, bearbeitet oder gelöscht werden können
  6. Auf der Tipps-Seite finden Nutzer:innen Reflexionsimpulse sowie einen kurzen Disclaimer zur Nutzung der App
- **Mockup:** _: https://www.figma.com/design/sg85DclAWST4hlpy6nVeN2/Arbeitsbereich--Prototyping?node-id=1-350&t=5o3vSToOC39dZPeY-1

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** Der Prototyp wurde als Mobile-First-Anwendung mit einer klaren Aufteilung in die drei Hauptbereiche „Home“, „Übersicht“ und „Tipps“ gestaltet. Die Navigation ermöglicht einen einfachen Wechsel zwischen den Bereichen und unterstützt eine intuitive Bedienung auf mobilen Geräten. Die Home-Seite dient als zentraler Einstiegspunkt zur schnellen Erfassung neuer Mood-Einträge. Die Übersichtsseite bündelt alle Einträge und bietet Funktionen zum Filtern, Bearbeiten und Löschen. Ergänzend enthält die Tipps-Seite Reflexionsimpulse sowie Hinweise für belastende Situationen. Die Struktur wurde bewusst einfach gehalten, damit Nutzer:innen ohne lange Einarbeitung mit der App interagieren können.
- **User Interface Design:** 
 - **Home-Seite:**
Die Home-Seite fokussiert die schnelle Erfassung neuer Mood-Einträge. Eingabefelder, Stimmungsskala, Emojis und Kategorien sind übersichtlich angeordnet. Zusätzlich werden die letzten Einträge direkt angezeigt, um einen schnellen Überblick zu ermöglichen.
 - **Übersichtsseite:**
Die Übersicht zeigt alle gespeicherten Mood-Einträge in Form von strukturierten Cards. Nutzer:innen können Einträge filtern, öffnen, bearbeiten oder löschen. Für das Löschen wurde zusätzlich ein Bestätigungs-Modal integriert, um Fehlaktionen zu vermeiden.
 - **Detailansicht:**
Einzelne Mood-Einträge können geöffnet werden, damit alle Informationen wie Stimmung, Kategorie, beteiligte Personen und Notizen vollständig sichtbar sind.
 - **Tipps-Seite:**
Die Tipps-Seite enthält kurze Reflexionsimpulse und einfache Übungen zur Unterstützung im Alltag. Zusätzlich wurde ein kurzer Disclaimer integriert, der darauf hinweist, dass die App keine professionelle Hilfe ersetzt.
 - **Login- und Registrationsseiten:**
Der Prototyp enthält einen einfachen Login- und Registrationsprozess mit klarer Benutzerführung und mobilefreundlichen Formularen.
- **Designentscheidungen:**
- Mobile-First-Ansatz für eine einfache Nutzung auf Smartphones
- Klare Trennung der Funktionen durch die drei Hauptbereiche
- Reduziertes und ruhiges Design zur Unterstützung der Übersichtlichkeit
- Einsatz von Emojis und Stimmungsskalen zur schnellen visuellen Erfassung der Stimmung
- Verwendung von Cards für eine strukturierte Darstellung der Einträge
- Einfache und intuitive Navigation ohne komplexe Untermenüs
- Integration von Warnhinweisen und Tipps zur Unterstützung bei belastenden Situationen
- Bestätigungs-Modal beim Löschen zur Vermeidung unbeabsichtigter Aktionen


#### 3.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie-Stack:** _[SvelteKit, Bibliotheken falls genutzt]_
- **Tooling:** _[IDE/Erweiterungen, lokale/Cloud-Tools; den Einsatz von KI beschreiben Sie im Kapitel **KI-Deklaration**]_  
- **Struktur & Komponenten:** _[Seiten, Routen, State/Stores, wichtige Komponenten]_
- **Daten & Schnittstellen:** _[Wie werden Daten gespeichert, verwaltet, abgerufen?]_
- **Deployment:** _[URL]_  
- **Besondere Entscheidungen:** _[z. B. Trade-offs, Vereinfachungen]_  

### 3.5 Validate
- **URL der getesteten Version** (separat deployt)
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
- **Vorgehen:** _[moderiert/unmoderiert; remote/on-site]_  
- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_  
- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2-4 Sätze]_  
- **Abgeleitete Verbesserungen:** _[Anforderungen, die als nächstes umgesetzt werden sollten, priorisiert, kurz begründet; falls Verbesserungen im Prototyp konkret umgesetzt wurden: In Kap. 4 dokumentieren]_  

## 4. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### _[4.x Kurzbeschreibung / Titel]_  
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Wo umgesetzt:** _[Wie und wo wurde es gemacht? Frontend, Backend, Datenbank?]_  
- **Referenz:** _[Wo wird die Erweiterung auch noch beschrieben, z.B. Screenshot oder Beschreibung in einem anderen Kapitel]_  
- **Aus Evaluation abgeleitet?:** _[Wurde diese Erweiterung als Folge eines in der Evaluation identifizierten Issues implementiert?]_  

> Das folgende **Beispiel** wurde bewusst kurz gehalten. Erweiterungen dürfen auch ausführlicher beschrieben werden.

### 4.1 Tabelle nach Kategorien filtern
- **Beschreibung & Nutzen:** Tabelle X kann nach Kategorie gefiltert werden, weil User typischerweise nur an einer bestimmten Kategorie interessiert sind.  
- **Wo umgesetzt:** 
  - **Frontend:** Tabelle mit Dropdown in Datei ...
  - **Backend:** Form Action ... in Datei ...
  - **Datenbank:** MongoDB-Query in Datei ...
- **Referenz:** Screenshot in Kap. x.y
- **Aus Evaluation abgeleitet?:** Ja, Issue x.y

## 5. Projektorganisation [Optional]
Beispiele:
- **Repository & Struktur:** _[Link; kurze Strukturübersicht]_  
- **Issue-Management:** _[Vorgehen kurz beschreiben]_  
- **Commit-Praxis:** _[z. B. sprechende Commits]_

## 6. KI-Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools
- **Eingesetzte Tools**: _[z. B. Copilot, ChatGPT, Claude, lokale Modelle; Version/Variante wenn bekannt]_
- **Zweck & Umfang**: _[wie, wofür und in welchem Ausmass wurde KI eingesetzt (z. B. Textentwürfe, Codevorschläge, Tests, Refactoring); welche Teile stammen (ganz/teilweise) aus KI-Unterstützung?]_
- **Eigene Leistung (Abgrenzung):** _[was ist eigenständig erarbeitet/überarbeitet worden?]_

### 6.2 Prompt-Vorgehen
_[Überlegungen zu Prompt-Vorgehen, Qualität und Urheberrecht/Quellen. Wie wurde beim Prompting vorgegangen? Zu beschreiben ist die grundlegende Vorgehensweise. Einzelne, konkrete Prompts sollten höchstens als Beispiele aufgeführt werden. ]_

### 6.3 Reflexion
_[Nutzen, Grenzen, Risiken/Qualitätssicherung, ...]_

## 7. Anhang [Optional]
Beispiele:
- **Quellen:** _[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; ...]_
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_  