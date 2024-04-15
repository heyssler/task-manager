from app import create_app

app = create_app('tests')

# 'hello world' type of test to make sure pytest is running correctly
def test_home_route():
    response = app.test_client().get('/')
    assert response.status_code == 200
    assert b"Task Manager API" in response.data

# GET -------------
def test_get_all_tasks_empty():
    response = app.test_client().get('/')
    assert response.status_code == 200
    assert response.json == None

# CREATE -------------
def test_create_task():
  data = {'title': 'New Task', 'description': 'New Description', 'completed': 'False', 'id': '1'}
  response = app.test_client().post('/tasks', json=data)
  assert response.status_code == 201
  assert response.json['title'] == data['title']
  assert response.json['description'] == data['description']

def test_get_tasks_non_empty():
  response = app.test_client().get('/tasks')
  assert response.status_code == 200
  expected_data = {'title': 'New Task', 'description': 'New Description', 'completed': 'False', 'id': '1'}
  assert response.json[0]['title'] == expected_data['title']

# UPDATE -------------
def test_update_task():
  data = {'title': 'New Task', 'description': 'New Description', 'completed': 'False'}
  response = app.test_client().post('/tasks', json=data)
  assert response.status_code == 201

  task_id = response.json['id']

  data = {'title': 'New Task', 'description': 'New Description', 'completed': 'True'}
  response = app.test_client().put(f'/tasks/{task_id}', json=data)
  assert response.status_code == 200
  assert response.json['completed'] == True

def test_update_task_missing_data():
  data = None
  response = app.test_client().put('/tasks/1', json=data)
  assert response.status_code == 400
  assert b"Missing data" in response.data

def test_update_task_not_found():
  data = {'title': 'New Task', 'description': 'New Description', 'completed': 'False'}
  response = app.test_client().put('/tasks/9999', json=data)
  assert response.status_code == 404
  assert b"Task not found" in response.data

# DELETE -------------
def test_delete_task():
  data = {'title': 'New Task', 'description': 'New Description', 'completed': 'False'}
  response = app.test_client().post('/tasks', json=data)
  assert response.status_code == 201

  task_id = response.json['id']

  response = app.test_client().delete(f'/tasks/{task_id}')
  assert response.status_code == 204

def test_delete_task_not_found():
  response = app.test_client().delete('/tasks/100')
  assert response.status_code == 404
  assert b"Task not found" in response.data