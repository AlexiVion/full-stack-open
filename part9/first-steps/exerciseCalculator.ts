interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(h => h > 0).length;
  const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating = 1;
  let ratingDescription = 'bad, try harder';

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job, target reached';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (require.main === module) {
  const target = Number(process.argv[2]);
  const dailyHours = process.argv.slice(3).map(Number);

  if (!isNaN(target) && dailyHours.length > 0 && !dailyHours.some(isNaN)) {
    console.log(calculateExercises(dailyHours, target));
  } else {
    console.log('Error: Provided values were not valid numbers!');
  }
}
