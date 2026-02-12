// Filter Raw Data - UAE Real Estate (Bayut API)
export const filterData = [
  {
    items: [
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
    placeholder: "Purpose",
    queryName: "purpose",
  },
  {
    items: [
      { name: "Dubai", value: "2" },
      { name: "Abu Dhabi", value: "3" },
      { name: "Sharjah", value: "4" },
      { name: "Ajman", value: "5" },
      { name: "Ras Al Khaimah", value: "6" },
      { name: "Fujairah", value: "7" },
      { name: "Umm Al Quwain", value: "8" },
    ],
    placeholder: "Location (City ID)",
    queryName: "location_ids",
  },
  {
    items: [
      { name: "50,000 AED", value: "50000" },
      { name: "100,000 AED", value: "100000" },
      { name: "250,000 AED", value: "250000" },
      { name: "500,000 AED", value: "500000" },
      { name: "750,000 AED", value: "750000" },
      { name: "1,000,000 AED", value: "1000000" },
    ],
    placeholder: "Min Price (AED)",
    queryName: "minPrice",
  },
  {
    items: [
      { name: "500,000 AED", value: "500000" },
      { name: "1,000,000 AED", value: "1000000" },
      { name: "2,000,000 AED", value: "2000000" },
      { name: "3,000,000 AED", value: "3000000" },
      { name: "5,000,000 AED", value: "5000000" },
      { name: "10,000,000 AED", value: "10000000" },
    ],
    placeholder: "Max Price (AED)",
    queryName: "maxPrice",
  },
  {
    items: [
      { name: "Studio", value: "0" },
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5", value: "5" },
      { name: "6+", value: "6" },
    ],
    placeholder: "Min Bedrooms",
    queryName: "roomsMin",
  },
  {
    items: [
      { name: "1", value: "1" },
      { name: "2", value: "2" },
      { name: "3", value: "3" },
      { name: "4", value: "4" },
      { name: "5+", value: "5" },
    ],
    placeholder: "Min Bathrooms",
    queryName: "bathsMin",
  },
  {
    items: [
      { name: "Apartments", value: "apartments" },
      { name: "Villas", value: "villas" },
      { name: "Townhouses", value: "townhouses" },
      { name: "Penthouse", value: "penthouse" },
      { name: "Hotel Apartments", value: "hotel-apartments" },
      { name: "Villa Compound", value: "villa-compound" },
      { name: "Residential", value: "residential" },
    ],
    placeholder: "Category",
    queryName: "category",
  },
];

export const getFilterValues = (filterValues) => {
  const {
    purpose,
    location_ids,
    minPrice,
    maxPrice,
    roomsMin,
    bathsMin,
    category,
  } = filterValues;

  const values = [
    { name: "purpose", value: purpose },
    { name: "location_ids", value: location_ids },
    { name: "minPrice", value: minPrice },
    { name: "maxPrice", value: maxPrice },
    { name: "roomsMin", value: roomsMin },
    { name: "bathsMin", value: bathsMin },
    { name: "category", value: category },
  ];

  return values;
};
