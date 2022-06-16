import { DataTypes, Sequelize } from "sequelize";
import { DATABASE_ENVIROMENT } from "./app.enviroment";
import { UserModel } from "../models/user.model";
import { PostModel } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import {
  RELATIONS_DB_STRING,
  TABLES_DB_STRING,
} from "../tools/database.strings";

export const sequelize = new Sequelize({
  host: DATABASE_ENVIROMENT.HOST,
  username: DATABASE_ENVIROMENT.USERNAME,
  password: DATABASE_ENVIROMENT.PASSWORD,
  database: DATABASE_ENVIROMENT.DATABASE,
  dialect: "mysql",
  logging: false,
});

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Email worng!",
        },
        notNull: { msg: "Email is necessary" },
      },
      unique: "Email exits",
    },
  },
  {
    sequelize,
    tableName: TABLES_DB_STRING.userTable,
    freezeTableName: true,
    timestamps: false,
  }
);

PostModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: { msg: "title is necessary" },
      },
    },
    content: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        notNull: { msg: "Content is necessary" },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
  },
  {
    sequelize,
    tableName: TABLES_DB_STRING.postTable,
    freezeTableName: false,
    updatedAt: false,
    createdAt: "created_at",
  }
);

CommentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(512),
      allowNull: false,
      validate: {
        notNull: { msg: "Content is necessary" },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: PostModel,
        key: 'id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model: UserModel,
        key: 'id',
      }
    },
  },
  {
    sequelize,
    tableName: TABLES_DB_STRING.commentTable,
    freezeTableName: false,
    updatedAt: false,
    createdAt: "created_at",
  }
);

UserModel.hasMany(PostModel, {
  foreignKey: RELATIONS_DB_STRING.userModelFK,
  as: RELATIONS_DB_STRING.postModelAlias,
});
PostModel.belongsTo(UserModel, {
  foreignKey: RELATIONS_DB_STRING.userModelFK,
  as: RELATIONS_DB_STRING.userModelAlias,
});

// UserModel.belongsToMany(PostModel, {
//   through: CommentModel,

// });
// PostModel.belongsToMany(UserModel, {
//   through: CommentModel,
// });
