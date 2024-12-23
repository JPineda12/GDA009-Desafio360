const IndexController = {
    async getHome(_, res) {
      res.json({ message: "API is at /api" });
    },
  };
  
  export default IndexController;
  