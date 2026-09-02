import top from "../assets/top.webp";
import jng from "../assets/jng.webp";
import mid from "../assets/mid.webp";
import bot from "../assets/bot.webp";
import support from "../assets/support.webp";

// Ordered the way players read the map, and shared by the map hotspots and
// the touch lane selector so the two can't drift.
export const LANES = [
  { name: "Top", icon: top },
  { name: "Jungle", icon: jng },
  { name: "Mid", icon: mid },
  { name: "Bot", icon: bot },
  { name: "Support", icon: support },
];
