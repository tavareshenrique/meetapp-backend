import { Router } from 'express';

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ "Message": "Welcome to Meetapp" })
})

export default routes;
