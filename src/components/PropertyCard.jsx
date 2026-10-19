import { ArrowUpRight, Bath, BedDouble, CarFront, Heart, MapPin, Maximize } from 'lucide-react';

export function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  photo,
  money,
  getPropertyTitle,
  getPropertyLocation,
  getPropertyImage,
  getPropertyStatus,
  getPropertyAmenities
}) {
  const title = getPropertyTitle(property);
  const location = getPropertyLocation(property);
  const image = getPropertyImage(property, 800);
  const amenities = getPropertyAmenities(property);

  return (
    <article className="property-card" key={property.id}>
      <div className="property-picture">
        <img src={image} alt={title + ' — imagem ilustrativa'} loading="lazy" />
        <span className="property-tag">{property.tag}</span>
        <button
          className={'favorite icon-button ' + (isFavorite ? 'saved' : '')}
          aria-label={(isFavorite ? 'Remover dos favoritos: ' : 'Favoritar: ') + title}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(property.id)}
        >
          <Heart size={19} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <span className="picture-type">{property.type} · {property.purpose === 'Comprar' ? 'Venda' : 'Locação'}</span>
      </div>

      <div className="property-info">
        <span className="address"><MapPin size={14}/> {location}, Brasília - DF</span>
        <h3>{title}</h3>

        <div className="property-meta">
          <span className="property-status">{getPropertyStatus(property)}</span>
          {property.featured && <span className="property-highlight">Destaque</span>}
        </div>

        <div className="features">
          <span><BedDouble size={16}/>{property.beds} quartos</span>
          <span><Bath size={16}/>{property.baths}</span>
          <span><CarFront size={16}/>{property.cars}</span>
          <span><Maximize size={15}/>{property.size} m²</span>
        </div>

        {amenities.length > 0 && (
          <div className="property-amenities">
            {amenities.slice(0, 3).map(item => (
              <span key={item} className="property-amenity">{item}</span>
            ))}
          </div>
        )}

        <div className="property-bottom">
          <strong>{money(property.price)}{property.purpose === 'Alugar' && <small>/mês</small>}</strong>
          <button onClick={() => onOpenDetails(property)} aria-label={'Ver detalhes de ' + title}>
            Ver imóvel <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
