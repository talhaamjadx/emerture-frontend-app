import LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  themeName: "Metronic",
  themeVersion: "8.0.34",
  demo: "demo1",
  main: {
    type: "default",
    primaryColor: "#236DB5",
    logo: {
      dark: "media/logos/nav-logo.png",
      light: "media/logos/nav-logo.png",
    },
  },
  illustrations: {
    set: "sketchy-1",
  },
  loader: {
    logo: "media/logos/nav-logo.png",
    display: true,
    type: "default",
  },
  scrollTop: {
    display: true,
  },
  header: {
    display: true,
    menuIcon: "font",
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  toolbar: {
    display: true,
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  aside: {
    display: true,
    theme: "light",
    fixed: true,
    menuIcon: "svg",
    minimized: false,
    minimize: true,
    hoverable: true,
  },
  content: {
    width: "fixed",
  },
  footer: {
    width: "fluid",
  },
};

export default config;
