export interface GigAttrs {
  _id: string;
  sellerId: string;
  description: string;
  basicDescription: string;
  email: string;
  profilePhoto: string;
  createdAt: Date;
  tags: string[];
  subCategories: string[];
  categories: string[];
  price: number;
  totalRatings: number;
  title: string;
  coverImage: string;
  basicTitle: string;
  ratings: {
    one: {
      value: number;
      count: number;
    };
    two: {
      value: number;
      count: number;
    };
    three: {
      value: number;
      count: number;
    };
    four: {
      value: number;
      count: number;
    };
    five: {
      value: number;
      count: number;
    };
  };
}
