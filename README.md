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
- **Zielgruppenverständnis:** _[Problemraumanalyse, Recherche, (Proto-)Personas]_
- **Wesentliche Erkenntnisse:** _[Stichpunkte]_

### 3.2 Sketch
- **Variantenüberblick:** _[kurz]_
- **Skizzen:** _[Mehrere Varianten; Unterschiede kurz dokumentieren.]_

### 3.3 Decide
- **Gewählte Variante & Begründung:** _[Entscheidkriterien nennen]_  
- **End-to-End-Ablauf:** _[Beschreibung inkl. User Journey Map]_  
- **Mockup:** _[URL, z. B. Figma; Screenshots mit kurzen Beschreibungen]_  

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die technische Umsetzung]_
- **User Interface Design:** _[wichtige Screens: Screenshots mit kurzen Erläuterungen]_  
- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_

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