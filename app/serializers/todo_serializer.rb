class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :is_complete, :created_at, :completed_at
end
