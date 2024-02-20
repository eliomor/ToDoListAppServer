import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize';

export interface TaskAttributes {
  id: number; 
  title: string;
  description?: string;
}

export class Task extends Model<TaskAttributes> {
  public id!: number; 
  public title!: string;
  public description?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Task.init({
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'tasks',
  sequelize,
  timestamps: true,
});
