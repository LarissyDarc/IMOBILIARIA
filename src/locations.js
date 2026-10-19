// Regiões administrativas: https://pdad.ipe.df.gov.br/
export const locationGroups = [
  {
    label: 'Regiões administrativas do DF',
    options: [
      'Água Quente', 'Águas Claras', 'Arapoanga', 'Arniqueira', 'Brazlândia',
      'Candangolândia', 'Ceilândia', 'Cruzeiro', 'Fercal', 'Gama', 'Guará',
      'Itapoã', 'Jardim Botânico', 'Lago Norte', 'Lago Sul', 'Núcleo Bandeirante',
      'Paranoá', 'Park Way', 'Planaltina', 'Plano Piloto', 'Recanto das Emas',
      'Riacho Fundo', 'Riacho Fundo II', 'Samambaia', 'Santa Maria', 'São Sebastião',
      'SCIA / Estrutural', 'SIA', 'Sobradinho', 'Sobradinho II',
      'Sol Nascente / Pôr do Sol', 'Sudoeste / Octogonal', 'Taguatinga', 'Varjão',
      'Vicente Pires'
    ]
  },
  {
    label: 'Bairros e setores',
    options: [
      'Asa Norte', 'Asa Sul', 'Cruzeiro Novo', 'Cruzeiro Velho', 'Guará I',
      'Guará II', 'Noroeste', 'Octogonal', 'Setor de Mansões do Lago Norte',
      'Setor de Mansões Park Way', 'Sudoeste', 'Vila Planalto', 'Vila Telebrasília'
    ]
  }
];

const locationAliases = {
  'Plano Piloto': ['Plano Piloto', 'Asa Norte', 'Asa Sul', 'Noroeste', 'Vila Planalto', 'Vila Telebrasília'],
  'Cruzeiro': ['Cruzeiro', 'Cruzeiro Novo', 'Cruzeiro Velho'],
  'Guará': ['Guará', 'Guará I', 'Guará II'],
  'Sudoeste / Octogonal': ['Sudoeste / Octogonal', 'Sudoeste', 'Octogonal'],
  'Lago Norte': ['Lago Norte', 'Setor de Mansões do Lago Norte'],
  'Park Way': ['Park Way', 'Setor de Mansões Park Way'],
  'Lago Sul': ['Lago Sul'],
  'Asa Norte': ['Asa Norte'],
  'Asa Sul': ['Asa Sul'],
  'Noroeste': ['Noroeste'],
  'Vila Planalto': ['Vila Planalto'],
  'Vila Telebrasília': ['Vila Telebrasília'],
  'Cruzeiro Novo': ['Cruzeiro Novo'],
  'Cruzeiro Velho': ['Cruzeiro Velho'],
  'Guará I': ['Guará I'],
  'Guará II': ['Guará II'],
  'Sudoeste': ['Sudoeste'],
  'Octogonal': ['Octogonal'],
  'Setor de Mansões do Lago Norte': ['Setor de Mansões do Lago Norte'],
  'Setor de Mansões Park Way': ['Setor de Mansões Park Way']
};

export function matchesLocation(area, location) {
  if (!location || !area) return true;

  const normalizedArea = String(area).trim();
  const normalizedLocation = String(location).trim();

  if (normalizedArea === normalizedLocation) return true;

  const areaGroup = locationAliases[normalizedArea] ?? [];
  const locationGroup = locationAliases[normalizedLocation] ?? [normalizedLocation];

  return areaGroup.includes(normalizedLocation) || locationGroup.includes(normalizedArea);
}

export const allLocations = locationGroups.flatMap(group => group.options);
