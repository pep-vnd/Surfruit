// Confirmar estos datos con SURFRUIT antes de una publicación comercial.
// null significa desconocido: nunca se transforma en una afirmación pública.
export const business = {
  brand: 'SURFRUIT',
  email: null,
  phone: null,
  address: null,
  currentVarieties: null,
  currentOrigins: null,
  seasonCalendar: null,
  availableSizes: null,
  supplyCapacity: null,
  currentPackaging: null,
  certifications: null,
  legalEntity: null,
  relationshipToLasLomas: null,
  imageRightsApprovedForPublication: null,
  logoMaster: null,
  // La etiqueta de marzo de 2023 no acredita la oferta actual.
  historicalReference: { variety: 'Hass', origin: 'España', date: '2023-03' },
};

export const routes = {
  es: { home: 'es/', product: 'es/aguacate/', warm: 'es/a-la-mesa/' },
  en: { home: 'en/', product: 'en/avocado/', warm: 'en/at-the-table/' },
};
