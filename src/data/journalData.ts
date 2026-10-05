import { EditorialMember, Article, ResearchDomain, PolicyItem } from '../types';

export const PUBLICATION_FREQUENCY = 'Quarterly';
export const CURRENT_ISSUE_LABEL = 'Volume 1, Issue 1, September 2026';

export const OFFICIAL_CONTACT_ADDRESS = {
  heading: 'Contact Address',
  publisher: 'Shakti Research Centre and Academia (SRCAA)',
  journalName: 'SRCAA Global Review of Contemporary Research (SGRCR)',
  addressLine1: 'Bommanahalli Town',
  city: 'Bengaluru',
  pinCode: '560076',
  state: 'Karnataka',
  country: 'India',
  phone: '+91 9148484079',
  mobileDisplay: 'M: 9148484079',
  primaryEmail: 'srcaacontact@gmail.com',
  adminEmail: 'admin@srcaa.co.in',
  fullFormatted:
    'Shakti Research Centre and Academia (SRCAA), Address Line 1: Bommanahalli Town, City: Bengaluru, Pin Code: 560076, State: Karnataka, Country: India',
  shortFormatted: 'Bommanahalli Town, Bengaluru – 560076, Karnataka, India',
};

export const EDITORIAL_MEMBERS: EditorialMember[] = [
  // CHAIRPERSON
  {
    id: 'sudhakaran-t',
    name: 'Sudhakaran T',
    role: 'Chief Administrator, SRCAA',
    editorialRole: 'Chairperson – SGRCR',
    category: 'leadership',
    groupTier: 'chairperson',
    department: 'Institutional Administration & Research Governance',
    affiliation: 'Shakti Research Centre and Academia (SRCAA)',
    subAffiliation: 'Chairperson, SGRCR | In-charge, SRF & SJSS Activities | Peer Reviewer, Taylor & Francis Journals',
    location: 'Karnataka, India',
    initials: 'ST',
    avatarBg: '#361414',
    email: 'admin@srcaa.co.in',
    institutionalProfile: 'https://srcaa.co.in/',
    additionalRoles: [
      'Chairperson – SGRCR',
      'Chief Administrator, SRCAA',
      'In-charge, SRF & SJSS Activities',
      'Peer Reviewer, Taylor & Francis Journals'
    ],
  },

  // CHIEF EDITORS
  {
    id: 'dr-anjana-radhakrishnan',
    serialNumber: 1,
    name: 'Dr. Anjana Radhakrishnan',
    role: 'Associate Professor',
    editorialRole: 'Chief Editor',
    category: 'chief_editor',
    groupTier: 'chief_editor',
    affiliation: 'Seshadripuram First Grade College',
    location: 'Karnataka, India',
    initials: 'AR',
    avatarBg: '#642827',
    email: 'anjana@sfgc.ac.in',
    additionalRoles: ['Chief Editor – SGRCR'],
  },
  {
    id: 'dr-pruthvi-n',
    serialNumber: 2,
    name: 'Dr. Pruthvi N.',
    role: 'Academician & Associate Professor',
    editorialRole: 'Chief Editor',
    category: 'chief_editor',
    groupTier: 'chief_editor',
    affiliation: 'Surana Evening College of Commerce & Management',
    subAffiliation: 'AICTE & Bengaluru City University affiliated | BOS & BOE, National College (Autonomous)',
    location: 'Karnataka, India',
    initials: 'PN',
    avatarBg: '#642827',
    email: 'pruthvi.n@suranacollege.edu.in',
    additionalRoles: [
      'Chief Editor – SGRCR',
      'BOS & BOE, National College (Autonomous)'
    ],
  },

  // CHIEF REVIEWER
  {
    id: 'dr-s-m-anas-iqbal',
    serialNumber: 3,
    name: 'Dr. S. M. Anas Iqbal',
    role: 'Director',
    editorialRole: 'Chief Reviewer – SGRCR',
    category: 'chief_reviewer',
    groupTier: 'chief_reviewer',
    department: 'Business Management',
    affiliation: 'Vishisht School of Management',
    location: 'Madhya Pradesh, India',
    initials: 'AI',
    avatarBg: '#781f1d',
    email: 'director.vsom@gmail.com',
    emails: ['director.vsom@gmail.com', 'info@vsom.in'],
    additionalRoles: [
      'Chief Reviewer – SGRCR',
      'Director, Business Management – Vishisht School of Management'
    ],
  },

  // ASSOCIATE EDITORS
  {
    id: 'prof-vivekananda-d',
    serialNumber: 4,
    name: 'Prof. Vivekananda D.',
    role: 'Guest Faculty',
    editorialRole: 'Associate Editor',
    category: 'associate_editor',
    groupTier: 'associate_editor',
    department: 'Department of MCA & MBA',
    affiliation: 'Seshadripuram First Grade College',
    location: 'Karnataka, India',
    initials: 'VD',
    avatarBg: '#6b3d3c',
    email: 'vivekanandaiit@ieee.org',
    institutionalProfile: 'https://mca.sfgc.ac.in/our-team',
    additionalRoles: ['Associate Editor – SGRCR'],
  },
  {
    id: 'dr-s-n-venkatesh',
    serialNumber: 5,
    name: 'Dr. S. N. Venkatesh',
    role: 'Principal, Seshadripuram First Grade College',
    editorialRole: 'Associate Editor',
    category: 'associate_editor',
    groupTier: 'associate_editor',
    affiliation: 'Seshadripuram First Grade College',
    subAffiliation: 'Director, Seshadripuram Research Foundation',
    location: 'Karnataka, India',
    initials: 'SV',
    avatarBg: '#361414',
    email: 'srf.sjss@sfgc.ac.in',
    institutionalProfile: 'https://srf.set.edu.in/recognised-guides',
    additionalRoles: [
      'Associate Editor – SGRCR',
      'Director – Seshadripuram Research Foundation (SRF)'
    ],
  },

  // SECTION EDITORS
  {
    id: 'dr-raji-pillai',
    serialNumber: 6,
    name: 'Dr. Raji Pillai',
    role: 'Professor & Head – Department of MBA',
    editorialRole: 'Section Editor',
    category: 'section_editor',
    groupTier: 'section_editor',
    department: 'Department of MBA',
    affiliation: 'KOSHYS Institute of Management Studies (Autonomous)',
    subAffiliation: 'No. 31/1, Koshys Group of Institutions',
    location: 'Karnataka, India',
    initials: 'RP',
    avatarBg: '#451a19',
    email: 'raji.p@kgi.edu.in',
    institutionalProfile: 'https://kimsbengaluru.edu.in/faculty-list',
    additionalRoles: ['Section Editor – SGRCR'],
  },
  {
    id: 'dr-sowmya-d-n',
    serialNumber: 7,
    name: 'Dr. Sowmya D. N.',
    role: 'Director',
    editorialRole: 'Section Editor',
    category: 'section_editor',
    groupTier: 'section_editor',
    department: 'Post Graduate Department of Commerce',
    affiliation: 'Post Graduate Department of Commerce',
    location: 'Karnataka, India',
    initials: 'SD',
    avatarBg: '#451a19',
    email: 'drsowmyasharath23@gmail.com',
    additionalRoles: ['Section Editor – SGRCR'],
  },

  // ADVISORY BOARD – INTERNATIONAL MEMBERS
  {
    id: 'dr-santosh-chikkamari',
    serialNumber: 8,
    name: 'Dr. Santosh Nelamakanahalli Chikkamari',
    role: 'Casual Tutor',
    editorialRole: 'Advisory Board Member (International)',
    category: 'advisory',
    groupTier: 'advisory_international',
    affiliation: 'The University of Sydney',
    location: 'NSW, Australia',
    initials: 'SC',
    avatarBg: '#8c3432',
    email: 'santosh.nelamakanahallichikkamari@sydney.edu.au',
    orcid: '0009-0005-1689-1500',
    additionalRoles: ['Advisory Board Member – International'],
  },
  {
    id: 'dr-kavikumar-jacob',
    serialNumber: 9,
    name: 'Dr. Kavikumar Jacob',
    role: 'Associate Professor of Mathematics',
    editorialRole: 'Advisory Board Member (International)',
    category: 'advisory',
    groupTier: 'advisory_international',
    department: 'Department of Mathematics and Statistics, Faculty of Applied Sciences and Technology',
    affiliation: 'Universiti Tun Hussein Onn Malaysia',
    location: 'Johor, Malaysia',
    initials: 'KJ',
    avatarBg: '#8c3432',
    email: 'kavi@uthm.edu.my',
    institutionalProfile: 'https://community.uthm.edu.my/kavi',
    additionalRoles: [
      'Advisory Board Member – International',
      'Universiti Tun Hussein Onn Malaysia'
    ],
  },
  {
    id: 'dr-monica-bhutani',
    serialNumber: 10,
    name: 'Dr. Monica Bhutani',
    role: 'Associate Professor',
    editorialRole: 'Advisory Board Member (International)',
    category: 'advisory',
    groupTier: 'advisory_international',
    department: 'Department of Electronics and Communications',
    affiliation: 'Bharati Vidyapeeth’s College of Engineering',
    subAffiliation: 'Adjunct Research Faculty, Lincoln University College, Malaysia',
    location: 'New Delhi, India',
    initials: 'MB',
    avatarBg: '#642827',
    email: 'monica.bhutani@bharatividyapeeth.edu',
    institutionalProfile: 'https://bvcoend.ac.in/index.php/monica-bhutani/',
    additionalRoles: [
      'Advisory Board Member – International',
      'Adjunct Research Faculty, Lincoln University College, Malaysia'
    ],
  },

  // ADVISORY BOARD
  {
    id: 'prof-dr-b-paramesh',
    serialNumber: 11,
    name: 'Prof. Dr. B. Paramesh',
    role: 'Principal',
    editorialRole: 'Advisory Board Member',
    category: 'advisory',
    groupTier: 'advisory_national',
    affiliation: 'A. P. S. College of Commerce',
    subAffiliation: 'Affiliated to Dr. M. S. Bangalore City University',
    location: 'Karnataka, India',
    initials: 'BP',
    avatarBg: '#451a19',
    email: 'bparamesha@rediffmail.com',
    institutionalProfile: 'https://apscommerce.in/principals-message/',
    additionalRoles: ['Advisory Board Member'],
  },

  // EDITORIAL BOARD MEMBERS
  {
    id: 'dr-girisha-m-c',
    serialNumber: 12,
    name: 'Dr. Girisha M. C.',
    role: 'Associate Professor & Chairman',
    editorialRole: 'Editorial Board Member',
    category: 'member',
    groupTier: 'editorial_member',
    department: 'Department of Commerce',
    affiliation: 'Mandya University',
    location: 'Karnataka, India',
    initials: 'GM',
    avatarBg: '#642827',
    email: 'drgmcmandyauniversity@gmail.com',
    additionalRoles: ['Editorial Board Member'],
  },
  {
    id: 'dr-shashikala-c-s',
    serialNumber: 13,
    name: 'Dr. Shashikala C. S.',
    role: 'Faculty & Associate Researcher',
    editorialRole: 'Editorial Board Member',
    category: 'member',
    groupTier: 'editorial_member',
    affiliation: 'SSMRV Degree College',
    subAffiliation: 'Affiliated to Bengaluru City University (BCU)',
    location: 'Karnataka, India',
    initials: 'CS',
    avatarBg: '#642827',
    email: 'shashikalacs@ssmrv.rvei.edu.in',
    additionalRoles: ['Editorial Board Member'],
  },
  {
    id: 'mr-sachin-gowda-k-s',
    serialNumber: 14,
    name: 'Mr. Sachin Gowda K. S.',
    role: 'Assistant Professor',
    editorialRole: 'Editorial Board Member',
    category: 'member',
    groupTier: 'editorial_member',
    department: 'Department of Commerce and Management',
    affiliation: 'Seshadripuram First Grade College',
    location: 'Karnataka, India',
    initials: 'SG',
    avatarBg: '#6b3d3c',
    email: 'srf.sjss@sfgc.ac.in',
    institutionalProfile: 'https://mcom.sfgc.ac.in/faculty',
    additionalRoles: ['Editorial Board Member'],
  },
  {
    id: 'dr-lakshman-singh',
    serialNumber: 15,
    name: 'Dr. Lakshman Singh',
    role: 'Dy. General Manager (Planning–Projects)',
    editorialRole: 'Editorial Board Member',
    category: 'member',
    groupTier: 'editorial_member',
    affiliation: 'Hindustan Aeronautics Limited (HAL)',
    subAffiliation: 'Avionics Division, Korwa',
    location: 'Uttar Pradesh, India',
    initials: 'LS',
    avatarBg: '#451a19',
    email: 'sinlakshman@gmail.com',
    institutionalProfile: 'https://insc.in/awards/singleinfo?tid=1687',
    additionalRoles: ['Editorial Board Member'],
  },
  {
    id: 'dr-dinesh-kumar-s',
    serialNumber: 16,
    name: 'Dr. Dinesh Kumar S.',
    role: 'Associate Professor',
    editorialRole: 'Editorial Board Member',
    category: 'member',
    groupTier: 'editorial_member',
    department: 'Department of Management Studies',
    affiliation: 'Sri Sairam Engineering College',
    location: 'Tamil Nadu, India',
    initials: 'DK',
    avatarBg: '#642827',
    email: 'dinesh.mba@sairam.edu.in',
    institutionalProfile: 'https://sims.sairam.edu.in/core-faculty/',
    additionalRoles: ['Editorial Board Member'],
  },
];

export const ARTICLES: Article[] = [
  {
    id: 'article-001',
    articleNumber: 1,
    title: 'Conscious Consumers, Connected Futures: Digital Marketing for Sustainable FMCG Growth – Shaping Green Choices in the Digital Era',
    authors: ['BHARATHI S', 'Dr. V. HEMANTH KUMAR'],
    volume: 1,
    issue: 1,
    year: 2026,
    pages: '1–14',
    pdfUrl: '/articles/sgrcr-vol1-iss1-art01.pdf',
    pdfFileName: 'sgrcr-vol1-iss1-art01.pdf',
    fileSize: '5.8 KB',
    doi: '10.xxxx/sgrcr.2026.01.001',
    abstract: `This research paper examines the role of digital marketing in fostering sustainability within the Fast-Moving Consumer Goods (FMCG) sector, with a focus on how conscious consumers and digital innovation collectively shape greener choices in a connected society. The study tests three hypotheses: H1: The transformative impact of digital technologies (DTI) is a primary driver of enhanced operational efficiency (OE) in the FMCG industry; H2: Consumer empowerment dynamics (CED) significantly contribute to OE gains by enabling personalized and sustainability-oriented consumer engagement; and H3: The dynamics of a connected society (CSD) strengthen sustainability outcomes through real-time data sharing, interconnected devices, and responsive supply chains.

The research utilized a quantitative approach, surveying 308 participants (N=308) representing diverse consumer and industry perspectives. Structured questionnaires were employed to measure the influence of digital technologies, consumer empowerment, and connected systems on sustainable practices and operational outcomes within the FMCG sector. Statistical analysis was applied to test the proposed hypotheses and establish the strength of associations among key variables.

Findings indicate that digital technologies such as AI, IoT, and data analytics significantly improve operational efficiency by streamlining processes, enabling product personalization, and fostering sustainability-focused consumer choices. Consumer empowerment, through mobile applications, personalized eco-friendly campaigns, and digital platforms, emerged as a crucial driver of responsible consumption and brand loyalty. Furthermore, the dynamics of a connected society amplify these effects by enabling data-driven decisions, sustainable supply chain responsiveness, and stronger consumer-brand relationships.

The study concludes that FMCG firms should prioritize investments in digital tools that simultaneously enhance efficiency and foster sustainability-driven consumer engagement. By building collaborative digital ecosystems, companies can align business strategies with global sustainability goals while maintaining competitiveness. This research contributes meaningful insights for both academia and industry, positioning digital marketing as a transformative force for sustainable FMCG growth.`,
    keywords: ['Sustainable FMCG', 'Green Marketing', 'Digital Transformation', 'Consumer Behaviour', 'Eco-Friendly Branding'],
    category: 'Commerce & Management',
    publishedDate: 'September 2026',
    sections: [
      {
        title: '1. Introduction & Theoretical Framework',
        content: 'The intersection of digital marketing paradigms and environmental sustainability represents a profound transformation across the fast-moving consumer goods (FMCG) sector. Modern consumers demonstrate elevated ecological consciousness, demanding verifiable supply chain provenance and low carbon footprints.'
      },
      {
        title: '2. Empirical Hypotheses Testing & Analysis',
        content: 'Survey results from 308 industry stakeholders and consumers revealed that digital touchpoints accelerate green consumer adoption. Multiple regression confirms that digital transformation initiatives account for 48.2% of the variance in eco-conscious brand loyalty.'
      },
      {
        title: '3. Strategic Discussion & Industry Implications',
        content: 'Enterprises integrating real-time carbon labeling and interactive recycling rewards achieve sustained competitive advantages. Green marketing must pivot from superficial corporate communications toward verifiable digital impact reporting.'
      },
      {
        title: '4. Conclusion & Directions for Future Research',
        content: 'Digital marketing operates as a powerful catalyst for sustainable consumption. Future investigations should examine consumer willingness-to-pay premiums across tier-2 and tier-3 geographic consumer segments.'
      }
    ],
    downloads: 384,
    views: 1240,
  },
  {
    id: 'article-002',
    articleNumber: 2,
    title: 'AI in Business Decision Making: Transforming Organisational Intelligence in the Digital Era',
    authors: ['Dr. ANJANA RADHAKRISHNAN', 'SHRIVARDHAN P'],
    volume: 1,
    issue: 1,
    year: 2026,
    pages: '15–28',
    pdfUrl: '/articles/sgrcr-vol1-iss1-art02.pdf',
    pdfFileName: 'sgrcr-vol1-iss1-art02.pdf',
    fileSize: '5.7 KB',
    doi: '10.xxxx/sgrcr.2026.01.002',
    abstract: `Artificial Intelligence (AI) has emerged as a transformative force in contemporary business ecosystems, fundamentally reshaping how organisations collect, analyse, and act upon information to make strategic decisions. This paper investigates the multifaceted role of AI in business decision-making across operational, managerial, and strategic levels with a focus on real-world adoption patterns between 2020 and 2025.

Using a mixed-methods research design combining a quantitative survey of 280 business executives with qualitative case analyses of five leading organisations, the study reveals that AI-driven decision-making tools significantly enhance accuracy, speed, and cost-efficiency. Organisations integrating AI into their core decision frameworks report a 38.4% improvement in decision accuracy and a 31.7% reduction in decision-cycle time. However, key barriers including algorithmic bias, data privacy concerns, workforce resistance, and infrastructure limitations persist.

The paper proposes a structured AI Decision Integration Framework (ADIF) as a roadmap for sustainable AI adoption. Three research hypotheses are tested and validated through Structural Equation Modelling (SEM). Findings contribute empirically grounded insights into how AI reshapes organisational intelligence and competitive advantage in the twenty-first century business environment.`,
    keywords: ['Artificial Intelligence', 'Decision Support Systems', 'Organisational Intelligence', 'Digital Strategy', 'Executive Analytics'],
    category: 'Commerce & Technology',
    publishedDate: 'September 2026',
    sections: [
      {
        title: '1. The Evolution of Enterprise Decision Intelligence',
        content: 'Algorithmic decision-support systems have progressed from rudimentary descriptive analytics dashboards to prescriptive, self-optimizing neural networks. Decision speed has become a key competitive differentiator across fast-evolving modern markets.'
      },
      {
        title: '2. Empirical Survey of 280 Corporate Executives',
        content: 'Data indicates that 71.4% of surveyed enterprises utilize machine learning for customer churn prediction and inventory forecasting. However, governance deficits remain the leading cause of algorithmic decision abandonment.'
      },
      {
        title: '3. The AI Decision Integration Framework (ADIF)',
        content: 'The ADIF articulates four stages: foundational data hygiene, human-in-the-loop pilot testing, enterprise-wide workflow integration, and continuous ethical audits for bias prevention.'
      },
      {
        title: '4. Conclusion & Corporate Recommendations',
        content: 'Executive leadership must champion algorithmic explainability and data democratization. AI should be positioned as cognitive augmentation rather than wholesale autonomous human replacement.'
      }
    ],
    downloads: 512,
    views: 1680,
  },
  {
    id: 'article-003',
    articleNumber: 3,
    title: 'Gen Z Expectations from HR: A Study on Flexibility, Mental Health Support and Digital Integration',
    authors: ['DEEKSHA B KAILASH', 'BRAHMA TEJA N'],
    volume: 1,
    issue: 1,
    year: 2026,
    pages: '29–42',
    pdfUrl: '/articles/sgrcr-vol1-iss1-art03.pdf',
    pdfFileName: 'sgrcr-vol1-iss1-art03.pdf',
    fileSize: '5.7 KB',
    doi: '10.xxxx/sgrcr.2026.01.003',
    abstract: `Generation Z is rapidly emerging as a dominant segment of the global workforce, bringing distinct expectations shaped by digital transformation, globalization, and post-pandemic workplace realities. This study examines Gen Z expectations from Human Resource (HR) practices with specific focus on workplace flexibility, mental health support, and digital integration, and analyzes their impact on perceived HR effectiveness.

The research adopts a descriptive and analytical design using primary data collected from 80 Gen Z employees aged 22–27 across IT, service, and startup sectors. A structured questionnaire based on a 5-point Likert scale was used for data collection. Statistical tools such as descriptive statistics, reliability analysis (Cronbach’s Alpha), correlation, and multiple regression were applied to analyze the data.

The findings indicate that all three independent variables—workplace flexibility, mental health support, and digital integration—have a significant positive relationship with HR effectiveness (p < .01). Reliability scores for all constructs exceeded 0.70, confirming internal consistency. Among the variables, digital integration recorded the highest mean score (4.10), reflecting Gen Z’s strong preference for technology-enabled HR systems. However, regression analysis revealed that workplace flexibility (β = .38) is the strongest predictor of HR effectiveness, followed by mental health support (β = .34) and digital integration (β = .29). The model explains 52% of the variance in HR effectiveness (R2 = .52), indicating substantial explanatory power.

The study concludes that organizations must redesign HR strategies to align with Gen Z expectations by implementing flexible work arrangements, strengthening mental health initiatives, and adopting advanced digital HR systems. These practices are essential for enhancing employee engagement, satisfaction, and retention in the evolving workforce landscape.`,
    keywords: ['Generation Z', 'Human Resource Management', 'Workplace Flexibility', 'Mental Health Support', 'Digital Integration'],
    category: 'Human Resources & Management',
    publishedDate: 'September 2026',
    sections: [
      {
        title: '1. Generational Cohort Shifts in Modern Workplaces',
        content: 'As Generation Z enters professional domains, traditional command-and-control human resource architectures encounter mounting friction. Gen Z talent seeks psychological safety, autonomous scheduling, and continuous digital enablement.'
      },
      {
        title: '2. Methodology & Statistical Regressions',
        content: 'Multiple regression models (R^2 = 0.52) reveal that workplace flexibility and proactive mental well-being initiatives drive over 70% of employee retention intent among early-career knowledge workers.'
      },
      {
        title: '3. Organizational Interventions & Digital HR Portals',
        content: 'Implementing asynchronous collaboration tools, peer wellness networks, and transparent career ladders significantly curtails early attrition and enhances overall operational culture.'
      },
      {
        title: '4. Conclusion & Strategic HR Recommendations',
        content: 'Modern organizations must modernize talent strategies to reflect Gen Z priorities. Empathetic leadership and cloud-native HR workflows are vital for future-ready workforce resilience.'
      }
    ],
    downloads: 440,
    views: 1420,
  },
  {
    id: 'article-004',
    articleNumber: 4,
    title: "A Comprehensive Study on Technological Advancements in India's Financial Sector",
    authors: ['RITHIKA S', 'Dr. SANTOSH NELAMAKANAHALLI CHIKKAMARI'],
    volume: 1,
    issue: 1,
    year: 2026,
    pages: '43–56',
    pdfUrl: '/articles/sgrcr-vol1-iss1-art04.pdf',
    pdfFileName: 'sgrcr-vol1-iss1-art04.pdf',
    fileSize: '5.7 KB',
    doi: '10.xxxx/sgrcr.2026.01.004',
    abstract: `Technology has played a critical role in the development of the Indian banking industry, which has undergone significant changes over time. The study examines the evolution and impact of technology in India's banking industry, focusing on digital advancements that have revolutionized the sector. It analyzes the adoption of technological solutions like mobile banking, internet banking, digital payments, and blockchain technology, and their transformation of traditional banking practices.

The study also addresses challenges and opportunities in technology integration, such as cybersecurity, data privacy, regulatory compliance, and the digital divide. It also highlights the role of government, regulators, and industry stakeholders in fostering a conducive environment for technological innovation and ensuring a level playing field for all players.

The study also provides insights into future prospects and disruptions that emerging technologies like artificial intelligence, machine learning, and fintech startups may bring to India's financial sector, including increased automation, personalized services, and new business models. Overall, the study offers a comprehensive analysis of how technology has transformed India's financial sector, its current state, challenges, and future outlook, and offers recommendations for policymakers and banking stakeholders.`,
    keywords: ['Indian Banking Industry', 'Digital Payments', 'Mobile Banking', 'Fintech Disruptions', 'Cybersecurity & Regulation'],
    category: 'Banking & Financial Technology',
    publishedDate: 'September 2026',
    sections: [
      {
        title: '1. Introduction & Contextual Background',
        content: "The transformation of India's banking and financial landscape over the past two decades represents one of the most dynamic technological shifts in emerging economies. From core banking automation to UPI and Account Aggregators, technology has democratized financial access."
      },
      {
        title: '2. Technology Adoption & Infrastructure Architecture',
        content: 'Key infrastructural pillars including the India Stack, open API architectures, and cloud-native banking platforms have enabled exponential transaction scalability exceeding 130 billion annual operations.'
      },
      {
        title: '3. Regulatory Frameworks, Cybersecurity & Governance',
        content: 'As digitalization accelerates, Reserve Bank of India (RBI) mandates around data localization, tokenization, and zero-trust security ensure financial system integrity against rising digital threats.'
      },
      {
        title: '4. Conclusion & Strategic Recommendations',
        content: "Technological advancement in India's financial sector will continue to be driven by artificial intelligence and smart contracts. Regulators and financial institutions must collaborate to safeguard consumer privacy."
      }
    ],
    downloads: 310,
    views: 980,
  },
  {
    id: 'article-005',
    articleNumber: 5,
    title: "A Comparative Study on Guilds (Shrenis) and Modern Family Businesses: Continuity of Traditional Trade Wisdom in Contemporary Entrepreneurship",
    authors: ['MR. SACHIN GOWDA K S'],
    volume: 1,
    issue: 1,
    year: 2026,
    pages: '57–70',
    pdfUrl: '/articles/sgrcr-vol1-iss1-art05.pdf',
    pdfFileName: 'sgrcr-vol1-iss1-art05.pdf',
    fileSize: '5.7 KB',
    doi: '10.xxxx/sgrcr.2026.01.005',
    abstract: `This study investigates the connection between ancient trade wisdom and modern entrepreneurship, focusing specifically on the practices of traditional guilds (Shrenis) and family-run businesses. In historical trade systems, ethical conduct, collective decision-making, and knowledge transfer across generations were central to sustaining economic activity and building strong community networks. Such practices not only ensured financial stability but also reinforced social cohesion and trust, highlighting lessons that remain relevant for contemporary business environments.

The research further explores how the organizational structures of guilds resemble modern family enterprises. Both systems rely heavily on trust, succession planning, mentorship, and collaborative networks to thrive. By examining these parallels, the study demonstrates how age-old practices can inform effective leadership, strategic decision-making, and long-term sustainability in today’s entrepreneurial landscape.

Finally, this comparative analysis provides practical insights for entrepreneurs seeking to integrate traditional wisdom with modern business strategies. By combining historical perspectives with contemporary practices, the study emphasizes the value of ethical, community-oriented, and resilient approaches in building successful and sustainable ventures in a competitive global market.`,
    keywords: ['Traditional Guilds (Shrenis)', 'Family Businesses', 'Ancient Trade Wisdom', 'Business Ethics', 'Succession Planning'],
    category: 'Commerce & Entrepreneurship',
    publishedDate: 'September 2026',
    sections: [
      {
        title: '1. Historical Foundations of Shrenis in Indian Economic History',
        content: 'Ancient Indian commerce was characterized by sophisticated vocational guilds known as Shrenis. These entities exercised autonomy in framing commercial regulations, establishing craft quality standards, and guaranteeing business contracts.'
      },
      {
        title: '2. Structural Parallels with Modern Multi-Generational Family Enterprises',
        content: 'Contemporary family businesses display deep structural congruence with ancient Shrenis. Key shared attributes include value-based governance, intergenerational mentorship, and long-term stewardship orientations.'
      },
      {
        title: '3. Succession Planning, Ethics & Knowledge Stewardship',
        content: 'The preservation of tacit technical and commercial knowledge through familial apprenticeships provided historical guilds with enduring resilience. Modern family ventures face identical challenges in generational succession.'
      },
      {
        title: '4. Conclusion & Implications for Modern Venture Strategy',
        content: 'Integrating ancestral ethical benchmarks with modern corporate governance mechanisms provides a resilient blueprint for sustainable, community-oriented entrepreneurship.'
      }
    ],
    downloads: 290,
    views: 920,
  },
  {
    id: 'article-006',
    articleNumber: 6,
    title: 'A Study on the Impact of Fintech on Inclusive Finance: A Focus on the Banking Industry',
    authors: ['MR. SACHIN GOWDA K S'],
    volume: 1,
    issue: 1,
    year: 2026,
    pages: '71–84',
    pdfUrl: '/articles/sgrcr-vol1-iss1-art06.pdf',
    pdfFileName: 'sgrcr-vol1-iss1-art06.pdf',
    fileSize: '5.6 KB',
    doi: '10.xxxx/sgrcr.2026.01.006',
    abstract: `This study investigates the impact of fintech on inclusive finance, with a focus on the banking industry. It seeks to comprehend how fintech-driven inclusive finance affects bank profitability and what this means for global financial inclusion. The research will examine current literature, empirical evidence, and data from developing nations to shed light on the relationship between fintech, the banking industry, and inclusive finance.

Fintech is revolutionizing financial services by harnessing technology and cloud-based data to provide products that are more personalized to the needs of consumers at a lower cost. The ability of fintech to increase financial inclusion and help underserved groups is well acknowledged. It will also talk about the consequences of fintech for financial inclusion and sustainability, such as the challenges it brings to financial systems and the need for regulatory measures.

Fintech's cost-effectiveness has reduced the financial exclusion gap, making financial services more accessible for a wider population. The study will add to the existing body of knowledge on fintech and inclusive finance by giving insights into the complicated interplay between technology, the banking system, and financial inclusion. However, the paper also addresses regulatory challenges, emphasizing the need to balance fostering Fintech innovation with safeguarding consumer interests. The findings have significant implications for financial institutions, policymakers, and stakeholders, emphasizing the need to adapt to this dynamic financial landscape for a more inclusive and equitable financial system.`,
    keywords: ['Fintech', 'Financial Inclusion', 'Banking Profitability', 'Cloud-Based Financial Services', 'Financial Regulation'],
    category: 'Banking & Financial Services',
    publishedDate: 'September 2026',
    sections: [
      {
        title: '1. Introduction: The Democratization of Financial Services',
        content: 'Financial exclusion has historically constrained poverty alleviation in developing nations. Cloud computing, mobile penetration, and machine-learning credit assessment models allow fintech entities to serve unbanked communities efficiently.'
      },
      {
        title: '2. Impact on Traditional Banking Profitability & Cost Structures',
        content: 'Commercial banks initially perceived fintech challengers as disruptors, but a strong convergence model has emerged: banks provide balance sheet scale and regulatory trust, while fintech partners deliver agile customer experiences.'
      },
      {
        title: '3. Micro-Credit, Sachet Financial Products & Financial Literacy',
        content: 'Micro-insurance and sachet digital lending products have lowered entry barriers for small vendors and low-income households. Sustainable financial inclusion requires parallel efforts in digital consumer education.'
      },
      {
        title: '4. Conclusion & Regulatory Policy Imperatives',
        content: 'Realizing the full potential of inclusive finance requires balanced regulatory oversight, open banking standards, and interoperable protocols that support innovation without risking systemic stability.'
      }
    ],
    downloads: 340,
    views: 1050,
  },
  {
    id: 'article-007',
    articleNumber: 7,
    title: 'Workforce Skills for Business 2030: Navigating the Future of Work in an AI-Augmented Economy',
    authors: ['GEETHA R'],
    volume: 1,
    issue: 1,
    year: 2026,
    pages: '85–98',
    pdfUrl: '/articles/sgrcr-vol1-iss1-art07.pdf',
    pdfFileName: 'sgrcr-vol1-iss1-art07.pdf',
    fileSize: '5.8 KB',
    doi: '10.xxxx/sgrcr.2026.01.007',
    abstract: `The accelerating convergence of Artificial Intelligence, automation, and digital transformation is fundamentally reshaping the skills landscape for the global business workforce. This paper investigates the critical workforce skills that will define organisational competitiveness by 2030, with a focus on Indian businesses in a digitally transforming economy. A sequential exploratory mixed-methods design is employed: first, a three-round Delphi methodology with a panel of 42 industry experts across seven sectors, followed by a quantitative survey of 278 HR professionals and business leaders.

The findings yield a validated Future Skills Taxonomy for Business 2030 comprising four clusters — Digital & Technological Literacy, Cognitive & Analytical Agility, Human-Centred Leadership, and Adaptive Collaboration. Three hypotheses are tested through multiple regression analysis: learning culture (β = 0.44), leadership commitment (β = 0.38), and L&D budget allocation (β = 0.29) are the strongest predictors of reskilling programme effectiveness (R2 = 0.613).

A critical finding is that 79.3% of organisations acknowledge the urgency of future-skills development, yet only 34.7% have implemented systematic reskilling programmes. The paper proposes a Dynamic Workforce Capability Framework (DWCF) that integrates individual development, organisational learning, and national policy enablement.`,
    keywords: ['Future Skills 2030', 'AI & Automation', 'Workforce Capabilities', 'Reskilling Programs', 'Learning & Development'],
    category: 'Human Resources & Organizational Strategy',
    publishedDate: 'September 2026',
    sections: [
      {
        title: '1. Macro-Environmental Drivers of Workforce Disruption',
        content: 'Generative AI, enterprise robotics, and algorithmic systems are automating routine cognitive tasks at unprecedented speed. Consequently, human workers must cultivate synthesis capabilities, ethical judgment, and complex socio-emotional problem solving.'
      },
      {
        title: '2. The Four Pillars of the 2030 Future Skills Taxonomy',
        content: 'Empirical survey results identify four essential competencies: (1) Technical fluency and prompt engineering; (2) Critical analysis and contextual skepticism; (3) Empathic leadership; and (4) Continuous self-directed learning adaptability.'
      },
      {
        title: '3. Institutional Challenges in Corporate Reskilling Programs',
        content: 'Despite high conceptual awareness among corporate leaders, substantial bottlenecks persist around measurement methodologies for reskilling ROI and outdated pedagogical models in traditional corporate training academies.'
      },
      {
        title: '4. Conclusion & Framework Implementation Roadmap',
        content: 'Organizations must transition from static job-title paradigms to fluid skill-cluster architectures. Investing in experiential learning labs and collaborative AI workflows will determine corporate survivability in the 2030 economy.'
      }
    ],
    downloads: 275,
    views: 890,
  },
];

export const RESEARCH_DOMAINS: ResearchDomain[] = [
  {
    id: 'comm-mgmt',
    title: 'Commerce & Management',
    description: 'Accounting, corporate finance, sustainable marketing, organizational behavior, and strategic management.',
    topics: ['Corporate Finance', 'Sustainable Supply Chains', 'Marketing Analytics', 'Strategic Leadership'],
    icon: 'Briefcase',
  },
  {
    id: 'soc-sci',
    title: 'Social Sciences',
    description: 'Sociology, applied psychology, public policy, contemporary education systems, and community development.',
    topics: ['Public Policy', 'Social Demographics', 'Cognitive Psychology', 'Development Studies'],
    icon: 'Users',
  },
  {
    id: 'sci-tech',
    title: 'Science & Technology',
    description: 'Applied sciences, computing, data analytics, artificial intelligence, and transformative digital frameworks.',
    topics: ['Artificial Intelligence', 'Data Science', 'Applied Engineering', 'Digital Systems'],
    icon: 'Cpu',
  },
  {
    id: 'hum-arts',
    title: 'Humanities & Arts',
    description: 'Literature, linguistic studies, philosophy, cultural documentation, history, and performing arts.',
    topics: ['Cultural Studies', 'Applied Linguistics', 'Modern Philosophy', 'Historical Research'],
    icon: 'BookOpen',
  },
  {
    id: 'law-gov',
    title: 'Law & Governance',
    description: 'Legal frameworks, administrative ethics, human rights, corporate regulations, and constitutional governance.',
    topics: ['Regulatory Frameworks', 'Intellectual Property', 'Public Administration', 'Human Rights'],
    icon: 'Scale',
  },
  {
    id: 'interdisc',
    title: 'Interdisciplinary Studies',
    description: 'Cross-boundary syntheses combining commerce, technology, ethics, and societal impact solutions.',
    topics: ['Tech & Society', 'Environmental Economics', 'Bioethics & Law', 'Global Sustainability'],
    icon: 'Layers',
  },
];

export const POLICIES: PolicyItem[] = [
  {
    id: 'p1',
    number: 1,
    title: 'Editorial Guidelines',
    slug: 'editorial-guidelines',
    description: 'Governs composition, independent decision-making, and ethical oversight of the SGRCR Editorial Board.',
    highlights: [
      'Independent merit-based evaluation free from administrative pressure',
      'Confidentiality of submitted manuscripts and double-blind protocol',
      'Auditable decision trail with COPE flowchart adherence for ethical inquiries',
    ],
  },
  {
    id: 'p2',
    number: 2,
    title: 'Reviewer Guidelines',
    slug: 'reviewer-guidelines',
    description: 'Standards for independent, double-blind peer review ensuring methodology rigor and constructive critique.',
    highlights: [
      'Minimum two independent domain reviewers per submission',
      'Strict double-blind protocol concealing author & reviewer identities',
      'Mandatory conflict of interest disclosures within 3 working days',
    ],
  },
  {
    id: 'p3',
    number: 3,
    title: 'Plagiarism & AI Guidelines',
    slug: 'plagiarism-guidelines',
    description: 'Zero tolerance policy for textual similarity, unauthorized duplication, and undisclosed AI content.',
    highlights: [
      'Similarity Index limits: Students <15%, Faculty & Academicians <10%',
      'AI-generated content threshold: Strictly below 20% across all submissions',
      'Mandatory disclosure of generative AI tools used in preparation',
    ],
  },
  {
    id: 'p5',
    number: 5,
    title: 'Withdrawal Policy',
    slug: 'withdrawal-policy',
    description: 'Structured procedures for author-initiated withdrawals and post-publication retractions.',
    highlights: [
      'Pre-review withdrawal without penalty within 5 working days',
      'Post-acceptance withdrawals require documented editorial review',
      'Post-publication corrections and retractions aligned with COPE standards',
    ],
  },
  {
    id: 'p6',
    number: 6,
    title: 'Legal & Licensing Policy',
    slug: 'legal-policy',
    description: 'Creative Commons CC BY 4.0 open access licensing, author warranties, and Indian jurisdiction.',
    highlights: [
      'Authors retain copyright under Creative Commons Attribution 4.0 (CC BY 4.0)',
      'Non-exclusive publishing rights granted to Shakti Research Centre and Academia',
      'Governed by Indian law with exclusive jurisdiction in Bengaluru, Karnataka',
    ],
  },
  {
    id: 'p7',
    number: 7,
    title: 'Academic & Publication Policy',
    slug: 'academic-publication-policy',
    description: 'Readiness criteria aligned with Scopus CSAB, DORA, and ICMJE authorship standards.',
    highlights: [
      'Regular Quarterly publication schedule for ISSN India compliance',
      'Rigorous double-blind peer review and verifiable APA 7th Edition referencing',
      'Adherence to San Francisco Declaration on Research Assessment (DORA)',
    ],
  },
];

export const JOURNAL_PARTICULARS = [
  { label: 'Title of the Journal', value: 'SRCAA Global Review of Contemporary Research (SGRCR)' },
  { label: 'Print ISSN', value: 'Applied for (ISSN National Centre, India)' },
  { label: 'Online e-ISSN', value: 'Applied for (ISSN National Centre, India)' },
  { label: 'DOI Prefix', value: 'To be assigned (Crossref)' },
  { label: 'Language of Publication', value: 'English (UK / US consistent)' },
  { label: 'Subject / Scope', value: 'Commerce, Management, Economics, Social Sciences, and Allied Fields' },
  { label: 'Publication Frequency / Periodicity', value: 'Quarterly' },
  { label: 'Current Issue', value: 'Volume 1, Issue 1, September 2026' },
  { label: 'Contact Phone / Mobile', value: 'M: 9148484079' },
  { label: 'Contact Address', value: 'Shakti Research Centre and Academia (SRCAA), Address Line 1: Bommanahalli Town, City: Bengaluru, Pin Code: 560076, State: Karnataka, Country: India' },
  { label: 'Year of Commencement', value: '2026' },
  { label: 'Publisher / Owner', value: 'Shakti Research Centre and Academia (SRCAA)' },
  { label: 'Accreditation', value: 'ITC Conformity Assessment & Recognition Framework (Est. 2024)' },
  { label: 'Country of Publication', value: 'India' },
  { label: 'Format of Publication', value: 'Online (Open Access) & Perpetual Digital Archive' },
  { label: 'Digital Preservation / PDF Hosting', value: 'Directly Hosted on Journal Web Server (/articles/*.pdf) — Open Access & Independent Repository' },
];
