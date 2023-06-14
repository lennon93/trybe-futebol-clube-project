import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatch from '../../Interfaces/IMatch';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatch>>('matches', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          homeTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'home_team_id',
          },
          homeTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'home_team_goals',
          },
          awayTeamId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'away_team_id',
          },
          awayTeamGoals: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'away_team_goals',
          },
          inProgress: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'in_progress',
          },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};



