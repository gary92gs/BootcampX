const { Pool } = require('pg');

const config = {
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  port: 5432,
  database: 'bootcampx',
};

const pool = new Pool(config);

cohortName = process.argv[2];
limit = process.argv[3];

pool.query(`
  SELECT students.id, students.name, cohorts.name AS cohort
  FROM students
  JOIN cohorts on cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`, [cohortName, limit])
  .then((results) => {
    results.rows.forEach((element) => {
      console.log(`${element.name} has an id of ${element.id} and was in the ${element.cohort} cohort`);
    });
    pool.end();
  })
  .catch((error) => {
    console.error('query error', error.stack);
  });
