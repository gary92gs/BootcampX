const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432,
  database: 'bootcampx',
  username: 'labber',
  password: 'labber',
};

const pool = new Pool(config);

cohort = process.argv[2];

pool.query(`
  SELECT teachers.name AS teacher, cohorts.name AS cohort 
  FROM assistance_requests
  JOIN teachers ON teachers.id = teacher_id
  JOIN students ON students.id = student_id
  JOIN cohorts ON cohorts.id = students.cohort_id
  WHERE cohorts.name = '${cohort}'
  GROUP BY teachers.name, cohorts.name
  ORDER BY teacher;
`)
  .then((results) => {
    console.log(results.rows);
    results.rows.forEach(element => {
      console.log(`${element.cohort}: ${element.teacher}`);
    });
  })
  .catch((error) => {
    console.error('query error', error.stack);
  });
