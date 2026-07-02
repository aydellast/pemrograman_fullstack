import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const icons = {
  lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>',
  arrowUp: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  arrowDown: '<path d="M12 5v14M5 12l7 7 7-7"/>',
  tag: '<path d="M20.6 12.6l-7.7 7.7a2 2 0 0 1-2.8 0l-6.7-6.7a2 2 0 0 1 0-2.8l7.7-7.7H18a2.6 2.6 0 0 1 2.6 2.6v6.9z"/><circle cx="14.5" cy="9.5" r="1"/>',
  grid: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  barChart: '<path d="M4 19V9m6 10V5m6 14v-7m6 7V4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  piggy: '<path d="M19 9c0-3.9-3.1-6-7-6S5 5.1 5 9c0 2 .8 3.3 1.8 4.3.6.6 1 1.4.9 2.3l-.2 1.9a1 1 0 0 0 1 1.1h1c.4 0 .7-.3.8-.7l.2-1"/><circle cx="15.5" cy="8.5" r="1"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 3v3M16 3v3"/>',
  wallet: '<path d="M3 10h18M7 15h2M3 6h18v12H3z"/>',
  bars: '<path d="M4 19V9m6 10V5m6 14v-7"/>',
};

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: icons[name] || "" }}
    />
  );
}

const featureCategories = [
  {
    num: "01",
    title: "Akun & Personalisasi",
    cards: [
      {
        icon: "lock",
        title: "Login & Register",
        desc: "Masuk atau bikin akun baru dengan cepat dan aman, jadi data keuanganmu cuma bisa diakses olehmu sendiri.",
        ownerInitial: "D",
        owner: "Della",
      },
      {
        icon: "user",
        title: "Manajemen Profil User",
        desc: "Atur nama, foto, dan preferensi akunmu supaya CuppyCash terasa lebih personal dan sesuai gayamu.",
        ownerInitial: "C",
        owner: "Cinta",
      },
    ],
  },
  {
    num: "02",
    title: "Catat Transaksi",
    cards: [
      {
        icon: "arrowUp",
        title: "Pemasukan (Income)",
        desc: "Catat setiap uang masuk, dari gaji, uang saku, sampai hasil jualan, biar nggak ada yang kelewat.",
        ownerInitial: "Dz",
        owner: "Dzikra",
      },
      {
        icon: "arrowDown",
        title: "Pengeluaran (Expense)",
        desc: "Catat setiap pengeluaran secara rapi supaya kamu tahu persis ke mana saja uangmu pergi.",
        ownerInitial: "M",
        owner: "Meisha",
      },
      {
        icon: "tag",
        title: "Manajemen Kategori Kustom",
        desc: "Bikin kategori sendiri sesuai kebiasaanmu, dari jajan kopi sampai tabungan liburan.",
        ownerInitial: "T",
        owner: "Tim CuppyCash",
      },
    ],
  },
  {
    num: "03",
    title: "Pantau & Analisis",
    cards: [
      {
        icon: "grid",
        title: "Dashboard",
        desc: "Lihat ringkasan kondisi keuanganmu dalam satu layar begitu kamu buka aplikasi.",
        ownerInitial: "M",
        owner: "Meisha",
      },
      {
        icon: "barChart",
        title: "Grafik Data",
        desc: "Pantau tren pemasukan dan pengeluaranmu lewat grafik yang enak dibaca sekilas.",
        ownerInitial: "D",
        owner: "Della",
      },
      {
        icon: "clock",
        title: "History Transaksi",
        desc: "Telusuri kembali semua transaksi lama, lengkap dengan tanggal dan kategorinya.",
        ownerInitial: "S",
        owner: "Syifa",
      },
    ],
  },
  {
    num: "04",
    title: "Rencanakan Keuangan",
    cards: [
      {
        icon: "piggy",
        title: "Target Tabungan (Saving Goals)",
        desc: "Tetapkan target nabung, misalnya buat liburan atau gadget baru, dan pantau progresnya sampai tercapai.",
        ownerInitial: "S",
        owner: "Syifa",
      },
      {
        icon: "calendar",
        title: "Budgeting (Anggaran Bulanan)",
        desc: "Atur batas pengeluaran tiap bulan per kategori, dan pantau penggunaan budget dari transaksi expense.",
        ownerInitial: "C",
        owner: "Cinta",
      },
    ],
  },
];

const teamMembers = [
  {
    initial: "D",
    name: "Della",
    roles: ["Login & Register", "Grafik Data"],
    gradient: "linear-gradient(135deg,#F45DA0,#E31C79)",
  },
  {
    initial: "Dz",
    name: "Dzikra",
    roles: ["Pemasukan (Income)", "Manajemen Kategori Kustom"],
    gradient: "linear-gradient(135deg,#FFC542,#F4900C)",
  },
  {
    initial: "M",
    name: "Meisha",
    roles: ["Pengeluaran (Expense)", "Dashboard"],
    gradient: "linear-gradient(135deg,#F9BEDD,#F45DA0)",
  },
  {
    initial: "S",
    name: "Syifa",
    roles: ["History Transaksi", "Target Tabungan"],
    gradient: "linear-gradient(135deg,#E31C79,#7A1441)",
  },
  {
    initial: "C",
    name: "Cinta",
    roles: ["Manajemen Profil User", "Budgeting"],
    gradient: "linear-gradient(135deg,#F4900C,#E31C79)",
  },
];

function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem("token");

  const startPath = token ? "/dashboard" : "/register";
  const loginPath = token ? "/dashboard" : "/login";

  useEffect(() => {
    const header = document.getElementById("landingHeader");

    const handleScroll = () => {
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 12);
      }
    };

    window.addEventListener("scroll", handleScroll);

    const revealEls = document.querySelectorAll(
      ".landing-page .feature-card, .landing-page .team-card"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("in");
            }, (index % 3) * 80);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <div className="landing-page" id="top">
      <header id="landingHeader" className="landing-header">
        <nav className="landing-nav">
          <a href="#top" className="brand">
            <img src="/logo-wordmark.png" alt="CuppyCash" />
          </a>

          <ul className={`nav-links ${mobileOpen ? "open" : ""}`}>
            <li>
              <a onClick={closeMobile} href="#fitur">Fitur</a>
            </li>
            <li>
              <a onClick={closeMobile} href="#tim">Tim</a>
            </li>
            <li>
              <a onClick={closeMobile} href="#cta">Mulai</a>
            </li>
          </ul>

          <div className="nav-cta">
            <Link to={loginPath} className="btn btn-ghost small">
              {token ? "Dashboard" : "Login"}
            </Link>

            <Link to={startPath} className="btn btn-primary small">
              Mulai Gratis
            </Link>

            <button
              className="burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Buka menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-blob blob-1"></div>
          <div className="hero-blob blob-2"></div>

          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Smart Finance Tracker</span>

              <h1>
                Kelola uangmu,
                <br />
                <span className="accent">secangkir demi secangkir.</span>
              </h1>

              <p>
                CuppyCash bantu kamu mencatat pemasukan, pengeluaran,
                budget, dan target tabungan dalam satu tempat yang manis
                dan gampang dipakai.
              </p>

              <div className="hero-actions">
                <Link to={startPath} className="btn btn-primary">
                  Mulai Sekarang
                </Link>

                <a href="#fitur" className="btn btn-ghost">
                  Lihat Semua Fitur
                </a>
              </div>

              <div className="hero-note">
                <span className="dot"></span>
                Dibuat dengan sepenuh hati oleh 5 orang mahasiswa 💕
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <img
                  src="/logo-hero.png"
                  alt="Ilustrasi cupcake CuppyCash"
                />
              </div>

              <div className="floaty f1">
                <Icon name="wallet" />
                Pemasukan tercatat
              </div>

              <div className="floaty f2">
                <Icon name="bars" />
                Target 80% tercapai
              </div>

              <div className="floaty f3">
                <Icon name="clock" />
                Budget on track
              </div>
            </div>
          </div>
        </section>

        <section id="fitur">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">Fitur Utama</span>

              <h2>Semua yang kamu butuhkan buat pegang kendali dompet</h2>

              <p>
                Fitur CuppyCash dikelompokkan dari akun, transaksi,
                analisis, sampai rencana keuangan supaya alurnya mudah
                dipahami.
              </p>
            </div>

            {featureCategories.map((category) => (
              <div className="cat-group" key={category.num}>
                <div className="cat-title">
                  <span className="num">{category.num}</span>
                  <h3>{category.title}</h3>
                </div>

                <div className="card-grid">
                  {category.cards.map((card) => (
                    <div className="feature-card" key={card.title}>
                      <div className="feature-icon">
                        <Icon name={card.icon} />
                      </div>

                      <h4>{card.title}</h4>
                      <p>{card.desc}</p>

                      <span className="owner-tag">
                        <span className="avatar-dot">
                          {card.ownerInitial}
                        </span>
                        {card.owner}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="tim">
          <div className="wrap">
            <div className="team-section">
              <div className="section-head">
                <span className="eyebrow">Tim Kami</span>

                <h2>Dibalik CuppyCash</h2>

                <p>
                  Proyek ini dikerjakan bersama oleh 5 orang, masing-masing
                  bertanggung jawab atas fitur yang berbeda.
                </p>
              </div>

              <div className="team-grid">
                {teamMembers.map((member) => (
                  <div className="team-card" key={member.name}>
                    <div
                      className="avatar"
                      style={{ background: member.gradient }}
                    >
                      {member.initial}
                    </div>

                    <h4>{member.name}</h4>

                    <div className="role-list">
                      {member.roles.map((role) => (
                        <span key={role}>{role}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="cta">
          <div className="wrap">
            <div className="cta-banner">
              <h2>Siap rapiin dompetmu mulai hari ini?</h2>

              <p>
                Gabung sekarang dan biarkan CuppyCash bantu kamu mencatat
                transaksi, mengatur budget, dan menabung lebih konsisten.
              </p>

              <Link to={startPath} className="btn btn-primary">
                Mulai Gratis Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <img src="/logo-wordmark.png" alt="CuppyCash" />

              <p>
                Aplikasi pencatat keuangan yang manis dan mudah dipakai,
                dibuat sebagai proyek kelompok.
              </p>
            </div>

            <div className="footer-cols">
              <div className="footer-col">
                <h5>Fitur</h5>
                <a href="#fitur">Dashboard</a>
                <a href="#fitur">Grafik Data</a>
                <a href="#fitur">Target Tabungan</a>
              </div>

              <div className="footer-col">
                <h5>Tim</h5>
                {teamMembers.map((member) => (
                  <span key={member.name}>{member.name}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 CuppyCash. Proyek kelompok mahasiswa.</span>
            <span>Dibuat dengan 💕 oleh Tim CuppyCash</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;