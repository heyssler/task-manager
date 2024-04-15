from flask import request, jsonify
from app import db
from app.models import Task

def register_routes(app):
    # Creating or retrieving a task
    @app.route('/tasks', methods=['GET', 'POST'])
    def handle_tasks():
        if request.method == 'GET':
            tasks = Task.query.all()
            return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
        elif request.method == 'POST':
            data = request.get_json()

            if not data or not data.get('title'):
                return jsonify({'error': 'Missing title'}), 400

            new_task = Task(title=data['title'], description=data.get('description', ''))

            db.session.add(new_task)
            db.session.commit()

            return jsonify({'id': new_task.id, 'title': new_task.title, 'description': new_task.description, 'completed': new_task.completed}), 201
    
    # Deleting a task
    @app.route('/tasks/<int:task_id>', methods=['DELETE'])
    def delete_task(task_id):
        task = Task.query.get(task_id)

        if not task:
            return jsonify({'error': 'Task not found'}), 404
        
        db.session.delete(task)
        db.session.commit()

        return jsonify({'message': 'Task deleted'}), 204
    
    # Updating a task
    @app.route('/tasks/<int:task_id>', methods=['PUT'])
    def update_task(task_id):
        data = request.get_json()

        if not data:
            return jsonify({'error': 'Missing data'}), 400

        task = Task.query.get(task_id)
        if not task:
            return jsonify({'error': 'Task not found'}), 404

        # Update task attributes with provided data
        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.completed = bool(data.get('completed', task.completed))

        db.session.commit()
        return jsonify({'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed}), 200


    @app.route('/',  methods=['GET'])
    def return_home():
        return 'Task Manager API'