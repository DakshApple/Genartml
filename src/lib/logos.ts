import genartml from "@/assets/genartml.png.asset.json";
import genartmlMark from "@/assets/genartml-mark.png.asset.json";
import evoluter from "@/assets/evoluter.png.asset.json";
import extutor from "@/assets/extutor.png.asset.json";

export const logos = {
  genartml: genartml.url,
  genartmlMark: genartmlMark.url,
  evoluter: evoluter.url,
  extutor: extutor.url,
} as const;

export const productLogos: Record<string, string> = {
  evoluter: evoluter.url,
  extutor: extutor.url,
};
