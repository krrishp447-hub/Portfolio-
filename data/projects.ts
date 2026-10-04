/**
 * Work chapters.
 *
 * `layout` drives the editorial composition so projects do NOT read as
 * identical cards: 'wide' = full-bleed horizontal, 'panel' = tall vertical,
 * 'type' = typographic composition.
 *
 * Assets were pulled from Krish’s Drive portfolio and filed by the brand actually
 * visible in each image, the three Instagram grids turned out to belong to three
 * different brands, so check the watermark before moving any of these.
 *
 * Outcomes are résumé-verified only. Anything unverified stays as
 * "[ADD VERIFIED RESULT]", do not fill these with estimates.
 */

export type Asset = {
  src: string;
  alt: string;
  caption?: string;
  /** Overrides the layout’s default aspect ratio, set it to the source’s own shape to avoid a bad crop. */
  ratio?: string;
  /** Full-width in a grid. Used for wide banner images sitting above a row of stills. */
  span?: boolean;
  /** Links out instead of opening the lightbox. For thumbnails of things that live elsewhere. */
  href?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  layout: "wide" | "panel" | "type";
  categories: string[];
  description: string;
  context: string;
  problem: string;
  work: string[];
  outcomes: string[];
  learnings: string;
  /** A live link to the work itself. The strongest thing a chapter can carry. */
  link?: { label: string; href: string };
  /**
   * Instagram post or reel URLs, mirrored in place of still images. When this
   * has entries the chapter shows the real posts instead of a screenshot, which
   * is always better: the clip plays, and it stays current on its own.
   */
  embeds?: { url: string; title: string }[];
  assets: Asset[];
  /** Frames drawn when `assets` runs out, keeps the composition intact while gaps remain. */
  placeholderFrames: number;
  placeholderHint: string;
};

export const projects: Project[] = [
  {
    slug: "gen-s-life",
    title: "Gen S Life",
    year: "2024 to now",
    layout: "wide",
    categories: ["Content", "YouTube", "Digital", "Strategy", "Meta Ads"],
    description:
      "A content and digital ecosystem focused on building useful, accessible experiences and content for an older audience.",
    context:
      "An audience most content strategy ignores. Older viewers are usually treated as an afterthought, served the same formats as everyone else, at the same pace, with the same assumptions about what is obvious.",
    problem:
      "Content had to earn attention from people who do not scroll the way younger audiences do, across YouTube and Instagram at once, while paid campaigns had to actually convert rather than just collect impressions.",
    work: [
      "Owned end-to-end content flow across YouTube and Instagram, planning through to publishing.",
      "Ran Meta (Facebook & Instagram) ad campaigns on monthly budgets of ₹50,000+.",
      "Wrote a 16-part how-to script series teaching digital tasks step by step: Paytm, net banking, Zoom, Google Maps, Amazon, Ola, MakeMyTrip, Zomato, the App Store, Instagram Reels.",
      "Scripted and produced brand films (Ambulance, Family SOS, Yoga) and promos for recurring formats: Karaoke, Funtakshari, Kitabi, Weekend Adda.",
      "Led a content team, aligning strategy with execution against audience-retention metrics.",
      "Planned and coordinated online and offline events, including museum walks and community meetups.",
      "Grew from intern to Content Manager across four roles, including a freelance stretch while working elsewhere.",
    ],
    outcomes: [
      "400,000+ views across the YouTube and Instagram handles managed.",
      "₹1 lakh+ cumulative conversion value from Meta campaigns.",
      "1.4x ROAS on the Meta campaigns.",
      "500+ new subscribers onto the platform.",
    ],
    learnings:
      "Writing instructions for someone who is not fluent in an interface teaches you what 'obvious' actually costs. Nothing sharpens content like an audience that will simply stop if a step is missing.",
    assets: [
      {
        src: "/work/gen-s-life/instagram-grid.jpg",
        alt: "Gen S Life Instagram grid showing community content, grandparents day posts and event announcements",
        caption: "Instagram grid, community formats",
        ratio: "1.9/1",
        span: true,
      },
      {
        src: "/work/gen-s-life/film-ambulance.jpg",
        ratio: "9/16",
        alt: "Still from the Gen S Life Ambulance brand film",
        caption: "Ambulance film",
      },
      {
        src: "/work/gen-s-life/film-family-sos.jpg",
        ratio: "9/16",
        alt: "Still from the Gen S Life Family SOS brand film",
        caption: "Family SOS film",
      },
      {
        src: "/work/gen-s-life/film-yoga.jpg",
        ratio: "9/16",
        alt: "Still from the Gen S Life Yoga film",
        caption: "Yoga film",
      },
      {
        src: "/work/gen-s-life/promo-karaoke.jpg",
        ratio: "9/16",
        alt: "Still from the Karaoke format promo",
        caption: "Karaoke promo",
      },
      {
        src: "/work/gen-s-life/promo-funtakshari.jpg",
        ratio: "9/16",
        alt: "Still from the Funtakshari format promo",
        caption: "Funtakshari promo",
      },
      {
        src: "/work/gen-s-life/promo-kitabi.jpg",
        ratio: "9/16",
        alt: "Still from the Kitabi format promo",
        caption: "Kitabi promo",
      },
      {
        src: "/work/gen-s-life/promo-weekend-adda.jpg",
        ratio: "9/16",
        alt: "Still from the Weekend Adda format promo",
        caption: "Weekend Adda promo",
      },
    ],
    placeholderFrames: 8,
    placeholderHint: "campaign material · analytics",
  },
  {
    slug: "ek-sur",
    title: "Ek Sur",
    year: "2025",
    layout: "panel",
    categories: ["YouTube", "Content", "Music", "Thumbnail strategy"],
    description:
      "A devotional music channel taken from zero, covering bhajans, Gurbani, Sufi, Marathi abhang and gospel. A test of whether retention-led decisions beat publishing volume.",
    context:
      "A brand-new YouTube channel with no audience, no back catalogue and no algorithmic history to inherit, built around performances from singers across faiths and generations.",
    problem:
      "Starting from zero means every early video is a cold test. The question was what to optimise first: output, thumbnails, formats, or length, with no data to start from.",
    work: [
      "Built the channel’s content approach from scratch, optimising formats around retention rather than volume.",
      "Developed thumbnail strategy as a deliberate variable rather than an afterthought.",
      "Ran content end to end: planning, publishing, and reading the response.",
    ],
    outcomes: [
      "300+ subscribers in 2.5 months, from zero.",
      "1,000+ watch hours in the same 2.5 months.",
      "[ADD VERIFIED RESULT]: best-performing format and its retention curve",
    ],
    learnings:
      "Early on, thumbnails decide whether the content gets judged at all. Getting the click is a separate craft from holding the view, and conflating the two wastes months.",
    link: { label: "Watch the channel", href: "https://www.youtube.com/@Ek_Sur" },
    // Thumbnails are the work here, so each links to the video rather than
    // opening a larger copy of itself. Ordered to show the range of faiths
    // the channel covers, which is the point of it.
    assets: [
      {
        src: "/work/ek-sur/instagram-grid.jpg",
        alt: "Ek Sur grid showing singers performing, including a multi-faith concert",
        caption: "Performance grid, multi-faith concert series",
        ratio: "1.9/1",
        span: true,
      },
      {
        src: "/work/ek-sur/yt-koi-kahe-krishna.jpg",
        alt: "Thumbnail for the Ek Sur video Koi Kahe Krishna Koi Kahe Shankar",
        caption: "Koi Kahe Krishna Koi Kahe Shankar",
        ratio: "16/9",
        href: "https://www.youtube.com/watch?v=afFXCvhmq0Y",
      },
      {
        src: "/work/ek-sur/yt-bappa-morya.jpg",
        alt: "Thumbnail for the Ek Sur video Bappa Morya, Ganesh Chaturthi special",
        caption: "Bappa Morya, Ganesh Chaturthi special",
        ratio: "16/9",
        href: "https://www.youtube.com/watch?v=7fUOmfMHmPw",
      },
      {
        src: "/work/ek-sur/yt-allah-ke-bande.jpg",
        alt: "Thumbnail for the Ek Sur video Allah Ke Bande",
        caption: "Allah Ke Bande",
        ratio: "16/9",
        href: "https://www.youtube.com/watch?v=LvKH8IAyE9g",
      },
      {
        src: "/work/ek-sur/yt-christmas-across-the-bridge.jpg",
        alt: "Thumbnail for the Ek Sur video Across The Bridge, Christmas special",
        caption: "Across The Bridge, Christmas special",
        ratio: "16/9",
        href: "https://www.youtube.com/watch?v=tqzTfyhSD7c",
      },
      {
        src: "/work/ek-sur/yt-geet-govind.jpg",
        alt: "Thumbnail for the Ek Sur video Geet Govind",
        caption: "Geet Govind",
        ratio: "16/9",
        href: "https://www.youtube.com/watch?v=c4ZIV-dOfWc",
      },
      {
        src: "/work/ek-sur/yt-shyama-shyam.jpg",
        alt: "Thumbnail for the Ek Sur video Shyama Shyam Bhajan",
        caption: "Shyama Shyam Bhajan",
        ratio: "16/9",
        href: "https://www.youtube.com/watch?v=d6Xe52S2_bk",
      },
    ],
    placeholderFrames: 7,
    placeholderHint: "thumbnails · growth data",
  },
  {
    slug: "theboredmonkey",
    title: "TheBoredMonkey",
    year: "2026",
    layout: "type",
    categories: ["Social media", "Strategy", "Short-form", "Research"],
    description:
      "Short-form business and founder content, cut from long-form interviews. Built around finding the moment worth clipping.",
    context:
      "A business content handle competing in the most saturated format there is: talking-head clips with burned-in captions, where every competitor has the same raw material and the same tools.",
    problem:
      "When the format is commodity, the only remaining variables are which moment you choose, how you frame it, and when you post it.",
    work: [
      "Created and managed content across social handles to build brand presence and engagement.",
      "Scripted content ideas and developed visualization concepts for production.",
      "Ran pre-production workflows and coordinated across teams for delivery.",
      "Used content analysis to identify high-performing posting times and formats, improving organic reach.",
      "Built audience-segmented campaigns informed by competitive research.",
    ],
    outcomes: [
      "Improved organic reach through posting-time and format analysis.",
    ],
    learnings:
      "In a commodity format, the edit is the strategy. Picking the right thirty seconds out of an hour is a research problem disguised as a production one.",
    link: {
      label: "See the handle",
      href: "https://www.instagram.com/tbm_insighter/",
    },
    // Titles are taken from each post's caption so the iframe has a real label.
    embeds: [
      {
        url: "https://www.instagram.com/p/DVEAIe2iBeg/",
        title: "Tanmay Bhat on the real reason behind instant popularity",
      },
      {
        url: "https://www.instagram.com/p/DUnkAcOiMrZ/",
        title: "Ashish Hemrajani on the five million Indians in the London of India",
      },
      {
        url: "https://www.instagram.com/p/DVqmmFnCEH6/",
        title: "Why the best salespeople get called shameless",
      },
      {
        url: "https://www.instagram.com/p/DVvssnKCB5G/",
        title: "Founders do not lose fear, they use it differently",
      },
    ],
    assets: [
      {
        src: "/work/theboredmonkey/instagram-grid.jpg",
        alt: "TheBoredMonkey Instagram grid of short-form business and founder clips with captions",
        caption: "Short-form grid, founder and business clips",
        ratio: "1.9/1",
        span: true,
      },
    ],
    placeholderFrames: 2,
    placeholderHint: "analytics · campaign material",
  },
];
