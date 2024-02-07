
  interface CourseDto {
    id: string;
    name: string;
    price: number;
    picture: string;
    description: string;
    userId: string;
    category: Category;
    feature: FeatureDto;
    userOwned?:boolean;
  }
  