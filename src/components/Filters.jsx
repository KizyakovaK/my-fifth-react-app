import React from 'react';

export function Filters({ onFilterChange, initialFilters }) {
  // Мультивыбор категорий (массив)
  const [localCategories, setLocalCategories] = React.useState(
    initialFilters.categories || []
  );
  const [localMinPrice, setLocalMinPrice] = React.useState(
    initialFilters.minPrice !== undefined ? String(initialFilters.minPrice) : ''
  );
  const [localMaxPrice, setLocalMaxPrice] = React.useState(
    initialFilters.maxPrice !== undefined ? String(initialFilters.maxPrice) : ''
  );

  const [errors, setErrors] = React.useState({});

  const validate = () => {
    const errs = {};
    const min = localMinPrice ? Number(localMinPrice) : undefined;
    const max = localMaxPrice ? Number(localMaxPrice) : undefined;

    if (min !== undefined && min < 0) {
      errs.min = 'Цена не может быть отрицательной';
    }
    if (max !== undefined && max < 0) {
      errs.max = 'Цена не может быть отрицательной';
    }
    if (
      min !== undefined &&
      max !== undefined &&
      min >= 0 &&
      max >= 0 &&
      min > max
    ) {
      errs.min = 'Цена «от» не может быть больше цены «до»';
      errs.max = 'Цена «до» не может быть меньше цены «от»';
    }

    return errs;
  };

  const handleApply = () => {
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    onFilterChange({
      categories: localCategories.length > 0 ? localCategories : undefined,
      minPrice: localMinPrice ? Number(localMinPrice) : undefined,
      maxPrice: localMaxPrice ? Number(localMaxPrice) : undefined,
    });
  };

  const handleMinChange = (e) => {
    setLocalMinPrice(e.target.value);
    setErrors((prev) => ({ ...prev, min: '' }));
  };

  const handleMaxChange = (e) => {
    setLocalMaxPrice(e.target.value);
    setErrors((prev) => ({ ...prev, max: '' }));
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        {/* Мультивыбор категорий */}
        <div>
          <label>Категории (можно несколько)</label>
          <select
            multiple
            value={localCategories}
            onChange={(e) => {
              const selected = Array.from(
                e.target.selectedOptions,
                (o) => o.value
              );
              setLocalCategories(selected);
            }}
            style={{
              width: '100%',
              padding: '8px',
              height: '120px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="electronics">Электроника</option>
            <option value="jewellery">Ювелирные изделия</option>
            <option value="men's clothing">Мужская одежда</option>
            <option value="women's clothing">Женская одежда</option>
          </select>
          <span style={{ fontSize: '0.8rem', color: '#777' }}>
            Зажми Ctrl (Cmd) для выбора нескольких
          </span>
        </div>

        {/* Цена от + ползунок */}
        <div>
          <label>Цена от</label>
          <input
            type="number"
            value={localMinPrice}
            onChange={handleMinChange}
            placeholder="0"
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              border: errors.min ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={localMinPrice || 0}
            onChange={handleMinChange}
            style={{ width: '100%', marginTop: '6px' }}
          />
          <span style={{ fontSize: '0.8rem', color: '#555' }}>
            {localMinPrice || 0} ₽
          </span>
          {errors.min && (
            <span
              style={{
                color: 'red',
                fontSize: '0.85rem',
                marginTop: '4px',
                display: 'block',
              }}
            >
              {errors.min}
            </span>
          )}
        </div>

        {/* Цена до + ползунок */}
        <div>
          <label>Цена до</label>
          <input
            type="number"
            value={localMaxPrice}
            onChange={handleMaxChange}
            placeholder="1000"
            min="0"
            style={{
              width: '100%',
              padding: '8px',
              border: errors.max ? '1px solid red' : '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={localMaxPrice || 1000}
            onChange={handleMaxChange}
            style={{ width: '100%', marginTop: '6px' }}
          />
          <span style={{ fontSize: '0.8rem', color: '#555' }}>
            {localMaxPrice || 1000} ₽
          </span>
          {errors.max && (
            <span
              style={{
                color: 'red',
                fontSize: '0.85rem',
                marginTop: '4px',
                display: 'block',
              }}
            >
              {errors.max}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleApply}
        style={{
          padding: '10px 24px',
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Применить фильтры
      </button>
    </div>
  );
}