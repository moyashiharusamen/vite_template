const defaultValue = {
  title: "default title",
  description: "default descrpition",
}

const page = {
  "/index.html": {
    isHome: true,
    title: "Top Page",
    description: "Top page description",
  },
  "/hoge/index.html": {
    title: "Hoge Page",
    description: "Hoge page description",
  },
  "/check/index.html": {
    title: "Check Page",
    description: "Check page description",
  },
};

export default page;
