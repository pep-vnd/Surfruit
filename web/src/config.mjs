// Confirmar estos datos con SURFRUIT antes de una publicación comercial.
// null significa desconocido: nunca se transforma en una afirmación pública.
export const business = {
  brand: 'SURFRUIT',
  email: 'sales@surfruit.es',
  phone: '+34 956 438 123',
  address: 'Finca Las Lomas · Ctra. Vejer–Benalup, km 7 · 11179 Vejer de la Frontera, Cádiz, España',
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
  es: { home:'es/', company:'es/surfruit/', product:'es/aguacate/', citrus:'es/citricos/', vegetables:'es/verduras/', others:'es/otros/', contact:'es/contacta/', grapefruit:'es/citricos/pomelo/', leek:'es/verduras/puerro/', carrot:'es/verduras/zanahoria/', cauliflower:'es/verduras/coliflor/', broccoli:'es/verduras/brocoli/', sweetPotato:'es/otros/boniato/', legal:'es/aviso-legal/', privacy:'es/privacidad/', cookies:'es/cookies/' },
  en: { home:'en/', company:'en/surfruit/', product:'en/avocado/', citrus:'en/citrus/', vegetables:'en/vegetables/', others:'en/other-produce/', contact:'en/contact/', grapefruit:'en/citrus/grapefruit/', leek:'en/vegetables/leek/', carrot:'en/vegetables/carrot/', cauliflower:'en/vegetables/cauliflower/', broccoli:'en/vegetables/broccoli/', sweetPotato:'en/other-produce/sweet-potato/', legal:'en/legal-notice/', privacy:'en/privacy/', cookies:'en/cookies/' },
};
