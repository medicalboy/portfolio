// Single source of truth for every word on the site.
// Edit here, refresh the page — no component changes needed.

export const profile = {
  person: {
    name: 'Wilson Li',
    role: 'Software Engineer',
    location: 'Sydney, Australia',
    availability: 'Available now',
    email: 'lihao020118@gmail.com',
    phone: '0432 068 802',
    linkedin: 'https://www.linkedin.com/in/wilson-li-b60ba4200/',
    cv: '/wilson-li-cv.pdf',
  },

  hero: {
    status: 'Available for work',
    greeting: "hey there 👋 I'm",
    headline: 'Wilson Li',
    // Typed one after another in the hero. Keep them short — they sit on one line.
    roles: ['a full-stack engineer.', 'a cloud builder.', 'a data wrangler.', 'a release tester.'],
    // Typed into the terminal line under the roles.
    terminal: {
      path: '~/sydney',
      commands: [
        'git log --author="Wilson" --since="2021"',
        'aws lambda invoke --function-name ship-it',
        'npx hire-wilson --start=now',
      ],
    },
    statement:
      'Full-stack engineer. I build web and cloud systems that have to stay up, and the data pipelines that keep them honest.',
  },

  about: {
    eyebrow: 'Who I am',
    title: 'About me',
    lead: 'I like problems where the software cannot quietly fail.',
    paragraphs: [
      'For two years I worked on a 24/7 platform of sensors and mobile apps used in high-care nursing homes — the kind of system where a missed event matters to a real person that night. That shaped how I work: test the release, read the logs, and check the data actually arrived.',
      'My background runs both ways across the stack. Python, Flask and the AWS serverless stack on the back end; TypeScript, React and Django on the front. Alongside that I do the data work — SQL, Python, dashboards and reports that people make decisions from.',
      'I finished a Master of Information Technology at the University of Queensland in the top 10% of my faculty, with research interests in deep learning and virtual reality. I am in Sydney, available immediately, and looking for a full-stack or backend role.',
    ],
    facts: [
      { label: 'Based in', value: 'Ryde, Sydney' },
      { label: 'Availability', value: 'Immediate' },
      { label: 'Degree', value: 'Master of IT, UQ (2023)' },
      { label: 'Focus', value: 'Full-stack · Cloud · Data' },
    ],
  },

  experience: {
    eyebrow: 'The track record',
    title: 'Where I have worked',
    lead: 'Two engineering roles, one retail job paying the bills while I look for the next one.',
    roles: [
      {
        company: 'Eevi',
        title: 'Software Engineer',
        type: 'Full time',
        place: 'Brisbane',
        start: 'Sep 2023',
        end: 'Sep 2025',
        months: 24,
        summary:
          'Agile team building a customised SaaS platform: a high-availability 24×7 system of sensors and mobile apps for real-time coordination in high-care nursing homes.',
        points: [
          'Shipped new features on the Python and AWS serverless stack — Flask, Lambda, API Gateway, DynamoDB and S3.',
          'Designed and built the service web interface in TypeScript, React, Django, Bootstrap and PostgreSQL, working across third-party APIs to configure and monitor IoT sensor health at production scale.',
          'Automated business tasks as Lambda functions to hold data integrity across CRM services, and wrote SQL and Python for the reports and dashboards the delivery team relied on.',
          'Ran development and release system integration tests, logged results, and wrote the test summary reports handed to clients for UAT. Unit-tested Django chart generation against event data.',
        ],
        stack: ['Python', 'Flask', 'AWS Lambda', 'DynamoDB', 'React', 'TypeScript', 'Django', 'PostgreSQL'],
      },
      {
        company: 'NeuroPower Group',
        title: 'Data Engineer Intern',
        type: 'Internship',
        place: 'Brisbane',
        start: 'Nov 2021',
        end: 'Mar 2022',
        months: 5,
        summary:
          'Reviewed the existing NeuroPower web application and connected it to the MonkeyLearn AI platform so the team could build on classified text data.',
        points: [
          'Integrated third-party APIs across REST, SOAP and GraphQL, keeping data moving cleanly between systems.',
          'Built and maintained the Power BI visualisations the team used to shape their AI platform.',
          'Translated technical detail into clear, actionable insight for non-technical stakeholders.',
        ],
        stack: ['Python', 'Power BI', 'REST', 'SOAP', 'GraphQL'],
      },
      {
        company: 'JB Hi-Fi',
        title: 'Team Member',
        type: 'Part time',
        place: 'Sydney',
        start: 'Sep 2025',
        end: 'Present',
        months: 11,
        summary:
          'Customer-facing retail role in Sydney while I look for my next engineering position.',
        points: [],
        stack: [],
      },
    ],
  },

  projects: {
    eyebrow: 'Selected work',
    title: 'What I have built',
    lead: 'University and personal builds. Each one exists because I wanted to learn the hard part of it.',
    items: [
      {
        name: 'Flight search',
        emoji: '✈️',
        accent: 'cyan',
        kind: 'Personal build',
        period: '2025',
        thesis: 'An airfare search flow, rebuilt from the booking-engine UX up.',
        body:
          'A search-and-results flow modelled on the Flight Centre booking engine: airport lookup, dates, cabin and passenger mix, then fare families you can filter by stops, airline and departure window. The hard part is state — every filter and sort stays in sync with the URL, so a search survives a reload or a share.',
        stack: ['React', 'Node.js', 'Express', 'TypeScript'],
        reference: {
          label: 'UX reference: Flight Centre search',
          href: 'https://secure.flightcentre.com.au/QKf6qG3d/search',
        },
      },
      {
        name: 'Ball-by-ball prediction in T20 cricket',
        emoji: '🏏',
        accent: 'violet',
        kind: 'STAT3007 Deep Learning · UQ',
        period: 'Mar – Jun 2022',
        thesis: 'A recurrent model that predicts what happens on the next delivery.',
        body:
          'Given a batsman–bowler pair and the encoded pitch, the model returns a probability for every outcome of the next ball. I built the preprocessing: IPL and Big Bash ball-by-ball JSON reduced to a feature space, then player one-hot encodings pushed through an MLP into ten-dimensional embeddings so the network learns how players match up rather than treating each as isolated. Vanilla RNN, LSTM and GRU compared in PyTorch with grid search.',
        stack: ['PyTorch', 'Python', 'NumPy', 'Google Colab'],
        metrics: [
          { value: '41.11%', label: 'test accuracy, 15 classes' },
          { value: '+10%', label: 'gain over benchmark' },
          { value: '5,337', label: 'games of ball-by-ball data' },
        ],
        // Real outcome classes from the paper. Each tick is one delivery.
        deliveries: '0100411060021460W1000410062W0114',
        deliveryLegend: [
          { key: 'dot', label: '0 runs' },
          { key: 'run', label: '1–3 runs' },
          { key: 'boundary', label: '4 or 6' },
          { key: 'wicket', label: 'Wicket' },
        ],
      },
      {
        name: 'E-commerce storefront',
        emoji: '🛒',
        accent: 'orange',
        kind: 'Personal build',
        period: '2024',
        thesis: 'Catalogue, cart and checkout, end to end.',
        body:
          'Built to cover the whole purchase path, not just a product grid: catalogue with search and category filters, a cart that survives a refresh, checkout with validation, and an admin view for products and orders. React front end over a Node and Express API on a relational schema.',
        stack: ['React', 'Node.js', 'Express', 'MySQL'],
      },
      {
        name: 'Online learning platform',
        emoji: '🎓',
        accent: 'pink',
        kind: 'University project · UQ',
        period: 'Mar – Jul 2020',
        thesis: 'A study centre where users upload and collect course video.',
        body:
          'Server-side build on PHP and CodeIgniter over SQL Server, in an MVC three-tier architecture. Users upload videos and add them to a wishlist inside their own study centre, with Ajax linking client and server. Designed in Figma first, then built out with Bootstrap.',
        stack: ['PHP', 'CodeIgniter', 'SQL Server', 'Bootstrap', 'Figma'],
      },
    ],
  },

  skills: {
    eyebrow: 'The toolbox',
    title: 'What I work with',
    groups: [
      { label: 'Languages', items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C', 'C#', 'PHP', 'Dart'] },
      { label: 'Front end', items: ['React', 'HTML5', 'SCSS', 'Tailwind CSS', 'Bootstrap', 'jQuery'] },
      { label: 'Back end', items: ['Node.js', 'Flask', 'Django', 'CodeIgniter'] },
      { label: 'Cloud', items: ['AWS Lambda', 'API Gateway', 'S3', 'Docker'] },
      { label: 'Data', items: ['PostgreSQL', 'MySQL', 'DynamoDB', 'SQL', 'Power BI'] },
      { label: 'Machine learning', items: ['PyTorch', 'TensorFlow'] },
    ],
  },

  education: [
    {
      degree: 'Master of Information Technology',
      school: 'The University of Queensland, Brisbane',
      period: '2020 – 2023',
      note: 'Graduated in the top 10% of the faculty.',
    },
    {
      degree: 'Bachelor of Civil Engineering',
      school: 'Henan Polytechnic University, China',
      period: '2012 – 2016',
      note: '',
    },
  ],

  contact: {
    eyebrow: 'Say hello',
    title: "Let's talk",
    lead: 'I am in Sydney and available to start immediately. The fastest way to reach me is email.',
  },
};

export default profile;
