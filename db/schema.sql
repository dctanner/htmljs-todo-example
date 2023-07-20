DROP TABLE IF EXISTS projects;
CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO projects (id, name) VALUES (1, 'Shopping List'), (2, 'Errands');

DROP TABLE IF EXISTS todos;
CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, project_id INTEGER, name TEXT, done INTEGER DEFAULT 0, FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE);
INSERT INTO todos (id, project_id, name, done) VALUES (1, 1, 'Buy milk', 1), (2, 1, 'Buy eggs', 0), (3, 2, 'Pick up laundry', 0), (4, 2, 'Get car washed', 0);
