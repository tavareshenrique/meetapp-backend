import Subscription from '../models/Subscription';

class OrganizingController {
  async index(req, res) {
    const meetups = await Subscription.findAll({
      where: { user_id: req.userId },
    });

    return res.json(meetups);
  }
}

export default new OrganizingController();
