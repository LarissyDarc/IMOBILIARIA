import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Search, MapPin, House, Menu, X, ShieldCheck, KeyRound, Handshake, Check, Heart } from 'lucide-react';
import './styles.css';
import { locationGroups, matchesLocation } from './locations.js';
import { properties } from './properties.js';
import { categoryOptions, defaultContactForm, priceRangesByPurpose, propertyPurposes, propertyTypes } from './constants.js';
import { FilterBar } from './components/FilterBar.jsx';
import { PropertyList } from './components/PropertyList.jsx';

const photo = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value);
const getPropertyTitle = property => property.title ?? property.name ?? 'Imóvel';
const getPropertyLocation = property => property.neighborhood ?? property.area ?? 'Localização';
const getPropertyImage = (property, width = 800) => photo(property.images?.[0] ?? property.image, width);
const getPropertyStatus = property => property.status ?? (property.purpose === 'Alugar' ? 'Disponível para locação' : 'Disponível para compra');
const getPropertyAmenities = property => property.amenities ?? [];

export default function App() {
  const [menu, setMenu] = useState(false);
  const [purpose, setPurpose] = useState('Comprar');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [filters, setFilters] = useState(null);
  const [category, setCategory] = useState('Todos');
  const [expanded, setExpanded] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [contactForm, setContactForm] = useState(defaultContactForm);
  const [sent, setSent] = useState(false);
  const dialog = useRef(null);

  useEffect(() => {
    if (selected) {
      dialog.current?.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  const filtered = properties.filter(property =>
    (!filters || (
      property.purpose === filters.purpose &&
      matchesLocation(getPropertyLocation(property), filters.location) &&
      (!filters.type || property.type === filters.type) &&
      (!filters.budget || property.price <= Number(filters.budget))
    )) &&
    (category === 'Todos' || (category === 'Favoritos' ? favorites.includes(property.id) : property.type === category))
  );

  const visible = [...filtered].sort((a, b) => Number(b.featured) - Number(a.featured));
  const editorialProperties = visible.slice(0, 3);

  const handleSearch = e => {
    e.preventDefault();
    setFilters({ purpose, location, type, budget });
    setCategory('Todos');
    setExpanded(true);
    document.getElementById('imoveis')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleFavorite = propertyId => {
    setFavorites(current => current.includes(propertyId)
      ? current.filter(id => id !== propertyId)
      : [...current, propertyId]
    );
  };

  const handleInquire = property => {
    setContactForm(prev => ({
      ...prev,
      message: 'Olá! Tenho interesse no imóvel ' + getPropertyTitle(property) + '. Gostaria de saber mais.'
    }));
    setSent(false);
    dialog.current?.close();
    setSelected(null);
    window.requestAnimationFrame(() => {
      document.body.style.overflow = '';
      document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        document.querySelector('#contato textarea')?.focus({ preventScroll: true });
      }, 450);
    });
  };

  const selectedPropertyPanel = selected ? (() => {
    const title = getPropertyTitle(selected);
    const locationLabel = getPropertyLocation(selected);
    const image = getPropertyImage(selected, 1200);
    const amenities = getPropertyAmenities(selected);

    return (
      <>
        <button className="dialog-close icon-button" aria-label="Fechar detalhes" onClick={() => setSelected(null)} autoFocus><X /></button>
        <img className="dialog-image" src={image} alt={title} />
        <div className="dialog-body">
          <div className="dialog-header-row">
            <span className="eyebrow">{selected.type} · {selected.purpose === 'Comprar' ? 'À venda' : 'Para alugar'}</span>
            <span className="dialog-status">{getPropertyStatus(selected)}</span>
          </div>
          <h2 id="detail-title">{title}</h2>
          <p className="address"><MapPin size={16} />{locationLabel}, Brasília - DF</p>
          <p>{selected.description}</p>
          <div className="dialog-summary">
            <span>{selected.beds} quartos</span>
            <span>{selected.baths} banheiros</span>
            <span>{selected.cars} vagas</span>
            <span>{selected.size} m²</span>
          </div>
          {amenities.length > 0 && (
            <div className="dialog-amenities">
              {amenities.slice(0, 4).map(item => <span key={item} className="dialog-amenity">{item}</span>)}
            </div>
          )}
          <strong className="dialog-price">{money(selected.price)}{selected.purpose === 'Alugar' ? '/mês' : ''}</strong>
          <button className="button" onClick={() => handleInquire(selected)}>Tenho interesse <ArrowUpRight size={18} /></button>
          <small>Imóvel fictício. Fotografia ilustrativa.</small>
        </div>
      </>
    );
  })() : null;

  return (
    <>
      <a className="skip" href="#principal">Pular para o conteúdo</a>

      <header className="header">
        <div className="container nav">
          <a href="#" className="brand" aria-label="Morada, início">
            <House strokeWidth={1.7} />
            <span>morada<span className="brand-dot">.</span><small>IMOBILIÁRIA</small></span>
          </a>

          <nav className={menu ? 'navigation open' : 'navigation'} aria-label="Navegação principal">
            {[['Início','#'],['Imóveis','#imoveis'],['Sobre nós','#sobre'],['Como funciona','#como-funciona']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>
            ))}
          </nav>

          <a className="button nav-contact" href="#contato">Vamos conversar <ArrowUpRight size={17} /></a>
          <button className="menu-toggle icon-button" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="principal">
        <section className="hero">
          <img className="hero-image" src={photo('photo-1600607687920-4e2a09cf159d', 2200)} alt="Sala ampla e iluminada, com móveis de madeira e vista para o jardim" fetchPriority="high" />
          <div className="hero-shade" />
          <div className="container hero-content">
            <div className="hero-copy">
              <span className="eyebrow light hero-label"><span className="tiny-line" /> RESIDÊNCIAS DE ALTO PADRÃO</span>
              <h1>Seu próximo capítulo<br />começa <em>aqui.</em></h1>
              <p>Na Morada, cada endereço é pensado para a vida que você quer viver.<br />Luz, presença, conforto e personalidade em cada detalhe.</p>

              <div className="hero-meta" aria-label="Estatísticas da marca">
                <div>
                  <strong>24</strong>
                  <span>seleções</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>bairros</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>estilo</span>
                </div>
              </div>

              <div className="hero-actions">
                <a href="#imoveis" className="hero-link">Encontre sua morada <ArrowUpRight size={20} /></a>
                <a href="#sobre" className="hero-secondary">Nossa curadoria</a>
              </div>
            </div>
          </div>
          <div className="hero-caption"><MapPin size={15} /> Espaços que inspiram uma nova vida</div>
        </section>

        <div className="container search-wrap">
          <form className="search-box" onSubmit={handleSearch}>
            <div className="search-tabs" role="group" aria-label="Finalidade">
              {propertyPurposes.map(item => (
                <button type="button" key={item} className={purpose === item ? 'active' : ''} aria-pressed={purpose === item} onClick={() => { setPurpose(item); setBudget(''); }}>
                  {item}
                </button>
              ))}
              <span>Seu novo endereço está mais perto.</span>
            </div>

            <div className="search-fields">
              <label>
                <span><MapPin size={15} /> Localização</span>
                <select value={location} onChange={e => setLocation(e.target.value)}>
                  <option value="">Onde você quer morar?</option>
                  {locationGroups.map(group => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map(area => <option key={area} value={area}>{area}</option>)}
                    </optgroup>
                  ))}
                </select>
              </label>

              <label>
                <span><House size={15} /> Tipo de imóvel</span>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="">Todos os tipos</option>
                  {propertyTypes.map(item => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>

              <label>
                <span>Faixa de preço</span>
                <select value={budget} onChange={e => setBudget(e.target.value)}>
                  <option value="">Qualquer valor</option>
                  {priceRangesByPurpose[purpose].map(value => (
                    <option value={value} key={value}>Até {money(value)}</option>
                  ))}
                </select>
              </label>

              <button className="button search-button" type="submit"><Search size={18} /> Buscar imóveis</button>
            </div>
          </form>
        </div>

        <section className="container listings section" id="imoveis">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ENCONTRE O SEU LUGAR</span>
              <h2>Novas histórias, <em>novos endereços.</em></h2>
              <p>Uma seleção de imóveis com tudo para fazer parte da sua vida.</p>
            </div>
            <a href="#imoveis" className="text-link" onClick={() => { setExpanded(true); setFilters(null); setCategory('Todos'); }}>
              Ver todos os imóveis <ArrowUpRight size={18} />
            </a>
          </div>

          <FilterBar
            category={category}
            categoryOptions={categoryOptions}
            favoritesCount={favorites.length}
            onCategorySelect={setCategory}
            filters={filters}
            onClearFilters={() => setFilters(null)}
          />

          {editorialProperties.length > 0 && (
            <div className="editorial-showcase">
              <div className="editorial-header">
                <div>
                  <span className="eyebrow">SELEÇÃO MORA DA</span>
                  <h3>Os endereços que marcam a diferença.</h3>
                </div>
                <span className="editorial-badge">Curadoria premium</span>
              </div>

              <div className="featured-strip">
                {editorialProperties.map(property => {
                  const title = getPropertyTitle(property);
                  const location = getPropertyLocation(property);
                  const image = getPropertyImage(property, 1200);

                  return (
                    <article className="featured-card" key={property.id}>
                      <img src={image} alt={title + ' — imagem ilustrativa'} loading="lazy" />
                      <div className="featured-card-body">
                        <div className="featured-meta">
                          <span className="featured-tag">{property.tag}</span>
                          <button
                            className={'favorite icon-button ' + (favorites.includes(property.id) ? 'saved' : '')}
                            aria-label={(favorites.includes(property.id) ? 'Remover dos favoritos: ' : 'Favoritar: ') + title}
                            aria-pressed={favorites.includes(property.id)}
                            onClick={() => handleToggleFavorite(property.id)}
                          >
                            <Heart size={18} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>

                        <div className="featured-location"><MapPin size={14} /> {location}, Brasília - DF</div>
                        <h4>{title}</h4>
                        <div className="featured-details">
                          <span>{property.beds} quartos</span>
                          <span>{property.baths} banheiros</span>
                          <span>{property.size} m²</span>
                        </div>

                        <div className="featured-footer">
                          <strong>{money(property.price)}{property.purpose === 'Alugar' ? '/mês' : ''}</strong>
                          <button onClick={() => setSelected(property)}>
                            Ver imóvel <ArrowUpRight size={16} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          <div className="listing-summary" aria-live="polite">
            <span>{filtered.length} imóveis disponíveis</span>
            <span>{category === 'Todos' ? 'Coleção completa' : category}</span>
          </div>

          <PropertyList
            properties={visible}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetails={setSelected}
            photo={photo}
            money={money}
            getPropertyTitle={getPropertyTitle}
            getPropertyLocation={getPropertyLocation}
            getPropertyImage={getPropertyImage}
            getPropertyStatus={getPropertyStatus}
            getPropertyAmenities={getPropertyAmenities}
            category={category}
          />

          <p className="demo-note">Imóveis e valores ilustrativos para projeto acadêmico.</p>
        </section>

        <section id="sobre" className="about">
          <div className="container about-layout">
            <div className="about-visual">
              <img src={photo('photo-1600210492486-724fe5c67fb0', 1000)} loading="lazy" alt="Ambiente acolhedor com sofá, plantas e iluminação natural" />
              <div className="image-note">
                <House size={29} />
                <span>Um lugar.<br /><strong>Infinitas possibilidades.</strong></span>
              </div>
            </div>

            <div className="about-copy">
              <span className="eyebrow">MUITO PRAZER, SOMOS A MORADA</span>
              <h2>Imóveis são espaços.<br /><em>Lares são conexões.</em></h2>
              <p>Acreditamos que encontrar um imóvel é encontrar o cenário da sua próxima história. Por isso, colocamos suas escolhas, seus planos e seu jeito de viver no centro de tudo.</p>
              <p>Do primeiro olhar à entrega das chaves, nossa proposta é tornar cada etapa mais simples, próxima e transparente.</p>
              <a className="text-link" href="#contato">Conheça a gente <ArrowUpRight size={18} /></a>
              <div className="about-values">
                <span><ShieldCheck size={23} />Transparência<br />em cada detalhe</span>
                <span><Handshake size={23} />Atendimento<br />de pessoa para pessoa</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container section luxury-differentials">
          <div className="luxury-header">
            <div>
              <span className="eyebrow">A EXPERIÊNCIA MORADA</span>
              <h2>Uma agência pensada para quem valoriza<br /><em>qualidade de vida.</em></h2>
            </div>
            <p>Mais do que vender imóveis, conectamos pessoas a lugares com personalidade, tranquilidade e presença.</p>
          </div>

          <div className="luxury-grid">
            {[
              { title: 'Curadoria de excelência', text: 'Selecionamos endereços com identidade, arquitetura e potencial real de valor.', Icon: House },
              { title: 'Atendimento concierge', text: 'Uma parceria próxima, clara e sofisticada em todas as etapas do processo.', Icon: Handshake },
              { title: 'Negócio com discrição', text: 'Estratégia, atenção e privacidade para decisões importantes e bem pensadas.', Icon: ShieldCheck },
              { title: 'Localização de impacto', text: ' bairros com conveniência, qualidade e potencial de crescimento ao longo do tempo.', Icon: MapPin }
            ].map(({ title, text, Icon }) => (
              <div className="luxury-card" key={title}>
                <div className="luxury-icon"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container section steps" id="como-funciona">
          <span className="eyebrow">DO SEU JEITO, NO SEU TEMPO</span>
          <h2>O caminho para sua <em>nova morada.</em></h2>
          <div className="steps-grid">
            {[{ n: '01', Icon: Search, title: 'Encontre suas possibilidades', text: 'Explore os imóveis e filtre o que faz sentido para o seu momento.' }, { n: '02', Icon: Handshake, title: 'Converse e conheça de perto', text: 'Conte seus planos e escolha os imóveis que você gostaria de visitar.' }, { n: '03', Icon: KeyRound, title: 'Comece um novo capítulo', text: 'Com orientação em cada etapa, o próximo endereço fica mais perto.' }].map(({ n, Icon, title, text }) => (
              <div className="step" key={n}>
                <div className="step-top"><Icon size={26} strokeWidth={1.5} /><span>{n}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="container contact-layout">
            <div>
              <span className="eyebrow light">VAMOS ENCONTRAR SEU NOVO ENDEREÇO?</span>
              <h2>Todo novo começo<br />parte de uma <em>conversa.</em></h2>
              <p>Conte o que você procura.<br />Seu próximo capítulo pode começar por aqui.</p>
              <span className="contact-note"><Check size={17} /> Você no centro de cada escolha.</span>
            </div>

            <form className="contact-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
              <label>
                Seu nome
                <input required name="name" autoComplete="name" placeholder="Como podemos chamar você?" maxLength={100} value={contactForm.name} onChange={e => { setContactForm(prev => ({ ...prev, name: e.target.value })); setSent(false); }} />
              </label>

              <label>
                E-mail
                <input required type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" maxLength={180} value={contactForm.email} onChange={e => { setContactForm(prev => ({ ...prev, email: e.target.value })); setSent(false); }} />
              </label>

              <label>
                O que você procura?
                <textarea required name="message" rows={3} value={contactForm.message} onChange={e => { setContactForm(prev => ({ ...prev, message: e.target.value })); setSent(false); }} placeholder="Conte um pouco sobre a sua próxima morada..." maxLength={1500} />
              </label>

              <button className="button" type="submit">Simular contato <ArrowUpRight size={18} /></button>
              <p className="form-note">Demonstração acadêmica: os dados não são enviados ou armazenados.</p>
              {sent && <p className="success" role="status"><Check size={18} /> Simulação concluída! Em um site real, sua mensagem seria encaminhada à equipe.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-top">
          <a href="#" className="brand"><House strokeWidth={1.7} /><span>morada.<small>IMOBILIÁRIA</small></span></a>
          <p>Mais que um endereço.<br />Um lugar para viver sua história.</p>
          <a href="#imoveis">Encontre sua morada <ArrowUpRight size={17} /></a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Morada · Projeto acadêmico em React.</span>
          <span>Marca fictícia · Fotografias: Unsplash</span>
          <a href="#">Voltar ao topo ↑</a>
        </div>
      </footer>

      <dialog ref={dialog} onCancel={() => setSelected(null)} onClick={e => { if (e.target === dialog.current) setSelected(null); }} onClose={() => setSelected(null)} aria-labelledby="detail-title">
        {selectedPropertyPanel}
      </dialog>
    </>
  );
}
