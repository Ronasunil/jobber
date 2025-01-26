import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

@Table({
  tableName: "Review",
  timestamps: false,
})
export class Review extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Default("")
  @AllowNull(true)
  @Column(DataType.STRING)
  gigId?: string;

  @Default("")
  @AllowNull(true)
  @Column(DataType.STRING)
  sellerId?: string;

  @Default("")
  @AllowNull(true)
  @Column(DataType.STRING)
  buyerId?: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  reviewerId!: string;

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  reviewerProfilePhoto!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  reviewerUsername!: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  isDeleted!: Boolean;

  @AllowNull(false)
  @Column(
    DataType.ENUM(
      "gig-review",
      "recommendation",
      "user-to-seller-review",
      "seller-to-user-review"
    )
  )
  type!:
    | "gig-review"
    | "recommendation"
    | "user-to-seller-review"
    | "seller-to-user-review";

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  review!: string;

  @AllowNull(true)
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  createdAt?: Date;
}
