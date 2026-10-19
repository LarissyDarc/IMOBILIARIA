import { Search } from 'lucide-react';
import { PropertyCard } from './PropertyCard.jsx';

export function PropertyList({
  properties,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  photo,
  money,
  getPropertyTitle,
  getPropertyLocation,
  getPropertyImage,
  getPropertyStatus,
  getPropertyAmenities,
  category
}) {
  if (!properties.length) {
    return (
      <div className="empty">
        <Search size={30} />
        <h3>{category === 'Favoritos' ? 'Sua seleção começa com um coração.' : 'Nenhum imóvel encontrado para os critérios selecionados.'}</h3>
        <p>{category === 'Favoritos' ? 'Toque no coração dos imóveis para salvá-los durante sua visita.' : 'Tente ajustar a localização, o tipo ou a faixa de preço e procure outra opção.'}</p>
      </div>
    );
  }

  return (
    <div className="property-grid">
      {properties.map(property => (
        <PropertyCard
          key={property.id}
          property={property}
          isFavorite={favorites.includes(property.id)}
          onToggleFavorite={onToggleFavorite}
          onOpenDetails={onOpenDetails}
          photo={photo}
          money={money}
          getPropertyTitle={getPropertyTitle}
          getPropertyLocation={getPropertyLocation}
          getPropertyImage={getPropertyImage}
          getPropertyStatus={getPropertyStatus}
          getPropertyAmenities={getPropertyAmenities}
        />
      ))}
    </div>
  );
}
