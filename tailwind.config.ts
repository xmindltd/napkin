import type { Config } from "tailwindcss";
import Color from "color";

const alpha = (clr: string, val: number) =>
  Color(clr).alpha(val).rgb().string();
const lighten = (clr: string, val: number) =>
  Color(clr).lighten(val).rgb().string();
const darken = (clr: string, val: number) =>
  Color(clr).darken(val).rgb().string();

const config = <Partial<Config>>{
  darkMode: [
    "variant",
    "&:where(.dark *:not(.dark-scope *), .dark-scope.dark *, .dark)",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      maxHeight: {
        screen: ["100vh", "100dvh"] as any,
      },
      height: {
        screen: ["100vh", "100dvh"] as any,
      },
      backgroundImage: {
        "gradient-01": "linear-gradient(135deg, #8341ED 0%, #2534DE 100%)",
        "gradient-01-noise":
          "url(/assets/images/colorful-dots.png), linear-gradient(135deg, #8341ED 0%, #2534DE 100%)",
        "gradient-01-darken":
          "linear-gradient(135deg, #8341ED 0%, #2534DE 100%)",
        "gradient-01-noise-darken":
          "url(/assets/images/colorful-dots.png), linear-gradient(135deg, #8341ED 0%, #2534DE 100%)",
        "gradient-02": "linear-gradient(135deg, #f44583 0%, #f0802e 100%)",
        "gradient-03":
          "linear-gradient(180deg, rgba(40, 42, 48, 0.00) 0%, #ffffff 100%)",
        "gradient-03-darken":
          "linear-gradient(180deg, rgba(40, 42, 48, 0.00) 0%, #282A30 100%)",
        "gradient-04":
          "linear-gradient(180deg, rgba(40, 42, 48, 0.00) 0%, #EAECEF 100%)",
        "gradient-04-darken":
          "linear-gradient(180deg, rgba(28, 29, 34, 0.00) 0%, #1C1D22 100%)",
        "gradient-primary":
          "linear-gradient(100deg, #8341ED 3.66%, #2534DE 95.26%)",
        "gradient-primary-noise":
          "url(/assets/images/colorful-dots.png), linear-gradient(100deg, #8341ED 3.66%, #2534DE 95.26%)",
        "gradient-primary-hover":
          "linear-gradient(135deg, #8341EDE6 0%, #2534DEE6 100%)",
        "gradient-primary-noise-hover":
          "url(/assets/images/colorful-dots.png), linear-gradient(100deg, #8341EDE6 0%, #2534DEE6 100%)",
        "colorful-01": "url(/assets/images/colorful-dots.png)",
        "colorful-02": "url(~/assets/icons/homepage-color-01.png)",
      },
      maxWidth: {
        "full-screen": "100vw",
      },
      width: {
        "100": "400px",
        "102": "410px",
        "160": "640px",
      },
      fontSize: {
        xs: ["12px", { letterSpacing: "-0.12px" }],
        sm: ["14px", { letterSpacing: "0" }],
        "[12px]": ["12px", { letterSpacing: "-0.12px" }],
        "[14px]": ["14px", { letterSpacing: "0" }],
        "[16px]": ["16px", { letterSpacing: "normal" }],
        "[20px]": ["20px", { letterSpacing: "-0.4px" }],
        "[28px]": ["28px", { letterSpacing: "-0.84px" }],
        "[40px]": ["40px", { letterSpacing: "-1.2px" }],
        "[50px]": ["50px", { letterSpacing: "-1.5px" }],
        "[56px]": ["56px", { letterSpacing: "-1.68px" }],
        "[72px]": ["72px", { letterSpacing: "-2.16px" }],
        "12px": ["12px", { letterSpacing: "-0.12px" }],
        "14px": ["14px", { letterSpacing: "0" }],
        "16px": ["16px", { letterSpacing: "normal" }],
        "20px": ["20px", { letterSpacing: "-0.4px" }],
        "28px": ["28px", { letterSpacing: "-0.84px" }],
        "40px": ["40px", { letterSpacing: "-1.2px" }],
        "50px": ["50px", { letterSpacing: "-1.5px" }],
        "56px": ["56px", { letterSpacing: "-1.68px" }],
        "72px": ["72px", { letterSpacing: "-2.16px" }],
        "150px": ["150px", { letterSpacing: "-4px" }],
        "180px": ["180px", { letterSpacing: "-4px" }],
      },
      boxShadow: {
        large:
          "0px 8px 32px 0px var(--shadow, rgba(0, 0, 0, 0.08)), 0px 0px 2px 0px var(--shadow, rgba(0, 0, 0, 0.08))",
        "sm-light": "0px 1px 2px 0px #0000000D",
      },
      fontFamily: {
        xmind: "Xmind, Apple Color Emoji, Twemoji",
        nevermind: "NeverMind-latest, NeverMind, Apple Color Emoji, Twemoji",
        inter:
          'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        "nevermind-hand": "NeverMind-Hand, Apple Color Emoji, Twemoji",
        "nevermind-semicondensed":
          "NeverMind-SemiCondensed, NeverMind-latest, NeverMind, Apple Color Emoji, Twemoji",
        "nevermind-slab":
          "NeverMind-Slab, NeverMind-latest, NeverMind, Apple Color Emoji, Twemoji",
        "dm-sans":
          "DM Sans, NeverMind-SemiCondensed, NeverMind-latest, NeverMind, Apple Color Emoji, Twemoji",
      },
      spacing: {
        "720px": "720px",
        "750px": "750px",
        "30px": "30px",
        "18px": "1.125rem",
        "22px": "1.375rem",
      },
      colors: {
        divider: {
          light: "#0000000F",
          dark: "#FFFFFF1A",
        },
        border: {
          light: "#0000000F",
          dark: "#FFFFFF0F",
        },
        "divider-muted": {
          light: "#00000008",
          dark: "#FFFFFF0A",
        },
        "bg-01": {
          light: "#DFE1E5",
          dark: "#08090C",
        },
        "bg-02": {
          light: "#EAECEF",
          dark: "#1C1D22",
        },
        "bg-03": {
          light: "#FFFFFF",
          dark: "#2F3137",
        },
        "fg-01": {
          light: "#000000",
          dark: "#FFFFFF",
        },
        "fg-02": {
          light: "#4A5056",
          dark: "#AEB5BD",
        },
        "fg-03": {
          light: "#6E757C",
          dark: "#8E959D",
        },
        "fg-04": {
          light: "#AEB5BD",
          dark: "#6E757C",
        },
        "fg-05": {
          light: "#CFD4D9",
          dark: "#4A5056",
        },
        "fg-06": {
          light: "#EAECEF",
          dark: "#3D4147",
        },
        "fg-07": {
          light: "#F8F9FA",
          dark: "#2F3137",
        },
        "fg-08": {
          light: "#9EA3A8",
          dark: "#676E74",
        },
        "fg-09": {
          light: "#1F2326",
          dark: "#E4E7EB",
        },
        brand: {
          primary: { dark: "#5461FF", light: "#2534DE" },
          "primary-hover": { dark: "#3141FB", light: "#2534DE" },
          secondary: { dark: "#FBE081", light: "#FBE081" },
          "secondary-01": {
            dark: "#FBE081",
            light: "#FBE081",
          },
          "secondary-02": {
            dark: "#E8BA16",
            light: "#E8BA16",
          },
        },
        overlay: {
          light: "#08090C0D",
          dark: "#EAECEF0D",
        },
        "surface-bright": {
          light: "#FFFFFF",
          dark: "#282A30",
        },
        "surface-container": {
          light: "#FFFFFF",
          dark: "#1C1D22",
        },
        "fg-link": "#3D5CFF",
        link: {
          light: {
            default: "#546FFC",
            hover: "#6D84FD",
          },
          dark: {
            default: "#5772FF",
            hover: "#7087FF",
          },
        },
        danger: {
          light: "#c91c10",
          dark: "#f14134",
        },
        transparent: "rgba(0,0,0,0)",
        yellow: "#f6d53d",
        "fg-disable": {
          light: "#AEB5BD",
          dark: "#6E757C",
        },
      },
    },
  },
};

const colors = config.theme?.extend?.colors;

if (typeof colors === "object") {
  // before: bg-01: #aaa
  // after:  bg-01: #aaa + bg-01-lighten: #ccc
  appendModifiers(
    {
      lighten: (color) => lighten(color, 0.2),
      lighten05: (color) => lighten(color, 0.05),
      darken: (color) => darken(color, 0.2),
      darken05: (color) => darken(color, 0.05),
    },
    colors
  );
}

interface RecursiveKeyValuePair<K extends keyof any = string, V = string> {
  [key: string]: V | RecursiveKeyValuePair<K, V>;
}

function appendModifiers(
  modifiers: Record<string, (val: string) => string>,
  config: RecursiveKeyValuePair
) {
  const extendConfig: any = {};
  const walkObject = (
    obj: any,
    cb: (key: string, val: any, obj: any) => void
  ) => {
    if (obj === null || typeof obj !== "object") return;
    Object.entries(obj).forEach(([key, val]) => {
      cb(key, val, obj);
      walkObject(val, cb);
    });
  };
  const cloneObject = (obj: any) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    const newObj = Array.isArray(obj) ? [] : ({} as any);
    Object.entries(obj).forEach(([key, value]) => {
      newObj[key] = cloneObject(value);
    });
    return newObj;
  };
  Object.entries(config).forEach(([key, value]) => {
    let obj = value;
    Object.entries(modifiers).forEach(([modifierName, modify]) => {
      if (typeof obj === "object" && obj !== null) {
        const cloned = cloneObject(obj);
        walkObject(cloned, (key: string, value: string, obj: any) => {
          if (typeof value === "string") {
            obj[key] = modify(value);
          }
        });
        extendConfig[`${key}-${modifierName}`] = cloned;
      } else if (typeof obj === "string") {
        extendConfig[`${key}-${modifierName}`] = modify(obj);
      }
    });
  });
  Object.assign(config, extendConfig);
}

export default config;
