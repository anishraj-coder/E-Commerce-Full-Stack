import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
    rating: number; // 0 to 5
    size?: number;
}

const StarRating = ({ rating, size = 16 }: StarRatingProps) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center text-yellow-500">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={size} fill="currentColor" />
            ))}
            {hasHalfStar && <StarHalf size={size} fill="currentColor" />}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={size} className="text-gray-300" />
            ))}
        </div>
    );
};

export default  StarRating;