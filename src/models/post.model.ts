import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ForeignKey,
  BelongsToGetAssociationMixin,
  NonAttribute,
} from "sequelize";
import { UserModel } from "./user.model";

export class PostModel extends Model<
  InferAttributes<PostModel, { }>,
  InferCreationAttributes<PostModel, { }>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare created_at: CreationOptional<Date>;

  declare author_id: ForeignKey<UserModel["id"]>;

  declare getUser: BelongsToGetAssociationMixin<UserModel>;

}
