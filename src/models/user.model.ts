import { PostModel } from "./post.model";
import { BelongsToGetAssociationMixin, BelongsToManyGetAssociationsMixin, HasManyAddAssociationsMixin, HasManyCreateAssociationMixin, HasManySetAssociationsMixin } from 'sequelize';
import { CommentModel } from './comment.model';
import {
  BelongsTo,
  CreationAttributes,
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class UserModel extends Model<
  InferAttributes<UserModel, {}>,
  InferCreationAttributes<UserModel, {}>
> {
  declare id: CreationOptional<number>;
  declare email: string;

  declare getPosts: HasManyGetAssociationsMixin<PostModel>;
  declare createPost: HasManyCreateAssociationMixin<PostModel>;
  
}
