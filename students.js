const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
  ];
  
  const filterPassedStudents = students => {
    return students.filter(student => student.grade >= 50);
  };
  
  const getStudentNames = students => {
    return students.map(student => student.name);
  };
  
  const sortStudentsByGrade = students => {
    return [...students].sort((a, b) => a.grade - b.grade);
  };
  
  const getAverageAge = students => {
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    return totalAge / students.length;
  };
  
  // Export functions for testing
  module.exports = {
    filterPassedStudents,
    getStudentNames,
    sortStudentsByGrade,
    getAverageAge
  };
  
  // Example usage
  console.log('Passed Students:', filterPassedStudents(students));
  console.log('Student Names:', getStudentNames(students));
  console.log('Sorted by Grade:', sortStudentsByGrade(students));
  console.log('Average Age:', getAverageAge(students));
  