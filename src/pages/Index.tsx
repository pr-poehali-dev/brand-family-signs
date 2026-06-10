import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG =
  "https://cdn.poehali.dev/projects/67b40e03-af21-4912-82f0-ec548236011b/files/fcfe9fb7-6283-48b0-b801-2a63ea576a57.jpg";

const services = [
  {
    icon: "Zap",
    title: "Электроснабжение 0,4 / 6 / 10 кВ",
    desc: "Проектирование и монтаж систем электроснабжения объектов любой категории сложности.",
  },
  {
    icon: "Cable",
    title: "Прокладка кабельных линий",
    desc: "Прокладка КЛ в земле, кабельных лотках, трубах, коллекторах и взрывоопасных зонах.",
  },
  {
    icon: "Sun",
    title: "Освещение",
    desc: "Наружное и внутреннее освещение, в том числе во взрывозащищённом исполнении.",
  },
  {
    icon: "Shield",
    title: "Молниезащита и заземление",
    desc: "Проектирование и монтаж систем молниезащиты, заземления и защитного потенциалирования.",
  },
  {
    icon: "Settings",
    title: "Пусконаладочные работы",
    desc: "Испытание и наладка электрооборудования, релейная защита и автоматика (ЭТЛ аккредитована в РОССЕТИ до 35 кВ).",
  },
  {
    icon: "FileCheck",
    title: "Исполнительная документация",
    desc: "Полный комплект закрывающих документов: исполнительная документация, акты испытаний, протоколы ЭТЛ.",
  },
];

const projects = [
  { name: "ФПК «Пороховой завод»", vol: "Взрывоопасные зоны", year: "" },
  { name: "Производственный корпус промышленного предприятия", vol: "10 кВ", year: "" },
  { name: "Электроснабжение складского комплекса", vol: "0,4 кВ", year: "" },
  { name: "Наружное освещение территории завода", vol: "0,4 кВ", year: "" },
  { name: "Молниезащита и заземление производственного объекта", vol: "Спецобъект", year: "" },
  { name: "Пусконаладка и испытания электроустановок", vol: "до 35 кВ", year: "" },
];

const stats = [
  { value: "0,4–35", label: "кВ — диапазон работ" },
  { value: "ЭТЛ", label: "аккредитована в РОССЕТИ" },
  { value: "С НДС", label: "и без НДС" },
  { value: "«Под ключ»", label: "полный комплекс работ" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      className="bg-[#0f0f0f] text-white min-h-screen"
      style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
    >
      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8">
              <polygon
                points="16,2 20,12 30,12 22,19 25,30 16,23 7,30 10,19 2,12 12,12"
                fill="none"
                stroke="#C0C0C0"
                strokeWidth="1.5"
              />
              <line x1="16" y1="6" x2="16" y2="26" stroke="#C0C0C0" strokeWidth="2" />
              <polygon points="16,4 19,16 16,13 13,16" fill="#C0C0C0" />
            </svg>
            <span
              className="font-semibold text-lg tracking-widest text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              ЭС <span className="text-[#C0C0C0]">ЭЛЕКТРОМОНТАЖ</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["services", "projects", "about", "contacts"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm text-white/60 hover:text-white transition-colors tracking-wide uppercase"
              >
                {id === "services"
                  ? "Услуги"
                  : id === "projects"
                  ? "Объекты"
                  : id === "about"
                  ? "О нас"
                  : "Контакты"}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contacts")}
              className="px-5 py-2 border border-[#C0C0C0]/50 text-[#C0C0C0] text-sm uppercase tracking-wider hover:bg-[#C0C0C0] hover:text-[#0f0f0f] transition-all duration-200"
            >
              Связаться
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0f0f0f]/98 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
            {["services", "projects", "about", "contacts"].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left text-white/70 hover:text-white uppercase tracking-wide text-sm py-2 border-b border-white/5"
              >
                {id === "services"
                  ? "Услуги"
                  : id === "projects"
                  ? "Объекты"
                  : id === "about"
                  ? "О нас"
                  : "Контакты"}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-[#0f0f0f]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#C0C0C0]" />
              <span className="text-[#C0C0C0] text-xs tracking-[0.3em] uppercase">
                Электромонтажные работы
              </span>
            </div>

            <h1
              className="font-bold leading-none mb-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="text-white">ЭС</span>
              <br />
              <span className="text-[#C0C0C0]">ЭЛЕКТРО</span>
              <br />
              <span className="text-white">МОНТАЖ</span>
            </h1>

            <div className="w-20 h-0.5 bg-[#C0C0C0] mb-6" />

            <p className="text-white/70 text-lg leading-relaxed mb-8 font-light">
              Комплекс электромонтажных работ
              <span className="text-[#C0C0C0] font-medium"> «под ключ»</span>
              <br className="hidden sm:block" />
              для промышленных и специальных объектов.
              <br className="hidden sm:block" />
              Субподряд · <span className="text-[#C0C0C0] font-medium">0,4–35 кВ</span> · ЭТЛ аккредитована в РОССЕТИ
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contacts")}
                className="px-8 py-4 bg-[#C0C0C0] text-[#0f0f0f] font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-200"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Получить расчёт
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="px-8 py-4 border border-white/30 text-white uppercase tracking-widest text-sm hover:border-[#C0C0C0] hover:text-[#C0C0C0] transition-all duration-200"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Наши услуги
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white animate-pulse" />
          <Icon name="ChevronDown" size={16} className="text-white" />
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/10 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <Section key={i}>
              <div className="text-center">
                <div
                  className="font-bold text-[#C0C0C0] mb-1"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-white/50 text-xs uppercase tracking-widest">{s.label}</div>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <Section>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C0C0C0]" />
              <span className="text-[#C0C0C0] text-xs tracking-[0.3em] uppercase">Что мы делаем</span>
            </div>
            <h2
              className="font-bold text-white uppercase"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Виды работ
            </h2>
          </div>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
          {services.map((s, i) => (
            <Section key={i}>
              <div className="bg-[#0f0f0f] p-8 h-full group hover:bg-[#161616] transition-colors duration-300">
                <div className="w-12 h-12 border border-[#C0C0C0]/30 flex items-center justify-center mb-6 group-hover:border-[#C0C0C0] transition-colors">
                  <Icon name={s.icon} size={20} className="text-[#C0C0C0]" />
                </div>
                <h3
                  className="font-semibold text-white text-xl uppercase tracking-wide mb-3"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Section>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <Section>
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#C0C0C0]" />
                <span className="text-[#C0C0C0] text-xs tracking-[0.3em] uppercase">Портфолио</span>
              </div>
              <h2
                className="font-bold text-white uppercase"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Реализованные объекты
              </h2>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {projects.map((p, i) => (
              <Section key={i}>
                <div className="bg-[#111] px-8 py-6 flex items-center justify-between group hover:bg-[#1a1a1a] transition-colors cursor-pointer border-b border-white/5">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[#C0C0C0]/30 text-2xl font-bold w-8"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="text-white font-medium text-sm md:text-base group-hover:text-[#C0C0C0] transition-colors">
                        {p.name}
                      </div>
                      {p.year && <div className="text-white/30 text-xs mt-0.5">{p.year}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className="px-3 py-1 border border-[#C0C0C0]/20 text-[#C0C0C0] text-xs uppercase tracking-wider"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {p.vol}
                    </span>
                    <Icon
                      name="ArrowRight"
                      size={16}
                      className="text-white/20 group-hover:text-[#C0C0C0] transition-all group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Section>
            ))}
          </div>

          <Section>
            <div className="mt-10 p-8 border border-[#C0C0C0]/15 bg-[#161616]">
              <div className="flex items-center gap-3 mb-5">
                <Icon name="Building" size={16} className="text-[#C0C0C0]" />
                <span className="text-[#C0C0C0] text-xs tracking-[0.3em] uppercase">Наши заказчики</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {["Промышленные предприятия", "ФПК «Пороховой завод»"].map((c, i) => (
                  <div key={i} className="px-5 py-2.5 border border-white/15 text-white/60 text-sm hover:border-[#C0C0C0]/40 hover:text-white/80 transition-colors">
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Section>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#C0C0C0]" />
                <span className="text-[#C0C0C0] text-xs tracking-[0.3em] uppercase">О компании</span>
              </div>
              <h2
                className="font-bold text-white uppercase mb-6"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Надёжность,
                <br />
                проверенная
                <br />
                <span className="text-[#C0C0C0]">годами</span>
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                <span className="text-white">ЭС Электромонтаж</span> — команда инженеров-электриков
                с профильным образованием и действующими допусками. Работаем в качестве
                субподрядчика, выполняем комплекс электромонтажных работ <span className="text-white">«под ключ»</span>.
              </p>
              <p className="text-white/60 leading-relaxed mb-4">
                Специализируемся на объектах с повышенной взрывопожарной и пожарной опасностью,
                производственных и складских корпусах, технологических процессах с особыми
                требованиями к надёжности электроснабжения.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                При необходимости сопровождаем при согласованиях с надзорными органами
                и сетевыми организациями. Работаем <span className="text-white">с НДС и без НДС</span>.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Award", text: "Действующие допуски" },
                  { icon: "FlaskConical", text: "ЭТЛ до 35 кВ (РОССЕТИ)" },
                  { icon: "FileText", text: "Исполнительная документация" },
                  { icon: "BadgeCheck", text: "Профильное образование" },
                ].map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 border border-white/10 hover:border-[#C0C0C0]/30 transition-colors"
                  >
                    <Icon name={f.icon} size={18} className="text-[#C0C0C0]" />
                    <span className="text-white/70 text-sm">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section>
            <div className="relative">
              <div className="absolute -inset-4 border border-[#C0C0C0]/10" />
              <div className="relative bg-[#161616] p-10 border border-white/10">
                <div
                  className="text-[#C0C0C0] text-6xl font-bold leading-none mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  15
                </div>
                <div className="text-white/40 text-xs uppercase tracking-widest mb-8">лет опыта</div>

                <div className="space-y-6">
                  {[
                    { label: "Монтаж кабельных линий", pct: 95 },
                    { label: "Взрывозащищённые объекты", pct: 85 },
                    { label: "Пусконаладочные работы", pct: 90 },
                    { label: "Молниезащита и заземление", pct: 88 },
                  ].map((bar, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-white/60 text-xs uppercase tracking-wide">
                          {bar.label}
                        </span>
                        <span
                          className="text-[#C0C0C0] text-xs"
                          style={{ fontFamily: "'Oswald', sans-serif" }}
                        >
                          {bar.pct}%
                        </span>
                      </div>
                      <div className="h-px bg-white/10">
                        <div
                          className="h-px bg-[#C0C0C0] transition-all duration-1000"
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#161616] border-y border-white/10">
        <Section>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3
                className="font-bold text-white uppercase text-3xl md:text-4xl mb-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Нужен расчёт стоимости?
              </h3>
              <p className="text-white/50">Оставьте заявку — ответим в течение 1 рабочего дня</p>
            </div>
            <button
              onClick={() =>
                document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex-shrink-0 px-10 py-4 bg-[#C0C0C0] text-[#0f0f0f] font-bold uppercase tracking-widest hover:bg-white transition-all duration-200 text-sm"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Отправить заявку
            </button>
          </div>
        </Section>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 max-w-7xl mx-auto px-6">
        <Section>
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C0C0C0]" />
              <span className="text-[#C0C0C0] text-xs tracking-[0.3em] uppercase">Связаться</span>
            </div>
            <h2
              className="font-bold text-white uppercase"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.01em",
              }}
            >
              Контакты
            </h2>
          </div>
        </Section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Section>
            <div className="space-y-4">
              {[
                {
                  icon: "Phone",
                  label: "Телефон",
                  value: "+7 (xxx) xxx-xx-xx",
                  href: "tel:+7xxxxxxxxxx",
                },
                {
                  icon: "Mail",
                  label: "Email",
                  value: "info@es-electro.ru",
                  href: "mailto:info@es-electro.ru",
                },
                {
                  icon: "MapPin",
                  label: "Адрес",
                  value: "г. Москва, ул. Примерная, д. 1",
                  href: null,
                },
                {
                  icon: "Clock",
                  label: "Режим работы",
                  value: "Пн–Пт: 9:00–18:00",
                  href: null,
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 border border-white/10 hover:border-[#C0C0C0]/30 transition-colors group"
                >
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#C0C0C0]/50 transition-colors">
                    <Icon name={c.icon} size={16} className="text-[#C0C0C0]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest mb-1">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a
                        href={c.href}
                        className="text-white hover:text-[#C0C0C0] transition-colors font-medium"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="text-white font-medium">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C0C0C0]/60 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C0C0C0]/60 transition-colors text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/40 text-xs uppercase tracking-widest mb-2">
                  Описание задачи
                </label>
                <textarea
                  rows={5}
                  placeholder="Опишите объект и объём работ..."
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#C0C0C0]/60 transition-colors text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#C0C0C0] text-[#0f0f0f] font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-200"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Отправить заявку
              </button>
              <p className="text-white/25 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#0a0a0a] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 opacity-60">
              <polygon
                points="16,2 20,12 30,12 22,19 25,30 16,23 7,30 10,19 2,12 12,12"
                fill="none"
                stroke="#C0C0C0"
                strokeWidth="1.5"
              />
              <line x1="16" y1="6" x2="16" y2="26" stroke="#C0C0C0" strokeWidth="2" />
              <polygon points="16,4 19,16 16,13 13,16" fill="#C0C0C0" />
            </svg>
            <span
              className="text-white/40 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              ЭС Электромонтаж
            </span>
          </div>
          <p className="text-white/25 text-xs">© 2024 ЭС Электромонтаж. Все права защищены.</p>
          <p className="text-white/25 text-xs">Электромонтажные работы 0,4–35 кВ</p>
        </div>
      </footer>
    </div>
  );
}