class TaskSerializer < ActiveModel::Serializer
  attributes :id, :task, :completed_at, :created_at
end
