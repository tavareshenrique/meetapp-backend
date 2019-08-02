import { isBefore, parseISO } from 'date-fns';

import MeetappSubscription from '../models/MeetappSubscription';
import Meetapp from '../models/Meetapp';

class MeetappSubscriptionController {
  async store(req, res) {
    const meetapp = await Meetapp.findOne({ where: { id: req.params.id } });
    const meetappSubscriptions = await MeetappSubscription.findAll({
      where: { user_id: req.userId },
    });

    meetappSubscriptions.map(sub => {
      if (sub.meetapp_id === parseInt(req.params.id, 0)) {
        return res.status(400).json({
          error: 'You are already subscribed to this meetapp.',
        });
      }
      return null;
    });

    if (req.userId === meetapp.user_id) {
      return res.status(400).json({
        error: 'You cannot register for an meetapp that you create.',
      });
    }

    if (!isBefore(parseISO(meetapp.date), new Date())) {
      return res.status(400).json({
        error: 'This meetapp has already happened, Im sorry!',
      });
    }

    if (!isBefore(parseISO(meetapp.date), new Date())) {
      return res.status(400).json({
        error: 'This meetapp has already happened, Im sorry!',
      });
    }

    return res.json({ ok: 'ok' });

    // const { id, user_id, meetapp_id } = MeetappSubscription.create({
    //   user_id: req.userId,
    //   meetapp_id: req.params.id,
    // });

    // return res.json({
    //   id,
    //   user_id,
    //   meetapp_id,
    // });
  }
}

export default new MeetappSubscriptionController();
