interface FeatureDto {
    Duration: number;
}

interface CourseCreateDto {
    Name: string;
    Price: number;
    Picture: string;
    UserId?: string;
    Description: string;
    CategoryId: string;
    Feature: FeatureDto;
}