class TodoSerializer < ActiveModel::Serializer
  attributes :id, :title, :created_at, :completed_at
end
