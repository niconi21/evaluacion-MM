import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { UserModel } from "./user.model";
import { PostModel } from './post.model';
import { BelongsToGetAssociationMixin } from 'sequelize';

export class CommentModel extends Model<
  InferAttributes<CommentModel, {}>,
  InferCreationAttributes<CommentModel, {}>
> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare created_at: CreationOptional<Date>;
  
  declare author_id: ForeignKey<UserModel["id"]>;
  declare post_id: ForeignKey<PostModel["id"]>;

}
