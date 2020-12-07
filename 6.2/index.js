const groups = require('./groups');

const uniqueAnswersPerGroup = groups.map(lines => {
  const answersByPerson = lines.map(l => l.split(''));

  const answers = answersByPerson.reduce((acc, answers) => {
    const mutuallyAnswered = [];
    answers.forEach(a => {
      if (acc.indexOf(a) !== -1) mutuallyAnswered.push(a);
    });
    return mutuallyAnswered;
  }, answersByPerson[0]);

  return answers;
});

const sum = uniqueAnswersPerGroup.reduce((acc, answers) => (acc + answers.length), 0);

console.info(sum);
