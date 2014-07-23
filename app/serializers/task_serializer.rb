class TaskSerializer < ActiveModel::Serializer
  attributes :id, :task, :completed_at
end
