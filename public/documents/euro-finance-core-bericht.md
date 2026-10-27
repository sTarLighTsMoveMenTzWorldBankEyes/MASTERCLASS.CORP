# EURO FINANCE CORE

## 01 · Strategischer Projektbericht

**Europäische Finanzinfrastruktur. Modular gedacht. Evidenzbasiert entwickeln.**

Konzeptionelle Ausarbeitung · 27. Oktober 2026 · Version 1.0

Euro Finance Core beschreibt eine geplante europäische Finanz- und Digitalinfrastruktur. Fünf technische Schichten sollen Kernbankensysteme, Zahlungsverkehr, Finanzdaten und Kontrollfunktionen verbinden. Eine eigenständige souveräne Infrastruktur soll öffentliche und kritische Institutionen bedienen. Die gemeinsame Leitidee ist Interoperabilität bei klarer Trennung von Daten, Verantwortlichkeiten und Betriebsumgebungen.

Das bereitgestellte Konzept nennt einen indikativen Kapitalrahmen von **600 Mio. €**. Dieser Betrag ist eine Planungsannahme; er ist weder zugesagtes Kapital noch ein geprüfter Unternehmenswert. Der Text verwendet zusätzlich die gröbere Beschreibung „über 500 Mio. €“. Für diese Präsentation dient ausschließlich das detaillierte, rechnerisch konsistente 600-Mio.-Modell als Darstellung.

| Konzeptgröße | Aussage | Nachweisstatus |
| --- | --- | --- |
| 600 Mio. € | Indikativer Gesamtfinanzierungsrahmen | Keine Finanzierungszusagen vorgelegt |
| 5 Layer | Banking, Payment, Data, Compliance, Infrastructure | Architekturkonzept |
| 4 Phasen | Vom europäischen Fundament zur optionalen weltweiten Skalierung | Keine Termine oder Freigaben belegt |
| P99 < 100 ms | Im Quelltext genannter Zielwert für API-Anfragen | Kein Messbericht vorgelegt |
| 99,99 % | Im Quelltext genannter Verfügbarkeits-Zielwert | Kein Betriebsnachweis vorgelegt |

**Entscheidungslogik:** Zunächst technische und wirtschaftliche Tragfähigkeit prüfen. Anschließend Rechts- und Betriebsmodell festlegen, einen begrenzten Pilot demonstrieren und erst nach dokumentierten Freigaben erweitern. Die Website und ihre Kartenentwürfe sind eine Präsentation dieses Konzepts, kein operatives Bankangebot.

**Institutioneller Status:** Es sind keine bestätigten Bankpartner, Förderzusagen, Lizenzen oder Anerkennungen durch die Europäische Kommission belegt. EIB, InvestEU, EU-Kommission und Förderbanken erscheinen als mögliche Ansprechpartner beziehungsweise im vorgeschlagenen Finanzierungsmodell. Ein Innovationsbadge bezeichnet die Projektidentität und keine amtliche Zertifizierung.

**Quellenbasis:** „Pasted text.txt“, vom Nutzer bereitgestellt, datiert 27.10.2026. Die Datei „DP_MASTERBOOK_LETTRE.pdf“ konnte wegen der Übertragungsgrenze von 32 MiB nicht ausgewertet werden. Dieser Bericht behauptet daher keine inhaltliche Prüfung dieses Masterbooks.

## 02 · Referenzarchitektur: fünf integrierbare Schichten

Das Ausgangskonzept beschreibt einen API-First-Ansatz mit isolierbaren Komponenten. Die folgende Verantwortungs- und Schnittstellenzuordnung präzisiert diesen Ansatz als **vorgeschlagenes Sollmodell**. Sie dokumentiert keine bereits implementierte Systemlandschaft.

| Schicht | Kernaufgabe | Vorgeschlagene Schnittstellen und Kontrollen |
| --- | --- | --- |
| Banking | Anbindung von Kontenführung, Kernbankensystemen und Transaktionsverwaltung | Versionierte Konto- und Buchungs-APIs; eindeutige Buchungsreferenz; Berechtigungsprüfung; Abgleich von Soll-/Haben-Buchungen |
| Payment | SEPA-Anbindung, Instant-Payment-Verarbeitung und intelligentes Routing | Zahlungsauftrag, Status, Rückmeldung und Ausnahmebearbeitung; Idempotenzschlüssel; Routingregeln; Anbindung nur an zugelassene Teilnehmer und Partner |
| Data | Sichere Finanzdatenverarbeitung und herstellerunabhängiger Austausch | Einheitliche Datenverträge; Klassifikation; Qualitätsprüfungen; Herkunftsnachweis; definierte Lösch- und Aufbewahrungsregeln |
| Compliance | KYC, AML, Identitätsprüfung, Transaktionsüberwachung und Audit-Trail | Fallmanagement; Prüfregeln mit Versionsstand; menschliche Entscheidung bei Eskalationen; nachvollziehbarer Freigabe- und Änderungsverlauf |
| Infrastructure | Cloud-, Netzwerk- und Rechenzentrumsfundament | Getrennte Betriebszonen; Schlüsselverwaltung; Überwachung; Backup und Wiederherstellung; Kapazitäts- und Abhängigkeitsmanagement |

**Querliegende Bausteine:** Ein API-Gateway übernimmt Authentifizierung, Autorisierung, Ratenbegrenzung und Routing. Ein revisionsfähiger Ledger soll Geschäftsvorfälle nachvollziehbar abbilden. Ereignisse und Metriken werden so strukturiert, dass technische Fehler, fachliche Ablehnungen und finanzielle Differenzen unterscheidbar bleiben.

**Beispielhafter Zahlungsablauf:** Ein Partner übermittelt einen eindeutig referenzierten Auftrag. Gateway und IAM prüfen Identität und Zugriff. Compliance bewertet die erforderlichen Kontrollen. Die Payment-Schicht wählt die zulässige Route. Banking und Ledger erfassen den Geschäftsstatus. Rückmeldungen werden mit dem Auftrag abgeglichen und als versionierte Ereignisse dokumentiert. Zeitüberschreitungen erzeugen einen klärbaren Status; sie dürfen keine automatische Doppelbuchung auslösen.

**Nachweise vor einer Pilotfreigabe:** Schnittstellenkatalog, Datenmodell, Bedrohungsmodell, Fehler- und Wiederanlaufverfahren sowie Abnahmetests mit synthetischen Testdaten. Aus dem vorliegenden Text lassen sich weder konkrete API-Endpunkte noch Implementierungsprodukte oder verbindliche SLAs ableiten.

## 03 · Souveräne Domäne, Betrieb und Leistungsziele

Die souveräne Infrastruktur ist im Quelltext organisatorisch und technisch vom kommerziellen Finance Core getrennt. Sie adressiert Behörden, öffentliche Institutionen und Betreiber kritischer Infrastruktur. Geplant sind eigene Datenverarbeitung, Identitäts- und Berechtigungsdienste, kryptografische Sicherheitsfunktionen sowie isolierte Betriebsumgebungen.

| Dimension | Kommerzieller Finance Core | Separate souveräne Infrastruktur |
| --- | --- | --- |
| Zweck | Banking-, Payment- und Finanzdatenprozesse | Öffentliche und besonders sensitive Basisdienste |
| Verantwortung | Fachliche Betreiber des jeweiligen Finanzdienstes | Eigenständige öffentliche beziehungsweise souveräne Governance |
| Identität | Partner-, Mitarbeiter- und Serviceidentitäten | Separater Vertrauens- und Berechtigungsbereich |
| Daten und Schlüssel | Zweckgebundene Finanzdaten und kontrollierte Schlüssel | Eigenständige Datenhoheit und getrennte Schlüsselverwaltung |
| Datenaustausch | Freigegebene, dokumentierte Schnittstellen | Nur explizit genehmigte Übergänge mit Zweck und Rechtsgrundlage |
| Betriebsnachweis | SLA, Wiederanlauf, Konten- und Zahlungsabgleich | Separate Freigaben, Zugangskontrollen und Wiederherstellungstests |

**Betriebszonen:** Entwicklung, Test, Sandbox und Produktion benötigen getrennte Identitäten, Geheimnisse, Daten und Freigabeprozesse. Ein Testsystem darf nicht mit produktiven Zahlungswegen oder realen Kundendaten gleichgesetzt werden. Für den Pilot sind zulässige Datenarten, maximale Auswirkungen und Abbruchbedingungen vorab festzulegen.

**Leistung messen:** Der Zielwert P99 < 100 ms benötigt einen definierten Messpunkt, ein festes Zeitfenster, ein Lastprofil und eine Angabe, ob externe Gegenstellen einbezogen sind. P99 bedeutet, dass mindestens 99 % der betrachteten Anfragen den Grenzwert einhalten. Ein interner API-Zielwert ist keine Zusage über die Ende-zu-Ende-Dauer einer Zahlung.

**Verfügbarkeit einordnen:** 99,99 % bedeutet rechnerisch höchstens rund 52,6 Minuten Ausfall bei einem 365-Tage-Jahr, sofern der Dienst durchgehend gemessen wird und keine Ausnahmen gelten. Das ist eine mathematische Einordnung des Zielwerts, kein vorhandenes SLA. Fehlerbudget, Wartungsfenster und Messmethodik müssen separat vereinbart werden.

**Resilienz nachweisen:** RTO und RPO sind im Ausgangstext nicht beziffert. Verantwortliche müssen sie pro kritischem Dienst festlegen. Erforderlich sind Wiederherstellungstests, dokumentierte Abhängigkeiten, Schlüsselrotation, Notfallkommunikation und unabhängige Überprüfung der wirksamen Kontrollen.

## 04 · Kapitalstruktur und Finanzmodell

Die fünf vorgesehenen Finanzierungsbausteine ergeben insgesamt 600 Mio. €. Alle Beträge und Anteile sind **indikative Planwerte**. Die Zuordnung zu Institutionen stellt keine Zusage, Förderfähigkeit oder bestätigte Zusammenarbeit dar.

| Geplante Quelle | Mio. € | Anteil | Vorgesehene Funktion |
| --- | --- | --- | --- |
| EIB-/InvestEU-bezogene Finanzierung | 210 | 35 % | Mögliche institutionelle Ankerfinanzierung und Risikoteilung |
| Privates Beteiligungskapital | 180 | 30 % | Strategisches Eigenkapital |
| Bankenkonsortium | 120 | 20 % | Geplantes Fremdkapital und Konsortialkredite |
| Öffentliche Förderbanken | 60 | 10 % | Ergänzende nationale Finanzierung |
| Förderzuschüsse und Forschung | 30 | 5 % | Geplante Forschungs- und Entwicklungsförderung |
| Gesamt | 600 | 100 % | Indikativer Kapitalrahmen |

**Arithmetischer Abgleich:** 210 + 180 + 120 + 60 + 30 = 600. Die Anteile ergeben sich jeweils aus Betrag / 600. Die im Konzept genannte Pilot-Schwelle von 70 % verbindlichen Kapitalzusagen entspricht rechnerisch 420 Mio. €. Ob diese Schwelle sachgerecht oder ausreichend ist, muss das Finanzmodell belegen. Der tatsächliche Zusagestand ist unbekannt.

**Vor einer Investorenprüfung zu ergänzen:** CAPEX für Software, Integration, Infrastruktur und Sicherheitsarchitektur; OPEX für Personal, Betrieb, Wartung, Lizenzen und Kontrollen; Auszahlungsplan je Meilenstein; Liquiditätsreserve; Laufzeiten und Rangfolge von Kapital; Kosten der Finanzierung; Covenants; Förderfähigkeit und Beihilfeprüfung; Gebühren- und Nutzungsmodell; Steuern sowie Sensitivitäten.

**Szenarien:** Ein Basisszenario sollte mit klaren Pilotvolumina arbeiten. Ein Verzögerungsszenario prüft höhere Integrationskosten und spätere Zulassungen. Ein Nachfrageszenario prüft geringere Partnerzahl und Transaktionsvolumina. Parameter sind offen zu kennzeichnen; aus dem gelieferten Text lassen sich keine belastbaren Erlöse, Renditen oder Bewertungen berechnen.

**Kapitalfreigabe:** Eine vorgeschlagene Governance koppelt Tranchen an überprüfbare Ergebnisse. Beispiele sind abgenommene Architektur, abgeschlossene Rechtsprüfung, nachgewiesene Wiederherstellung und vertraglich gesicherte Pilotpartner. Die Finanzierungsquellen sind voneinander abhängig zu betrachten; die bloße Anzahl der Tranchen belegt keine Risikodiversifikation.

## 05 · FMI-Mapping und Informationsmodell

Der Quelltext beschreibt Anforderungen des Single Resolution Board an Berichte zu Finanzmarktinfrastrukturen (FMIR). Die konkrete Version des Leitfadens, Originaltabellen und Meldefristen sind nicht beigefügt. Die folgende Tabelle ist deshalb ein **konzeptionelles Datenmapping**, kein amtliches Meldetemplate und keine Feststellung, dass das Projekt selbst meldepflichtig ist.

| Infrastrukturbereich | Zu erfassende Beziehung | Mögliche Datenfelder | Kritischer Bezug |
| --- | --- | --- | --- |
| Zahlungssystem | Direkter oder indirekter Zugang; Vermittler | System, Teilnehmerkennung, Vertrag, Währung, Volumen, Transaktionswert | Zahlungsabwicklung und Liquiditätsbedarf |
| Zentralverwahrer | Verwahr- und Abwicklungszugang | Depot-/Teilnehmerbezug, Bestände, Sicherheiten, Zugangskette | Verfügbarkeit und Übertragbarkeit von Wertpapieren |
| Zentrale Gegenpartei | Clearingbeziehung und Clearingmitglied | Produkte, Positionen, Margin, Sicherheiten, Liquiditätsanforderung | Fortführung von Clearing und Risikosteuerung |
| Handelsregister | Meldedienst und technischer Zugang | Meldepflichtiger, Delegation, Datentyp, Frist, Fehlerstatus | Erfüllung anwendbarer Meldepflichten |
| Intermediär | Indirekter Zugang über eine dritte Partei | Vertragspartei, Dienst, Kündigung, Abhängigkeit, Ersatzweg | Konzentration und Kontinuität des Marktzugangs |

**Verknüpfung:** Jede Teilnahme wird einer rechtlichen Einheit, kritischen Funktion und gegebenenfalls einem Kerngeschäftsfeld zugeordnet. Ein isolierter Systemname reicht nicht; nachvollziehbar sein müssen Zugangskette, Vertragsbeziehung und die Auswirkungen eines Ausfalls.

**Vorgeschlagene Datenqualität:** Eindeutige Kennungen, Stichtag, Datenverantwortlicher, Herkunft, Gültigkeitszeitraum und Version. Vollständigkeit, Referenzintegrität und Summenabgleiche werden vor einer Freigabe geprüft. Änderungen an Teilnehmern, Verträgen und kritischen Funktionen benötigen einen Audit-Trail.

**Reportingprozess:** Fachbereiche liefern und bestätigen ihre Daten. Das Reporting-Team konsolidiert sie; Compliance prüft den tatsächlichen Anwendungsbereich und die gültigen Vorgaben. Eine berechtigte Stelle erteilt die Freigabe. Übertragungsbeleg, Rückmeldungen und Korrekturen werden nachvollziehbar gespeichert.

**Offene Nachweise:** Gültiger Originalleitfaden, rechtliche Einheiten im Geltungsbereich, Originalfelddefinitionen, technische Validierungsregeln und aktuelle Fristen. Konkrete Fristdaten oder offizielle SRB-Feldnummern werden mangels geprüfter Primärquelle nicht erfunden.

## 06 · Risikosteuerung: Kapital, Regulierung, Integration

Die folgenden Gates stammen inhaltlich aus dem Quelltext. Rollen, Nachweisformate und Prüfpunkte sind **redaktionell vorgeschlagene Ergänzungen**. Alle Gates sind offen; der Text liefert keine erfüllten Prüfberichte.

| Risiko | Gegenmaßnahmen | Vorgeschlagene Verantwortung | Gate und notwendiger Nachweis |
| --- | --- | --- | --- |
| Kapitalverfügbarkeit | Tranchen diversifizieren; Liquidität planen; Abrufe an Meilensteine koppeln | Finanzleitung / Investitionskomitee | Quelltext: mindestens 70 % verbindliche Zusagen vor operativem Pilot. Nachweis: geprüfte Finanzierungsdokumente, Bedingungen und Liquiditätsplan. |
| Regulatorische Verzögerung | Dienstleistungsumfang abgrenzen; frühe Rechtsprüfung; zuständige Aufsicht bestimmen | Rechts- und Compliance-Leitung | Quelltext: „Regulatory Clearance“ vor Live-Transaktionen. Präzisierung: tatsächlich erforderliche Erlaubnisse und Freigaben je Tätigkeit nachweisen; keine universelle Unbedenklichkeitserklärung unterstellen. |
| Technische Integration | Standards; versionierte APIs; isolierte Zonen; Last- und Wiederanlauftests | Technische Leitung / Plattformbetrieb | Quelltext: 99,99 % Verfügbarkeit und P99 < 100 ms in produktionsnahen Tests. Nachweis: Messmethodik, Lastprofil, Dauer, vollständige Fehlerstatistik und Abnahme. |

**Kapitalrisiko:** Ein unverbindliches Gespräch oder Letter of Intent darf nicht automatisch als verbindliche Kapitalzusage gezählt werden. Bedingungen für Abruf, Auszahlung, Rückzahlung und Fortbestand der Zusage müssen einzeln geprüft werden. Für Verzögerungen ist die verbleibende Liquiditätsreichweite auszuweisen.

**Regulatorisches Risiko:** DORA, DSGVO, Zahlungsdiensterecht, eIDAS und MiCA werden im Quelltext als relevante Rahmenwerke genannt. Ihre konkrete Anwendbarkeit hängt vom tatsächlichen Dienst, der Rechtsform und dem jeweiligen Betreiber ab. Die bloße Erwähnung eines Regelwerks belegt keine Konformität. Aussagen zu PSD2/PSD3 oder einzelnen Verfahrenswegen sind vor einer externen Einreichung anhand aktueller Primärquellen zu prüfen.

**Integrationsrisiko:** Der Pilot sollte mindestens einen repräsentativen Ende-zu-Ende-Prozess, Ausfälle einer Gegenstelle, Wiederholung eines Auftrags, inkonsistente Statusmeldungen und Wiederanlauf umfassen. Akzeptanzkriterien müssen definieren, welche Daten und Funktionalitäten im Test tatsächlich enthalten sind.

**Entscheidung:** Ein Gate wird nur mit dokumentierter Evidenz geschlossen. Ausnahmen benötigen eine benannte verantwortliche Rolle, verbleibendes Risiko, befristete Maßnahme und ausdrückliche Entscheidung des zuständigen Gremiums.

## 07 · Risikosteuerung: Sicherheit, Markt, Anbieter

| Risiko | Gegenmaßnahmen | Vorgeschlagene Verantwortung | Gate und notwendiger Nachweis |
| --- | --- | --- | --- |
| Cyberangriff / Datenschutz | Zero Trust; MFA; HSM; Verschlüsselung; SIEM; Notfallübungen | Sicherheitsleitung / Datenschutzverantwortung | Quelltext: externes Red Team ohne offene High-/Critical-Befunde. Nachweis: Umfang, Methodik, Befundliste, Behebung und Retest; zusätzlich Wiederherstellung prüfen. |
| Marktakzeptanz | Bedarfsanalyse; belegbare Integrationsvorteile; Pilot mit klaren Nutzungsszenarien | Geschäftsentwicklung / Produktleitung | Quelltext: Verträge oder LOIs mit mindestens drei Partnerbanken. Nachweis: unterschriebene Dokumente, Umfang, Bindungswirkung und Pilotressourcen. Keine vorhandenen Partner belegt. |
| Anbieterabhängigkeit | Offene Standards; portable Daten; Exit-Verträge; alternative Anbieter | Architekturleitung / Einkauf | Quelltext: Übertragbarkeit jeder Kernkomponente ohne Betriebsunterbrechung. Nachweis: realistische Migrations- und Failover-Tests. Unterbrechungsfreiheit bleibt ein zu prüfendes Ziel. |

**Risikoskala als Arbeitsinstrument:** Für Workshops kann eine fünfstufige Wahrscheinlichkeitsskala mit einer fünfstufigen Auswirkungsskala kombiniert werden. Die Multiplikation liefert einen Priorisierungswert von 1 bis 25. Grenzwerte, Zeithorizont und Kriterien sind vor der Bewertung verbindlich festzulegen. Eine solche Skala ist ein vorgeschlagener Prozess; diesem Bericht liegen keine bewerteten Einzelrisiken oder belastbaren Eintrittswahrscheinlichkeiten vor.

**Beispielhafte Prioritätsklassen, noch nicht freigegeben:** 1–4 beobachten; 5–9 mit Maßnahmen steuern; 10–16 eskalieren; 17–25 vor Freigabe behandeln. Diese Schwellen ersetzen weder quantitative Verlustmodelle noch die rechtliche Bewertung eines kritischen Befunds. Ein unzulässiger Betrieb bleibt unabhängig vom Zahlenwert ein Stop-Kriterium.

**Kontrollwirksamkeit:** Eine installierte Kontrolle ist noch kein Wirksamkeitsnachweis. MFA benötigt Abdeckung und Ausnahmeprüfung; Backups benötigen Wiederherstellungstests; SIEM benötigt überprüfte Erkennungsfälle; Exit-Konzepte benötigen umsetzbare Verträge und technisch getestete Datenexporte.

**Reporting:** Das vorgeschlagene Risikoregister führt Risiko-ID, Beschreibung, betroffenen Dienst, Verantwortliche, Maßnahmen, Termine, Evidenz, Restrisiko und Entscheidung. Hoch priorisierte Risiken werden vor jedem Phasenwechsel aktualisiert. Öffentlich gezeigte Diagramme sollen Planwerte und tatsächliche Testergebnisse optisch und sprachlich trennen.

## 08 · Roadmap mit überprüfbaren Phasen

Die vier Phasen folgen der Reihenfolge im Quelltext. Es sind keine verbindlichen Kalendertermine, Budgets pro Phase oder bereits erteilten Freigaben belegt. Die nachfolgenden Arbeitsergebnisse und Gates dienen als Vorschlag für eine entscheidungsfähige Projektplanung.

| Phase | Ziel und Arbeitsergebnisse | Eintritt / nächste Entscheidung |
| --- | --- | --- |
| I · European Foundation | Machbarkeitsstudie; Rechts- und Governance-Modell; Referenzarchitektur; begrenzte Sandbox; definierte Pilotpartnerrollen | Nachweis der Tragfähigkeit, verantwortete Risiken, geeignete Finanzierung und erforderliche Freigaben vor operativem Pilot |
| II · European Integration | Weitere Bankenschnittstellen; standardisierte Onboarding-Verfahren; Betriebs- und Reportingmodell; zusätzliche europäische Märkte | Erfolgreicher Pilot; belegbare Kapazität; dienst- und länderspezifische Zulässigkeit; tragfähige Betriebskosten |
| III · Global Interoperability | Geprüfte grenzüberschreitende Schnittstellen; internationale Technologiepartnerschaften; Datenfluss- und Vertragsmodell | Lokale rechtliche Prüfung; Datenschutz- und Sicherheitsfreigaben; wirtschaftlicher Nutzen der Verbindung |
| IV · Worldwide Infrastructure Ecosystem | Selektive Skalierung geeigneter Dienste; regionale Betriebs- und Governance-Strukturen | Erneute Machbarkeits- und Zulassungsentscheidung je Markt; keine automatische globale Freigabe |

**Pilotumfang begrenzen:** Ein erster Pilot sollte einen nachvollziehbaren Prozess mit wenigen Schnittstellen, dokumentierten Teilnehmerrollen und klaren Abbruchbedingungen abdecken. Umfang, Testdaten, tägliche Beobachtung und Verantwortlichkeiten sind vor Beginn festzuhalten.

**Abnahme organisieren:** Fachliche Funktion, technische Belastbarkeit, Sicherheitskontrollen und wirtschaftliche Annahmen benötigen getrennte Nachweise. Eine gelungene Animation, ein Webprototyp oder eine einzelne schnelle API-Antwort beweist keine betriebsfähige Finanzinfrastruktur.

**Fortschritt darstellen:** Ein Meilenstein ist „geplant“, „in Bearbeitung“, „zur Prüfung“ oder „abgenommen“. Mangels Projektstatusnachweisen werden sämtliche Roadmap-Schritte in dieser Präsentation als geplant geführt. Prozentuale Fertigstellungsangaben werden nicht erfunden.

**Globale Perspektive:** Internationale Verbindungslinien und Länderansichten visualisieren die langfristige Idee. Sie kennzeichnen weder vorhandene Niederlassungen noch Betriebsrechte, vertraglich angeschlossene Banken oder verfügbare Zahlungsdienste.

## 09 · Stakeholder, Governance und Produktidentität

| Gruppe | Geplante Rolle | Vor einem belastbaren Dialog vorbereiten |
| --- | --- | --- |
| EIB / InvestEU-bezogene Stellen | Mögliche Projektfinanzierung beziehungsweise Instrumente zur Risikoteilung | Investitionsplan, Tragfähigkeit, europäischer Mehrwert, mögliche Förder- und Finanzierungsfähigkeit |
| EU-Kommission / zuständige Agenturen | Mögliche Förderprogramme und fachlicher Rahmen | Passende Ausschreibung oder Programmgrundlage; Anwendungsbereich und Antragsberechtigung |
| Nationale Förderbanken | Mögliche ergänzende Finanzierung | Regionaler Nutzen, Projektträger, Konditionen und Kofinanzierung |
| Zuständige Aufsichtsbehörden | Prüfung anwendbarer Erlaubnisse und Aufsicht | Tätigkeitskatalog, Rechtsform, Governance, Risikoprofil und Verantwortlichkeiten |
| Banken und Technologieunternehmen | Mögliche Schnittstellen-, Betriebs- und Integrationspartner | Pilotumfang, technische Verträge, Haftung, SLA, Datenflüsse und Exit-Regeln |
| Strategische Investoren | Mögliches Beteiligungskapital | Geschäftsmodell, Kapitalbedarf, Rechte, Verwässerung, Risiken und Due-Diligence-Unterlagen |

**Governance-Modell:** Die im Konzept vorgeschlagene europäische Dachgesellschaft koordiniert Entwicklung und Finanzierung. Separate Betriebseinheiten verantworten abgegrenzte Dienste. Eigentum, Kontrolle, Haftung und Ressourcenzuordnung müssen vor der Umsetzung rechtlich ausgestaltet werden. Eine tatsächlich gegründete Gesellschaft wird durch den vorliegenden Text nicht nachgewiesen.

**Entscheidungsrechte als Vorschlag:** Die Projektsteuerung genehmigt Umfang und Phasenwechsel. Technik verantwortet Architektur und Nachweise. Compliance und Recht bewerten die Zulässigkeit. Finanzverantwortliche steuern Liquidität und Finanzierung. Sicherheitsverantwortliche können definierte kritische Befunde als Stop-Kriterium eskalieren.

**Visiten- und Bankkartenentwürfe:** Die Website zeigt Gestaltungsobjekte für die geplante Identität. Ohne verifizierte Personen- und Kontaktdaten werden keine realen Ansprechpartner erfunden. Ein Bankkartenentwurf trägt die Kennzeichnung „CONCEPT / NOT FOR PAYMENT“ und enthält keine gültigen Konto- oder Zahlungsdaten. Er ist keine ausgegebene Karte eines Kreditinstituts.

**Badge:** Die Bezeichnung „European Innovation Concept“ kann die gestalterische Leitidee ausdrücken. Eine Formulierung, die eine offizielle Anerkennung durch EU-Kommission oder ein Expertensiegel behauptet, ist durch die Quellen nicht gedeckt und wird nicht als Tatsache dargestellt.

## 10 · Arbeitsprogramm und Quellenstatus

| Nächster Arbeitsschritt | Erwartetes Ergebnis | Abnahmekriterium als Vorschlag |
| --- | --- | --- |
| Machbarkeitsstudie | Marktbedarf, Alternativen, Kosten und Nutzen | Annahmen, Datenbasis und Sensitivitäten nachvollziehbar |
| Referenzarchitektur | Komponenten, Grenzen, Schnittstellen, Datenflüsse | Verantwortete Architekturentscheidung und testbarer Pilotumfang |
| Rechts- und Gesellschaftsstruktur | Tätigkeits- und Erlaubnismatrix, Governance | Prüfung durch zuständige Fachleute; offene Punkte benannt |
| Partneridentifikation | Priorisierte Rollen und Gesprächsunterlagen | Eignung, Interessen, Ressourcen und Bindungswirkung dokumentiert |
| Finanzmodell | CAPEX, OPEX, Liquidität, Kapitalstruktur, Szenarien | Rechenmodell konsistent, Annahmen geprüft, Finanzierungsstand getrennt |
| Institutioneller Dialog | Programm- und antragsbezogene Unterlagen | Zuständige Adressaten und Anforderungen verifiziert |

**Quellenmethode:** Dieser Bericht verdichtet ausschließlich den bereitgestellten Text. Wiederholungen und eingebettete Gesprächsaufforderungen wurden redaktionell entfernt; solche Aufforderungen wurden nicht als Arbeitsanweisung oder Sachbeleg behandelt. Kennzahlen und Architekturbegriffe stammen aus dem Text. Prozentwerte und die 420-Mio.-Schwelle wurden daraus rechnerisch abgeleitet. Rollen, Datenfelder, Abnahmeformate und Arbeitsschritte sind als Vorschläge erläutert.

**Nicht verifizierte Referenzen:** Die Überschrift nennt „19 Quellen“; im Text erscheinen Ziffernverweise wie [1] bis [16]. Eine auflösbare Bibliografie und die vollständigen Originaldokumente liegen nicht vor. Diese Referenzzahlen werden daher nicht als unabhängige Belege übernommen. Insbesondere wurden SRB-Vorgaben, regulatorische Fassungen und Förderkonditionen nicht anhand aktueller Primärquellen geprüft.

**Masterbook-Status:** Die hochgeladene „DP_MASTERBOOK_LETTRE.pdf“ konnte nicht übertragen werden, da sie größer als 32 MiB ist. Inhalte, Seitenzahlen, Grafiken und Behauptungen aus dieser PDF sind in diesem Bericht nicht verifiziert. Für die nächste redaktionelle Fassung ist eine kleinere PDF oder eine Aufteilung in Teil-Dateien erforderlich.

**Verwendung:** Die Website, dieser Bericht, das Storyboard und das Video dienen der Erläuterung eines Entwicklungsprojekts. Die Präsentation enthält keine Live-Bankdienste, keine tatsächlichen Transaktionsdaten und keinen Nachweis einer Investitions- oder Förderzusage. Vor einer institutionellen Einreichung sind Zahlen, Primärquellen, Verantwortlichkeiten und rechtliche Aussagen zu vervollständigen.

**Ergebnis dieser Fassung:** Ein konsistentes, visuell darstellbares Konzept mit klaren offenen Nachweisen. Der nächste belastbare Fortschritt besteht in geprüften Unterlagen und einem abgegrenzten technischen Pilot, nicht in der Behauptung bereits realisierter Infrastruktur.
