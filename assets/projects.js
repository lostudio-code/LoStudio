/* ============================================================
   LO STUDIO — Projects data + branded mock renderer
   Real images where available; category-themed CSS mocks
   stand in for screenshots (swap `hero`/gallery `img` to add).
   ============================================================ */
(function () {
  const PD = '#8b5cf6';   // ProjectDiscovery — violet
  const LD = '#ff6a3d';   // LaunchDarkly — blue
  const GX = '#ff8a3d';   // Galaxy — indigo
  const LS = '#D9F400';   // Lo Studio — lime

  const PROJECTS = [
    {
      id: 'projectdiscovery-logo', company: 'ProjectDiscovery', title: 'Logo Evolution',
      cat: 'Brand', kind: 'Identity', year: '2024', accent: PD, theme: 'brand', size: 'sm',
      hero: 'uploads/Logo_Evolution_Thumbnail.webp',
      summary: 'Redrew the ProjectDiscovery logo from the mark up, moving from an inherited wordmark to a purpose built symbol and lockup. I started with the logo I inherited when I joined, ran a wide set of explorations, and worked with leadership to land on a new mark and logotype lockup with defined clear space and proportions.',
      role: 'Brand Designer', scope: 'Logo mark \u00b7 Logotype \u00b7 Lockup', outcome: 'A mark of its own',
      body: [],
      stats: [{n:'Many',l:'Explorations'},{n:'1',l:'New mark'},{n:'Locked',l:'Clear space'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Original logo', theme:'brand', img:'uploads/Logo_Evolution_1.webp'},
        {cap:'Lots of Explorations', theme:'brand', img:'uploads/Logo_Evolution_2.webp'},
        {cap:'Final logo mark', theme:'brand', img:'uploads/Logo_Evolution_Thumbnail.webp'},
        {cap:'Final primary logo lockup', theme:'brand', img:'uploads/Logo_Evolution_3.webp'}
      ]
    },
    {
      id: 'projectdiscovery-website', company: 'ProjectDiscovery', title: 'Web Design',
      cat: 'Web Design', kind: 'Digital', year: '2024', accent: PD, theme: 'web', size: 'lg',
      hero: 'uploads/PD-Web-Thumb-new.webp', heroPos: 'center top',
      summary: 'Led all web design as ProjectDiscovery grew from open source security tooling into an enterprise vulnerability platform, building the design system, UX, and performance that powered the growth. The team had already earned deep trust in the security community with open source tools like Nuclei, so the real challenge was carrying that credibility into a commercial, enterprise grade platform without losing the developers who built the brand. I owned web design from start to finish. The result tied those open source roots to a polished enterprise story.',
      role: 'Principal Designer', scope: 'Web Design · UI/UX', outcome: '$3M+ ARR · 100k+ stars',
      body: [],
      stats: [{n:'100k+',l:'GitHub stars'},{n:'$3M+',l:'ARR'},{n:'Series A',l:'Stage'},{n:'1',l:'Design system'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Homepage', theme:'web', img:'uploads/Website-Homepage-c.webp'},
        {cap:'Vulnerability management', theme:'web', img:'uploads/Website-Vulnerability-Management-c.webp'},
        {cap:'Pricing', theme:'web', img:'uploads/Website-Pricing.webp'},
        {cap:'Enterprise', theme:'web', img:'uploads/Website-Enterprise-c.webp'},
        {cap:'Launch week', theme:'web', img:'uploads/Website-Launch-Week-c.webp'},
        {cap:'Case study', theme:'web', img:'uploads/Website-Case-Study-50978f6a-c.webp'},
        {cap:'Platform menu', theme:'web', span:'full', img:'uploads/Menu - Platform.webp'}
      ]
    },
    {
      id: 'projectdiscovery-hss', company: 'ProjectDiscovery', title: 'HSS Event',
      cat: 'Event', cats: ['Event', 'Video'], kind: 'Experiential', year: '2024', accent: PD, theme: 'event', size: 'sm',
      hero: 'uploads/HSS-Thumbnail.webp',
      summary: 'Branded the Hardly Strictly Security event from start to finish, including identity, environmental graphics, and collateral for ProjectDiscovery’s community gathering. A fully online conference for the security community, it needed an identity that felt as credible and irreverent as its audience. I led creative direction across the production and owned vendor selection and management, while keeping all video editing before and after the conference in house, which saved the company thousands and keeping every frame on brand.',
      role: 'Principal Designer', scope: 'Identity · Web Design · Video Editing', outcome: 'Memorable',
      body: [],
      stats: [{n:'End-to-end',l:'Event brand'},{n:'Virtual',l:'Conference'},{n:'Community',l:'First'}],
      gallery: [
        {cap:'Speaker edit', theme:'video', yt:'gCAbJ9i4dXY', img:'uploads/yt-gCAbJ9i4dXY.jpg'},
        {cap:'Confirmation email', theme:'event', span:'half tall', img:'uploads/HSS-Email-Confirmation.webp'},
        {cap:'Social media', theme:'event', span:'half', img:'uploads/HSS-PJ-Metz.webp'},
        {cap:'Photography', theme:'event', span:'half tall', img:'uploads/HSS-Brendan.webp'},
        {cap:'Event fuel', theme:'event', span:'half tall', img:'uploads/HSS-Waffle.webp'},
        {cap:'Video production', theme:'event', span:'half tall', img:'uploads/HSS-MichaelSam-c.webp'}
      ]
    },
    {
      id: 'projectdiscovery-social', company: 'ProjectDiscovery', title: 'Social Media',
      cat: 'Brand', kind: 'Social', year: '2025', accent: PD, theme: 'social', size: 'sm',
      hero: 'uploads/Blog-Nuclei.webp',
      summary: 'Designed the paid and organic social program that fed ProjectDiscovery\u2019s funnel, with ads and cards built to send people to the website, the blog, and campaign landing pages. Each piece had a destination behind it: customer proof pointing at case studies, product news pointing at feature pages, and technical posts pointing at the blog. Working from the brand system meant the whole feed read as one voice while every unit stayed measurable on its own.',
      role: 'Principal Designer', scope: 'Paid social \u00b7 Organic \u00b7 Campaigns', outcome: 'Traffic driver',
      body: [],
      stats: [{n:'Paid + organic',l:'Channels'},{n:'Web \u00b7 Blog \u00b7 LP',l:'Destinations'},{n:'On-system',l:'Every unit'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Playtika webinar', theme:'social', img:'uploads/pd-playtika-social.webp'},
        {cap:'Elastic testimonial campaign', theme:'social', img:'uploads/ld-testimonial-elastic.webp'},
        {cap:'RSA Winner 2025', theme:'social', img:'uploads/github-stars-frame.webp'},
        {cap:'CVE alert template', theme:'social', img:'uploads/CVE_Template.webp'},
        {cap:'AI-powered Nuclei template generation', theme:'social', img:'uploads/Blog-Nuclei.webp'},
        {cap:'Website share card', theme:'social', img:'uploads/Website_Share_Card.webp'},
        {cap:'Pioneers Ambassador Program', theme:'social', img:'uploads/Pioneers_Program.webp'},
        {cap:'Hardly Strictly Security ad', theme:'social', img:'uploads/HSS_Event_Ad.webp'}
      ]
    },
    {
      id: 'projectdiscovery-email', company: 'ProjectDiscovery', title: 'Email Design',
      cat: 'Web Design', kind: 'Lifecycle', year: '2025', accent: PD, theme: 'web', size: 'sm',
      hero: 'uploads/Email_Thumbnail.webp',
      summary: 'Designed the product emails that carried ProjectDiscovery\u2019s scan results into the inbox. A weekly report summarized exposure across a customer\u2019s assets, and a vulnerability alert flagged new findings as they landed. Both had to survive email clients while still reading like the product, so the layouts stayed simple and the hierarchy did the work: severity first, then the finding, then a clear route back into the platform.',
      role: 'Principal Designer', scope: 'Lifecycle email \u00b7 Templates', outcome: 'Findings in the inbox',
      body: [],
      stats: [{n:'Weekly',l:'Report'},{n:'Real-time',l:'Alerts'},{n:'On-system',l:'Templates'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Weekly report email', theme:'web', img:'uploads/Email-Weekly-Report-c.webp'},
        {cap:'Vulnerability scan email', theme:'web', img:'uploads/Email-Vulnerability-Scan.webp'}
      ]
    },
    {
      id: 'projectdiscovery-product', company: 'ProjectDiscovery', title: 'Product UI',
      cat: 'Product UI', kind: 'Product', year: '2025', accent: PD, theme: 'product', size: 'sm',
      hero: 'uploads/PD-Product-Thumb.webp',
      summary: 'Designed the core platform UI for a ProjectDiscovery vulnerability platform, turning complex data into clear, scannable, actionable interfaces. Security platforms tend to drown users in data, so the goal was to surface what matters, like exposures, severity, and the next action, without overwhelming anyone. I designed the dashboard, findings, asset inventory, and scan configuration flows, with reusable components that scaled across the product.',
      role: 'Product Designer', scope: 'Dashboards · Flows · Components', outcome: 'Clearer at a glance',
      body: [],
      stats: [{n:'$1M+',l:'Platform ARR'},{n:'Clarity',l:'First principle'},{n:'Scalable',l:'Components'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Search · dark', theme:'product', img:'uploads/vulnerability-sh-ssearch-darkmode.webp'},
        {cap:'Search · light', theme:'product', img:'uploads/vulnerability-sh-search-lightmode.webp'},
        {cap:'Products · dark', theme:'product', img:'uploads/vulnerability-sh-products-darkmode.webp'},
        {cap:'Products · light', theme:'product', img:'uploads/vulnerability-sh-products-lightmode.webp'},
        {cap:'Stats · dark', theme:'product', img:'uploads/vulnerability-sh-stats-darkmode.webp'},
        {cap:'Stats · light', theme:'product', img:'uploads/vulnerability-sh-stats-lightmode.webp'},
        {cap:'Library · dark', theme:'product', img:'uploads/vulnerability-sh-library-darkmode.webp'},
        {cap:'Library · light', theme:'product', img:'uploads/vulnerability-sh-library-lightmode.webp'}
      ]
    },
    {
      id: 'projectdiscovery-brand', company: 'ProjectDiscovery', title: 'Brand Guidelines',
      cat: 'Brand', kind: 'Identity', year: '2025', accent: PD, theme: 'brand', size: 'sm',
      hero: 'uploads/ProjectDiscovery_thumbnail-13c39050.webp',
      summary: 'Crafted the visual identity that carried ProjectDiscovery from open source darling to trusted by enterprises brand, with a logo system, color, type, and motifs rooted in the security community. As the company commercialized, it needed to signal enterprise credibility while keeping its hacker community authenticity intact. I built the full system, including logo, color, typography, iconography, and motion principles, all documented so marketing and product could apply it quickly and consistently.',
      role: 'Brand Designer', scope: 'Logo · System · Guidelines', outcome: 'Unified brand',
      body: [],
      stats: [{n:'Full',l:'Identity system'},{n:'100k+',l:'Community'},{n:'1',l:'Source of truth'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Cover', theme:'brand', img:'uploads/Brand Guidelines - 1.webp'},
        {cap:'Introduction', theme:'brand', img:'uploads/Brand Guidelines - 2.webp'},
        {cap:'Attributes', theme:'brand', img:'uploads/Brand Guidelines - 3.webp'},
        {cap:'Language', theme:'brand', img:'uploads/Brand Guidelines - 4.webp'},
        {cap:'Logo mark', theme:'brand', img:'uploads/Brand Guidelines - 5.webp'},
        {cap:'Primary logo', theme:'brand', img:'uploads/Brand Guidelines - 6.webp'},
        {cap:'Secondary logo', theme:'brand', img:'uploads/Brand Guidelines - 7.webp'},
        {cap:'Geist', theme:'brand', img:'uploads/Brand Guidelines - 8.webp'},
        {cap:'Hierarchy', theme:'brand', img:'uploads/Brand Guidelines - 9.webp'},
        {cap:'Size', theme:'brand', img:'uploads/Brand Guidelines - 10.webp'},
        {cap:'Geist Mono', theme:'brand', img:'uploads/Brand Guidelines - 11.webp'},
        {cap:'Primary color', theme:'brand', img:'uploads/Brand Guidelines - 12.webp'},
        {cap:'Palette', theme:'brand', img:'uploads/Brand Guidelines - 13.webp'},
        {cap:'Shades', theme:'brand', img:'uploads/Brand Guidelines - 14.webp'},
        {cap:'Vulnerabilities', theme:'brand', img:'uploads/Brand Guidelines - 15.webp'},
        {cap:'Gradients', theme:'brand', img:'uploads/Brand Guidelines - 16.webp'},
        {cap:'Color mix', theme:'brand', img:'uploads/Brand Guidelines - 17.webp'},
        {cap:'Bringing our brand to life', theme:'brand', img:'uploads/Brand Guidelines - 18.webp'},
        {cap:'Space', theme:'brand', img:'uploads/Brand Guidelines - 19.webp'},
        {cap:'Grids', theme:'brand', img:'uploads/Brand Guidelines - 20.webp'},
        {cap:'Product', theme:'brand', img:'uploads/Brand Guidelines - 21.webp'},
        {cap:'Photography', theme:'brand', img:'uploads/Brand Guidelines - 22.webp'},
        {cap:'Illustrations', theme:'brand', img:'uploads/Brand Guidelines - 23.webp'},
        {cap:'Icons', theme:'brand', img:'uploads/Brand Guidelines - 24.webp'},
        {cap:'Ads', theme:'brand', img:'uploads/Brand Guidelines - 25.webp'},
        {cap:'Swag', theme:'brand', img:'uploads/Brand Guidelines - 26.webp'}
      ]
    },
    {
      id: 'projectdiscovery-rsa', company: 'ProjectDiscovery', title: 'RSA Presentation',
      cat: 'Brand', kind: 'Presentation', year: '2025', accent: PD, theme: 'brand', size: 'sm',
      hero: 'uploads/Presentation_thumbnail.webp',
      embed: 'https://embed.figma.com/slides/2HFscVwqzULcTpuilJBe3f/RSA-Presentation?node-id=0-1&embed-host=share',
      summary: 'Designed the presentation ProjectDiscovery took to RSA, where the company won. The talk, \u201cVulnerability scanning is broken,\u201d needed to hold a conference stage: a clear argument, visuals true to the brand, and slides that read from the back of the room. I built the deck end to end, from narrative structure and typography to the imagery and product moments carrying each point.',
      role: 'Principal Designer', scope: 'Narrative \u00b7 Slide design \u00b7 Brand', outcome: 'RSA winner',
      body: [],
      stats: [{n:'RSA',l:'Winner'},{n:'Stage',l:'Ready'},{n:'End-to-end',l:'Deck design'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'RSA 2025 winner', theme:'event', span:'full', img:'uploads/1774327958129.jpg'}
      ]
    },
    {
      id: 'launchdarkly-rebrand', company: 'LaunchDarkly', title: 'Web Design',
      cat: 'Web Design', kind: 'Digital', year: '2021', accent: LD, theme: 'web', size: 'lg',
      hero: 'uploads/Build_buy.webp',
      summary: 'Redesigned the highest stakes web pages for LaunchDarkly’s award winning 2021 rebrand, taking each one from strategic wireframes to polished design and a clean dev handoff. The company had become a leader in feature management, but its site still read like a generic template, flat and disconnected from the product’s technical credibility. Partnering across marketing, brand, and engineering, I turned dense developer content into clear, confident stories that converted and repositioned the site as the category leader.',
      role: 'Web & Product Design', scope: 'Marketing site · UX · Handoff', outcome: 'Award winning rebrand',
      body: [],
      stats: [{n:'2021',l:'Rebrand'},{n:'Award',l:'Winning'},{n:'$1B+',l:'Valuation'},{n:'100%',l:'Dev-ready'}],
      gallery: [
        {cap:'Build vs Buy', theme:'web', img:'uploads/Build_vs_Buy-c.webp', span:'half tall'},
        {cap:'Case Studies', theme:'web', img:'uploads/Case_Studies-c.webp', span:'half tall'},
        {cap:'Code References', theme:'web', img:'uploads/Code_References-c.webp', span:'half tall'},
        {cap:'Enterprise', theme:'web', img:'uploads/Enterprise-c.webp', span:'half tall'},
        {cap:'Our Customers', theme:'web', img:'uploads/Our_Customers-c.webp', span:'half tall'},
        {cap:'Security', theme:'web', img:'uploads/Security.webp', span:'half tall'},
        {cap:'Solution', theme:'web', img:'uploads/Solution-c.webp', span:'half tall'},
        {cap:'The Definitive Guide to Feature Management', theme:'web', img:'uploads/The_Definitive_Guide_to_Feature_Management-c.webp', span:'half tall'},
        {cap:'What is Feature Management', theme:'web', img:'uploads/What_is_Feature_Management-c.webp', span:'half tall'},
        {cap:'Why LaunchDarkly', theme:'web', img:'uploads/Why_LaunchDarkly-c.webp', span:'half tall'}
      ]
    },
    {
      id: 'launchdarkly-product-ui', company: 'LaunchDarkly', title: 'Product UIs',
      cat: 'Product UI', kind: 'Product', year: '2022', accent: LD, theme: 'product', size: 'sm',
      hero: 'uploads/1_Release_Confidentialy-84a07bcb.webp',
      summary: 'Designed product interfaces for LaunchDarkly’s marketing, simplified, idealized versions of the real UI built to communicate at a glance. The actual platform is dense with targeting, rollouts, and experiments, so for the site and campaigns I stripped away the visual noise and distilled each screen down to the one idea it needed to land. The result is product imagery that reads instantly across the web, ads, and social.',
      role: 'Product Designer', scope: 'Flows · Components · Mobile', outcome: 'Powerful, made simple',
      body: [],
      stats: [{n:'Platform',l:'Wide'},{n:'Simple',l:'By design'},{n:'Reusable',l:'Components'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Release confidently', theme:'product', span:'full', img:'uploads/1_Release_Confidentialy-84a07bcb.webp'},
        {cap:'Improve reliability', theme:'product', span:'full', img:'uploads/2_Improve_Reliability-3782a307.webp'},
        {cap:'Safely migrate systems', theme:'product', span:'full', img:'uploads/3_Safely_Migrate_Systems-6027ae61.webp'},
        {cap:'Run actionable experiments', theme:'product', span:'full', img:'uploads/4_Run_Actionable_Experiments-f50660e8.webp'},
        {cap:'SDKs', theme:'product', span:'full', img:'uploads/5_SDKs-b6440c8b.webp'},
        {cap:'APIs', theme:'product', span:'full', img:'uploads/6_APIs-7a0befba.webp'},
        {cap:'Integrations', theme:'product', span:'full', img:'uploads/7_Integrations-70d5edb0.webp'},
        {cap:'Code references', theme:'product', span:'full', img:'uploads/8_Code_References-023d9e30.webp'},
        {cap:'Experimentation', theme:'product', span:'full', img:'uploads/9_Experimentation-fd81e67a.webp'},
        {cap:'Data export', theme:'product', span:'full', img:'uploads/10_Data_Export-d7ece312.webp'},
        {cap:'Feature flags', theme:'product', span:'full', img:'uploads/11_Feature_Flags-2cca8e07.webp'},
        {cap:'Feature workflows', theme:'product', span:'full', img:'uploads/12_Feature_Workflows-34ac2b80.webp'},
        {cap:'Platform architecture', theme:'product', span:'full', img:'uploads/13_Platform_Architecture-025f974d.webp'},
        {cap:'Test innovations collaboratively', theme:'product', span:'full', img:'uploads/14_Test_Innovations.webp'},
        {cap:'Scale safe releases', theme:'product', span:'full', img:'uploads/15_Scale_Safe_Releases.webp'},
        {cap:'Accelerate app modernization', theme:'product', span:'full', img:'uploads/16_App_Modernization.webp'},
        {cap:'Filter for any repository and branch', theme:'product', span:'full', img:'uploads/17_Filter_by_Repository.webp'},
        {cap:'Search for references by alias', theme:'product', span:'full', img:'uploads/18_Search_for_References.webp'},
        {cap:'Discover when a flag was last referenced', theme:'product', span:'full', img:'uploads/19_Discover_when_a_Flag.webp'},
        {cap:'Workflow automation', theme:'product', span:'full', img:'uploads/20_Workflow_Automation.webp'},
        {cap:'Advanced targeting', theme:'product', span:'full', img:'uploads/21_Advanced_Targeting.webp'},
        {cap:'Technical debt management', theme:'product', span:'full', img:'uploads/22_Technical_Debt_Management.webp'},
        {cap:'Security and administration', theme:'product', span:'full', img:'uploads/23_Security_and_Administration.webp'}
      ]
    },
    {
      id: 'launchdarkly-motion-graphics', company: 'LaunchDarkly', title: 'Stomp Video',
      summaryTitle: 'Stomp Video',
      cat: 'Motion', cats: ['Motion', 'Video'], kind: 'Video', year: '2022', accent: LD, theme: 'video', size: 'lg',
      hero: 'uploads/yt-6ND0ycCI5tI.jpg',
      heroVideo: '6ND0ycCI5tI',
      poster: 'uploads/yt-6ND0ycCI5tI.jpg',
      summary: 'Concepted, designed, and animated a motion graphics piece for LaunchDarkly, turning an abstract feature management story into a fast, kinetic sequence of typography, product UI, and brand motifs. Dense technical messaging is hard to make exciting, so the goal was to give the narrative rhythm and momentum: animated type, fluid transitions, and product moments cut to a tight edit. I owned it end to end, from storyboard and design through animation and final delivery, all built on a reusable motion system the team could extend.',
      role: 'Motion Designer', scope: 'Concept · Design · Animation', outcome: 'The brand, in motion',
      body: [],
      stats: [{n:'End-to-end',l:'Production'},{n:'Kinetic',l:'Typography'},{n:'On-system',l:'Brand motion'}],
      gallery: []
    },
    {
      id: 'launchdarkly-q4-release', company: 'LaunchDarkly', title: 'Q4 Release Video',
      cat: 'Motion', cats: ['Motion', 'Video'], kind: 'Video', year: '2022', accent: LD, theme: 'video', size: 'sm',
      hero: 'uploads/yt-QjsxmT2hR7k.jpg',
      summary: 'Designed and animated LaunchDarkly’s quarterly release video, a fast, polished motion piece that made new features land with the audience. Quarterly releases pack in a lot of news, so the video had to make each feature clear and exciting in just a few minutes.',
      role: 'Motion Designer', scope: 'Script · Design · Animation', outcome: 'Features that landed',
      body: [],
      stats: [{n:'Quarterly',l:'Cadence'},{n:'End-to-end',l:'Production'},{n:'Reusable',l:'Motion system'}],
      gallery: [
        {cap:'Q4 release video', theme:'video', yt:'QjsxmT2hR7k', img:'uploads/yt-QjsxmT2hR7k.jpg'}
      ]
    },
    {
      id: 'launchdarkly-academy-trailer', company: 'LaunchDarkly', title: 'Academy Trailer',
      cat: 'Motion', cats: ['Motion', 'Video'], kind: 'Video', year: '2022', accent: LD, theme: 'video', size: 'sm',
      hero: 'uploads/academy-social-1200x1200.webp',
      heroVideo: 'PBI3z4OA_RA',
      poster: 'uploads/academy-social-1200x1200.webp',
      summary: 'A promotional trailer for LaunchDarkly Academy, the company’s free learning platform of courses and certifications for feature management. The video had to make self paced training feel worth starting, so I kept it short and energetic: kinetic type, product moments, and a clear invitation to enroll, all built on the existing brand motion system.',
      role: 'Motion Designer', scope: 'Concept · Design · Animation', outcome: 'Enrollment driver',
      body: [],
      stats: [{n:'Academy',l:'Launch promo'},{n:'Free',l:'Courses'},{n:'On-system',l:'Brand motion'}],
      gallery: []
    },
    {
      id: 'launchdarkly-bumpers', company: 'LaunchDarkly', title: 'Video Bumpers',
      cat: 'Motion', cats: ['Motion', 'Video'], kind: 'Video', year: '2022', accent: LD, theme: 'video', size: 'sm',
      hero: 'uploads/yt-GVvdXy1UBho.jpg',
      summary: 'A flexible set of animated bumpers and lower thirds that gave every LaunchDarkly video a consistent, branded frame. Video was scaling across teams but every featured image looked different. I designed logo bumpers, lower thirds, transitions, and endplates that kept the whole channel coherent.',
      role: 'Motion Designer', scope: 'Bumpers · Lower thirds · Toolkit', outcome: 'Consistent frame',
      body: [],
      stats: [{n:'Toolkit',l:'Reusable'},{n:'Branded',l:'Every clip'},{n:'Drop-in',l:'Templates'}],
      gallery: [
        {cap:'Zendesk integration', theme:'video', yt:'GVvdXy1UBho', img:'uploads/yt-GVvdXy1UBho.jpg'},
        {cap:'Customer Corner bumper', theme:'video', yt:'h4EXf0QFyBY', img:'uploads/yt-h4EXf0QFyBY.jpg'},
        {cap:'Academy · Code References', theme:'video', yt:'vq7ssPCNVYU', img:'uploads/yt-vq7ssPCNVYU.jpg'},
        {cap:'A Day in the Life · intro', theme:'video', yt:'48LLb09IVuQ', img:'uploads/yt-48LLb09IVuQ.jpg'}
      ]
    },
    {
      id: 'galaxy-promo', company: 'Galaxy', title: 'Event Video',
      summaryTitle: 'Galaxy Promo Video',
      cat: 'Motion', cats: ['Motion', 'Video'], kind: 'Video', year: '2021', accent: GX, theme: 'video', size: 'sm',
      hero: 'uploads/Galaxy-Thumb.webp',
      summary: 'Produced the promo video for Galaxy, handling concept, design, and motion for an event film built to drive hype and attendance. Galaxy needed something that captured momentum and sold the experience before the doors even opened. I developed the concept, designed the typographic system, and animated the whole piece from title sequence to outro.',
      role: 'Designer / Motion', scope: 'Concept · Design · Motion', outcome: 'Hype that converted',
      body: [],
      stats: [{n:'Promo',l:'Event film'},{n:'Concept→',l:'Delivery'},{n:'Hype',l:'Driven'}],
      videoOrientation: 'vertical',
      gallery: [
        {cap:'Galaxy · 01', theme:'video', yt:'6BxORBZk6Rg', img:'uploads/yt-6BxORBZk6Rg.jpg'},
        {cap:'Galaxy · 02', theme:'video', yt:'R0xnq7N1I8w', img:'uploads/yt-R0xnq7N1I8w.jpg'},
        {cap:'Galaxy · 03', theme:'video', yt:'DWvK3P1YxGk', img:'uploads/yt-DWvK3P1YxGk.jpg'}
      ]
    },
    {
      id: 'launchdarkly-youtube', company: 'LaunchDarkly', title: 'YouTube Thumbnails',
      cat: 'Brand', kind: 'Social', year: '2022', accent: LD, theme: 'social', size: 'sm',
      hero: 'uploads/Uberflip_Explainer.webp',
      summary: 'Designed LaunchDarkly’s YouTube presence, including thumbnails, channel art, and templates that lifted clicks and unified the channel. A growing video library needed a coherent, clickable identity to hold it together. I designed channel art, a thumbnail system, and series templates that improved clicks and kept everything consistent.',
      role: 'Designer', scope: 'Channel · Thumbnails · Templates', outcome: 'Higher CTR',
      body: [],
      stats: [{n:'CTR',l:'Lifted'},{n:'Unified',l:'Channel'},{n:'System',l:'Templates'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'LaunchDarkly explainer', theme:'social', img:'uploads/Uberflip_Explainer.webp'},
        {cap:'What customers are saying', theme:'social', img:'uploads/Testimonial - All.webp'},
        {cap:'How to create feature flags in LaunchDarkly', theme:'social', img:'uploads/FFT_How to create feature flags in LaunchDarkly-c.webp'},
        {cap:'Data Dog integration', theme:'social', img:'uploads/Data_Dog.webp'},
        {cap:'DevOps at Speed with Feature Flags', theme:'social', img:'uploads/FFT_ DevOps at Speed with Feature Flags.webp'},
        {cap:'Feature toggles & hypothesis-driven development', theme:'social', img:'uploads/FFT_ Feature toggles and hypothesis-driven development _ DevNation Tech Talk.webp'},
        {cap:'Deploying rapidly for CI · Heidi Waterhouse', theme:'social', img:'uploads/FFT_Deploying rapidly for continuous integration with Heidi Waterhouse.webp'},
        {cap:'Enabling Continuous Delivery with Feature Flags', theme:'social', img:'uploads/FFT_Enabling Continuous Delivery with Feature Flags and LaunchDarkly.webp'},
        {cap:'How Atlassian Does DevOps · Building Products', theme:'social', img:'uploads/FFT_How Atlassian Does DevOps Webinar - Building Products.webp'},
        {cap:'SOC2 is not a 4-letter word', theme:'social', img:'uploads/FFT_SOC2 is not a 4 letter word_ A startup guide to compliance.webp'},
        {cap:'When feature flags go bad', theme:'social', img:'uploads/FFT_When Feature flags go bad.webp'},
        {cap:'Targeting · Taking your feature flags further', theme:'social', img:'uploads/GS_Targeting- Taking Your Feature Flags Further.webp'},
        {cap:'Test in production · for product managers', theme:'social', img:'uploads/TIP_How LaunchDarkly Enables Product Managers to Test in Production.webp'},
        {cap:'Trajectory Nano · Making releases boring', theme:'social', img:'uploads/Trajectory Nano Series Week 1 of 4_ Making Releases Boring in the Enterprise.webp'},
        {cap:'AMA with Jon Smart · DOES U.S. Virtual', theme:'social', img:'uploads/Uberflip_AMA with Jon Smart DOES U.S. Virtual.webp'},
        {cap:'Code References', theme:'social', img:'uploads/Uberflip_Code_Refs.webp'},
        {cap:'Dynatrace webinar', theme:'social', img:'uploads/Webinars_Dynatrace Webinar.webp'},
        {cap:'The Fallacy of Move Fast and Break Things', theme:'social', img:'uploads/Webinars_The Fallacy of Move Fast and Break Things.webp'}
      ]
    },
    {
      id: 'launchdarkly-ads', company: 'LaunchDarkly', title: 'eBook Ads',
      cat: 'Motion', kind: 'Campaign', year: '2022', accent: LD, theme: 'ads', size: 'sm',
      hero: 'uploads/yt-ieyRVVmM8_E.jpg',
      summary: 'A performance ad system for LaunchDarkly’s eBooks and gated content, with templates engineered to convert across paid channels. Gated content drives pipeline, but only if the ads convert, so the team needed a repeatable system that performs. I designed the ad set, eBook covers, and matching landing pages, with variants tuned for each paid channel.',
      role: 'Designer', scope: 'Ads · Covers · Landing', outcome: 'Built to convert',
      body: [],
      stats: [{n:'Convert',l:'First'},{n:'Paid',l:'Channels'},{n:'Variants',l:'Tested'}],
      gallery: [
        {cap:'eBook ad · 1', theme:'ads', yt:'ieyRVVmM8_E', img:'uploads/yt-ieyRVVmM8_E.jpg'},
        {cap:'eBook ad · 2', theme:'ads', yt:'8Qpnn9OhyJY', img:'uploads/yt-8Qpnn9OhyJY.jpg'}
      ]
    },
    {
      id: 'lostudio-neros', company: 'Lo Studio', title: 'Neros',
      cat: 'Web Design', kind: 'Concept', year: '2026', accent: LS, theme: 'web', size: 'lg',
      live: 'https://neros-roan.vercel.app/',
      hero: 'uploads/neros-thumb.webp',
      summary: 'A site concept for Neros, a San Diego defense manufacturer building autonomous systems for Western allies. The story opens with the thesis, that the factory is the product, then moves into the three platforms: Archer, Crossbow and Longbow, each with its own range, speed, payload and endurance. An interactive schematic viewer lets you inspect the airframe one subsystem at a time, from the full assembly to the antenna array, the powertrain and the optical payload, all drawn orthographic and labeled like a real drawing set.',
      role: 'Creative Director & Lead Designer', scope: 'Web Design · Motion · Build', outcome: 'Concept site',
      body: [],
      stats: [{n:'3',l:'Systems'},{n:'4',l:'Schematic views'},{n:'Days',l:'Design to flight'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Home page · full scroll', theme:'web', img:'uploads/neros-home-v3.webp', span:'full'}
      ]
    },
    {
      id: 'lostudio-paint4perfection', company: 'Lo Studio', title: 'Paint 4 Perfection',
      cat: 'Web Design', cats: ['Brand', 'Web Design'], kind: 'Digital', year: '2026', accent: LS, theme: 'web', size: 'lg',
      live: 'https://www.paint4perfection.com/',
      hero: 'uploads/p4p-hero-card-c.webp',
      summary: 'Brand and marketing site for Paint 4 Perfection, a full service painting company looking after homes and businesses across Westchester County, New York. Frank runs the company out of Hawthorne, and in more than twenty years he has painted remodels, new construction, historic properties and high tech offices. The site is built around the thing the business actually sells, which is preparation. Every job is photographed on site from masking through the final walkthrough, a slider lets you drag between before and after on the same surface, and the process is laid out in four stages so nothing comes as a surprise before the first coat.',
      role: 'Creative Director & Lead Designer', scope: 'Brand · Web Design · Build', outcome: 'Live and booking work',
      body: [],
      stats: [{n:'20+',l:'Years'},{n:'7',l:'Counties served'},{n:'2015',l:"Angie's List Award"}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Home page · full scroll', theme:'web', img:'uploads/p4p-home-v3.webp', span:'full'}
      ]
    },
    {
      id: 'lostudio-tetris', company: 'Lo Studio', title: 'Tetris',
      cat: 'Interactive', kind: 'Experiment', year: '2026', accent: LS, theme: 'product', size: 'sm',
      live: 'https://tetris-iota-two.vercel.app/',
      summary: 'A playable Tetris built as an interaction study. Full keyboard controls, a hold queue, next preview, soft and hard drop, levels, line counting and a high score that sticks around, plus touch controls so it works on a phone. A small piece to keep the hands sharp on state, timing and input feel.',
      hero: 'uploads/tetris-card.webp',
      role: 'Creative Director & Lead Designer', scope: 'Design · Build', outcome: 'Playable',
      body: [],
      stats: [{n:'Keyboard',l:'+ touch'},{n:'Hold',l:'+ next queue'},{n:'Saved',l:'High score'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Playable board · keyboard and touch', theme:'product', img:'uploads/tetris-full.webp', span:'full'}
      ]
    },
    {
      id: 'lostudio-reducto', company: 'Lo Studio', title: 'Reducto',
      cat: 'Web Design', kind: 'Concept', year: '2026', accent: LS, theme: 'web', size: 'sm',
      live: 'https://reducto-phi.vercel.app/',
      summary: 'A site concept for Reducto, the agentic document platform for AI teams. The tricky part of the story is that the product is an API, so the design has to make parsing visible. A live parse animation labels title, paragraph, table, figure and footnote while the structured JSON assembles beside it. From there the page opens into the toolbox of composable APIs, four industries where accuracy is not negotiable, and a developer section with Python, cURL and response tabs.',
      role: 'Creative Director & Lead Designer', scope: 'Web Design · Motion · Build', outcome: 'Concept site',
      body: [],
      stats: [{n:'4',l:'Industry cases'},{n:'5',l:'Platform APIs'},{n:'3',l:'Code tabs'}],
      hero: 'uploads/reducto-card-v5.webp',
      galleryLayout: 'grid',
      gallery: [
        {cap:'Home page · full scroll', theme:'web', img:'uploads/reducto-home-v3.webp', span:'full'}
      ]
    },
    {
      id: 'lostudio-astranis', company: 'Lo Studio', title: 'Astranis',
      cat: 'Web Design', cats: ['Web Design', 'Video'], kind: 'Concept', year: '2026', accent: LS, theme: 'web', size: 'sm',
      live: 'https://astranis.vercel.app/',
      hero: 'uploads/astranis-card-v4.webp',
      summary: 'A site concept for Astranis, which builds small dedicated satellites for high orbits. The pitch is flexible, resilient, high speed connectivity from GEO, delivered as a network a single customer owns rather than capacity rented from someone else. The design leans on orbit, coverage and the sheer scale of the spacecraft to make an abstract service feel physical.',
      role: 'Creative Director & Lead Designer', scope: 'Web Design · Motion · Build', outcome: 'Concept site',
      body: [],
      stats: [{n:'GEO',l:'Orbit'},{n:'Dedicated',l:'Networks'},{n:'Concept',l:'Build'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Home page · full scroll', theme:'web', img:'uploads/astranis-home-v2.webp', span:'full'},
        {cap:'Concept ad · motion', mp4:'uploads/Astranis_Concept.mp4', poster:'uploads/astranis-card-v4.webp'}
      ]
    },
    {
      id: 'lostudio-coopfit', company: 'Lo Studio', title: 'Coopfit Fitness',
      cat: 'Web Design', cats: ['Brand', 'Web Design'], kind: 'Digital', year: '2026', accent: LS, theme: 'web', size: 'sm',
      live: 'https://www.coopfitfitness.com/',
      hero: 'uploads/coopfit-card-v3.webp',
      summary: 'Brand and marketing site for Coopfit Fitness, a private personal training studio in Tribeca, New York City. Charles Cooperman founded Coopfit in 2002 and has spent more than 25 years coaching executives, founders and talent one on one. The site has one job, which is turning a referral into a booked free consultation. The studio, the coaching and the credentials are laid out in the order a new client tends to ask about them.',
      role: 'Creative Director & Lead Designer', scope: 'Brand · Web Design · Build', outcome: 'Consult bookings',
      body: [],
      stats: [{n:'25+',l:'Years coaching'},{n:'2002',l:'Founded'},{n:'Tribeca',l:'NYC studio'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Home page · full scroll', theme:'web', img:'uploads/coopfit-home-v2.webp', span:'full'}
      ]
    },
    {
      hidden: true,
      id: 'lostudio-bayview', company: 'Lo Studio', title: 'Bayview Heights',
      cat: 'Web Design', kind: 'Digital', year: '2026', accent: LS, theme: 'web', size: 'sm',
      live: 'https://bayview-heights.vercel.app/',
      hero: 'uploads/bayview-card.webp',
      summary: 'A listing site for 875 Meade Avenue, a remodeled three bedroom top floor home in Bayview Heights, San Francisco. The whole page is built around the one thing the property sells, which is the view: the skyline, the Bay Bridge and the East Bay hills from a hilltop pocket where a view like that is still within reach. Twenty one photographs are laid out room by room, the specs sit in a plain table an agent can read out loud, and the neighborhood section ties transit times and the Candlestick redevelopment to a hand drawn map. It ends where a listing should, on a showing request.',
      role: 'Creative Director & Lead Designer', scope: 'Web Design · Build', outcome: 'Live listing site',
      body: [],
      stats: [{n:'1,200',l:'Square feet'},{n:'5',l:'Skylights'},{n:'21',l:'Photographs'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Listing page · full scroll', theme:'web', img:'uploads/bayview-home.webp', span:'full'}
      ]
    },
    {
      hidden: true,
      id: 'lostudio-westchester', company: 'Lo Studio', title: 'Westchester Teacher',
      cat: 'Web Design', kind: 'Digital', year: '2026', accent: LS, theme: 'web', size: 'sm',
      live: 'https://www.westchesterteacher.com',
      hero: 'uploads/westchester-card.webp',
      summary: 'Marketing site for Westchester Teacher, the practice of Melissa Iorio, a reading intervention specialist trained in the Orton-Gillingham method who tutors children in grades K to 6 across Westchester and Connecticut. The page is written for a parent who already suspects something is wrong and wants to know what happens next. It opens on the method, moves to Melissa and her credentials, then walks through the four steps from the first call to the monthly progress report. Parent testimonials and an FAQ answer the questions that come up before anyone books, and every section returns to the same consultation request.',
      role: 'Creative Director & Lead Designer', scope: 'Web Design · Build', outcome: 'Consult bookings',
      body: [],
      stats: [{n:'16',l:'Years teaching'},{n:'K–6',l:'Grades served'},{n:'1:1',l:'Every session'}],
      galleryLayout: 'grid',
      gallery: [
        {cap:'Home page · full scroll', theme:'web', img:'uploads/westchester-home.webp', span:'full'}
      ]
    },
  ];

  /* ---------- brands (featured thumbnails on the homepage) ---------- */
  const BRANDS = [
    {
      id: 'launchdarkly', name: 'LaunchDarkly', accent: LD,
      companies: ['LaunchDarkly', 'Galaxy'],
      years: '2018 - 2023', role: 'Senior Designer & Video Editor',
      thumb: 'uploads/Toggle_Thumb-b5f27e1e.webp',
      blurb: 'Web and motion design through the award winning 2021 rebrand and the campaigns that followed, from the highest stakes marketing pages to release videos and paid creative.'
    },
    {
      id: 'projectdiscovery', name: 'ProjectDiscovery', accent: PD,
      years: '2023 - 2025', role: 'Principal Designer',
      thumb: 'uploads/PD-Brand-Thumb.webp',
      blurb: 'Principal designer through the shift from open source security tooling to an enterprise vulnerability platform. Brand system, website, product UI, and the community conference.'
    },
    {
      id: 'lostudio', name: 'Lo Studio', accent: LS,
      years: '2026', role: 'Creative Director & Lead Designer',
      thumb: 'uploads/Lo_Studio_Featured_v3.webp',
      blurb: 'Brand and web work run end to end out of my own studio, with identity, design and build in the same pair of hands. Live sites for small businesses sit alongside concept sites for companies I would love to work with. It is also my playground to share some of my new AI tools and workflow learnings.'
    },
  ];
  const brandCompanies = (b) => b.companies || [b.name];
  const brandProjects = (id) => {
    const b = BRANDS.find(x => x.id === id);
    return b ? PROJECTS.filter(p => !p.hidden && brandCompanies(b).includes(p.company)) : [];
  };
  const brandOf = (company) => BRANDS.find(b => brandCompanies(b).includes(company));
  const catsOf = (p) => p.cats || [p.cat];

  /* ---------- branded mock-screen renderer ---------- */
  function mock(theme, accent) {
    const a = accent || LD;
    const wrap = (inner, pad) => `<div class="mk" style="--mka:${a};${pad===false?'padding:0':''}">${inner}</div>`;
    switch (theme) {
      case 'web':
        return wrap(`<div class="mk-bar"><i></i><i></i><i></i><span></span></div>
          <div class="mk-hero"></div>
          <div class="mk-ln a"></div><div class="mk-ln b"></div>
          <div class="mk-g3"><div></div><div></div><div></div></div>`);
      case 'product':
        return wrap(`<div class="mk-app"><aside><i></i><i></i><i></i><i></i></aside>
          <main><div class="mk-ln a"></div><div class="mk-cards"><div></div><div class="hot"></div><div></div></div>
          <div class="mk-chart"><span></span><span></span><span></span><span></span><span></span></div></main></div>`);
      case 'brand':
        return wrap(`<div class="mk-brand"><div class="mk-logo" style="background:var(--mka)"></div>
          <div class="mk-sw"><span style="background:var(--mka)"></span><span></span><span></span><span></span></div>
          <div class="mk-aa">Aa</div></div>`);
      case 'video':
        return wrap(`<div class="mk-video"><div class="mk-play"></div><div class="mk-scrub"><b></b></div></div>`, false);
      case 'event':
        return wrap(`<div class="mk-event"><div class="mk-stage"></div><div class="mk-badge"><i></i><span></span></div></div>`);
      case 'social':
        return wrap(`<div class="mk-social"><div class="mk-post"></div><div class="mk-post sm"></div><div class="mk-post sm"></div></div>`);
      case 'ads':
        return wrap(`<div class="mk-ads"><div class="mk-ad"><span></span><b style="background:var(--mka)"></b></div><div class="mk-ad sm"></div></div>`);
      default:
        return wrap(`<div class="mk-ln a"></div><div class="mk-ln b"></div><div class="mk-ln c"></div>`);
    }
  }

  /* parse a YouTube URL or bare ID into an 11-char video id */
  function ytId(v) {
    if (!v) return '';
    const m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/);
    if (m) return m[1];
    return /^[\w-]{11}$/.test(String(v).trim()) ? String(v).trim() : '';
  }

  const IMG_DIMS = {"uploads/westchester-card.webp":[570,570],"uploads/westchester-home.webp":[1200,4122],"uploads/bayview-card.webp":[1280,960],"uploads/bayview-home.webp":[1200,7955],"uploads/github-stars-frame.webp":[600,315],"uploads/astranis-card-v4.webp":[1280,720],"uploads/astranis-home-v2.webp":[1200,5083],"uploads/tetris-card.webp":[1200,639],"uploads/tetris-full.webp":[1600,852],"uploads/p4p-home-v3.webp":[1200,7594],"uploads/coopfit-home-v2.webp":[1200,5566],"uploads/neros-home-v3.webp":[1200,5981],"uploads/reducto-home-v3.webp":[1200,7982],"uploads/reducto-card-v5.webp":[800,525],"uploads/coopfit-card-v3.webp":[1080,1219],"uploads/p4p-hero-card-c.webp":[1000,750],"uploads/neros-thumb.webp":[1280,720],"uploads/Lo_Studio_Featured_v3.webp":[640,396],"uploads/Email_Thumbnail.webp":[600,313],"uploads/CVE_Template.webp":[1200,630],"uploads/Website_Share_Card.webp":[1200,630],"uploads/Pioneers_Program.webp":[1600,837],"uploads/HSS_Event_Ad.webp":[1600,837],"uploads/academy-social-1200x1200.webp":[1200,1200],"uploads/1774327958129.jpg":[800,533],"uploads/Presentation_thumbnail.webp":[1920,1080],"uploads/Logo_Evolution_Thumbnail.webp":[1920,1080],"uploads/Logo_Evolution_1.webp":[1920,1080],"uploads/Logo_Evolution_2.webp":[1920,1080],"uploads/Logo_Evolution_3.webp":[1920,1080],"uploads/PD-Brand-Thumb.webp":[1600,900],"uploads/PD-Web-Thumb-new.webp":[721,444],"uploads/Brand Guidelines - 18.webp":[1600,900],"uploads/Menu - Platform.webp":[1440,460],"uploads/pd-playtika-social.webp":[1200,627],"uploads/vulnerability-sh-stats-lightmode.webp":[1484,758],"uploads/Brand Guidelines - 1.webp":[1600,900],"uploads/Brand Guidelines - 8.webp":[1600,900],"uploads/ld-testimonial-elastic.webp":[1200,628],"uploads/Brand Guidelines - 14.webp":[1600,900],"uploads/Brand Guidelines - 9.webp":[1600,900],"uploads/Brand Guidelines - 24.webp":[1600,900],"uploads/Brand Guidelines - 5.webp":[1600,900],"uploads/Brand Guidelines - 23.webp":[1600,900],"uploads/HSS-Brendan.webp":[1600,1067],"uploads/Brand Guidelines - 15.webp":[1600,900],"uploads/vulnerability-sh-products-lightmode.webp":[1484,758],"uploads/14_Test_Innovations.webp":[1068,549],"uploads/Brand Guidelines - 3.webp":[1600,900],"uploads/Brand Guidelines - 22.webp":[1600,900],"uploads/12_Feature_Workflows-34ac2b80.webp":[1088,549],"uploads/19_Discover_when_a_Flag.webp":[1068,549],"uploads/18_Search_for_References.webp":[1068,549],"uploads/1_Release_Confidentialy-84a07bcb.webp":[1069,656],"uploads/Brand Guidelines - 11.webp":[1600,900],"uploads/HSS-Email-Confirmation.webp":[640,998],"uploads/HSS-Waffle.webp":[1600,1067],"uploads/HSS-Thumbnail.webp":[1600,900],"uploads/Brand Guidelines - 12.webp":[1600,900],"uploads/vulnerability-sh-search-lightmode.webp":[1484,758],"uploads/16_App_Modernization.webp":[1068,549],"uploads/Brand Guidelines - 17.webp":[1600,900],"uploads/17_Filter_by_Repository.webp":[1068,549],"uploads/Galaxy-Thumb.webp":[1600,901],"uploads/Brand Guidelines - 10.webp":[1600,900],"uploads/13_Platform_Architecture-025f974d.webp":[1068,549],"uploads/Data_Dog.webp":[1600,900],"uploads/Brand Guidelines - 7.webp":[1600,900],"uploads/6_APIs-7a0befba.webp":[1068,549],"uploads/Brand Guidelines - 16.webp":[1600,900],"uploads/Brand Guidelines - 20.webp":[1600,900],"uploads/5_SDKs-b6440c8b.webp":[1068,549],"uploads/vulnerability-sh-library-lightmode.webp":[1484,758],"uploads/21_Advanced_Targeting.webp":[1068,549],"uploads/Brand Guidelines - 13.webp":[1600,900],"uploads/7_Integrations-70d5edb0.webp":[1068,549],"uploads/11_Feature_Flags-2cca8e07.webp":[1068,549],"uploads/Brand Guidelines - 2.webp":[1600,900],"uploads/22_Technical_Debt_Management.webp":[1068,549],"uploads/Brand Guidelines - 26.webp":[1600,900],"uploads/Brand Guidelines - 4.webp":[1600,900],"uploads/9_Experimentation-fd81e67a.webp":[1068,549],"uploads/Trajectory Nano Series Week 1 of 4_ Making Releases Boring in the Enterprise.webp":[1600,900],"uploads/8_Code_References-023d9e30.webp":[1068,549],"uploads/Uberflip_Explainer.webp":[1600,900],"uploads/20_Workflow_Automation.webp":[1068,549],"uploads/Email-Vulnerability-Scan.webp":[1280,1482],"uploads/vulnerability-sh-products-darkmode.webp":[1484,758],"uploads/FFT_ DevOps at Speed with Feature Flags.webp":[1600,900],"uploads/FFT_Deploying rapidly for continuous integration with Heidi Waterhouse.webp":[1600,900],"uploads/10_Data_Export-d7ece312.webp":[1068,549],"uploads/Webinars_Dynatrace Webinar.webp":[1600,900],"uploads/Brand Guidelines - 6.webp":[1600,900],"uploads/Brand Guidelines - 21.webp":[1600,900],"uploads/FFT_How Atlassian Does DevOps Webinar - Building Products.webp":[1600,900],"uploads/23_Security_and_Administration.webp":[1068,549],"uploads/3_Safely_Migrate_Systems-6027ae61.webp":[1068,656],"uploads/Uberflip_Code_Refs.webp":[1600,900],"uploads/2_Improve_Reliability-3782a307.webp":[1068,656],"uploads/PD-Product-Thumb.webp":[1080,1080],"uploads/vulnerability-sh-ssearch-darkmode.webp":[1484,758],"uploads/15_Scale_Safe_Releases.webp":[1069,549],"uploads/Brand Guidelines - 25.webp":[1600,900],"uploads/Build_buy.webp":[802,812],"uploads/HSS-PJ-Metz.webp":[1200,627],"uploads/FFT_ Feature toggles and hypothesis-driven development _ DevNation Tech Talk.webp":[1600,900],"uploads/Brand Guidelines - 19.webp":[1600,900],"uploads/FFT_SOC2 is not a 4 letter word_ A startup guide to compliance.webp":[1600,900],"uploads/Webinars_The Fallacy of Move Fast and Break Things.webp":[1600,900],"uploads/vulnerability-sh-stats-darkmode.webp":[1484,758],"uploads/FFT_Enabling Continuous Delivery with Feature Flags and LaunchDarkly.webp":[1600,900],"uploads/4_Run_Actionable_Experiments-f50660e8.webp":[1068,666],"uploads/vulnerability-sh-library-darkmode.webp":[1484,758],"uploads/Testimonial - All.webp":[1600,900],"uploads/TIP_How LaunchDarkly Enables Product Managers to Test in Production.webp":[1600,900],"uploads/GS_Targeting- Taking Your Feature Flags Further.webp":[1600,900],"uploads/FFT_When Feature flags go bad.webp":[1600,900],"uploads/HSS-MichaelSam-c.webp":[1200,900],"uploads/Email-Weekly-Report-c.webp":[1200,3703],"uploads/Blog-Nuclei.webp":[1200,630],"uploads/FFT_How to create feature flags in LaunchDarkly-c.webp":[1200,675],"uploads/Security.webp":[1440,3349],"uploads/Uberflip_AMA with Jon Smart DOES U.S. Virtual.webp":[1600,900],"uploads/Website-Pricing.webp":[1440,6710],"uploads/What_is_Feature_Management-c.webp":[1200,3344],"uploads/Website-Launch-Week-c.webp":[1200,4427],"uploads/Website-Case-Study-50978f6a-c.webp":[1200,5017],"uploads/Build_vs_Buy-c.webp":[1200,3408],"uploads/Case_Studies-c.webp":[1200,4381],"uploads/Website-Enterprise-c.webp":[1200,7766],"uploads/Solution-c.webp":[1200,4956],"uploads/Why_LaunchDarkly-c.webp":[1200,4401],"uploads/Our_Customers-c.webp":[1200,4692],"uploads/Enterprise-c.webp":[1200,5254],"uploads/Code_References-c.webp":[1200,3962],"uploads/Website-Vulnerability-Management-c.webp":[1200,6252],"uploads/The_Definitive_Guide_to_Feature_Management-c.webp":[1200,4857],"uploads/Website-Homepage-c.webp":[1200,7812],"uploads/github-stars-frame.webp":[600,315]};

  window.LO = {
    projects: PROJECTS,
    brands: BRANDS,
    brandById: (id) => BRANDS.find(b => b.id === id),
    brandProjects,
    brandOf,
    catsOf,
    byId: (id) => PROJECTS.find(p => p.id === id),
    mock,
    ytId,
    colors: { PD, LD, GX, LS },
    dims: IMG_DIMS
  };
})();
