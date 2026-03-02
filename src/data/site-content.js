const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5521971591996';
const whatsappMessage = encodeURIComponent(
  'Olá Mauricio! Quero falar sobre suporte BPMS 24/7 e automação por backlog.',
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export const brand = {
  name: 'Mauricio Mars',
  role: 'Especialista em automação',
};

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Método', href: '#metodo' },
  { label: 'Plataformas', href: '#plataformas' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Contato', href: '#contato' },
];

export const socialLinks = {
  linkedin: {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mauricio-mars-627b3a1ab/',
  },
  whatsapp: {
    label: 'WhatsApp',
    href: whatsappLink,
  },
};

export const hero = {
  eyebrow: 'AUTOMAÇÃO DE PROCESSOS EM BPMS',
  title: 'Automação de processos com operação contínua',
  intro:
    'Atuação em dois formatos: backlog mensal com pool de horas ou consulting pontual sob orçamento.',
  primaryCta: {
    label: 'Falar sobre meu backlog',
    href: whatsappLink,
  },
  secondaryCta: {
    label: 'Ver serviços',
    href: '#solucoes',
  },
};

export const solutions = [
  {
    title: 'Suporte 24/7 em plataformas BPMS',
    description: 'Monitoramento e resolução de incidentes para manter processos críticos em produção.',
    outcome: 'Operação estável',
  },
  {
    title: 'Backlog Driven com pool mensal',
    description:
      'Implementação contínua de automações com horas mensais, sem abrir novo orçamento para cada item.',
    outcome: 'Entrega contínua',
  },
  {
    title: 'Consulting pontual sob orçamento',
    description: 'Projeto fechado para necessidades específicas de automação, com plano e custo definidos.',
    outcome: 'Escopo fechado',
  },
];

export const methodSteps = [
  {
    title: '1. Alinhamento e priorização',
    description: 'Organizamos backlog e criticidade para definir o que entra primeiro.',
  },
  {
    title: '2. Execução em ciclos curtos',
    description: 'Desenvolvimento, testes e publicação contínua das automações.',
  },
  {
    title: '3. Acompanhamento operacional',
    description: 'Revisão de resultado, ajuste de fila e sustentação da operação.',
  },
];

export const platforms = [
  {
    name: 'IBM Cloud Pak',
    logo: '/logos/platform-ibm-cloud-pak.png',
    logoSize: 'large',
  },
  {
    name: 'Power Automate',
    logo: '/logos/platform-power-automate.png',
  },
  {
    name: 'Zeev by Stoque',
    logo: '/logos/platform-zeev-by-stoque.png',
  },
  {
    name: 'n8n',
    logo: '/logos/platform-n8n-wordmark.png',
  },
  {
    name: 'Camunda',
    logo: '/logos/platform-camunda.png',
  },
];
export const recognitions = [
  {
    title: '1º Lugar - Hackathon Serra dos Órgãos',
    subtitle: '24 horas de programação e entrega sob alta pressão',
    description:
      'Reconhecimento pela capacidade de resolver problema real com velocidade, colaboração e foco em resultado.',
    image: '/awards/hackathon-serra.jpg',
  },
];

export const certifications = [
  {
    title: 'Camunda BPM Certified',
    issuer: 'IBPM - Instituto Brasileiro de BPM',
  },
  {
    title: 'Zeev Certified Developer',
    issuer: 'Zeev by Stoque',
    credentialCode: 'CLQYPFNVSQ-KQVQZJVV-XSPXHWRHSM',
  },
];

export const clients = [
  {
    name: 'Orbia',
    sector: 'Indústria',
    domain: 'orbia.ag',
    website: 'https://www.orbia.ag/',
    logo: '/logos/orbia.png',
    logoTheme: 'dark',
  },
  {
    name: 'IBM',
    sector: 'Tecnologia',
    domain: 'ibm.com',
    website: 'https://www.ibm.com/br-pt',
    logo:
      'https://www.ibm.com/content/dam/connectedassets-adobe-cms/worldwide-content/creative-assets/s-migr/ul/g/18/f9/ibm_logo_pos_blue60_rgb.png/_jcr_content/renditions/cq5dam.thumbnail.1280.1280.png',
  },
  {
    name: 'Telefonica Vivo',
    sector: 'Telecom',
    domain: 'telefonica.com',
    website: 'https://www.telefonica.com/',
    logo: '/logos/telefonica.png',
    logoTheme: 'dark',
  },
  {
    name: 'Vale',
    sector: 'Mineração',
    domain: 'vale.com',
    website: 'https://www.vale.com/',
    logo:
      'https://www.vale.com/documents/44618/9988240/Logotipo_Vale.svg.png/f4c0e958-ae3d-2133-68ff-5defa86d0b27?version=1.0&t=1761247930630&imagePreview=1',
  },
  {
    name: 'Banco do Nordeste',
    sector: 'Financeiro',
    domain: 'bnb.gov.br',
    website: 'https://www.bnb.gov.br/',
    logo: 'https://www.bnb.gov.br/o/bnb-dxp-theme/images/logo-bnb-mobile.svg',
  },
  {
    name: 'IMPA',
    sector: 'Ciência',
    domain: 'impa.br',
    website: 'https://impa.br/',
    logo: '/logos/impa.png',
  },
  {
    name: 'Petros',
    sector: 'Previdência',
    domain: 'petros.com.br',
    website: 'https://www.petros.com.br/',
    logo: '/logos/petros.svg',
  },
  {
    name: 'SESI/SENAI - Amapá',
    sector: 'Indústria',
    domain: 'fieap.com.br',
    website: 'https://fieap.com.br/',
    logo: '/logos/fieap.png',
  },
  {
    name: 'SESI/SENAI - Alagoas',
    sector: 'Indústria',
    domain: 'fiea.com.br',
    website: 'https://www.fiea.com.br/',
    logo: '/logos/fiea.png',
  },
  {
    name: 'SESI/SENAI - Pernambuco',
    sector: 'Indústria',
    domain: 'fiepe.org.br',
    website: 'https://fiepe.org.br/',
    logo: '/logos/fiepe.png',
  },
  {
    name: 'SESI/SENAI - São Paulo',
    sector: 'Indústria',
    domain: 'fiesp.com.br',
    website: 'https://www.fiesp.com.br/',
    logo: '/logos/fiesp.png',
  },
  {
    name: 'SESI/SENAI - Paraíba',
    sector: 'Indústria',
    domain: 'fiepb.com.br',
    website: 'https://www.fiepb.com.br/',
    logo: '/logos/fiepb.png',
  },
  {
    name: 'SESI/SENAI - Mato Grosso do Sul',
    sector: 'Indústria',
    domain: 'fiems.com.br',
    website: 'https://www.fiems.com.br/',
    logo: '/logos/fiems-icon.png',
  },
  {
    name: 'SESI/SENAI - Tocantins',
    sector: 'Indústria',
    domain: 'fieto.com.br',
    website: 'https://www.fieto.com.br/',
    logo: '/logos/fieto.png',
  },
  {
    name: 'SESI/SENAI - Amazonas',
    sector: 'Indústria',
    domain: 'fieam.org.br',
    website: 'https://fieam.org.br/',
    logo: '/logos/fieam.png',
  },
  {
    name: 'SESI/SENAI - Pará',
    sector: 'Indústria',
    domain: 'fiepa.org.br',
    website: 'https://www.fiepa.org.br/',
    logo: '/logos/fiepa-alt.png',
  },
  {
    name: 'SESI/SENAI - Maranhão',
    sector: 'Indústria',
    domain: 'fiema.org.br',
    website: 'https://www.fiema.org.br/',
    logo: '/logos/fiema.png',
    logoTheme: 'dark',
  },
  {
    name: 'SESI/SENAI - Brasília (DF)',
    sector: 'Indústria',
    domain: 'sistemafibra.org.br',
    website: 'https://www.sistemafibra.org.br/fibra/',
    logo: '/logos/fibra.png',
    logoTheme: 'dark',
  },
  {
    name: 'SESI/SENAI - Goiânia (GO)',
    sector: 'Indústria',
    domain: 'fieg.com.br',
    website: 'https://www.fieg.com.br/',
    logo: '/logos/fieg-icon.png',
  },
  {
    name: 'SESI/SENAI - Rio de Janeiro',
    sector: 'Indústria',
    domain: 'firjan.com.br',
    website: 'https://www.firjan.com.br/',
    logo: '/logos/firjan.png',
  },
  {
    name: 'SESI/SENAI - Espírito Santo',
    sector: 'Indústria',
    domain: 'sistemafindes.org.br',
    website: 'https://www.sistemafindes.org.br/',
    logo: '/logos/findes-senai.png',
  },
  {
    name: 'SESI/SENAI - Bahia',
    sector: 'Indústria',
    domain: 'fieb.org.br',
    website: 'https://www.fieb.org.br/',
    logo: '/logos/fieb.png',
  },
  {
    name: 'SENAC São Paulo',
    sector: 'Educação',
    domain: 'sp.senac.br',
    website: 'https://www.sp.senac.br/',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Senac_logo.svg',
  },
  {
    name: 'AGIR Saúde',
    sector: 'Saúde',
    domain: 'agirsaude.org.br',
    website: 'https://agirsaude.org.br/',
    logo: '/logos/agir.png',
    logoTheme: 'dark',
  },
  {
    name: 'SEFAZ Mato Grosso do Sul',
    sector: 'Setor público',
    domain: 'sefaz.ms.gov.br',
    website: 'https://www.sefaz.ms.gov.br/',
    logo: 'https://www.sefaz.ms.gov.br/wp-content/themes/new-ms/assets/img/Logomarca.svg',
    logoTheme: 'dark',
  },
  {
    name: 'Secretaria da Fazenda do RS (SEFAZ-RS)',
    sector: 'Setor público',
    domain: 'fazenda.rs.gov.br',
    website: 'https://fazenda.rs.gov.br/inicial',
    logo: '/logos/sefaz-rs.png',
  },
  {
    name: 'Grupo Aguas do Brasil',
    sector: 'Saneamento',
    domain: 'ri.grupoaguasdobrasil.com.br',
    website: 'https://ri.grupoaguasdobrasil.com.br/',
    logo: '/logos/grupo-aguas.png',
    logoTheme: 'dark',
  },
];

export const contact = {
  title: 'Quer tirar o backlog de automação do papel?',
  description:
    'Posso atuar com sustentação contínua ou projeto pontual, conforme a prioridade da sua operação.',
  primaryCta: {
    label: 'Chamar no WhatsApp',
    href: whatsappLink,
  },
  secondaryCta: {
    label: 'Acessar meu LinkedIn',
    href: 'https://www.linkedin.com/in/mauricio-mars-627b3a1ab/',
  },
};


