import { X } from 'lucide-react';

export function FilterBar({
  category,
  categoryOptions,
  favoritesCount,
  onCategorySelect,
  filters,
  onClearFilters
}) {
  return (
    <div className="listing-toolbar">
      <div className="pills">
        {categoryOptions.map(item => (
          <button
            key={item}
            className={category === item ? 'pill active' : 'pill'}
            aria-pressed={category === item}
            onClick={() => onCategorySelect(item)}
          >
            {item === 'Casa' ? 'Casas' : item === 'Apartamento' ? 'Apartamentos' : item}
            {item === 'Favoritos' && favoritesCount > 0 ? ' (' + favoritesCount + ')' : ''}
          </button>
        ))}
      </div>

      {filters && (
        <button className="clear-filter" onClick={onClearFilters}>
          Limpar busca <X size={14} />
        </button>
      )}
    </div>
  );
}
