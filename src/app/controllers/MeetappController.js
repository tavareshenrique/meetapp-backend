// import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetapp from '../models/Meetapp';

class MeetappController {
  async store(req, res) {
    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Date has passed' });
    }
    const { id, title, description, location, date } = await Meetapp.create(
      req.body
    );

    return res.json({
      id,
      title,
      description,
      location,
      date,
    });
  }
}

export default new MeetappController();
