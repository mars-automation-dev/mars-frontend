import { useMemo, useState } from 'react';
import SEO from 'components/seo';
import {
  brand,
  navigation,
  socialLinks,
  hero,
  solutions,
  methodSteps,
  platforms,
  recognitions,
  certifications,
  clients,
  contact,
} from 'data/site-content';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 12.248V6.169H2.542v6.079zm-1.2-6.91c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.381 2.4 4.09c0 .694.521 1.248 1.327 1.248zm4.908 6.91V8.851c0-.182.013-.364.068-.494.147-.363.482-.739 1.045-.739.737 0 1.032.557 1.032 1.374v3.256h2.401V8.715c0-1.892-1.008-2.771-2.353-2.771-1.085 0-1.56.597-1.828 1.019h.024v-.876H6.648c.03.58 0 6.161 0 6.161z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M20.52 3.449A11.67 11.67 0 0 0 12.2.001C5.82 0 .63 5.19.63 11.57c0 2.04.53 4.03 1.53 5.79L.5 23.5l6.3-1.65a11.52 11.52 0 0 0 5.4 1.38h.01c6.38 0 11.57-5.19 11.57-11.57a11.5 11.5 0 0 0-3.26-8.21Zm-8.32 17.83h-.01a9.45 9.45 0 0 1-4.81-1.32l-.34-.2-3.74.98 1-3.64-.22-.37a9.46 9.46 0 0 1-1.45-5.02C2.63 6.1 6.64 2.09 11.57 2.09c2.53 0 4.9.99 6.69 2.79a9.42 9.42 0 0 1 2.77 6.68c0 4.93-4.02 9.45-8.83 9.45Zm5.18-7.07c-.28-.14-1.64-.81-1.9-.9-.25-.1-.43-.14-.62.14-.18.28-.71.9-.87 1.09-.16.19-.32.21-.6.07-.28-.14-1.17-.43-2.22-1.36-.82-.73-1.37-1.63-1.53-1.9-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.05-.22-.52-.44-.45-.62-.45h-.53c-.18 0-.46.07-.71.35-.25.28-.96.94-.96 2.3s.99 2.67 1.13 2.86c.14.18 1.95 2.97 4.72 4.17.66.28 1.17.45 1.57.58.66.21 1.26.18 1.73.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.17-.53-.31Z" />
    </svg>
  );
}

function SolutionCard({ item, delay }) {
  return (
    <article className="solution-card reveal" style={{ animationDelay: `${delay}ms` }}>
      <p className="solution-card__outcome">{item.outcome}</p>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}

function MethodCard({ item, delay }) {
  return (
    <article className="method-card reveal" style={{ animationDelay: `${delay}ms` }}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}

function PlatformCard({ item, delay }) {
  const [logoFailed, setLogoFailed] = useState(false);
  const logoClassName = [
    'platform-card__logo',
    item.logoTheme === 'dark' ? 'platform-card__logo--dark' : '',
    item.logoSize === 'large' ? 'platform-card__logo--large' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={`platform-card reveal${item.logoTheme === 'dark' ? ' platform-card--dark' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      <div className={logoClassName}>
        {logoFailed ? (
          <span>{item.name}</span>
        ) : (
          <img src={item.logo} alt={`Logo ${item.name}`} loading="lazy" onError={() => setLogoFailed(true)} />
        )}
      </div>
      <h3>{item.name}</h3>
    </article>
  );
}

function RecognitionCard({ item }) {
  return (
    <article className="recognition-card reveal">
      <img src={item.image} alt={item.title} />
      <div className="recognition-card__content">
        <p className="recognition-card__kicker">Reconhecimento</p>
        <h3>{item.title}</h3>
        <p className="recognition-card__subtitle">{item.subtitle}</p>
        <p>{item.description}</p>
      </div>
    </article>
  );
}

function CertificationCard({ item, delay }) {
  return (
    <article className="cert-card reveal" style={{ animationDelay: `${delay}ms` }}>
      <p className="cert-card__kicker">Credencial</p>
      <h3>{item.title}</h3>
      <p className="cert-card__issuer">{item.issuer}</p>
      {item.credentialCode ? (
        <p className="cert-card__code">
          Código: <span>{item.credentialCode}</span>
        </p>
      ) : null}
    </article>
  );
}

function ClientLogoCard({ item, delay }) {
  const preferredLogo = item.logo;
  const logoSources = useMemo(() => {
    const sources = [];

    if (preferredLogo) {
      sources.push(preferredLogo);
    }

    if (item.domain) {
      sources.push(`https://www.google.com/s2/favicons?domain=${item.domain}&sz=128`);
      sources.push(`https://${item.domain}/favicon.ico`);
    }

    return [...new Set(sources)];
  }, [preferredLogo, item.domain]);
  const [logoIndex, setLogoIndex] = useState(0);
  const hasLogo = logoIndex < logoSources.length;
  const initials = useMemo(
    () =>
      item.name
        .split(/[\s/-]+/)
        .filter((word) => word.length > 0)
        .slice(0, 3)
        .map((word) => word[0])
        .join('')
        .toUpperCase(),
    [item.name],
  );

  return (
    <a
      className="client-card reveal"
      style={{ animationDelay: `${delay}ms` }}
      href={item.website}
      target="_blank"
      rel="noreferrer"
      aria-label={`Abrir site de ${item.name}`}
    >
      <div className={`client-card__logo${item.logoTheme === 'dark' ? ' client-card__logo--dark' : ''}`}>
        {hasLogo ? (
          <img
            src={logoSources[logoIndex]}
            alt={`Logo ${item.name}`}
            loading="lazy"
            onError={() => setLogoIndex((current) => current + 1)}
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div className="client-card__meta">
        <strong>{item.name}</strong>
        <small>{item.sector}</small>
      </div>
    </a>
  );
}

export default function HomePage() {

  const getLinkBehavior = (href) => (href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {});


  return (
    <>
      <SEO
        title="Mauricio Mars | Suporte BPMS 24/7 e Automação"
        description="Suporte 24/7 em plataformas BPMS, backlog mensal com pool de horas e consulting pontual para automação de processos."
      />

      <a className="skip-link" href="#conteudo-principal">
        Pular para conteúdo principal
      </a>

      <header className="top-nav" id="home">
        <div className="container top-nav__shell">
          <a className="brand" href="#home" aria-label="Voltar ao início">
            <span>{brand.name}</span>
            <small>{brand.role}</small>
          </a>

          <nav className="top-nav__menu" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="top-nav__actions">
            <a
              className="social-btn social-btn--linkedin"
              href={socialLinks.linkedin.href}
              {...getLinkBehavior(socialLinks.linkedin.href)}
              aria-label="Abrir perfil no LinkedIn"
            >
              <LinkedInIcon />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              className="social-btn social-btn--whatsapp"
              href={socialLinks.whatsapp.href}
              {...getLinkBehavior(socialLinks.whatsapp.href)}
              aria-label="Entrar em contato pelo WhatsApp"
            >
              <WhatsAppIcon />
              <span>{socialLinks.whatsapp.label}</span>
            </a>
          </div>
        </div>
      </header>

      <main id="conteudo-principal">
        <section className="hero section" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__content reveal">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 id="hero-title">{hero.title}</h1>
              <p className="hero__intro">{hero.intro}</p>

              <div className="hero__actions">
                <a className="cta cta--primary" href={hero.primaryCta.href} {...getLinkBehavior(hero.primaryCta.href)}>
                  <WhatsAppIcon />
                  <span>{hero.primaryCta.label}</span>
                </a>
                <a className="cta cta--ghost" href={hero.secondaryCta.href} {...getLinkBehavior(hero.secondaryCta.href)}>
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>

            <aside className="profile-card reveal" style={{ animationDelay: '120ms' }}>
              <div className="profile-card__media">
                <span className="profile-card__badge">Especialista BPMS</span>
                <img src="/mauricio-videocast.jpg" alt="Mauricio Mars em videocast" />
              </div>
              <div className="profile-card__name">
                <strong>Mauricio Mars</strong>
                <small>Ciência da Computação - UNIFESO</small>
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="solucoes" aria-labelledby="solucoes-title">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">Soluções</p>
              <h2 id="solucoes-title">Serviços de automação de processos</h2>
              <p>Você escolhe o modelo: suporte contínuo por backlog ou projeto pontual sob orçamento.</p>
            </header>
            <div className="solution-grid">
              {solutions.map((item, index) => (
                <SolutionCard key={item.title} item={item} delay={index * 70} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="metodo" aria-labelledby="metodo-title">
          <div className="container">
            <div>
              <header className="section-head section-head--compact">
                <p className="eyebrow">Método</p>
                <h2 id="metodo-title">Fluxo simples para tirar demanda do papel</h2>
              </header>
              <div className="method-grid">
                {methodSteps.map((item, index) => (
                  <MethodCard key={item.title} item={item} delay={index * 70} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="plataformas" aria-labelledby="plataformas-title">
          <div className="container">
            <header className="section-head section-head--compact">
              <p className="eyebrow">Plataformas</p>
              <h2 id="plataformas-title">Produtos com que eu atuo</h2>
              <p>IBM Cloud Pak, Power Automate, Zeev by Stoque, n8n e Camunda.</p>
            </header>

            <div className="platform-grid">
              {platforms.map((item, index) => (
                <PlatformCard key={item.name} item={item} delay={index * 55} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="clientes" aria-labelledby="clientes-title">
          <div className="container">
            <header className="section-head section-head--compact">
              <p className="eyebrow">Clientes</p>
              <h2 id="clientes-title">Empresas e instituições atendidas</h2>
              <p>Atuação em operações críticas, com foco em continuidade e entrega.</p>
            </header>
            <div className="client-grid">
              {clients.map((item, index) => (
                <ClientLogoCard key={item.name} item={item} delay={index * 45} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="credenciais-title">
          <div className="container">
            <header className="section-head section-head--compact">
              <p className="eyebrow">Credibilidade</p>
              <h2 id="credenciais-title">Reconhecimento e certificações</h2>
            </header>

            <div className="recognition-grid">
              {recognitions.map((item) => (
                <RecognitionCard key={item.title} item={item} />
              ))}
            </div>

            <div className="cert-grid">
              {certifications.map((item, index) => (
                <CertificationCard key={item.title} item={item} delay={index * 70} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section--contact" id="contato" aria-labelledby="contato-title">
          <div className="container contact-shell reveal">
            <div>
              <p className="eyebrow">Contato</p>
              <h2 id="contato-title">{contact.title}</h2>
              <p>{contact.description}</p>
            </div>

            <div className="contact-shell__actions">
              <a className="cta cta--primary" href={contact.primaryCta.href} {...getLinkBehavior(contact.primaryCta.href)}>
                <WhatsAppIcon />
                <span>{contact.primaryCta.label}</span>
              </a>
              <a className="cta cta--ghost" href={contact.secondaryCta.href} {...getLinkBehavior(contact.secondaryCta.href)}>
                {contact.secondaryCta.label}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__content">
          <div>
            <strong>{brand.name}</strong>
            <p>{brand.role}</p>
          </div>
          <p>® Mars Consulting - 2026 copyrights.</p>
        </div>
      </footer>

      <a
        className="float-whatsapp"
        href={socialLinks.whatsapp.href}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir conversa no WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}

