// import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetapp from '../models/Meetapp';

class MeetappController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const meetapp = await Meetapp.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date', 'banner'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json({ meetapp });
  }

  async store(req, res) {
    const { title, description, location, date } = req.body;

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date has passed' });
    }

    const { id } = await Meetapp.create({
      user_id: req.userId,
      title,
      description,
      location,
      date,
    });

    return res.json({
      id,
      title,
      description,
      location,
      date,
    });
  }

  async update(req, res) {
    const meetapp = await Meetapp.findOne({ where: { id: req.params.id } });

    if (isBefore(parseISO(meetapp.date), new Date())) {
      return res.status(400).json({
        error: 'Unable to change the date of an event that already happened',
      });
    }
    // console.log(req.req.params.id);
    console.log(req.userId);
    console.log(meetapp.user_id);

    if (req.userId !== meetapp.user_id) {
      return res.status(400).json({
        error: 'You do not have permission to change this event',
      });
    }

    const { title, description, location, date } = await meetapp.update(
      req.body
    );

    return res.json({ title, description, location, date });
  }
}

export default new MeetappController();
