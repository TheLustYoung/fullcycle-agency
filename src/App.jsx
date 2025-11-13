import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles, Mail, Phone, MapPin, Moon, Sun } from "lucide-react";

// ===== Хелперы анимаций =====
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { delay, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
});

const sections = {
  about: "about",
  services: "services",
  cases: "cases",
  contacts: "contacts",
};

// ===== Данные для звёзд прелоадера =====
const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 260,
  y: (Math.random() - 0.5) * 260,
  delay: Math.random() * 0.6,
}));

// ===== Космический прелоадер =====
function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950 text-slate-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Космический фон */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-0 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(248,250,252,0.08),transparent_60%),radial-gradient(circle_at_10%_90%,rgba(59,130,246,0.25),transparent_55%)]" />
      </div>

      <div className="relative flex flex-col items-center gap-6 px-4">
        {/* Область, где звёзды собираются в одну большую */}
        <div className="relative h-48 w-48 sm:h-56 sm:w-56">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-slate-100 shadow-[0_0_10px_rgba(248,250,252,0.9)]"
              initial={{ x: p.x, y: p.y, opacity: 0, scale: 0.4 }}
              animate={{
                x: 0,
                y: 0,
                opacity: [0.2, 1, 0],
                scale: [0.4, 1, 0.2],
              }}
              transition={{
                delay: 0.2 + p.delay,
                duration: 1.6,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Большая «дорогая» звезда в центре */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              {/* Рамка */}
              <div className="absolute inset-0 rotate-45 rounded-[1.4rem] bg-gradient-to-tr from-slate-50 via-slate-200 to-slate-100 shadow-[0_0_40px_rgba(248,250,252,0.8)]" />
              <div className="absolute inset-2 rounded-[1.1rem] bg-slate-950" />

              {/* Звезда-логотип */}
              <div className="relative flex h-full w-full items-center justify-center">
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <span className="absolute h-full w-px bg-gradient-to-b from-slate-50 via-slate-200 to-transparent" />
                  <span className="absolute w-full h-px bg-gradient-to-r from-slate-50 via-slate-200 to-transparent" />
                  <span className="absolute h-full w-px rotate-45 bg-gradient-to-b from-slate-50 via-slate-200 to-transparent" />
                  <span className="absolute h-full w-px -rotate-45 bg-gradient-to-b from-slate-50 via-slate-200 to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Текст под прелоадером */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <p className="text-sm sm:text-base text-slate-100/90">
            Космос идей собирается в одну точку
          </p>
          <p className="text-[0.75rem] sm:text-xs text-slate-400">
            сайт загружается…{" "}
            <span className="text-slate-100/90">готовы к полёту?</span>
          </p>

          {/* Лаконичный прогресс-бар */}
          <div className="mt-1 w-40 sm:w-52">
            <div className="h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-slate-50 via-slate-300 to-slate-100"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.9, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ===== Основной сайт агентства =====
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("light"); // light | dark
  const [activeSection, setActiveSection] = useState("hero");
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error

  // Скролл-параллакс для hero
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic menu: подсветка активного блока
  useEffect(() => {
    const ids = ["hero", sections.about, sections.services, sections.cases, sections.contacts];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: 0.35,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Обработчик формы (отправка на backend)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      company: formData.get("company"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      // TODO: ЗАМЕНИТЬ на свой backend / serverless функцию
      const res = await fetch("https://your-backend.example.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network error");
      setFormStatus("success");
      e.target.reset();
    } catch (err) {
      console.error(err);
      setFormStatus("error");
    } finally {
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const isDark = theme === "dark";

  const rootBg = isDark ? "bg-slate-950" : "bg-shell";
  const rootText = isDark ? "text-slate-50" : "text-slate-900";

  const navLinkBase = "text-xs font-medium transition-colors duration-200";
  const navLinkInactive = isDark
    ? "text-slate-400 hover:text-slate-100"
    : "text-slate-600 hover:text-slate-900";
  const navLinkActive = isDark ? "text-slate-50" : "text-slate-900";

  return (
    <div className={`min-h-screen ${rootBg} ${rootText}`}>
      {/* Прелоадер поверх всего */}
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>

      {/* Сайт появляется после прелоадера */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
        animate={{
          opacity: isLoading ? 0 : 1,
          y: isLoading ? 10 : 0,
          filter: isLoading ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Фоновые акценты */}
        <div className="pointer-events-none fixed inset-0 opacity-70">
          {isDark ? (
            <>
              <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-indigo-500/35 blur-3xl" />
              <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-emerald-400/30 blur-3xl" />
            </>
          ) : (
            <>
              <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-indigo-300/25 blur-3xl" />
              <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
            </>
          )}
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-10">
          {/* HEADER */}
          <header className="mb-10 flex items-center justify-between gap-4">
            <motion.div
              id="hero"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-md shadow-slate-900/10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95" />
                <span className="relative flex h-full items-center justify-center text-xs font-semibold tracking-[0.28em] text-stone-100">
                  FUL
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase">
                  Full Cycle Agency
                </p>
                <p className="text-xs text-slate-500">
                  дизайн · маркетинг · консалтинг
                </p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              {/* Тема */}
              <button
                type="button"
                onClick={() =>
                  setTheme((prev) => (prev === "light" ? "dark" : "light"))
                }
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300/60 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur text-slate-700 hover:bg-slate-100"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>

              {/* Навигация */}
              <nav className="hidden items-center gap-5 sm:flex">
                <a
                  href="#hero"
                  className={`${navLinkBase} ${
                    activeSection === "hero" ? navLinkActive : navLinkInactive
                  }`}
                >
                  Главная
                </a>
                <a
                  href={`#${sections.about}`}
                  className={`${navLinkBase} ${
                    activeSection === sections.about
                      ? navLinkActive
                      : navLinkInactive
                  }`}
                >
                  О нас
                </a>
                <a
                  href={`#${sections.services}`}
                  className={`${navLinkBase} ${
                    activeSection === sections.services
                      ? navLinkActive
                      : navLinkInactive
                  }`}
                >
                  Услуги
                </a>
                <a
                  href={`#${sections.cases}`}
                  className={`${navLinkBase} ${
                    activeSection === sections.cases
                      ? navLinkActive
                      : navLinkInactive
                  }`}
                >
                  Кейсы
                </a>
                <a
                  href={`#${sections.contacts}`}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-[0.7rem] font-semibold text-stone-100 hover:bg-slate-800"
                >
                  Связаться
                  <ArrowRight className="h-3 w-3" />
                </a>
              </nav>
            </div>
          </header>

          {/* MAIN */}
          <main className="flex flex-1 flex-col gap-16 pb-12">
            {/* HERO c параллаксом (без 3D) */}
            <motion.section
              style={{ y: heroParallax }}
              className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center"
            >
              <motion.div {...fadeUp(0)}>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-[0.7rem] text-slate-600 backdrop-blur">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    Агентство полного цикла, которое не заставляет скучать
                  </span>
                </div>

                <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Мы помогаем брендам
                  <span className="inline-block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                    {" "}
                    выглядеть честно, умно и живо.
                  </span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[0.95rem]">
                  Делаем понемногу всё: от фирменного стиля и сайта до рекламных
                  кампаний и продуктовой стратегии. Без лишнего пафоса, но с
                  вниманием к деталям и результату.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`#${sections.contacts}`}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-stone-100 shadow-md shadow-slate-900/10 hover:bg-slate-800"
                  >
                    Обсудить задачу
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`#${sections.services}`}
                    className="text-xs font-medium text-slate-700 underline-offset-4 hover:text-slate-900 hover:underline"
                  >
                    Посмотреть, чем именно мы помогаем
                  </a>
                </div>

                <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-xs text-slate-600">
                  <div>
                    <div className="text-sm font-semibold">7+</div>
                    <div className="text-[0.7rem] text-slate-500">
                      лет опыта команды
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">40+</div>
                    <div className="text-[0.7rem] text-slate-500">
                      реализованных проектов
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">3</div>
                    <div className="text-[0.7rem] text-slate-500">
                      направления — дизайн, маркетинг, консалтинг
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Правая карточка без 3D */}
              <motion.div
                {...fadeUp(0.1)}
                className="relative h-64 rounded-3xl bg-white/70 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur overflow-hidden"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-indigo-200/80 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-amber-100/80 blur-3xl" />
                <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_0%_0%,#e5e7eb55,transparent_55%),radial-gradient(circle_at_100%_100%,#facc1555,transparent_55%)]" />
                  <div className="relative flex flex-col items-center gap-2 text-center px-6">
                    <div className="relative mb-2 h-10 w-10 overflow-hidden rounded-2xl border border-white/30 bg-white/10">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#e5e7eb55,transparent_55%),radial-gradient(circle_at_100%_100%,#facc1555,transparent_55%)]" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                      full cycle
                    </p>
                    <p className="text-sm font-medium text-slate-50">
                      Дизайн, маркетинг и консалтинг — в одном месте, а не в
                      трёх разных подрядчиках.
                    </p>
                    <p className="text-[0.7rem] text-slate-300/80">
                      Стратегия, визуал и запуск говорят на одном языке.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.section>

            {/* О НАС */}
            <section id={sections.about} className="space-y-6">
              <motion.div {...fadeUp(0)}>
                <p className="section-label">о нас</p>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                  Небольшая команда, которая делает проекты как для себя.
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-[0.95rem]">
                  Full Cycle — это компактное агентство, где дизайнеры,
                  маркетологи и консультанты сидят не по разным башням, а за
                  одним столом. Так решения не теряются по дороге, а проекты
                  получаются цельными.
                </p>
              </motion.div>

              <motion.div
                {...fadeUp(0.05)}
                className="grid gap-4 md:grid-cols-3"
              >
                {[
                  {
                    title: "Дизайн",
                    text: "Айдентика, интерфейсы, лендинги, презентации — всё, что помогает бренду выглядеть связно.",
                  },
                  {
                    title: "Маркетинг",
                    text: "Стратегия, смыслы, контент, воронки — чтобы к вам приходили не только по сарафану.",
                  },
                  {
                    title: "Консалтинг",
                    text: "Помогаем разложить хаос по полочкам: продукт, позиционирование, точки роста.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass rounded-2xl p-4 transition-transform hover:-translate-y-1"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{item.text}</p>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* УСЛУГИ */}
            <section id={sections.services} className="space-y-6">
              <motion.div {...fadeUp(0)}>
                <p className="section-label">услуги</p>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                  Не пытаемся уместить всё в один пакет. Собираем под вас.
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-[0.95rem]">
                  Ниже — базовый список того, чем мы занимаемся. На практике мы
                  смешиваем форматы так, чтобы это решало именно вашу задачу.
                </p>
              </motion.div>

              <motion.div
                {...fadeUp(0.05)}
                className="grid gap-4 md:grid-cols-2"
              >
                {[
                  {
                    group: "Дизайн & продукт",
                    items: [
                      "Фирменный стиль и визуальная система",
                      "Дизайн промо-страниц и лендингов",
                      "UI/UX для веб- и мобильных продуктов",
                      "Дизайн презентаций и питч-деков",
                    ],
                  },
                  {
                    group: "Маркетинг & коммуникации",
                    items: [
                      "Позиционирование и бренд-платформа",
                      "Контент-стратегия и tone of voice",
                      "Лендинги под кампании и спецпроекты",
                      "Сопровождение запуска / релиза",
                    ],
                  },
                  {
                    group: "Консалтинг",
                    items: [
                      "Аудит текущих материалов и сайта",
                      "Сессии по продукту и гипотезам",
                      "План первоочередных шагов",
                      "Супервизия in-house команды",
                    ],
                  },
                  {
                    group: "Поддержка",
                    items: [
                      "Дизайн по подписке",
                      "Поддержка кампаний и обновлений",
                      "Дизайн-сопровождение запусков",
                      "Настройка процессов и шаблонов",
                    ],
                  },
                ].map((block, i) => (
                  <div key={i} className="glass rounded-2xl p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {block.group}
                    </div>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="mt-[5px] h-1 w-3 rounded-full bg-slate-900/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </section>

            {/* КЕЙСЫ */}
            <section id={sections.cases} className="space-y-4">
              <motion.div {...fadeUp(0)}>
                <p className="section-label">кейсы</p>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                  Кейсы в процессе упаковки.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-[0.95rem]">
                  Мы сейчас аккуратно собираем и оформляем проекты, чтобы не
                  превратить портфолио в музей. Если хотите — пришлём подборку
                  живых примеров под вашу сферу.
                </p>
              </motion.div>

              <motion.div
                {...fadeUp(0.05)}
                className="glass flex flex-col items-start justify-between gap-3 rounded-2xl p-4 sm:flex-row sm:items-center"
              >
                <p className="text-sm text-slate-700">
                  Расскажите пару слов о задаче — мы в ответ отправим 2–3
                  проекта, которые ближе всего по масштабу и духу.
                </p>
                <a
                  href={`#${sections.contacts}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900 text-[0.75rem] font-semibold text-stone-100 px-4 py-2 hover:bg-slate-800"
                >
                  Запросить примеры
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </section>

            {/* КОНТАКТЫ с формой */}
            <section id={sections.contacts} className="mt-4 space-y-4">
              <motion.div {...fadeUp(0)}>
                <p className="section-label">контакты</p>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                  Давайте посмотрим, чем можем быть полезны.
                </h2>
                <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-[0.95rem]">
                  Напишите пару строк о бизнесе и задаче — мы предложим формат
                  работы, срок и вилку бюджета. Можно начать с малого и
                  постепенно наращивать.
                </p>
              </motion.div>

              <motion.div
                {...fadeUp(0.05)}
                className="glass grid gap-4 rounded-2xl p-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]"
              >
                {/* Левая колонка — контакты */}
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <a
                      href="mailto:hello@fullcycle.agency"
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      hello@fullcycle.agency
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span>+7 (000) 000-00-00 — можно в Telegram</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>
                      Работаем удалённо, созваниваемся в удобном формате
                    </span>
                  </div>
                  <p className="pt-2 text-[0.7rem] text-slate-500">
                    Хостинг и домен у вас уже есть — отлично, подскажем, как всё
                    аккуратно развернуть, чтобы ничего не сломать.
                  </p>
                </div>

                {/* Правая колонка — форма */}
                <form
                  className="space-y-3 text-xs text-slate-700"
                  onSubmit={handleContactSubmit}
                >
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-[0.7rem] font-medium text-slate-600">
                        Имя
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:border-slate-900"
                        placeholder="Как к вам обращаться"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[0.7rem] font-medium text-slate-600">
                        Компания
                      </label>
                      <input
                        name="company"
                        className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:border-slate-900"
                        placeholder="Необязательно"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.7rem] font-medium text-slate-600">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:border-slate-900"
                      placeholder="куда ответить"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[0.7rem] font-medium text-slate-600">
                      Кратко о задаче
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2 outline-none focus:border-slate-900 resize-none"
                      placeholder="Нужен сайт, айдентика, продвижение…"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[0.75rem] font-semibold text-stone-100 hover:bg-slate-800 disabled:opacity-60"
                    >
                      {formStatus === "sending"
                        ? "Отправляем…"
                        : "Отправить запрос"}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    {formStatus === "success" && (
                      <span className="text-[0.7rem] text-emerald-600">
                        Спасибо! Мы скоро ответим.
                      </span>
                    )}
                    {formStatus === "error" && (
                      <span className="text-[0.7rem] text-red-500">
                        Что-то пошло не так. Попробуйте ещё раз.
                      </span>
                    )}
                  </div>
                  <p className="text-[0.7rem] text-slate-500">
                    Заявка уходит на наш сервер, который может пересылать её в
                    почту или Telegram — нужен только ваш endpoint в коде.
                  </p>
                </form>
              </motion.div>
            </section>
          </main>

          {/* FOOTER */}
          <footer className="mt-8 border-t border-slate-200 pt-4 pb-2 text-[0.7rem] text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} Full Cycle Agency. Всё понемногу, но
              по делу.
            </span>
            <span>Сделано так, чтобы можно было развивать дальше.</span>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
