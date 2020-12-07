const groups = require('./groups');

const uniqueAnswersPerGroup = groups.map(lines => {
  const answersByPerson = lines.map(l => l.split(''));

  const answers = answersByPerson.reduce((acc, answers) => {
    answers.forEach(a => {
      if (acc.indexOf(a) === -1) acc.push(a);
    });
    return acc;
  }, []);

  return answers;
});

const sum = uniqueAnswersPerGroup.reduce((acc, answers) => (acc + answers.length), 0);

console.info(sum);
