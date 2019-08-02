import Sequelize, { Model } from 'sequelize';

class MeetappSubscription extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        meetapp_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default MeetappSubscription;
