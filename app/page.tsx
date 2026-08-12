"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main>
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />

      <nav aria-label="Ana menü">
        <a className="brand" href="#" aria-label="İndirim ana sayfa">
          <span className="brandMark" aria-hidden="true">%</span>
          <span>indirim</span>
        </a>
        <span className="navPill"><i /> Çok yakında</span>
      </nav>

      <section className="hero">
        <div className="eyebrow"><span>✦</span> Akıllı alışverişin yeni adresi</div>
        <h1>En iyi fırsatlar,<br /><em>tek bir yerde.</em></h1>
        <p className="intro">
          Aradığın markaların güncel indirimlerini senin için buluyor,
          karşılaştırıyor ve tek ekranda buluşturuyoruz.
        </p>

        <form onSubmit={handleSubmit} className={sent ? "form sent" : "form"}>
          {sent ? (
            <div className="success" role="status">
              <span>✓</span>
              <div><strong>Harika, listedesin!</strong><small>Açıldığımızda ilk senin haberin olacak.</small></div>
            </div>
          ) : (
            <>
              <label className="srOnly" htmlFor="email">E-posta adresi</label>
              <input id="email" type="email" placeholder="E-posta adresin" required />
              <button type="submit">Bana haber ver <span>→</span></button>
            </>
          )}
        </form>
        <p className="note">Spam yok, sadece açılış haberi. Söz.</p>
      </section>

      <section className="preview" aria-label="İndirim kategorileri ön izlemesi">
        <article className="dealCard cardOne">
          <div className="cardIcon">⌁</div>
          <span>TEKNOLOJİ</span>
          <strong>%35&apos;e varan</strong>
          <small>indirimler</small>
          <b>Keşfet →</b>
        </article>
        <article className="dealCard cardTwo">
          <div className="cardIcon">◇</div>
          <span>MODA</span>
          <strong>Sezon fırsatları</strong>
          <small>çok yakında</small>
          <b>Keşfet →</b>
        </article>
        <div className="orbit orbitOne" />
        <div className="orbit orbitTwo" />
      </section>

      <footer>
        <span>© 2026 İndirim</span>
        <span>Fırsatları kaçırma.</span>
      </footer>
    </main>
  );
}
