import { isBefore, parseISO } from 'date-fns';

import MeetappSubscription from '../models/MeetappSubscription';
import Meetapp from '../models/Meetapp';

class MeetappSubscriptionController {
  async store(req, res) {
    const meetapp = await Meetapp.findOne({ where: { id: req.params.id } });

    if (req.userId === meetapp.user_id) {
      return res.status(400).json({
        error: 'You cannot register for an meetapp that you create.',
      });
    }

    const { id, user_id, meetapp_id } = MeetappSubscription.create({
      user_id: req.userId,
      meetapp_id: req.params.id,
    });

    return res.json({
      id,
      user_id,
      meetapp_id,
    });
  }
}

export default new MeetappSubscriptionController();
