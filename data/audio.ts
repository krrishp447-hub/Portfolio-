/**
 * The audio story archive, 29 Hindi short stories.
 *
 * Source files live in Krish’s Drive as 24-bit stereo WAV (~120MB each, ~3.7GB
 * total), which is unshippable. `scripts/fetch-audio.mjs` downloads each one,
 * converts it to a 64kbps mono MP3 (~3.7MB) into /public/audio, and deletes the
 * WAV. A story with no local MP3 still shows as a cassette, it just reads as
 * an empty shell until the file is fetched.
 *
 * [CONFIRM] which brand these belong to, the Drive folder does not say.
 */

/**
 * The full set lives in Drive. The rack only racks up tapes that have a local
 * MP3, so the last slot is a demo tape pointing here for the rest.
 */
export const archiveUrl =
  "https://drive.google.com/drive/folders/1HaaBblUpvE_FrvENG5crCjOYwXeakfVM";

export type Story = {
  slug: string;
  title: string;
  /** Google Drive file id, the script’s input, never used by the browser. */
  driveId: string;
  /** Set true once /public/audio/<slug>.mp3 exists. The script updates this. */
  local: boolean;
  note?: string;
};

export const stories: Story[] = [
  { slug: "aakhri-pyali-chai", title: "Aakhri Pyali Chai", driveId: "1zj4On4qoRLGg5JlrEKrMNp_0v7ydpISW", local: true },
  { slug: "badalte-rishte", title: "Badalte Rishte", driveId: "1kG5yZaSCCrk7sgh2GFZO13V3PmwaD9Ry", local: true },
  { slug: "balcony-1", title: "Balcony", driveId: "1SwVn8seqEnWdCDAljSlbTItde_UzeFmb", local: true, note: "Part 1" },
  { slug: "balcony-2", title: "Balcony", driveId: "1zHTOCN7kuhomdzOYr8X0Z1Rcz3fPGXpP", local: true, note: "Part 2" },
  { slug: "beti-ka-ghar", title: "Beti Ka Ghar", driveId: "13lCnFVPHz4J1hdmOhsu4-7_QBazuyeQs", local: true },
  { slug: "chamatkar", title: "Chamatkar", driveId: "1UqUMTI1wS_8kaC6_Ko3uDjLJO3_fgao2", local: true },
  { slug: "chitthi", title: "Chitthi", driveId: "1aoLZKvEVcw77QDrM9OFspmvZsorMpqFU", local: true },
  { slug: "daadi", title: "Daadi", driveId: "1zyjM0LidhPdY2rk7oXISzzcYLx4teumN", local: true },
  { slug: "deewar", title: "Deewar", driveId: "12A9rgHQ6JK-VzTqkosdXFrY4iEw1n5YJ", local: true },
  { slug: "dil-ki-ankahee-baatein", title: "Dil Ki Ankahee Baatein", driveId: "1Ja1F5LxPGn-oiJJuFO_bKSundy3EFMPc", local: true },
  { slug: "dil-ki-ankahee-baatein-alt", title: "Dil Ki Ankahee Baatein", driveId: "1b4fk6u3t5Ffh2dT5udat5BSViWka1B0q", local: true, note: "Alt take" },
  { slug: "dosti", title: "Dosti", driveId: "1fuDZxmxIgX8UfFY7qIBZzzj_7H-vwC9c", local: true },
  { slug: "dus-kilometer", title: "Dus Kilometer", driveId: "166ToblJIIFgmJ-S6DSqCmZxjy6-ryqHX", local: true },
  { slug: "dus-kilometer-alt", title: "Dus Kilometer", driveId: "1Ft5mhbKVm9mGdDG2SfmjcMWlcls28ce2", local: true, note: "Alt take" },
  { slug: "dusri-shuruwat", title: "Dusri Shuruwat", driveId: "1O3BNf1Myp9j6SR1fqO9hHTI1q-8FH8GE", local: true },
  { slug: "dusri-shuruwat-alt", title: "Dusri Shuruwat", driveId: "1k_ufP4OkOFWszLzcEbd7GXusjcjIAsMS", local: true, note: "Alt take" },
  { slug: "hausla", title: "Hausla", driveId: "1ulxyXJHr9zmR-Id0iGYWeZXfsc9hHF5r", local: true },
  { slug: "jab-baat-bigad-jaye", title: "Jab Baat Bigad Jaye", driveId: "1IP6QhHqd0dN6l-etSvEvC2odAVp5n9oo", local: true },
  { slug: "jo-baatein-kabhi-kahi-nahi-gayi", title: "Jo Baatein Kabhi Kahi Nahi Gayi", driveId: "1dCqzcHpn6V7pbKVTTY-ujPkmHxK3Ii0H", local: true },
  { slug: "kadwa-sach", title: "Kadwa Sach", driveId: "1tIZerUlnf2rWvIzu7AQtUF82mRGnKF1V", local: true },
  { slug: "mumbai-local", title: "Mumbai Local", driveId: "1sZnwa6eLXVpqfteErXM7RSsHR7B35mON", local: true },
  { slug: "sabse-lambi-saanjh", title: "Sabse Lambi Saanjh", driveId: "1YcAmDd2im9xRbmg3krqi0ecAKm5WX3v4", local: true },
  { slug: "sumati", title: "Sumati", driveId: "1aKLX68BbwScdymYnhQ11tPfe7JvQuffD", local: true },
  { slug: "tees-saal-baad-1", title: "Tees Saal Baad", driveId: "1d3aVO_SAMEIlIqh12jND7isqMebHJM3M", local: true, note: "Part 1" },
  { slug: "tees-saal-baad-2", title: "Tees Saal Baad", driveId: "1rP4QbFv4mrx226tokJKXkMR5eZBINOS3", local: true, note: "Part 2" },
  { slug: "tota", title: "Tota", driveId: "1dnAS5DHqG3GtZJbzZtsneqKln9UVxrrJ", local: true },
  { slug: "whatsapp-forward", title: "WhatsApp Forward", driveId: "1ZELq4evqy7l4VqTSPJ5U3Ba7g4CnleaW", local: true },
  { slug: "woh-khath", title: "Woh Khath", driveId: "1gG0U1CEHukCPze5nxYklO6F-lVZIrLZX", local: true },
  { slug: "yaadein", title: "Yaadein", driveId: "1Y2npX_qIZhrBqTAoOIN4MDy9daf09u-a", local: true },
];
