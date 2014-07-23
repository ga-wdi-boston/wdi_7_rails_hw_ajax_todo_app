class TodoSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :completed_at
end
