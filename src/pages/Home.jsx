import Header from '../components/Header'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'
import TopicCards from '../components/TopicCards'
import { useLocale } from '../mocks/i18n'

export default function Home(){
  const { t } = useLocale()
  return (
    <div>
      <Header />
      <main className="container">
        <section className="hero" style={{padding:'26px'}} aria-label="Présentation">
          <h1>{t('hero_title')}</h1>
          <p>{t('hero_sub')}</p>
          <div className="cta">
            <a className="btn primary" href="/signup">{t('start')}</a>
            <a className="btn ghost" href="/pricing">{t('pricing')}</a>
          </div>
          <div style={{height:16}}/>
          <TopicCards />
          <div style={{height:6}}/>
        </section>
        <div style={{height:20}}/>
      </main>
      <Footer />
      <CookieBanner />
    </div>
  )
}
