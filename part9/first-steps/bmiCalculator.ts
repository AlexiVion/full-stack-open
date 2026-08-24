export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25.0) return 'Normal range';
  if (bmi < 30.0) return 'Overweight';
  return 'Obese';
};

if (require.main === module) {
  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  if (!isNaN(height) && !isNaN(weight) && height > 0 && weight > 0) {
    console.log(calculateBmi(height, weight));
  } else {
    console.log('Error: Provided values were not valid numbers!');
  }
}
