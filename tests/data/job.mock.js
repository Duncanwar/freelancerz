const month = new Date().getMonth() + 2;
const month2 = new Date().getMonth() + 5;
const someDate = `${month}-${new Date().getDay()}-${new Date().getFullYear()}`;
const someDate2 = `${month2}-${new Date().getDay()}-${new Date().getFullYear()}`;

export default {
  job1: {
    title: 'Web development',
    price: 1000000,
    yearsOfExperience: '2',
    jobType: 'full-time',
    startDate: someDate,
    endDate: someDate2,
    description: 'hello world'
  },
  job2: {
    title: 'Web development',
  },
};