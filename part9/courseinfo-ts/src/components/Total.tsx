import { CoursePart } from "../types";

const Total = ({ parts }: { parts: CoursePart[] }) => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
