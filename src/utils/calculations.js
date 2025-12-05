export const normalizeHeight = (height) => {
  if (height > 10) {
    return height / 100
  }
  return height
}

export const parseNumericInput = (value) => {
  const parsed = parseFloat(value)
  return {
    isValid: !Number.isNaN(parsed) && parsed > 0,
    parsed,
  }
}

export const calculateBMI = (weight, height) => {
  const normalizedHeight = normalizeHeight(height)
  const bmi = weight / (normalizedHeight * normalizedHeight)
  return bmi.toFixed(2)
}

export const getBMICategory = (bmi) => {
  const numericBMI = parseFloat(bmi)
  
  if (numericBMI < 18.5) {
    return { category: 'Underweight', color: '#3498db' }
  }
  if (numericBMI < 25) {
    return { category: 'Normal weight', color: '#2ecc71' }
  }
  if (numericBMI < 30) {
    return { category: 'Overweight', color: '#f39c12' }
  }
  return { category: 'Obese', color: '#e74c3c' }
}

export const calculateBMR = ({ weight, height, age, gender }) => {
  const heightInCm = height > 10 ? height : height * 100
  
  let bmr
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * heightInCm) - (5.677 * age)
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * heightInCm) - (4.33 * age)
  }
  
  return bmr.toFixed(2)
}

export const validateBMIInputs = (height, weight) => {
  const heightResult = parseNumericInput(height)
  const weightResult = parseNumericInput(weight)
  
  if (!height || !weight) {
    return {
      isValid: false,
      error: 'Please complete both fields to continue.',
      parsedHeight: 0,
      parsedWeight: 0,
    }
  }
  
  if (!heightResult.isValid || !weightResult.isValid) {
    return {
      isValid: false,
      error: 'Use numbers only for height and weight.',
      parsedHeight: 0,
      parsedWeight: 0,
    }
  }
  
  if (weightResult.parsed <= 0) {
    return {
      isValid: false,
      error: 'Weight must be greater than zero.',
      parsedHeight: heightResult.parsed,
      parsedWeight: 0,
    }
  }
  
  const normalizedHeight = normalizeHeight(heightResult.parsed)
  if (normalizedHeight <= 0) {
    return {
      isValid: false,
      error: 'Height must be greater than zero.',
      parsedHeight: 0,
      parsedWeight: weightResult.parsed,
    }
  }
  
  return {
    isValid: true,
    error: null,
    parsedHeight: heightResult.parsed,
    parsedWeight: weightResult.parsed,
  }
}

export const validateBMRInputs = ({ age, weight, height }) => {
  if (!age || !weight || !height) {
    return {
      isValid: false,
      error: 'Please fill in age, weight, and height to continue.',
      parsed: { age: 0, weight: 0, height: 0 },
    }
  }
  
  const ageResult = parseNumericInput(age)
  const weightResult = parseNumericInput(weight)
  const heightResult = parseNumericInput(height)
  
  if (!ageResult.isValid || !weightResult.isValid || !heightResult.isValid) {
    return {
      isValid: false,
      error: 'Enter valid numerical values greater than zero.',
      parsed: { age: 0, weight: 0, height: 0 },
    }
  }
  
  return {
    isValid: true,
    error: null,
    parsed: {
      age: ageResult.parsed,
      weight: weightResult.parsed,
      height: heightResult.parsed,
    },
  }
}

export const generateId = () => Date.now().toString()
