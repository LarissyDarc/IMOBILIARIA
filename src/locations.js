// Regiões administrativas: https://pdad.ipe.df.gov.br/
export const locationGroups = [
  { label: 'Regiões administrativas do DF', options: ["Água Quente","Águas Claras","Arapoanga","Arniqueira","Brazlândia","Candangolândia","Ceilândia","Cruzeiro","Fercal","Gama","Guará","Itapoã","Jardim Botânico","Lago Norte","Lago Sul","Núcleo Bandeirante","Paranoá","Park Way","Planaltina","Plano Piloto","Recanto das Emas","Riacho Fundo","Riacho Fundo II","Samambaia","Santa Maria","São Sebastião","SCIA / Estrutural","SIA","Sobradinho","Sobradinho II","Sol Nascente / Pôr do Sol","Sudoeste / Octogonal","Taguatinga","Varjão","Vicente Pires"] },
  { label: 'Bairros e setores', options: ['Asa Norte', 'Asa Sul', 'Cruzeiro Novo', 'Cruzeiro Velho', 'Guará I', 'Guará II', 'Noroeste', 'Octogonal', 'Setor de Mansões do Lago Norte', 'Setor de Mansões Park Way', 'Sudoeste', 'Vila Planalto', 'Vila Telebrasília'] }
];
export function matchesLocation(area, location) {
  if (!location || area === location) return true;
  const neighborhoods = {
    'Plano Piloto': ['Asa Norte', 'Asa Sul', 'Noroeste', 'Vila Planalto', 'Vila Telebrasília'],
    'Cruzeiro': ['Cruzeiro Novo', 'Cruzeiro Velho'],
    'Guará': ['Guará I', 'Guará II'],
    'Sudoeste / Octogonal': ['Sudoeste', 'Octogonal'],
    'Lago Norte': ['Setor de Mansões do Lago Norte'],
    'Park Way': ['Setor de Mansões Park Way']
  };
  return neighborhoods[location]?.includes(area) ?? false;
}
