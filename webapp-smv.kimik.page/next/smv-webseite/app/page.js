'use client';
import React, { useState } from 'react';
import { Menu, X, Calendar, User, Users, FileText, ChevronRight, Mail, Instagram, ExternalLink, Sparkles, Lightbulb, PenTool, Loader2, Bot } from 'lucide-react';

// --- DATEN ---

const SITE_DATA = {
  title: "SMV am Bismarck-Gymnasium",
  description: "Die Schülermitverantwortung am Bismarck-Gymnasium Karlsruhe",
  navigation: [
    { name: "Home", path: "home" },
    { name: "Über Uns", path: "about" },
    { name: "Komitees", path: "komitees" },
    { name: "Ämter", path: "aemter" },
    { name: "KI-Otter 🦦", path: "ai-tools" }, // Umbenannt
    { name: "Blog", path: "blog" },
  ]
};

const POSTS = [
  {
    id: "2025-11-05-planungstag",
    date: "2025-11-05",
    title: "Planungstag",
    excerpt: "Unser großer Planungstag für das kommende Schuljahr.",
    content: "Wir haben uns getroffen, um das kommende Schuljahr zu planen. Viele neue Ideen wurden gesammelt und die Komitees haben ihre Arbeit aufgenommen."
  },
  {
    id: "2025-02-14-smv-planungstag",
    date: "2025-02-14",
    title: "SMV Planungstag",
    excerpt: "Bericht vom Planungstag im Februar.",
    content: "Ein produktiver Tag liegt hinter uns. Wir haben die nächsten Events, inklusive des Schulballs, detailliert besprochen."
  },
  {
    id: "2024-10-15-die-neuen-schuelersprecher",
    date: "2024-10-15",
    title: "Die neuen Schülersprecher",
    excerpt: "Die Wahlergebnisse sind da!",
    content: "Wir gratulieren den neu gewählten Schülersprechern ganz herzlich und freuen uns auf eine gute Zusammenarbeit im kommenden Schuljahr."
  },
  {
    id: "2024-02-05-neue-smv-webseite",
    date: "2024-02-05",
    title: "Neue SMV Webseite",
    excerpt: "Wir sind online!",
    content: "Willkommen auf unserer neuen Webseite. Hier findet ihr ab sofort alle Informationen rund um die SMV, Termine und Berichte."
  },
  {
    id: "2022-03-18-rosinen-initiative",
    date: "2022-03-18",
    title: "Wir unterstützen die Rosinen-Initiative",
    excerpt: "Hilfe für die Ukraine.",
    content: "Die SMV hat beschlossen, die Rosinen-Initiative aktiv zu unterstützen, um humanitäre Hilfe für die Ukraine zu leisten."
  }
];

// Erweiterte Daten für das Popup (simuliert basierend auf typischen Inhalten)
const KOMITEES = [
  { 
    id: "party", 
    title: "Party Komitee", 
    icon: "🎉", 
    description: "Wir organisieren die legendären Schulpartys und sorgen für gute Stimmung.",
    details: "Das Party-Komitee ist das Herzstück des sozialen Lebens an unserer Schule. Wir planen nicht nur die Unterstufenpartys, sondern auch Events für die Mittel- und Oberstufe. Unsere Aufgaben umfassen:\n\n• Planung des Mottos und der Deko\n• Organisation von Musik und DJ\n• Verkauf von Snacks und Getränken\n• Aufbau und Abbau\n\nWir treffen uns regelmäßig, um die nächsten großen Feiern zu besprechen. Komm vorbei, wenn du Lust auf Eventmanagement hast!"
  },
  { 
    id: "schulball", 
    title: "Schulball", 
    icon: "💃", 
    description: "Planung und Durchführung des jährlichen Abschlussballs.",
    details: "Der Schulball ist das Highlight des Jahres. Das Komitee kümmert sich um:\n\n• Location-Suche und Buchung\n• Auswahl der Band/DJs\n• Catering und Getränke\n• Ticketverkauf und Finanzen\n• Elegante Dekoration\n\nHier lernst du, wie man ein Großevent professionell aufzieht."
  },
  { 
    id: "technik", 
    title: "Technik", 
    icon: "🔌", 
    description: "Wir kümmern uns um Licht und Ton bei allen Veranstaltungen.",
    details: "Ohne uns bleibt es dunkel und still. Die Technik-AG sorgt bei allen Schulveranstaltungen, Konzerten, Theateraufführungen und Partys für den richtigen Sound und die passende Beleuchtung. Wir warten das Equipment und lernen den Umgang mit Mischpulten und Scheinwerfern."
  },
  { 
    id: "umwelt", 
    title: "Umwelt", 
    icon: "🌱", 
    description: "Projekte für eine nachhaltigere Schule und Müllvermeidung.",
    details: "Wir setzen uns für ein grünes Bismarck-Gymnasium ein. Zu unseren Projekten gehören Mülltrennungskonzepte, Pfandflaschen-Sammelaktionen und Informationskampagnen zum Klimaschutz. Wir arbeiten eng mit der Schulleitung zusammen, um unsere Schule nachhaltiger zu gestalten."
  },
  { 
    id: "schuelerzeitung", 
    title: "Schülerzeitung", 
    icon: "📰", 
    description: "Berichterstattung über alles, was an der Schule passiert.",
    details: "Wir sind die rasenden Reporter der Schule. Wir schreiben Artikel über aktuelle Events, führen Interviews mit neuen Lehrern, schreiben Filmkritiken und layouten die Zeitung. Egal ob du gerne schreibst, fotografierst oder designst – hier bist du richtig."
  },
  { 
    id: "sport", 
    title: "Sport", 
    icon: "⚽", 
    description: "Organisation von Sportturnieren und Events.",
    details: "Das Sportkomitee organisiert die jährlichen Turniere: Völkerball für die Kleinen, Fußball und Volleyball für die Großen. Wir erstellen Spielpläne, stellen Schiedsrichter und sorgen für einen fairen Wettkampf."
  },
  { 
    id: "website", 
    title: "Website & IT", 
    icon: "💻", 
    description: "Pflege dieser Webseite und digitale Infrastruktur.",
    details: "Wir halten die SMV-Webseite aktuell, pflegen den digitalen Vertretungsplan und unterstützen bei IT-Fragen. Wenn du dich für Webentwicklung (HTML, CSS, React) interessierst, bist du hier genau richtig."
  },
  { 
    id: "nachhilfe", 
    title: "Nachhilfe", 
    icon: "📚", 
    description: "Vermittlung von Nachhilfe von Schülern für Schüler.",
    details: "Wir organisieren das 'Schüler helfen Schülern' Programm. Wir vermitteln ältere Schüler an jüngere, die Unterstützung in bestimmten Fächern brauchen. Wir verwalten die Anmeldungen und sorgen für eine faire Bezahlung."
  },
  { 
    id: "gestaltung", 
    title: "Gestaltung", 
    icon: "🎨", 
    description: "Verschönerung des Schulhauses und Plakaterstellung.",
    details: "Das Gestaltungskomitee sorgt dafür, dass unsere Schule bunt bleibt. Wir gestalten Plakate für SMV-Aktionen, verschönern die Klassenzimmer und Wände und kümmern uns um die Dekoration zu saisonalen Anlässen wie Weihnachten oder Ostern."
  },
];

const AEMTER = [
  { id: "schuelersprecher", title: "Schülersprecher", content: "Die Schülersprecher vertreten die Interessen aller Schüler gegenüber der Schulleitung und den Lehrern. Sie leiten den Schülerrat." },
  { id: "verbindungslehrer", title: "Verbindungslehrer", content: "Die Verbindungslehrer unterstützen die SMV bei ihrer Arbeit und vermitteln bei Konflikten." },
  { id: "klassensprecher", title: "Klassensprecher", content: "Jede Klasse wählt zwei Klassensprecher, die die Interessen der Klasse im Schülerrat vertreten." },
];

const PAGES_CONTENT = {
  home: {
    title: "Willkommen bei der SMV",
    content: "Hier findest du alle aktuellen Neuigkeiten, Informationen zu unseren Komitees und wer wir eigentlich sind."
  },
  about: {
    title: "Über Uns",
    content: `Die SMV (Schülermitverantwortung) ist die Vertretung aller Schülerinnen und Schüler am Bismarck-Gymnasium. Wir setzen uns für eure Interessen ein, organisieren Veranstaltungen und versuchen, den Schulalltag aktiv mitzugestalten.
    
    Unsere Aufgaben sind vielfältig: Von der Organisation des Schulballs über Spendenaktionen bis hin zur Vertretung in der Schulkonferenz. Jeder Schüler ist herzlich eingeladen, sich in einem unserer Komitees zu engagieren!`
  },
  legal: {
    title: "Impressum / Rechtliches",
    content: "Angaben gemäß § 5 TMG.\n\nVerantwortlich für den Inhalt:\nSMV des Bismarck-Gymnasium Karlsruhe\nBismarckstraße 8\n76133 Karlsruhe\n\nKontakt:\nE-Mail: smv@smvbismarck.de\n\nHaftungsausschluss: Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich."
  }
};

// --- API HELPER ---

const callGemini = async (prompt) => {
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Keine Antwort erhalten.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Entschuldigung, es gab einen Fehler bei der Verbindung zur KI. Bitte versuche es später noch einmal.";
  }
};

// --- KOMPONENTEN ---

const Topbar = ({ setPage, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => setPage('home')}
          >
            {/* LOGO UPDATE */}
            <img 
              src="https://codeberg.org/smvbismarck/pages/raw/branch/main/assets/images/otter.small.png" 
              alt="SMV Otter Logo" 
              className="w-10 h-10 mr-3 object-contain hover:scale-110 transition-transform"
            />
            {/* TITEL UPDATE */}
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-lg leading-tight text-slate-800 tracking-tight">
                SMV
              </h1>
              <span className="text-xs text-slate-500 font-normal">Bismarck-Gymnasium Karlsruhe</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            {SITE_DATA.navigation.map((item) => (
              <button
                key={item.path}
                onClick={() => setPage(item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
                  activePage === item.path 
                    ? 'text-indigo-900 bg-indigo-50' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {SITE_DATA.navigation.map((item) => (
              <button
                key={item.path}
                onClick={() => { setPage(item.path); setIsOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activePage === item.path
                    ? 'text-indigo-900 bg-indigo-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const Footer = ({ setPage }) => (
  <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        {/* FOOTER TEXT UPDATE */}
        <h3 className="text-white text-lg font-bold mb-4">SMV am Bismarck</h3>
        <p className="text-slate-400 text-sm">
          Die Schülermitverantwortung des Bismarck-Gymnasiums Karlsruhe vertritt die Interessen aller Schülerinnen und Schüler.
        </p>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold mb-4">Links</h3>
        <ul className="space-y-2 text-sm">
          <li><button onClick={() => setPage('about')} className="hover:text-white transition-colors">Über Uns</button></li>
          <li><button onClick={() => setPage('komitees')} className="hover:text-white transition-colors">Komitees</button></li>
          <li><button onClick={() => setPage('ai-tools')} className="hover:text-white transition-colors">KI-Otter 🦦</button></li>
          <li><button onClick={() => setPage('legal')} className="hover:text-white transition-colors">Impressum</button></li>
        </ul>
      </div>
      <div>
        <h3 className="text-white text-lg font-bold mb-4">Kontakt</h3>
        <div className="flex space-x-4">
          <a href="mailto:smv@smvbismarck.de" className="hover:text-white transition-colors"><Mail size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
        </div>
        <p className="mt-4 text-xs text-slate-500">smv@smvbismarck.de</p>
      </div>
    </div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
      &copy; {new Date().getFullYear()} SMV am Bismarck-Gymnasium Karlsruhe. Alle Rechte vorbehalten.
    </div>
  </footer>
);

// --- AI TOOL PAGE ---

const AiToolsPage = () => {
  const [activeTab, setActiveTab] = useState('event'); // 'event' or 'speech'
  
  // Event Planner State
  const [eventTopic, setEventTopic] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventResult, setEventResult] = useState('');
  const [isEventLoading, setIsEventLoading] = useState(false);

  // Speech Writer State
  const [speechRole, setSpeechRole] = useState('Klassensprecher');
  const [speechGoals, setSpeechGoals] = useState('');
  const [speechResult, setSpeechResult] = useState('');
  const [isSpeechLoading, setIsSpeechLoading] = useState(false);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!eventTopic) return;
    setIsEventLoading(true);
    setEventResult('');
    
    const prompt = `Du bist ein kreativer Event-Planer für das Bismarck-Gymnasium.
    Erstelle einen kurzen, übersichtlichen Plan für eine Schulveranstaltung.
    Thema: "${eventTopic}"
    Ort: "${eventLocation || 'Schulhof'}"
    
    Bitte gib mir:
    1. Einen coolen Titel für das Event
    2. 3 Ideen für Dekoration 🎨
    3. 3 Ideen für Aktivitäten/Spiele 🎮
    4. 3 Snack- oder Getränke-Ideen 🥤
    
    Verwende Emojis und sprich die Schüler direkt an ("Du", "Ihr"). Formatiere es mit Markdown.`;

    const result = await callGemini(prompt);
    setEventResult(result);
    setIsEventLoading(false);
  };

  const handleSpeechSubmit = async (e) => {
    e.preventDefault();
    if (!speechGoals) return;
    setIsSpeechLoading(true);
    setSpeechResult('');

    const prompt = `Du bist ein erfahrener Redenschreiber für Schüler am Bismarck-Gymnasium.
    Schreibe eine kurze, inspirierende Wahlrede (max 150 Wörter).
    
    Amt: ${speechRole}
    Meine Hauptziele/Wahlversprechen: "${speechGoals}"
    
    Der Ton soll selbstbewusst, freundlich und motivierend sein.
    Struktur: Begrüßung -> Warum ich? -> Meine Ziele -> Abschluss/Aufruf zur Wahl.
    Verwende keine Platzhalter, sondern formuliere einen fertigen Text.`;

    const result = await callGemini(prompt);
    setSpeechResult(result);
    setIsSpeechLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 flex justify-center items-center gap-2">
          SMV KI-Otter <Bot className="text-indigo-600" size={32} />
        </h1>
        <p className="text-slate-600">
          Dein schlauer Helfer für die SMV-Arbeit am Bismarck. Powered by AI.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('event')}
          className={`pb-4 px-6 font-medium text-sm transition-colors flex items-center gap-2 ${
            activeTab === 'event' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Lightbulb size={18} /> Event-Planer
        </button>
        <button
          onClick={() => setActiveTab('speech')}
          className={`pb-4 px-6 font-medium text-sm transition-colors flex items-center gap-2 ${
            activeTab === 'speech' 
              ? 'text-indigo-600 border-b-2 border-indigo-600' 
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <PenTool size={18} /> Wahlkampf-Helfer
        </button>
      </div>

      {/* Tool Content */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 min-h-[400px]">
        
        {/* EVENT PLANNER */}
        {activeTab === 'event' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-amber-100 text-amber-600 p-2 rounded-lg"><Lightbulb size={20} /></span>
                Ideenschmiede
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Dir fehlen Ideen für die nächste Party oder Aktion? Gib einfach ein Thema ein!
              </p>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Thema / Anlass</label>
                  <input 
                    type="text" 
                    required
                    placeholder="z.B. Halloween, Sommerfest, Valentinstag..."
                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    value={eventTopic}
                    onChange={(e) => setEventTopic(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ort (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="z.B. Aula, Pausenhof, Sporthalle"
                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isEventLoading || !eventTopic}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEventLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                  Ideen generieren
                </button>
              </form>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 overflow-y-auto max-h-[500px]">
              {isEventLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <Bot size={40} className="animate-bounce" />
                  <p>Der AI-Otter denkt nach...</p>
                </div>
              ) : eventResult ? (
                <div className="prose prose-sm prose-indigo max-w-none whitespace-pre-line">
                  {eventResult}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                  <Lightbulb size={40} className="mb-2 opacity-20" />
                  <p>Deine Ergebnisse erscheinen hier.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SPEECH WRITER */}
        {activeTab === 'speech' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg"><PenTool size={20} /></span>
                Redenschreiber
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Du willst kandidieren, weißt aber nicht was du sagen sollst? Wir helfen dir!
              </p>
              <form onSubmit={handleSpeechSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amt</label>
                  <select 
                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    value={speechRole}
                    onChange={(e) => setSpeechRole(e.target.value)}
                  >
                    <option value="Klassensprecher">Klassensprecher</option>
                    <option value="Schülersprecher">Schülersprecher</option>
                    <option value="Stufensprecher">Stufensprecher</option>
                    <option value="Kassenwart">Kassenwart</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deine Ziele / Themen (Stichpunkte)</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="z.B. Mehr Sitzgelegenheiten, besseres Essen in der Mensa, Fußballturnier..."
                    className="w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                    value={speechGoals}
                    onChange={(e) => setSpeechGoals(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSpeechLoading || !speechGoals}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSpeechLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                  Rede entwerfen
                </button>
              </form>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 overflow-y-auto max-h-[500px]">
              {isSpeechLoading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3">
                  <Bot size={40} className="animate-bounce" />
                  <p>Der AI-Otter schreibt...</p>
                </div>
              ) : speechResult ? (
                <div className="prose prose-sm prose-indigo max-w-none whitespace-pre-line">
                  {speechResult}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center">
                  <PenTool size={40} className="mb-2 opacity-20" />
                  <p>Dein Redeentwurf erscheint hier.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// --- SEITEN KOMPONENTEN ---

const HomePage = ({ setPage }) => (
  <div className="space-y-12">
    {/* Hero Section */}
    <section className="bg-slate-100 rounded-3xl p-8 md:p-16 text-center shadow-sm relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="mx-auto max-w-2xl relative z-10">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-6">
          Wir gestalten Schule.
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Willkommen auf der offiziellen Webseite der Schülermitverantwortung des Bismarck-Gymnasiums.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => setPage('komitees')} className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
            Komitees entdecken
          </button>
          <button onClick={() => setPage('ai-tools')} className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold border border-indigo-200 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
            <Bot size={18} /> KI-Otter testen
          </button>
        </div>
      </div>
    </section>

    {/* Latest Posts Preview */}
    <section>
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Neues aus der SMV</h2>
        <button onClick={() => setPage('blog')} className="text-slate-600 hover:text-slate-900 font-medium flex items-center text-sm">
          Alle Beiträge <ChevronRight size={16} />
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {POSTS.slice(0, 3).map(post => (
          <div key={post.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setPage('blog')}>
            <div className="text-slate-400 text-xs mb-2 flex items-center gap-1">
              <Calendar size={12} /> {post.date}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h3>
            <p className="text-slate-600 text-sm line-clamp-3">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const BlogPage = () => (
  <div className="max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-slate-900 mb-8">Blog & Protokolle</h1>
    <div className="space-y-8">
      {POSTS.map(post => (
        <article key={post.id} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <header className="mb-4">
            <div className="flex items-center text-slate-500 text-sm mb-2">
              <Calendar size={16} className="mr-2" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{post.title}</h2>
          </header>
          <div className="prose prose-slate max-w-none text-slate-600">
            <p>{post.content}</p>
          </div>
        </article>
      ))}
    </div>
  </div>
);

// --- MODIFIZIERTE KOMITEES PAGE MIT POPUP ---
const KomiteesPage = () => {
  const [selectedKomitee, setSelectedKomitee] = useState(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Unsere Komitees</h1>
      <p className="text-slate-600 max-w-2xl mb-12">
        Hier findet die eigentliche Arbeit statt. Klicke auf ein Komitee, um mehr über die Aufgaben und Treffen zu erfahren.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {KOMITEES.map(komitee => (
          <div 
            key={komitee.id} 
            onClick={() => setSelectedKomitee(komitee)}
            className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200 inline-block">{komitee.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700">{komitee.title}</h3>
            <p className="text-slate-600 text-sm">{komitee.description}</p>
            <div className="mt-4 text-indigo-600 text-sm font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              Mehr Infos <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedKomitee && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedKomitee(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200" 
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 md:p-8 relative">
              <button 
                onClick={() => setSelectedKomitee(null)} 
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl bg-indigo-50 p-4 rounded-xl">{selectedKomitee.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">{selectedKomitee.title}</h2>
                  <p className="text-indigo-600 font-medium">SMV Bismarck-Gymnasium</p>
                </div>
              </div>
              
              <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-line">
                {selectedKomitee.details}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setSelectedKomitee(null)}
                  className="bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Schließen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AemterPage = () => (
  <div>
    <h1 className="text-3xl font-bold text-slate-900 mb-8">Ämter & Positionen</h1>
    <div className="grid gap-8 md:grid-cols-1">
      {AEMTER.map(amt => (
        <div key={amt.id} className="flex flex-col md:flex-row bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 p-6 md:w-1/4 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
            <div className="text-center">
              {amt.id === 'schuelersprecher' && <Users size={48} className="text-slate-700 mx-auto mb-2" />}
              {amt.id === 'verbindungslehrer' && <User size={48} className="text-slate-700 mx-auto mb-2" />}
              {amt.id === 'klassensprecher' && <Users size={48} className="text-slate-700 mx-auto mb-2" />}
              <h3 className="font-bold text-slate-900">{amt.title}</h3>
            </div>
          </div>
          <div className="p-6 md:w-3/4 flex items-center">
            <p className="text-slate-600">{amt.content}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const GenericPage = ({ title, content }) => (
  <div className="max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold text-slate-900 mb-6">{title}</h1>
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-line">
        {content}
      </div>
    </div>
  </div>
);

// --- MAIN APP ---

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const renderContent = () => {
    switch (activePage) {
      case 'home': return <HomePage setPage={setActivePage} />;
      case 'blog': return <BlogPage />;
      case 'komitees': return <KomiteesPage />;
      case 'aemter': return <AemterPage />;
      case 'ai-tools': return <AiToolsPage />;
      case 'about': return <GenericPage title={PAGES_CONTENT.about.title} content={PAGES_CONTENT.about.content} />;
      case 'legal': return <GenericPage title={PAGES_CONTENT.legal.title} content={PAGES_CONTENT.legal.content} />;
      default: return <div className="text-center py-20 text-slate-500">Seite nicht gefunden (404)</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <Topbar setPage={setActivePage} activePage={activePage} />
      
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderContent()}
      </main>

      <Footer setPage={setActivePage} />
    </div>
  );
}